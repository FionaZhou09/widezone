# Push to GitHub

This repository is ready to publish with Bun as the package manager.

## Before Pushing

```bash
bun install
bun run build
git status
```

Review `.env.example`, but never commit a real `.env` file or API keys.

## Commit and Push

```bash
git add .
git commit -m "feat: launch Wide Zone Food catalog and RFQ"
git push origin main
```

If the GitHub repository has not been connected yet:

```bash
git remote add origin https://github.com/FionaZhou09/widezone.git
git push -u origin main
```

Avoid force pushing unless you intentionally want to replace the remote branch history.

## Deployment Variables

Configure these values in the deployment platform:

- `EAZO_APP_ID`
- `EAZO_PRIVATE_KEY`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `RFQ_FROM_EMAIL`
- `RFQ_SALES_EMAIL`
