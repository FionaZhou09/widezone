import { db } from "../client";
import { customers } from "../schema";
import { eq, desc, asc, sql, and, gte, or, isNull } from "drizzle-orm";

export async function getAllCustomers() {
  return db.select().from(customers).orderBy(desc(customers.createdAt));
}

export async function getCustomerById(id: number) {
  const rows = await db.select().from(customers).where(eq(customers.id, id));
  return rows[0] || null;
}

export async function getCustomersBySalesRep(salesRepId: string) {
  return db.select().from(customers).where(eq(customers.salesRepId, salesRepId)).orderBy(desc(customers.lastContactedAt));
}

export async function getCustomersByPipeline(status: string) {
  return db.select().from(customers).where(eq(customers.pipelineStatus, status)).orderBy(desc(customers.lastContactedAt));
}

export async function getCustomersByState(state: string) {
  return db.select().from(customers).where(eq(customers.state, state)).orderBy(asc(customers.businessName));
}

export async function getCustomersByBusinessType(businessType: string) {
  return db.select().from(customers).where(eq(customers.businessType, businessType)).orderBy(asc(customers.businessName));
}

// Get customers not contacted in last 30 days
export async function getCustomersNeedingFollowUp() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return db.select().from(customers).where(
    or(
      isNull(customers.lastContactedAt),
      sql`${customers.lastContactedAt} < ${thirtyDaysAgo}`
    )
  ).orderBy(desc(customers.lastContactedAt));
}

export async function createCustomer(data: typeof customers.$inferInsert) {
  const rows = await db.insert(customers).values(data).returning();
  return rows[0];
}

export async function updateCustomer(id: number, data: Partial<typeof customers.$inferInsert>) {
  const rows = await db.update(customers).set({ ...data, updatedAt: new Date() }).where(eq(customers.id, id)).returning();
  return rows[0];
}

export async function updateCustomerPipeline(id: number, status: string, lostReason?: string) {
  const rows = await db.update(customers).set({ 
    pipelineStatus: status, 
    lostReason: lostReason || null,
    updatedAt: new Date() 
  }).where(eq(customers.id, id)).returning();
  return rows[0];
}

export async function deleteCustomer(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
}
