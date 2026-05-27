import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { list_customers } from "./tools/list-customers";
import { get_customer_profile } from "./tools/get-customer-profile";
import { log_customer_activity } from "./tools/log-customer-activity";
import { update_customer_pipeline } from "./tools/update-customer-pipeline";
import { list_products } from "./tools/list-products";

export function buildMcpServer(_userId: string): McpServer {
  const server = new McpServer({
    name: "wide-zone-crm",
    version: "1.0.0",
  });

  // Register CRM tools
  server.tool(list_customers.name, list_customers.description, list_customers.inputSchema.shape, list_customers.handler);
  server.tool(get_customer_profile.name, get_customer_profile.description, get_customer_profile.inputSchema.shape, get_customer_profile.handler);
  server.tool(log_customer_activity.name, log_customer_activity.description, log_customer_activity.inputSchema.shape, log_customer_activity.handler);
  server.tool(update_customer_pipeline.name, update_customer_pipeline.description, update_customer_pipeline.inputSchema.shape, update_customer_pipeline.handler);
  server.tool(list_products.name, list_products.description, list_products.inputSchema.shape, list_products.handler);

  return server;
}
