import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ContributionData {
  repo: string;
  title: string;
  url: string;
  state: 'open' | 'closed' | 'merged';
  created: string;
  number: number;
  comments: number;
  additions?: number;
  deletions?: number;
  language?: string;
  ownerAvatar?: string;
  labels: Array<{ name: string; color: string }>;
}

interface CachedContributionsData {
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
  contributions: ContributionData[];
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function loadContributionsFromCache(): CachedContributionsData | null {
  try {
    const cacheFilePath = path.join(process.cwd(), 'public', 'data', 'contributions.json');
    
    if (!fs.existsSync(cacheFilePath)) {
      console.warn('Cache file not found. Run: npm run update-contributions-cache');
      return null;
    }
    
    const cacheContent = fs.readFileSync(cacheFilePath, 'utf-8');
    const cacheData: CachedContributionsData = JSON.parse(cacheContent);
    
    const cacheAge = Date.now() - new Date(cacheData.generated).getTime();
    const isCacheFresh = cacheAge < CACHE_TTL_MS;
    
    console.log(`Loaded cache with ${cacheData.total} contributions`);
    console.log(`Cache age: ${Math.round(cacheAge / (1000 * 60))} minutes (fresh: ${isCacheFresh})`);
    
    if (!isCacheFresh) {
      console.warn('Cache is stale. Consider running: npm run update-contributions-cache');
    }
    
    return cacheData;
    
  } catch (error) {
    console.error('Failed to load contributions cache:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();
  
  try {
    console.log('API: Loading contributions from cache...');
    
    const cacheData = loadContributionsFromCache();
    
    if (!cacheData) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cache not available',
          message: 'Contributions cache not found. Please run the cache generation script.',
          hint: 'Run: npm run update-contributions-cache'
        },
        { status: 503 }
      );
    }
    
    const sortedContributions = [...cacheData.contributions].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    
    const response = {
      success: true,
      cached: true,
      data: sortedContributions,
      count: cacheData.total,
      timestamp: Date.now(),
      metadata: {
        generated: cacheData.generated,
        username: cacheData.username,
        totalFetched: cacheData.total,
        apiCallsUsed: cacheData.apiCallsUsed,
        rateLimit: cacheData.rateLimit,
        breakdown: cacheData.breakdown,
        cacheAge: Date.now() - new Date(cacheData.generated).getTime(),
        processingTime: Date.now() - startTime
      }
    };
    
    console.log(`API: Served ${cacheData.total} contributions from cache in ${Date.now() - startTime}ms`);
    console.log(`Breakdown: ${cacheData.breakdown.merged} merged, ${cacheData.breakdown.open} open, ${cacheData.breakdown.closed} closed`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
