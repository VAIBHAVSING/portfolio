#!/usr/bin/env ts-node
/*
  Script: update-contributions-async function fetchAllPRs(): Promise<{ prs: any[], apiCalls: number }> {
  let allPRs: any[] = [];
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
        sort: 'created',
        order: 'desc',
        per_page: perPage,
        page: page
      });
      
      apiCalls++;
      const items = response.data.items;
      
      if (!items || items.length === 0) {
        console.log(`✅ No more results on page ${page}`);
        break;
      }
      
      allPRs.push(...items);
      console.log(`📦 Found ${items.length} PRs on page ${page} (total: ${allPRs.length})`);
      
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

async function enrichPRDetails(prItems: any[]): Promise<{ results: ContributionRecord[], apiCalls: number }> {
  const results: ContributionRecord[] = [];
  let apiCalls = 0;
  
  console.log(`🔄 Enriching ${prItems.length} PRs in batches of ${BATCH_SIZE}...`);
  
  for (let i = 0; i < prItems.length; i += BATCH_SIZE) {
    const batch = prItems.slice(i, i + BATCH_SIZE);
    console.log(`📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(prItems.length / BATCH_SIZE)}`);
    
    for (const prItem of batch) {
      try {
        const repoFullName = prItem.repository_url.replace('https://api.github.com/repos/', '');
        const [owner, repo] = repoFullName.split('/');
        const prNumberMatch = prItem.html_url.match(/pull\/(\d+)/);
        const prNumber = prNumberMatch ? parseInt(prNumberMatch[1], 10) : 0;
        
        let record: ContributionRecord = {
          repo: repoFullName,
          title: prItem.title,
          url: prItem.html_url,
          state: prItem.state === 'open' ? 'open' : 'closed',
          created: prItem.created_at,
          number: prNumber,
          comments: prItem.comments || 0,
          labels: Array.isArray(prItem.labels) 
            ? prItem.labels.slice(0, 4).map((l: any) => ({ name: l.name, color: l.color }))
            : []
        };

        // Get detailed PR information
        if (prNumber > 0 && owner && repo) {
          try {
            const prResponse = await octokit.rest.pulls.get({
              owner,
              repo,
              pull_number: prNumber
            });
            
            apiCalls++;
            const prDetails = prResponse.data;
            
            // The key fix: proper merged detection
            if (prDetails.merged === true) {
              record.state = 'merged';
              console.log(`✅ ${repoFullName}#${prNumber} is MERGED`);
            } else if (prDetails.state === 'open') {
              record.state = 'open';
            } else {
              record.state = 'closed';
            }
            
            record.additions = prDetails.additions || 0;
            record.deletions = prDetails.deletions || 0;
            record.language = prDetails.base?.repo?.language || undefined;
            record.ownerAvatar = prDetails.base?.repo?.owner?.avatar_url || undefined;
            
          } catch (detailError) {
            console.warn(`⚠️  Failed to get details for ${repoFullName}#${prNumber}:`, 
                        detailError instanceof Error ? detailError.message : 'Unknown error');
          }
        }

        results.push(record);
        
      } catch (error) {
        console.error(`❌ Failed to process PR:`, error);
      }
    }
    
    // Small delay between batches
    if (i + BATCH_SIZE < prItems.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
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
          reset: new Date(rateLimitResponse.data.rate.reset * 1000)
        };
        console.log(`📊 Rate limit: ${rateLimit.remaining} requests remaining`);
      } catch (error) {
        console.warn('⚠️  Failed to get rate limit info');
      }
    }
    
    // Fetch all PRs
    const { prs, apiCalls: searchCalls } = await fetchAllPRs();
    totalApiCalls += searchCalls;
    
    if (prs.length === 0) {
      console.log('📭 No PRs found');
      return;
    }
    
    // Enrich with details
    const { results, apiCalls: detailCalls } = await enrichPRDetails(prs);
    totalApiCalls += detailCalls;
    
    // Sort by creation date
    results.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    
    // Calculate breakdown
    const breakdown = {
      open: results.filter(r => r.state === 'open').length,
      merged: results.filter(r => r.state === 'merged').length,
      closed: results.filter(r => r.state === 'closed').length
    };
    
    // Create output
    const output: CacheOutput = {
      generated: new Date().toISOString(),
      username: USERNAME,
      total: results.length,
      apiCallsUsed: totalApiCalls,
      rateLimit: {
        remaining: rateLimit.remaining,
        reset: rateLimit.reset.toISOString()
      },
      breakdown,
      contributions: results
    };
    
    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write cache file
    const outputPath = path.join(outputDir, 'contributions.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    
    console.log(`✅ Success! Generated cache with ${results.length} contributions`);
    console.log(`📊 Breakdown: ${breakdown.merged} merged, ${breakdown.open} open, ${breakdown.closed} closed`);
    console.log(`🔥 API calls used: ${totalApiCalls}`);
    console.log(`💾 Cache saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Failed to generate cache:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}rpose: Pre-fetch GitHub PR contributions using GitHub SDK and produce a static JSON cache
  Usage: pnpm ts-node scripts/update-contributions-cache.ts
  Requires: GITHUB_TOKEN (recommended) and optional GITHUB_USERNAME
*/
import fs from 'fs';
import path from 'path';
import { Octokit } from '@octokit/rest';

