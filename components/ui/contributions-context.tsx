"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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

interface StaticContributionsResponse {
  contributions?: ContributionRecord[];
}

interface ContributionsApiResponse {
  data?: ContributionRecord[];
}

const cacheContributions = (data: ContributionRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {}
};

const readCachedContributions = (): ContributionRecord[] | null => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    if (
      parsed.ts &&
      Date.now() - parsed.ts < TTL_MS &&
      Array.isArray(parsed.data)
    ) {
      return parsed.data as ContributionRecord[];
    }
  } catch {}
  return null;
};

const loadStaticContributions = async (): Promise<
  ContributionRecord[] | null
> => {
  try {
    const res = await fetch("/data/contributions.json", {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const staticData = (await res.json()) as StaticContributionsResponse;
    return Array.isArray(staticData.contributions) &&
      staticData.contributions.length
      ? staticData.contributions
      : null;
  } catch {
    return null;
  }
};

export function ContributionsProvider({
  children,
}: {
  username?: string;
  children: React.ReactNode;
}) {
  const [contributions, setContributions] = useState<ContributionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadFromApi = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch("/api/contributions", { cache: "no-store" });
      const json = (await res.json()) as ContributionsApiResponse;
      const data = Array.isArray(json.data) ? json.data : [];
      setContributions(data);
      cacheContributions(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch contributions",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const cached = readCachedContributions();
      if (cached) {
        setContributions(cached);
        setLoading(false);
        return;
      }

      const staticData = await loadStaticContributions();
      if (cancelled) return;
      if (staticData) {
        setContributions(staticData);
        cacheContributions(staticData);
        setLoading(false);
        return;
      }

      await loadFromApi();
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [loadFromApi]);

  return (
    <ContributionsContext.Provider
      value={{ contributions, loading, error, refresh: loadFromApi }}
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
