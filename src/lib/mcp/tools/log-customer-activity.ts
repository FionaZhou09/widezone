import { z } from "zod";
import { createActivityLog } from "@/lib/db/queries";

export const log_customer_activity = {
  name: "log_customer_activity",
  description: "Log a sales activity note for a customer (call, visit, email, etc.). Automatically updates the customer's last contact date.",
  inputSchema: z.object({
    customer_id: z.number().describe("The numeric customer ID"),
    sales_rep_name: z.string().describe("Name of the sales rep logging this activity"),
    note: z.string().describe("Activity note (e.g. 'Called customer to discuss pricing')"),
    next_followup_date: z.string().optional().describe("Optional ISO date string for next follow-up (YYYY-MM-DD)"),
  }),
  handler: async (args: { customer_id: number; sales_rep_name: string; note: string; next_followup_date?: string }) => {
    const log = await createActivityLog({
      customerId: args.customer_id,
      salesRepId: "ai-assistant",
      salesRepName: args.sales_rep_name,
      note: args.note,
      nextFollowUpDate: args.next_followup_date ? new Date(args.next_followup_date) : undefined,
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            success: true,
            log: {
              id: log.id,
              note: log.note,
              createdAt: log.createdAt,
            },
          }, null, 2),
        },
      ],
    };
  },
};
