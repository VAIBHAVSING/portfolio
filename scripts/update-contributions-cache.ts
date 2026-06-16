#!/usr/bin/env ts-node
/*
  Script: update-contributions-cache.ts
  Purpose: Pre-fetch GitHub PR contributions using GitHub SDK and produce a static JSON cache
  Usage: pnpm ts-node scripts/update-contributions-cache.ts
  Requires: GITHUB_TOKEN (recommended) and optional GITHUB_USERNAME
*/
import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";

interface ContributionRecord {
  repo: string;
  title: string;
  url: string;
  state: "open" | "closed" | "merged";
  created: string;
  number: number;
  comments?: number;
  additions?: number;
  deletions?: number;
  language?: string;
  ownerAvatar?: string;
  labels?: { name: string; color: string }[];
}

interface CacheOutput {
  generated: string;
  username: string;
  total: number;
  apiCallsUsed: number;
  rateLimit: {
    remaining: number;
    reset: string;
  };
  breakdown: {
    open: number;
    merged: number;
    closed: number;
  };
  contributions: ContributionRecord[];
}

interface GitHubSearchPullRequestItem {
  repository_url: string;
  html_url: string;
  title: string;
  state: "open" | "closed";
  created_at: string;
  comments?: number;
  labels?: { name?: string; color?: string }[];
  pull_request?: {
    merged_at?: string | null;
  };
}

const USERNAME = process.env.GITHUB_USERNAME || "VAIBHAVSING";
const TOKEN = process.env.GITHUB_TOKEN;
const MAX_RESULTS = 150;
const BATCH_SIZE = 10;

console.log(`🚀 GitHub Contributions Cache Script`);
console.log(`👤 Username: ${USERNAME}`);
console.log(
  `🔑 Token: ${TOKEN ? "✅ Configured" : "❌ Not set (rate limited)"}`,
);

// Initialize Octokit
const octokit = TOKEN
  ? new Octokit({ auth: TOKEN, userAgent: "portfolio-cache-script/1.0" })
  : new Octokit({ userAgent: "portfolio-cache-script/1.0" });

async function getOrganizationAvatar(
  owner: string,
): Promise<string | undefined> {
  try {
    // Try to get organization info first
    const orgResponse = await octokit.rest.orgs.get({ org: owner });
    return orgResponse.data.avatar_url;
  } catch {
    // If not an org, try to get user info
    try {
      const userResponse = await octokit.rest.users.getByUsername({
        username: owner,
      });
      return userResponse.data.avatar_url;
    } catch {
      console.warn(`⚠️  Failed to get avatar for ${owner}`);
      return undefined;
    }
  }
}

async function fetchAllPRs(): Promise<{
  prs: GitHubSearchPullRequestItem[];
  apiCalls: number;
}> {
  let allPRs: GitHubSearchPullRequestItem[] = [];
  let apiCalls = 0;

  console.log(`🔍 Fetching PRs for ${USERNAME}...`);

  const searchQuery = `author:${USERNAME} type:pr`;
  const perPage = 50;
  const maxPages = Math.ceil(MAX_RESULTS / perPage);

  for (let page = 1; page <= maxPages; page++) {
    console.log(`📄 Fetching page ${page}/${maxPages}...`);

    try {
      const response = await octokit.rest.search.issuesAndPullRequests({
        q: searchQuery,
        sort: "created",
        order: "desc",
        per_page: perPage,
        page: page,
      });

      apiCalls++;
      const items = response.data.items as GitHubSearchPullRequestItem[];

      if (!items || items.length === 0) {
        console.log(`✅ No more results on page ${page}`);
        break;
      }

      allPRs.push(...items);
      console.log(
        `📦 Found ${items.length} PRs on page ${page} (total: ${allPRs.length})`,
      );

      if (allPRs.length >= MAX_RESULTS || items.length < perPage) {
        break;
      }
    } catch (error) {
      console.error(`❌ Failed to fetch page ${page}:`, error);
      break;
    }
  }

  if (allPRs.length > MAX_RESULTS) {
    allPRs = allPRs.slice(0, MAX_RESULTS);
    console.log(`✂️  Trimmed to ${MAX_RESULTS} results`);
  }

  return { prs: allPRs, apiCalls };
}

