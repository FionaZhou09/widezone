import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getAllProducts } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
