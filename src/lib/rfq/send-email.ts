import { renderRfqEmail } from "./email";
import type { RfqSubmission } from "./schema";

const SALES_EMAIL = process.env.RFQ_SALES_EMAIL || "fiona.zhou@widezones.com";

export async function sendRfqEmail(rfq: RfqSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const email = renderRfqEmail(rfq);

  if (!apiKey) {
    console.info("[rfq] RESEND_API_KEY missing; development submission", {
      to: SALES_EMAIL,
      subject: email.subject,
      rfq,
    });
    return { delivered: false, developmentMode: true };
  }

  const payload = {
    from: process.env.RFQ_FROM_EMAIL || "Wide Zone Food <onboarding@resend.dev>",
    to: [SALES_EMAIL],
    subject: email.subject,
    html: email.html,
    text: email.text,
    ...(rfq.email ? { reply_to: rfq.email } : {}),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }

  return { delivered: true, developmentMode: false };
}
