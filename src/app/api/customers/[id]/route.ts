import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getCustomerById, updateCustomer, deleteCustomer, updateCustomerPipeline } from "@/lib/db/queries";
import { z } from "zod";

const updateCustomerSchema = z.object({
  businessName: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  contactPerson: z.string().min(1).optional(),
  businessType: z.string().min(1).optional(),
  productPreferences: z.array(z.object({
    productId: z.number(),
    preferredPrice: z.number(),
    usualQuantity: z.string(),
  })).optional(),
  pipelineStatus: z.string().optional(),
  lostReason: z.string().optional(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  const { id } = await params;
  const customerId = parseInt(id, 10);

  try {
    const customer = await getCustomerById(customerId);
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  const { id } = await params;
  const customerId = parseInt(id, 10);

  try {
    const body = await request.json();
    const data = updateCustomerSchema.parse(body);
    
    const customer = await updateCustomer(customerId, data);
    return NextResponse.json(customer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to update customer:", error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  const { id } = await params;
  const customerId = parseInt(id, 10);

  try {
    await deleteCustomer(customerId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
