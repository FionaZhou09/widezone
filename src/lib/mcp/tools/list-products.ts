import { z } from "zod";
import { getAllProducts, getProductsByCategory } from "@/lib/db/queries";

export const list_products = {
  name: "list_products",
  description: "List all products in the catalog. Can optionally filter by category (Beef, Pork, Poultry, Seafood, Hotpot Base, Beverages & Other).",
  inputSchema: z.object({
    category: z.enum(["Beef", "Pork", "Poultry", "Seafood", "Hotpot Base", "Beverages & Other"]).optional().describe("Filter by product category"),
  }),
  handler: async (args: { category?: string }) => {
    const products = args.category
      ? await getProductsByCategory(args.category)
      : await getAllProducts();

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            count: products.length,
            products: products.map((p) => ({
              id: p.id,
              nameEn: p.nameEn,
              nameZh: p.nameZh,
              category: p.category,
              unit: p.unit,
              price_cents: p.price,
              price_usd: (p.price / 100).toFixed(2),
            })),
          }, null, 2),
        },
      ],
    };
  },
};
