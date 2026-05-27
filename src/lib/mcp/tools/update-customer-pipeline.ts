import { z } from "zod";
import { updateCustomerPipeline } from "@/lib/db/queries";

export const update_customer_pipeline = {
  name: "update_customer_pipeline",
  description: "Update a customer's pipeline stage (potential, contacted, negotiating, won, lost). Can optionally specify a lost reason when marking as lost.",
  inputSchema: z.object({
    customer_id: z.number().describe("The numeric customer ID"),
    stage: z.enum(["potential", "contacted", "negotiating", "won", "lost"]).describe("New pipeline stage"),
    lost_reason: z.string().optional().describe("Required if stage is 'lost': price, competition, no_response, other"),
  }),
  handler: async (args: { customer_id: number; stage: string; lost_reason?: string }) => {
    const customer = await updateCustomerPipeline(args.customer_id, args.stage, args.lost_reason);

    if (!customer) {
      return {
        content: [{ type: "text" as const, text: JSON.stringify({ error: "Customer not found" }) }],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            success: true,
            customer: {
              id: customer.id,
              businessName: customer.businessName,
              pipelineStatus: customer.pipelineStatus,
              lostReason: customer.lostReason,
            },
          }, null, 2),
        },
      ],
    };
  },
};
