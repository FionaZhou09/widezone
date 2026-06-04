import { z } from "zod";

export const rfqItemSchema = z.object({
  nameEn: z.string().trim().min(1).max(255),
  nameZh: z.string().trim().min(1).max(255),
  unit: z.string().trim().max(100),
  quantity: z.string().trim().min(1, "Quantity is required").max(100),
});

export const rfqSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(200),
  contactName: z.string().trim().min(1, "Contact name is required").max(150),
  email: z.string().trim().email("A valid email is required").max(254),
  phone: z.string().trim().min(1, "Phone is required").max(50),
  location: z.string().trim().min(1, "Delivery location is required").max(200),
  notes: z.string().trim().max(2000).optional().default(""),
  items: z.array(rfqItemSchema).min(1, "Select at least one product").max(100),
});

export type RfqSubmission = z.infer<typeof rfqSchema>;
