# GitHub Token Setup for Portfolio

## Problem

Without a GitHub personal access token, the portfolio API hits rate limits when trying to determine if closed PRs are actually merged or just closed. This causes merged PRs to incorrectly show as "closed".

## Solution

Set up a GitHub Personal Access Token:

### 1. Create GitHub Token

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio API"
4. Select scope: `public_repo` (to read public repository data)
5. Generate and copy the token

### 2. Add to Environment

Create a `.env.local` file in the project root:

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=VAIBHAVSING
```

### 3. For Production (Vercel)

Add these as environment variables in your Vercel dashboard:

- `GITHUB_TOKEN`: your token
- `GITHUB_USERNAME`: VAIBHAVSING

## Why This Fixes The Issue

- Without token: 60 requests/hour → rate limited quickly
- With token: 5,000 requests/hour → enough for all PR details
- The API can then properly distinguish between closed and merged PRs

## Current Status

The API logic is correct and will work properly once the token is configured. Rate limiting is the only thing preventing accurate merged PR detection.
