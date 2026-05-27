import { pgTable, text, varchar, timestamp, bigserial, bigint } from "drizzle-orm/pg-core";
import { customers } from "./customers";

export const activityLogs = pgTable("activity_logs", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  customerId: bigint("customer_id", { mode: "number" }).notNull().references(() => customers.id, { onDelete: "cascade" }),
  salesRepId: varchar("sales_rep_id", { length: 255 }).notNull(), // @eazo/sdk user.id
  salesRepName: varchar("sales_rep_name", { length: 255 }).notNull(),
  note: text("note").notNull(),
  nextFollowUpDate: timestamp("next_follow_up_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
