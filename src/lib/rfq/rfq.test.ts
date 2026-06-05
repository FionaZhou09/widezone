import assert from "node:assert/strict";
import test from "node:test";
import { renderRfqEmail } from "./email";
import { rfqSchema } from "./schema";

const validRfq = {
  businessName: "Golden Hotpot",
  contactName: "Amy Chen",
  email: "amy@example.com",
  phone: "555-123-4567",
  location: "New York, NY",
  notes: "Please confirm lead time.",
  items: [
    {
      nameEn: "River Stone Wagyu Meatball",
      nameZh: "River Stone 和牛牛肉丸",
      unit: "8oz x 30",
      quantity: "3 cases",
    },
  ],
};

test("RFQ requires at least one product", () => {
  const result = rfqSchema.safeParse({ ...validRfq, items: [] });
  assert.equal(result.success, false);
});

test("RFQ rejects invalid customer email", () => {
  const result = rfqSchema.safeParse({ ...validRfq, email: "not-an-email" });
  assert.equal(result.success, false);
});

test("RFQ email contains customer and selected product details", () => {
  const email = renderRfqEmail(validRfq);
  assert.match(email.subject, /Golden Hotpot/);
  assert.match(email.text, /3 cases/);
  assert.match(email.html, /River Stone Wagyu Meatball/);
  assert.match(email.html, /amy@example\.com/);
});
