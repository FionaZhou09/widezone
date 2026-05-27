import { z } from "zod";
import { getCustomerById } from "@/lib/db/queries";
import { getActivityLogsByCustomer } from "@/lib/db/queries";

export const get_customer_profile = {
  name: "get_customer_profile",
  description: "Get the full profile of a CRM customer by ID, including contact details, pipeline status, address, product preferences, and recent activity logs.",
  inputSchema: z.object({
    customer_id: z.number().describe("The numeric customer ID"),
  }),
  handler: async (args: { customer_id: number }) => {
    const [customer, logs] = await Promise.all([
      getCustomerById(args.customer_id),
      getActivityLogsByCustomer(args.customer_id),
    ]);

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
            customer,
            recentLogs: logs.slice(0, 5),
          }, null, 2),
        },
      ],
    };
  },
};
