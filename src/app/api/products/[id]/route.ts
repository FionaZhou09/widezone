import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateProductPrice } from "@/lib/db/queries";
import { z } from "zod";

const updatePriceSchema = z.object({
  price: z.number().min(0),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireAuth(request);
  if (!result.ok) return result.response;

  const { id } = await params;
  const productId = parseInt(id, 10);

  try {
    const body = await request.json();
    const { price } = updatePriceSchema.parse(body);
    
    const updated = await updateProductPrice(productId, price);
    return NextResponse.json(updated[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to update product price:", error);
    return NextResponse.json({ error: "Failed to update product price" }, { status: 500 });
  }
}