async function enrichPRDetails(
  prItems: GitHubSearchPullRequestItem[],
): Promise<{ results: ContributionRecord[]; apiCalls: number }> {
  const results: ContributionRecord[] = [];
  let apiCalls = 0;

  console.log(
    `🔄 Enriching ${prItems.length} PRs in batches of ${BATCH_SIZE}...`,
  );

  for (let i = 0; i < prItems.length; i += BATCH_SIZE) {
    const batch = prItems.slice(i, i + BATCH_SIZE);
    console.log(
      `📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(prItems.length / BATCH_SIZE)}`,
    );

    for (const prItem of batch) {
      try {
        const repoFullName = prItem.repository_url.replace(
          "https://api.github.com/repos/",
          "",
        );
        const [owner, repo] = repoFullName.split("/");
        const prNumberMatch = prItem.html_url.match(/pull\/(\d+)/);
        const prNumber = prNumberMatch ? parseInt(prNumberMatch[1], 10) : 0;

        // Check if PR was merged using search API data first
        const isMerged = prItem.pull_request?.merged_at != null;

        const record: ContributionRecord = {
          repo: repoFullName,
          title: prItem.title,
          url: prItem.html_url,
          state:
            prItem.state === "open" ? "open" : isMerged ? "merged" : "closed",
          created: prItem.created_at,
          number: prNumber,
          comments: prItem.comments || 0,
          labels: Array.isArray(prItem.labels)
            ? prItem.labels
                .slice(0, 4)
                .map((l) => ({ name: l.name || "", color: l.color || "" }))
            : [],
        };

        // Get detailed PR information (fallback for additional data)
        if (prNumber > 0 && owner && repo) {
          try {
            const prResponse = await octokit.rest.pulls.get({
              owner,
              repo,
              pull_number: prNumber,
            });

            apiCalls++;
            const prDetails = prResponse.data;

            // Override with more accurate data from PR details API
            if (prDetails.merged === true) {
              record.state = "merged";
            } else if (prDetails.state === "open") {
              record.state = "open";
            } else {
              record.state = "closed";
            }

            record.additions = prDetails.additions || 0;
            record.deletions = prDetails.deletions || 0;
            record.language = prDetails.base?.repo?.language || undefined;
            record.ownerAvatar =
              prDetails.base?.repo?.owner?.avatar_url || undefined;

            // If avatar is still not available, try organization API
            if (!record.ownerAvatar && owner) {
              try {
                record.ownerAvatar = await getOrganizationAvatar(owner);
                apiCalls++;
              } catch {
                // Keep undefined if we can't get it
              }
            }

            console.log(
              `✅ ${repoFullName}#${prNumber} is ${record.state.toUpperCase()}`,
            );
          } catch (detailError) {
            // For enterprise repos with token restrictions, use search API data
            console.warn(
              `⚠️  Failed to get details for ${repoFullName}#${prNumber}, using search data:`,
              detailError instanceof Error
                ? detailError.message
                : "Unknown error",
            );

            // Use what we can from the search API
            if (isMerged) {
              record.state = "merged";
              console.log(
                `✅ ${repoFullName}#${prNumber} is MERGED (from search API)`,
              );
            } else {
              console.log(
                `📝 ${repoFullName}#${prNumber} is ${record.state.toUpperCase()} (from search API)`,
              );
            }

            // Try to get repository info for avatar (this might work even if PR details don't)
            try {
              const repoResponse = await octokit.rest.repos.get({
                owner,
                repo,
              });
              apiCalls++;
              record.language = repoResponse.data.language || undefined;
              record.ownerAvatar =
                repoResponse.data.owner.avatar_url || undefined;
            } catch {
              // If repo info also fails, try to get organization/user avatar directly
              try {
                record.ownerAvatar = await getOrganizationAvatar(owner);
                apiCalls++; // Count the org/user API call
              } catch {
                record.ownerAvatar = undefined;
              }
              record.language = undefined;
            }
          }
        }

        results.push(record);
      } catch (error) {
        console.error(`❌ Failed to process PR:`, error);
      }
    }

    // Small delay between batches
    if (i + BATCH_SIZE < prItems.length) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  return { results, apiCalls };
}

async function main() {
  let totalApiCalls = 0;
  let rateLimit = { remaining: 0, reset: new Date() };

  try {
    // Get rate limit info
    if (TOKEN) {
      try {
        const rateLimitResponse = await octokit.rest.rateLimit.get();
        totalApiCalls++;
        rateLimit = {
          remaining: rateLimitResponse.data.rate.remaining,
          reset: new Date(rateLimitResponse.data.rate.reset * 1000),
        };
        console.log(`📊 Rate limit: ${rateLimit.remaining} requests remaining`);
      } catch {
        console.warn("⚠️  Failed to get rate limit info");
      }
    }

    // Fetch all PRs
    const { prs, apiCalls: searchCalls } = await fetchAllPRs();
    totalApiCalls += searchCalls;

    if (prs.length === 0) {
      console.log("📭 No PRs found");
      return;
    }

    // Enrich with details
    const { results, apiCalls: detailCalls } = await enrichPRDetails(prs);
    totalApiCalls += detailCalls;

    // Filter out closed PRs - only keep open and merged
    const filteredResults = results.filter((r) => r.state !== "closed");

    // Sort by creation date
    filteredResults.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );

    // Calculate breakdown
    const breakdown = {
      open: filteredResults.filter((r) => r.state === "open").length,
      merged: filteredResults.filter((r) => r.state === "merged").length,
      closed: 0, // We filtered these out
    };

    // Create output
    const output: CacheOutput = {
      generated: new Date().toISOString(),
      username: USERNAME,
      total: filteredResults.length,
      apiCallsUsed: totalApiCalls,
      rateLimit: {
        remaining: rateLimit.remaining,
        reset: rateLimit.reset.toISOString(),
      },
      breakdown,
      contributions: filteredResults,
    };

    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), "public", "data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write cache file
    const outputPath = path.join(outputDir, "contributions.json");
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(
      `✅ Success! Generated cache with ${results.length} contributions`,
    );
    console.log(
      `📊 Breakdown: ${breakdown.merged} merged, ${breakdown.open} open, ${breakdown.closed} closed`,
    );
    console.log(`🔥 API calls used: ${totalApiCalls}`);
    console.log(`💾 Cache saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to generate cache:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
