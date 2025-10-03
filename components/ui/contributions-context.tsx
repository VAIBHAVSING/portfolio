"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export interface ContributionRecord {
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

interface ContributionsContextValue {
  contributions: ContributionRecord[];
  loading: boolean;
  error?: string;
  refresh: () => Promise<void>;
}

const ContributionsContext = createContext<
  ContributionsContextValue | undefined
>(undefined);

// TTL 30 minutes
const TTL_MS = 30 * 60 * 1000;
const STORAGE_KEY = "all-contributions-cache-v1";

interface GitHubLabel {
  name: string;
  color: string;
}
interface GitHubSearchItem {
  repository_url: string;
  html_url: string;
  title: string;
  state: string; // open | closed
  created_at: string;
  comments?: number;
  labels?: GitHubLabel[];
}
interface GitHubSearchResponse {
  items?: GitHubSearchItem[];
}
interface GitHubPRDetails {
  additions?: number;
  deletions?: number;
  merged_at?: string;
  base?: { repo?: { language?: string; owner?: { avatar_url?: string } } };
}

async function fetchAllPRsDirect(
  username: string,
): Promise<ContributionRecord[]> {
  const perPage = 50;
  const maxPages = 3;
  const all: GitHubSearchItem[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const search = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(`author:${username} type:pr`)}&sort=created&order=desc&per_page=${perPage}&page=${page}`,
    );
    const data: GitHubSearchResponse = await search.json();
    if (!Array.isArray(data.items)) break;
    all.push(...data.items);
    if (data.items.length < perPage) break;
  }
  const results: ContributionRecord[] = [];
  const batchSize = 10;
  for (let i = 0; i < all.length; i += batchSize) {
    const slice = all.slice(i, i + batchSize);
    const enriched = await Promise.all(
      slice.map(async (pr): Promise<ContributionRecord | null> => {
        try {
          const repoFull = pr.repository_url.replace(
            "https://api.github.com/repos/",
            "",
          );
          const prNumMatch = pr.html_url.match(/pull\/(\d+)/);
          const prNumber = prNumMatch ? parseInt(prNumMatch[1], 10) : 0;
          let details: GitHubPRDetails = {};
          try {
            const prResp = await fetch(
              `https://api.github.com/repos/${repoFull}/pulls/${prNumber}`,
              { headers: { Accept: "application/vnd.github+json" } },
            );
            if (prResp.ok) details = (await prResp.json()) as GitHubPRDetails;
          } catch {}
          let merged = false;
          if (pr.state === "open") merged = false;
          else if (details.merged_at) merged = true;
          else if (pr.state === "closed") {
            try {
              const mergeResp = await fetch(
                `https://api.github.com/repos/${repoFull}/pulls/${prNumber}/merge`,
                { headers: { Accept: "application/vnd.github+json" } },
              );
              if (mergeResp.status === 204) merged = true;
            } catch {}
          }
          return {
            repo: repoFull,
            title: pr.title,
            url: pr.html_url,
            state: pr.state === "open" ? "open" : merged ? "merged" : "closed",
            created: pr.created_at,
            number: prNumber,
            comments: pr.comments,
            additions: details.additions,
            deletions: details.deletions,
            language: details.base?.repo?.language,
            ownerAvatar: details.base?.repo?.owner?.avatar_url,
            labels: Array.isArray(pr.labels)
              ? pr.labels
                  .slice(0, 4)
                  .map((l) => ({ name: l.name, color: l.color }))
              : [],
          };
        } catch {
          return null;
        }
      }),
    );
    results.push(
      ...enriched.filter((r): r is ContributionRecord => r !== null),
    );
  }
  return results;
}

async function fetchAllPRs(username: string): Promise<ContributionRecord[]> {
  // Try internal API route first (server-side token & caching)
  try {
    const res = await fetch(`/api/contributions`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data as ContributionRecord[];
    } else {
      // If server returns 500 with fallback data
      const json = await res.json().catch(() => ({}));
      if (Array.isArray(json.data) && json.data.length) return json.data;
    }
  } catch {}
  // fallback direct client fetch (may be rate limited)
  return fetchAllPRsDirect(username);
}

export function ContributionsProvider({
  username = "VAIBHAVSING",
  children,
}: {
  username?: string;
  children: React.ReactNode;
}) {
  const [contributions, setContributions] = useState<ContributionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await fetchAllPRs(username);
      setContributions(data);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), data }),
        );
      } catch {}
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch contributions",
      );
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    // Attempt to hydrate from cache
    try {
      // 1. Static build-time cache (if present)
      fetch("/data/contributions.json", { cache: "no-cache" })
        .then((r) => (r.ok ? r.json() : null))
        .then((staticData) => {
          if (
            staticData &&
            Array.isArray(staticData.contributions) &&
            staticData.contributions.length
          ) {
            setContributions(staticData.contributions as ContributionRecord[]);
            setLoading(false);
            // still proceed to background fresh load
            load();
          }
        })
        .catch(() => {});
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (
          parsed.ts &&
          Date.now() - parsed.ts < TTL_MS &&
          Array.isArray(parsed.data)
        ) {
          setContributions(parsed.data);
          setLoading(false);
          // Background refresh (non-blocking)
          load();
          return;
        }
      }
    } catch {}
    load();
  }, [load]);

  return (
    <ContributionsContext.Provider
      value={{ contributions, loading, error, refresh: load }}
    >
      {children}
    </ContributionsContext.Provider>
  );
}

export function useContributions() {
  const ctx = useContext(ContributionsContext);
  if (!ctx)
    throw new Error(
      "useContributions must be used within ContributionsProvider",
    );
  return ctx;
}
