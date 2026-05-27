import { db } from "../client";
import { products } from "../schema";
import { eq, desc, asc, sql } from "drizzle-orm";

export async function getAllProducts() {
  return db.select().from(products).orderBy(asc(products.category), asc(products.nameEn));
}

export async function getProductById(id: number) {
  const rows = await db.select().from(products).where(eq(products.id, id));
  return rows[0] || null;
}

export async function getProductsByCategory(category: string) {
  return db.select().from(products).where(eq(products.category, category)).orderBy(asc(products.nameEn));
}

export async function updateProductPrice(id: number, price: number) {
  return db.update(products).set({ price, updatedAt: new Date() }).where(eq(products.id, id)).returning();
}
