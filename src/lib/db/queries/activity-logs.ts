import { db } from "../client";
import { activityLogs, customers } from "../schema";
import { eq, desc, and } from "drizzle-orm";

export async function getActivityLogsByCustomer(customerId: number) {
  return db.select().from(activityLogs).where(eq(activityLogs.customerId, customerId)).orderBy(desc(activityLogs.createdAt));
}

export async function createActivityLog(data: typeof activityLogs.$inferInsert) {
  const rows = await db.insert(activityLogs).values(data).returning();
  
  // Update customer's lastContactedAt
  await db.update(customers).set({ 
    lastContactedAt: new Date(),
    updatedAt: new Date()
  }).where(eq(customers.id, data.customerId));
  
  return rows[0];
}

export async function deleteActivityLog(id: number) {
  await db.delete(activityLogs).where(eq(activityLogs.id, id));
}
