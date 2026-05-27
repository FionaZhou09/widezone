import { pgTable, text, varchar, timestamp, bigserial, jsonb } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(), // US state
  phone: varchar("phone", { length: 50 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  businessType: varchar("business_type", { length: 100 }).notNull(), // Chinese Restaurant | Hotpot Restaurant | Supermarket | Other
  productPreferences: jsonb("product_preferences").$type<Array<{ productId: number; preferredPrice: number; usualQuantity: string }>>().notNull().default([]),
  pipelineStatus: varchar("pipeline_status", { length: 50 }).notNull().default("potential"), // potential | contacted | negotiating | won | lost
  lostReason: text("lost_reason"), // price | competition | no_response | other
  salesRepId: varchar("sales_rep_id", { length: 255 }).notNull(), // @eazo/sdk user.id
  lastContactedAt: timestamp("last_contacted_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