interface ContributionRecord {
  repo: string;
  title: string;
  url: string;
  state: 'open' | 'closed' | 'merged';
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

const USERNAME = process.env.GITHUB_USERNAME || 'VAIBHAVSING';
const TOKEN = process.env.GITHUB_TOKEN;
const MAX_RESULTS = 150;
const BATCH_SIZE = 10;

console.log(`🚀 GitHub Contributions Cache Script`);
console.log(`👤 Username: ${USERNAME}`);
console.log(`🔑 Token: ${TOKEN ? '✅ Configured' : '❌ Not set (rate limited)'}`);

// Initialize Octokit
const octokit = TOKEN 
  ? new Octokit({ auth: TOKEN, userAgent: 'portfolio-cache-script/1.0' })
  : new Octokit({ userAgent: 'portfolio-cache-script/1.0' });

async function fetchSearchPages(): Promise<any[]> {
  const perPage = 50;
  const maxPages = 3;
  const all: any[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(`author:${USERNAME} type:pr`)}&sort=created&order=desc&per_page=${perPage}&page=${page}`;
    const data = await safeFetch(url);
    if (!data.items || data.items.length === 0) break;
    all.push(...data.items);
    if (data.items.length < perPage) break;
  }
  return all;
}

async function enrich(raw: any[]): Promise<ContributionRecord[]> {
  const results: ContributionRecord[] = [];
  for (const pr of raw) {
    const repoFull = pr.repository_url.replace('https://api.github.com/repos/', '');
    const prNumMatch = pr.html_url.match(/pull\/(\d+)/);
    const prNumber = prNumMatch ? parseInt(prNumMatch[1], 10) : 0;
    let details: any = {};
    let merged = false;
    
    try {
      if (pr.state !== 'open') {
        const prResp = await fetch(`https://api.github.com/repos/${repoFull}/pulls/${prNumber}`, { headers: headers() });
        if (prResp.ok) {
          details = await prResp.json();
          // Check both merged_at and merged boolean fields
          if (details.merged_at || details.merged === true) {
            merged = true;
          }
        }
      }
    } catch (e: any) {
      console.warn(`Failed to fetch PR details for ${repoFull}#${prNumber}:`, e.message);
    }
    
    // Always double-check merge endpoint for closed PRs if not already marked as merged
    if (pr.state === 'closed' && !merged) {
      try {
        const mergeResp = await fetch(`https://api.github.com/repos/${repoFull}/pulls/${prNumber}/merge`, { headers: headers() });
        if (mergeResp.status === 204) {
          merged = true;
          console.log(`PR ${repoFull}#${prNumber} confirmed merged via merge endpoint`);
        }
      } catch (e: any) {
        console.warn(`Failed to check merge status for ${repoFull}#${prNumber}:`, e.message);
      }
    }
    
    results.push({
      repo: repoFull,
      title: pr.title,
      url: pr.html_url,
      state: pr.state === 'open' ? 'open' : (merged ? 'merged' : 'closed'),
      created: pr.created_at,
      number: prNumber,
      comments: pr.comments,
      additions: details.additions,
      deletions: details.deletions,
      language: details.base?.repo?.language,
      ownerAvatar: details.base?.repo?.owner?.avatar_url,
      labels: Array.isArray(pr.labels) ? pr.labels.slice(0,4).map((l: any) => ({ name: l.name, color: l.color })) : []
    });
  }
  return results;
}

async function main() {
  try {
    console.log(`[cache] Fetching contributions for ${USERNAME}`);
    const raw = await fetchSearchPages();
    const enriched = await enrich(raw);
    const outPath = path.join(process.cwd(), 'public', 'data', 'contributions.json');
    const payload = { generatedAt: Date.now(), contributions: enriched };
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
    console.log(`[cache] Wrote ${enriched.length} contributions to ${outPath}`);
  } catch (e: any) {
    console.error('[cache] Failed:', e.message);
    process.exitCode = 1;
  }
}

main();
