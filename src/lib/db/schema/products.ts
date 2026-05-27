import { pgTable, text, varchar, timestamp, bigserial, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameZh: varchar("name_zh", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Beef | Pork | Poultry | Seafood | Hotpot Base | Beverages & Other
  unit: varchar("unit", { length: 100 }).notNull(), // e.g. "1kg", "500g pack", "12x330ml"
  price: integer("price").notNull(), // cents
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
