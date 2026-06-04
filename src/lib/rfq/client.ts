import type { RfqSubmission } from "@/lib/rfq/schema";

export async function submitRfq(rfq: RfqSubmission) {
  const response = await fetch("/api/rfq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rfq),
  });

  const result = (await response.json()) as { error?: string; developmentMode?: boolean };
  if (!response.ok) throw new Error(result.error || "Unable to submit RFQ");
  return result;
}
