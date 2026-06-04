# Public RFQ and Internal Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public product-selection RFQ flow that emails the internal sales team.

**Architecture:** Catalog state owns selected products and renders a focused RFQ tray/form. A public Next.js route validates input, renders a bilingual email, and sends it through Resend HTTP with a local-development fallback.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Zod, Resend HTTP API, Node test runner

---

### Task 1: RFQ Domain and Tests

**Files:**
- Create: `src/lib/rfq/schema.ts`
- Create: `src/lib/rfq/email.ts`
- Test: `src/lib/rfq/rfq.test.ts`

- [ ] Write tests for required products, valid contact data, and rendered product quantities.
- [ ] Run tests and verify they fail because RFQ modules do not exist.
- [ ] Implement the Zod schema and email renderer.
- [ ] Run tests and verify they pass.

### Task 2: Public RFQ API

**Files:**
- Create: `src/lib/rfq/send-email.ts`
- Create: `src/app/api/rfq/route.ts`
- Modify: `.env.example`

- [ ] Validate the public request with `rfqSchema`.
- [ ] Send the rendered email to `fiona.zhou@widezones.com` through Resend.
- [ ] Return development-mode success when `RESEND_API_KEY` is absent.
- [ ] Return safe 400 and 502 responses for invalid submissions and provider failures.

### Task 3: Catalog RFQ UI

**Files:**
- Create: `src/lib/api/rfq.ts`
- Create: `src/components/catalog/rfq-tray.tsx`
- Create: `src/components/catalog/rfq-form.tsx`
- Modify: `src/components/catalog/catalog-page.tsx`
- Modify: `src/components/catalog/category-section.tsx`
- Modify: `src/components/catalog/product-card.tsx`
- Modify: `src/components/catalog/types.ts`

- [ ] Add an RFQ button to each product card.
- [ ] Track selected products and quantities in the catalog page.
- [ ] Add a persistent bilingual tray and contact form.
- [ ] Submit only through `src/lib/api/rfq.ts`, show success/error feedback, and clear successful submissions.

### Task 4: Verification

- [ ] Run RFQ unit tests.
- [ ] Run targeted lint.
- [ ] Run production build.
- [ ] Verify the complete RFQ flow in the in-app browser.
