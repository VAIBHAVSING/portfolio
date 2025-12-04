"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  GitPullRequest,
  Star,
  GitMerge,
  OctagonX,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useContributions } from "@/components/ui/contributions-context";
import Image from "next/image";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [7, "d"],
    [4.34524, "w"],
    [12, "mo"],
  ];
  let count = seconds;
  let unit = "s";
  for (let i = 0; i < intervals.length; i++) {
    const [divisor, label] = intervals[i];
    if (count < divisor) {
      unit = label;
      break;
    }
    count = Math.floor(count / divisor);
    unit = label;
  }
  if (unit === "s" && count < 60) return `${count}s ago`;
  const labelMap: Record<string, string> = {
    s: "s",
    m: "m",
    h: "h",
    d: "d",
    w: "w",
    mo: "mo",
  };
  return `${count}${labelMap[unit] || unit} ago`;
}

interface ContributionItem {
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

// Accept no props currently; explicit type = {} is unnecessary and flagged by lint.
type OpenSourceSectionProps = Record<string, never>;

export function OpenSourceSection({}: OpenSourceSectionProps) {
  const { contributions, loading } = useContributions();
  const [visibleCount, setVisibleCount] = useState(10); // initial slice
  const [stars, setStars] = useState<number>(0); // optional future: compute total stars across repos (needs extra fetch)
  const [filter, setFilter] = useState<"all" | "open" | "merged" | "closed">(
    "all",
  );
  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  // restore persisted filters
  useEffect(() => {
    try {
      const persisted = localStorage.getItem("oss-filters");
      if (persisted) {
        const { filter: pf, orgFilter: po, search: ps } = JSON.parse(persisted);
        if (pf) setFilter(pf);
        if (po) setOrgFilter(po);
        if (typeof ps === "string") setSearch(ps);
      }
    } catch {}
  }, []);

  // persist filters
  useEffect(() => {
    const payload = { filter, orgFilter, search };
    try {
      localStorage.setItem("oss-filters", JSON.stringify(payload));
    } catch {}
  }, [filter, orgFilter, search]);
  const loadMore = () => {
    setVisibleCount((c) => c + 10);
  };

  const stateColor = (s: ContributionItem["state"]) =>
    s === "open"
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
      : s === "merged"
        ? "text-violet-400 bg-violet-400/10 border-violet-400/20"
        : "text-red-400 bg-red-400/10 border-red-400/20";

  const prs = useMemo(() => contributions, [contributions]);
  const orgs = useMemo(() => {
    const s = new Set<string>();
    prs.forEach((pr) => {
      const org = pr.repo.split("/")[0];
      if (org) s.add(org);
    });
    return Array.from(s).sort();
  }, [prs]);

  const filtered = useMemo(
    () =>
      prs.filter((pr) => {
        if (filter !== "all" && pr.state !== filter) return false;
        if (orgFilter !== "all" && !pr.repo.startsWith(orgFilter + "/"))
          return false;
        if (search) {
          const q = search.toLowerCase();
          if (
            !pr.title.toLowerCase().includes(q) &&
            !pr.repo.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      }),
    [prs, filter, orgFilter, search],
  );

  const langColor = (lang?: string) => {
    if (!lang) return "bg-zinc-500";
    const map: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      Python: "bg-green-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-500",
      Java: "bg-red-500",
      "C++": "bg-indigo-500",
    };
    return map[lang] || "bg-zinc-500";
  };

  const SkeletonCard = () => (
    <div className="animate-pulse rounded-xl border bg-card/30 p-5 backdrop-blur-sm">
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-40 rounded bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-4 h-2 w-full rounded bg-muted" />
    </div>
  );

  return (
    <section id="oss" className="py-28 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.15),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.12),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent">
            Open Source Impact
          </h2>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-6 rounded-full border border-border/60 bg-card/40 px-6 py-3 text-sm backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <strong>{stars}</strong>{" "}
              <span className="text-muted-foreground">stars</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-primary" />
              <strong>{prs.length}</strong>{" "}
              <span className="text-muted-foreground">PRs</span>
            </span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Status Filters with Icons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {(["all", "open", "merged", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 border backdrop-blur-sm transition-all text-sm font-medium",
                  filter === f
                    ? f === "open"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/20"
                      : f === "merged"
                        ? "bg-violet-500/20 text-violet-400 border-violet-500/40 shadow-lg shadow-violet-500/20"
                        : f === "closed"
                          ? "bg-red-500/20 text-red-400 border-red-500/40 shadow-lg shadow-red-500/20"
                          : "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-card/30 hover:bg-card/50 border-border/60 text-muted-foreground hover:border-primary/30",
                )}
              >
                {f === "open" ? (
                  <GitPullRequest className="h-4 w-4" />
                ) : f === "merged" ? (
                  <GitMerge className="h-4 w-4" />
                ) : f === "closed" ? (
                  <OctagonX className="h-4 w-4" />
                ) : (
                  <GitPullRequest className="h-4 w-4" />
                )}
                <span className="capitalize">{f}</span>
              </button>
            ))}
          </div>

          {/* Organization Filters with GitHub Icon */}
          {orgs.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setOrgFilter("all")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 border text-xs font-medium transition-all",
                  orgFilter === "all"
                    ? "bg-[#24292e] text-white border-[#24292e] shadow-lg shadow-[#24292e]/30"
                    : "bg-card/30 hover:bg-card/50 border-border/60 text-muted-foreground hover:border-[#24292e]/40",
                )}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                All Organizations
              </button>
              {orgs.map((org) => (
                <button
                  key={org}
                  onClick={() => setOrgFilter(org)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 border text-xs font-medium transition-all",
                    orgFilter === org
                      ? "bg-[#24292e] text-white border-[#24292e] shadow-lg shadow-[#24292e]/30"
                      : "bg-card/30 hover:bg-card/50 border-border/60 text-muted-foreground hover:border-[#24292e]/40",
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  {org}
                </button>
              ))}
            </div>
          )}

          {/* Search Bar */}
          <div className="flex justify-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or repo..."
              className="w-full max-w-md rounded-full bg-card/40 backdrop-blur-sm border border-border/60 px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
            />
          </div>
        </div>
        {loading && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground border rounded-md p-6 bg-card/40 backdrop-blur-sm">
            No pull requests for this filter.
          </p>
        )}
        {!loading && filtered.length > 0 && (
          <div
            className="rounded-xl border border-border/60 overflow-hidden bg-card/40 backdrop-blur-sm"
            role="table"
            aria-label="Open source pull requests"
          >
            <div
              className="hidden md:grid grid-cols-12 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground/70 px-4 py-2 border-b border-border/60 bg-background/40"
              role="row"
            >
              <div className="col-span-5">Title & Repository</div>
              <div className="col-span-2">State</div>
              <div className="col-span-2">Activity</div>
              <div className="col-span-1">Lang</div>
              <div className="col-span-2">Changes</div>
            </div>
            <ul className="divide-y divide-border/60" role="rowgroup">
              {filtered.slice(0, visibleCount).map((pr) => {
                const createdDate = new Date(pr.created);
                const date = createdDate.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                const rel = timeAgo(createdDate);
                return (
                  <li key={pr.url} className="group" role="row">
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="grid md:grid-cols-12 gap-4 px-4 py-4 md:items-start hover:bg-background/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-none"
                      role="gridcell"
                    >
                      <div className="md:col-span-5 flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                              stateColor(pr.state),
                            )}
                          >
                            {pr.state === "merged" ? (
                              <GitMerge className="h-3 w-3" />
                            ) : pr.state === "closed" ? (
                              <OctagonX className="h-3 w-3" />
                            ) : (
                              <GitPullRequest className="h-3 w-3" />
                            )}
                            {pr.state}
                          </span>
                          <span className="text-[11px] font-mono text-muted-foreground truncate">
                            {pr.repo}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium leading-snug group-hover:text-primary transition-colors truncate">
                          {pr.title}
                        </h3>
                        {pr.labels && pr.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pr.labels.map((l) => (
                              <span
                                key={l.name}
                                className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                                style={{
                                  backgroundColor: "#" + l.color + "22",
                                  color: "#" + l.color,
                                }}
                              >
                                {l.name}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="md:hidden flex flex-wrap gap-3 text-[11px] text-muted-foreground/80">
                          <span>#{pr.number}</span>
                          <span title={date}>{rel}</span>
                          {typeof pr.comments === "number" && (
                            <span>💬 {pr.comments}</span>
                          )}
                        </div>
                      </div>
                      <div className="hidden md:flex md:col-span-2 items-center gap-3">
                        <div className="h-8 w-8 rounded-lg overflow-hidden ring-1 ring-border bg-muted flex items-center justify-center">
                          {pr.ownerAvatar ? (
                            <Image
                              src={pr.ownerAvatar}
                              alt={pr.repo}
                              width={32}
                              height={32}
                              sizes="32px"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-muted-foreground">
                              ORG
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground font-mono truncate">
                          #{pr.number}
                        </span>
                      </div>
                      <div className="hidden md:flex md:col-span-2 flex-col text-[11px] text-muted-foreground/80 gap-1">
                        <span title={date}>{rel}</span>
                        {typeof pr.comments === "number" && (
                          <span>💬 {pr.comments}</span>
                        )}
                      </div>
                      <div className="hidden md:flex md:col-span-1 items-center text-[11px] text-muted-foreground/80">
                        {pr.language && (
                          <span className="inline-flex items-center gap-1">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                langColor(pr.language),
                              )}
                            />
                            {pr.language}
                          </span>
                        )}
                      </div>
                      <div className="hidden md:flex md:col-span-2 items-center gap-3 text-[11px]">
                        {typeof pr.additions === "number" && (
                          <span className="text-emerald-400">
                            +{pr.additions}
                          </span>
                        )}
                        {typeof pr.deletions === "number" && (
                          <span className="text-red-400">-{pr.deletions}</span>
                        )}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {!loading && filtered.length > visibleCount && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-medium border backdrop-blur-sm transition-colors flex items-center gap-2 bg-primary text-primary-foreground border-primary hover:brightness-110",
              )}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
