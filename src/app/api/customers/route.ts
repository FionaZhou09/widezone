import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getAllCustomers, createCustomer, getCustomersNeedingFollowUp } from "@/lib/db/queries";
import { z } from "zod";

const createCustomerSchema = z.object({
  businessName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  phone: z.string().min(1),
  contactPerson: z.string().min(1),
  businessType: z.string().min(1),
  productPreferences: z.array(z.object({
    productId: z.number(),
    preferredPrice: z.number(),
    usualQuantity: z.string(),
  })).default([]),
});

export async function GET(request: NextRequest) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;

  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");

    if (filter === "needs-followup") {
      const customers = await getCustomersNeedingFollowUp();
      return NextResponse.json(customers);
    }

    const customers = await getAllCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const result = requireAuth(request);
  if (!result.ok) return result.response;
  const { id: userId } = result.user;

  try {
    const body = await request.json();
    const data = createCustomerSchema.parse(body);
    
    const customer = await createCustomer({
      ...data,
      salesRepId: userId,
    });
    
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to create customer:", error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
