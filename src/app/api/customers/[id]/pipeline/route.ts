import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateCustomerPipeline } from "@/lib/db/queries";
import { z } from "zod";

const updatePipelineSchema = z.object({
  status: z.enum(["potential", "contacted", "negotiating", "won", "lost"]),
  lostReason: z.string().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  const { id } = await params;
  const customerId = parseInt(id, 10);

  try {
    const body = await request.json();
    const { status, lostReason } = updatePipelineSchema.parse(body);
    
    const customer = await updateCustomerPipeline(customerId, status, lostReason);
    return NextResponse.json(customer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to update pipeline:", error);
    return NextResponse.json({ error: "Failed to update pipeline" }, { status: 500 });
  }
}
