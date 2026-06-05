# Public RFQ and Internal Email Design

## Goal

Let public catalog visitors select products, submit an RFQ, and notify Fiona Zhou at `fiona.zhou@widezones.com`.

## Customer Flow

Each product card has an "Add to RFQ" action. Selected products appear in a persistent RFQ tray where customers enter quantities and remove items. The tray opens a bilingual contact form requiring business name, contact name, email, phone, and delivery location; notes are optional.

## Server Flow

`POST /api/rfq` is public and validates all fields with Zod. The server renders a bilingual HTML and plain-text RFQ email and sends it through Resend's HTTP API to the internal sales address only. `RESEND_API_KEY` and `RFQ_FROM_EMAIL` configure production delivery. Without a Resend key, local development logs the RFQ and returns a development-mode success response.

## Error Handling

Invalid submissions return HTTP 400 with a safe error message. Email-provider failures return HTTP 502. The form preserves customer input after failures and displays a toast. Successful submissions clear the RFQ and show confirmation.

## Testing

Unit tests cover validation and email content. Production build and targeted lint verify integration. Browser testing verifies selecting a product, editing quantity, opening the form, and submitting in local development mode.
