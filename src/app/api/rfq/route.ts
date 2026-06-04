import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { rfqSchema } from "@/lib/rfq/schema";
import { sendRfqEmail } from "@/lib/rfq/send-email";

export async function POST(request: Request) {
  try {
    const rfq = rfqSchema.parse(await request.json());
    const result = await sendRfqEmail(rfq);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid RFQ" }, { status: 400 });
    }
    console.error("[rfq] submission failed", error);
    return NextResponse.json({ error: "Unable to send RFQ. Please try again." }, { status: 502 });
  }
}
