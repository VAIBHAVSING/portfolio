This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub API Usage & Rate Limits

This portfolio fetches pull request contribution data from the GitHub REST API. To avoid hitting anonymous rate limits (60 requests/hour), you can provide a personal access token which increases the limit (typically 5,000 requests/hour):

1. Create a Classic Personal Access Token (PAT) with the `public_repo` scope (no private scopes required) at: https://github.com/settings/tokens
2. Add it to your environment as `GITHUB_TOKEN` (and optionally set `GITHUB_USERNAME` if different from the default user).

Example for local development (Linux/macOS):

```bash
echo "GITHUB_TOKEN=ghp_yourTokenHere" >> .env.local
echo "GITHUB_USERNAME=VAIBHAVSING" >> .env.local
```

The app will:
- Use the serverless route `/api/contributions` to perform authenticated, batched, and cached (15m) fetches.
- Fall back to a lighter client-side fetch if the API route fails or no token is present.
- Minimize per-PR detail calls by only requesting details for closed PRs to determine merged vs closed state.

If you see a rate limit error in the browser console, add or rotate the token and optionally clear localStorage key `all-contributions-cache-v1` to force a refetch.

## Pre-Built Contributions Cache

A static snapshot of contributions is stored at `public/data/contributions.json`. On initial load the client:
- Reads the static file (fast, zero API calls).
- Then background refreshes via `/api/contributions` (server token + cache) to update.

### Automated Updates

GitHub Actions workflow: `.github/workflows/update-contributions.yml`
- Runs daily (03:00 UTC) or on manual dispatch.
- Executes `scripts/update-contributions-cache.ts` to regenerate `public/data/contributions.json`.
- Opens a PR with changes (labels: `automated`, `contributions`).

### Required Secrets
Add these repository secrets:
- `CONTRIB_GITHUB_TOKEN` – PAT with `public_repo` scope.
- `CONTRIB_GITHUB_USERNAME` – (optional) override username if different.

### Local Manual Update
```bash
GITHUB_TOKEN=ghp_xxx pnpm ts-node scripts/update-contributions-cache.ts
```
Commit the updated JSON file to ship a fresh snapshot with your deployment.
