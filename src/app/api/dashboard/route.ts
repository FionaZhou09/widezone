import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getAllCustomers, getCustomersNeedingFollowUp } from "@/lib/db/queries";
import { db } from "@/lib/db/client";
import { customers } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  try {
    const allCustomers = await getAllCustomers();
    const needsFollowUp = await getCustomersNeedingFollowUp();

    // Pipeline breakdown
    const pipelineStats = {
      potential: allCustomers.filter(c => c.pipelineStatus === "potential").length,
      contacted: allCustomers.filter(c => c.pipelineStatus === "contacted").length,
      negotiating: allCustomers.filter(c => c.pipelineStatus === "negotiating").length,
      won: allCustomers.filter(c => c.pipelineStatus === "won").length,
      lost: allCustomers.filter(c => c.pipelineStatus === "lost").length,
    };

    // Won/Lost this month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const wonThisMonth = allCustomers.filter(c => 
      c.pipelineStatus === "won" && c.updatedAt >= firstDayOfMonth
    ).length;
    const lostThisMonth = allCustomers.filter(c => 
      c.pipelineStatus === "lost" && c.updatedAt >= firstDayOfMonth
    ).length;

    // State breakdown
    const byState = allCustomers.reduce((acc, c) => {
      acc[c.state] = (acc[c.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Business type breakdown
    const byBusinessType = allCustomers.reduce((acc, c) => {
      acc[c.businessType] = (acc[c.businessType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      totalCustomers: allCustomers.length,
      activePipeline: pipelineStats.potential + pipelineStats.contacted + pipelineStats.negotiating,
      wonThisMonth,
      lostThisMonth,
      needsFollowUp: needsFollowUp.length,
      pipelineStats,
      byState,
      byBusinessType,
      needsFollowUpList: needsFollowUp.slice(0, 10), // Top 10
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
