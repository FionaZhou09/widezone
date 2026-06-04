# Wide Zone Food

Wide Zone Food is a bilingual wholesale food catalog and internal sales CRM built for the Eazo platform. Public buyers can browse products in Chinese or English, build an RFQ, and submit it to the sales team.

## Features

- Modern public catalog with Chinese and English modes
- Search and category filtering across 100+ products
- RFQ basket with quantities and customer contact form
- Internal RFQ email notifications through Resend
- Customer CRM, pipeline tracking, dashboard, and MCP tools
- Eazo authentication, notifications, and mobile WebView support

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000/catalog](http://localhost:3000/catalog) for the public catalog.

## Verification

```bash
bun run lint
bun run build
```

## Configuration

Copy `.env.example` to `.env` and configure the services you use.

| Variable | Description |
|---|---|
| `EAZO_APP_ID` | Eazo application ID |
| `EAZO_PRIVATE_KEY` | Server-side Eazo private key |
| `DATABASE_URL` | PostgreSQL connection string |
| `RESEND_API_KEY` | Resend API key for real RFQ email delivery |
| `RFQ_FROM_EMAIL` | Verified RFQ sender address |
| `RFQ_SALES_EMAIL` | Internal sales recipient, defaults to `fiona.zhou@widezones.com` |

Without Eazo or database variables, local development uses a demo user and empty dashboard data. Without `RESEND_API_KEY`, RFQ submissions are logged locally instead of sending email.

## Source Materials

Original catalog source files are archived under `docs/source/`. Application catalog data lives in `src/data/widezone-products.json`.
