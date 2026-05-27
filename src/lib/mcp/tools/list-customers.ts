import { z } from "zod";
import { getAllCustomers, getCustomersByPipeline, getCustomersNeedingFollowUp } from "@/lib/db/queries";

// List all customers with optional pipeline filter
export const list_customers = {
  name: "list_customers",
  description: "List all CRM customers. Can optionally filter by pipeline stage (potential, contacted, negotiating, won, lost) or show only customers needing follow-up (30+ days no contact).",
  inputSchema: z.object({
    pipeline_status: z.enum(["potential", "contacted", "negotiating", "won", "lost"]).optional().describe("Filter by pipeline stage"),
    needs_followup: z.boolean().optional().describe("If true, return only customers not contacted in 30+ days"),
  }),
  handler: async (args: { pipeline_status?: string; needs_followup?: boolean }) => {
    if (args.needs_followup) {
      const customers = await getCustomersNeedingFollowUp();
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              count: customers.length,
              customers: customers.map((c) => ({
                id: c.id,
                businessName: c.businessName,
                state: c.state,
                pipelineStatus: c.pipelineStatus,
                lastContactedAt: c.lastContactedAt,
              })),
            }, null, 2),
          },
        ],
      };
    }

    if (args.pipeline_status) {
      const customers = await getCustomersByPipeline(args.pipeline_status);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              pipeline_status: args.pipeline_status,
              count: customers.length,
              customers: customers.map((c) => ({
                id: c.id,
                businessName: c.businessName,
                state: c.state,
                pipelineStatus: c.pipelineStatus,
                lastContactedAt: c.lastContactedAt,
              })),
            }, null, 2),
          },
        ],
      };
    }

    const customers = await getAllCustomers();
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            count: customers.length,
            customers: customers.map((c) => ({
              id: c.id,
              businessName: c.businessName,
              state: c.state,
              pipelineStatus: c.pipelineStatus,
              businessType: c.businessType,
              lastContactedAt: c.lastContactedAt,
            })),
          }, null, 2),
        },
      ],
    };
  },
};
