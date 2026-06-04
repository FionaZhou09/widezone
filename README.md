# Wide Zone Food

Wide Zone Food is a bilingual (中文 / English) wholesale food catalog with an online RFQ (request for quote) flow. Buyers browse products by category, build an RFQ basket, and submit it to the sales team by email.

## Features

- Public catalog with Chinese and English modes
- Search and category filtering across 100+ products
- RFQ basket with quantities and a customer contact form
- RFQ email delivery through Resend (logs locally when no API key is set)
- Static, database-free architecture — product data lives in JSON

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the home route redirects to `/catalog`.

## Verification

```bash
npm run lint
npm run build
```

## Configuration

Copy `.env.example` to `.env` and set the RFQ email variables you need.

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for real RFQ email delivery (optional locally) |
| `RFQ_FROM_EMAIL` | Verified RFQ sender address |
| `RFQ_SALES_EMAIL` | Internal sales recipient, defaults to `fiona.zhou@widezones.com` |

## Project Structure

```
src/
├── app/                 # Next.js App Router routes
│   ├── about/           # Company / about page
│   ├── catalog/         # Product catalog (home redirects here)
│   ├── contact/         # Contact page
│   ├── api/rfq/         # RFQ submission endpoint
│   └── layout.tsx
├── components/
│   ├── about/           # About page sections
│   ├── catalog/         # Catalog, filters, RFQ tray + form
│   ├── contact/         # Contact page sections
│   └── ui/              # Reusable UI primitives (shadcn / base-ui)
├── data/                # Static catalog data (widezone-products.json)
└── lib/
    ├── rfq/             # RFQ schema, email rendering + delivery, client helper
    └── utils.ts         # cn() class helper
```

## Source Materials

Original catalog source files are archived under `docs/source/`. Application catalog data lives in `src/data/widezone-products.json`.
