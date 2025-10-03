# GitHub Token Setup Instructions

## Issue

Your contributions API is showing merged PRs as "closed" because GitHub's API rate limit (60 requests/hour without authentication) is being exceeded.

## Solution

Set up a GitHub Personal Access Token to increase the rate limit to 5,000 requests/hour.

## Steps

### 1. Create GitHub Token

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/personal-access-tokens/new)
2. Click "Generate new token (classic)"
3. Set expiration (recommended: 90 days or longer)
4. **Scopes needed**: Leave scopes empty for public repos, or select `public_repo` if you want to be explicit
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Add Token to Environment

1. Open `.env.local` in your project root
2. Replace `your_github_token_here` with your actual token:
   ```
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```
3. Save the file

### 3. Restart Development Server

```bash
npm run dev
# or
pnpm dev
```

### 4. Test the Fix

1. Visit `http://localhost:3000/api/contributions`
2. Verify that merged PRs now show `"state": "merged"` instead of `"state": "closed"`

## Production Setup

For deployment (Vercel, etc.), add the `GITHUB_TOKEN` environment variable in your hosting platform's environment settings.

## Verification

After setup, your contributions API should:

- Show accurate PR states (merged vs closed)
- Handle 5,000 requests/hour instead of 60
- Display proper merged timestamps and details

## Current Status

✅ Enhanced merged PR detection logic implemented  
✅ Rate limit handling and error recovery added  
⏳ **GitHub token setup needed** (this step)
