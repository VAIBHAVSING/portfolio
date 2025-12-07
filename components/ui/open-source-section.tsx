"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  GitPullRequest,
  Star,
  GitMerge,
  OctagonX,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useContributions } from "@/components/ui/contributions-context";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

interface RepoGroup {
  repoName: string;
  ownerAvatar?: string;
  language?: string;
  prs: ContributionItem[];
  mergedCount: number;
  openCount: number;
  closedCount: number;
  totalAdditions: number;
  totalDeletions: number;
}

type OpenSourceSectionProps = Record<string, never>;

export function OpenSourceSection({}: OpenSourceSectionProps) {
  const { contributions, loading } = useContributions();
  const [expandedRepos, setExpandedRepos] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "open" | "merged" | "closed">("all");
  const [search, setSearch] = useState("");

  // restore persisted filters
  useEffect(() => {
    try {
      const persisted = localStorage.getItem("oss-filters-v2");
      if (persisted) {
        const { filter: pf, search: ps } = JSON.parse(persisted);
        if (pf) setFilter(pf);
        if (typeof ps === "string") setSearch(ps);
      }
    } catch {}
  }, []);

  // persist filters
  useEffect(() => {
    const payload = { filter, search };
    try {
      localStorage.setItem("oss-filters-v2", JSON.stringify(payload));
    } catch {}
  }, [filter, search]);

  const toggleRepo = (repoName: string) => {
    setExpandedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(repoName)) {
        next.delete(repoName);
      } else {
        next.add(repoName);
      }
      return next;
    });
  };

  const stateColor = (s: ContributionItem["state"]) =>
    s === "open"
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
      : s === "merged"
        ? "text-violet-400 bg-violet-400/10 border-violet-400/30"
        : "text-red-400 bg-red-400/10 border-red-400/30";

  const stateIcon = (s: ContributionItem["state"]) => {
    if (s === "merged") return <GitMerge className="h-3.5 w-3.5" />;
    if (s === "closed") return <OctagonX className="h-3.5 w-3.5" />;
    return <GitPullRequest className="h-3.5 w-3.5" />;
  };

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

  // Group PRs by repository
  const repoGroups = useMemo(() => {
    const groups = new Map<string, RepoGroup>();

    contributions.forEach((pr) => {
      if (!groups.has(pr.repo)) {
        groups.set(pr.repo, {
          repoName: pr.repo,
          ownerAvatar: pr.ownerAvatar,
          language: pr.language,
          prs: [],
          mergedCount: 0,
          openCount: 0,
          closedCount: 0,
          totalAdditions: 0,
          totalDeletions: 0,
        });
      }
      const group = groups.get(pr.repo)!;
      group.prs.push(pr);
      if (pr.state === "merged") group.mergedCount++;
      else if (pr.state === "open") group.openCount++;
      else group.closedCount++;
      group.totalAdditions += pr.additions || 0;
      group.totalDeletions += pr.deletions || 0;
      if (!group.ownerAvatar && pr.ownerAvatar) group.ownerAvatar = pr.ownerAvatar;
      if (!group.language && pr.language) group.language = pr.language;
    });

    // Sort groups by total PR count (most active first)
    return Array.from(groups.values()).sort((a, b) => b.prs.length - a.prs.length);
  }, [contributions]);

  // Filter groups based on search and state filter
  const filteredGroups = useMemo(() => {
    return repoGroups
      .map((group) => {
        const filteredPrs = group.prs.filter((pr) => {
          if (filter !== "all" && pr.state !== filter) return false;
          if (search) {
            const q = search.toLowerCase();
            if (!pr.title.toLowerCase().includes(q) && !pr.repo.toLowerCase().includes(q)) {
              return false;
            }
          }
          return true;
        });
        return { ...group, prs: filteredPrs };
      })
      .filter((group) => group.prs.length > 0);
  }, [repoGroups, filter, search]);

  const totalPRs = contributions.length;
  const totalMerged = contributions.filter((p) => p.state === "merged").length;
  const totalRepos = repoGroups.length;

  const SkeletonCard = () => (
    <div className="animate-pulse rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-48 rounded bg-muted" />
          <div className="h-3 w-32 rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-6 w-20 rounded-full bg-muted" />
        <div className="h-6 w-20 rounded-full bg-muted" />
      </div>
    </div>
  );

  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.15),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.12),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent">
            Open Source Impact
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Contributing to the open source ecosystem, one pull request at a time.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
          <div className="text-center p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary">{totalPRs}</div>
            <div className="text-xs text-muted-foreground mt-1">Pull Requests</div>
          </div>
          <div className="text-center p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-violet-400">{totalMerged}</div>
            <div className="text-xs text-muted-foreground mt-1">Merged</div>
          </div>
          <div className="text-center p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-emerald-400">{totalRepos}</div>
            <div className="text-xs text-muted-foreground mt-1">Repositories</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(["all", "merged", "open", "closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 border backdrop-blur-sm transition-all text-sm font-medium",
                  filter === f
                    ? f === "open"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                      : f === "merged"
                        ? "bg-violet-500/20 text-violet-400 border-violet-500/40 shadow-lg shadow-violet-500/10"
                        : f === "closed"
                          ? "bg-red-500/20 text-red-400 border-red-500/40 shadow-lg shadow-red-500/10"
                          : "bg-primary/20 text-primary border-primary/40 shadow-lg shadow-primary/10"
                    : "bg-card/30 hover:bg-card/50 border-border/60 text-muted-foreground hover:border-primary/30"
                )}
              >
                {f === "open" ? (
                  <GitPullRequest className="h-4 w-4" />
                ) : f === "merged" ? (
                  <GitMerge className="h-4 w-4" />
                ) : f === "closed" ? (
                  <OctagonX className="h-4 w-4" />
                ) : (
                  <Star className="h-4 w-4" />
                )}
                <span className="capitalize">{f}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search PRs or repositories..."
              className="w-full max-w-md rounded-full bg-card/40 backdrop-blur-sm border border-border/60 px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredGroups.length === 0 && (
          <div className="text-center py-12 border rounded-2xl bg-card/30 backdrop-blur-sm">
            <GitPullRequest className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No pull requests match your filters.</p>
          </div>
        )}

        {/* Repository Cards */}
        {!loading && filteredGroups.length > 0 && (
          <div className="space-y-4">
            {filteredGroups.map((group) => {
              const isExpanded = expandedRepos.has(group.repoName);
              const visiblePrs = isExpanded ? group.prs : group.prs.slice(0, 3);

              return (
                <motion.div
                  key={group.repoName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors"
                >
                  {/* Repo Header */}
                  <div className="p-5 border-b border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl overflow-hidden ring-1 ring-border/50 bg-muted flex items-center justify-center">
                          {group.ownerAvatar ? (
                            <Image
                              src={group.ownerAvatar}
                              alt={group.repoName}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <a
                            href={`https://github.com/${group.repoName}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            {group.repoName}
                            <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                          </a>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            {group.language && (
                              <span className="flex items-center gap-1.5">
                                <span className={cn("h-2 w-2 rounded-full", langColor(group.language))} />
                                {group.language}
                              </span>
                            )}
                            <span>{group.prs.length} PRs</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats Badges */}
                      <div className="hidden sm:flex items-center gap-2">
                        {group.mergedCount > 0 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            <GitMerge className="h-3 w-3" />
                            {group.mergedCount}
                          </span>
                        )}
                        {group.openCount > 0 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <GitPullRequest className="h-3 w-3" />
                            {group.openCount}
                          </span>
                        )}
                        {(group.totalAdditions > 0 || group.totalDeletions > 0) && (
                          <span className="text-xs text-muted-foreground">
                            <span className="text-emerald-400">+{group.totalAdditions}</span>
                            {" / "}
                            <span className="text-red-400">-{group.totalDeletions}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* PR List */}
                  <div className="divide-y divide-border/20">
                    <AnimatePresence initial={false}>
                      {visiblePrs.map((pr) => {
                        const createdDate = new Date(pr.created);
                        const rel = timeAgo(createdDate);
                        return (
                          <motion.a
                            key={pr.url}
                            href={pr.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start gap-3 p-4 hover:bg-background/30 transition-colors group"
                          >
                            <span className={cn("mt-0.5 p-1.5 rounded-md border", stateColor(pr.state))}>
                              {stateIcon(pr.state)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-1">
                                {pr.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                                <span>#{pr.number}</span>
                                <span>•</span>
                                <span>{rel}</span>
                                {typeof pr.additions === "number" && typeof pr.deletions === "number" && (
                                  <>
                                    <span>•</span>
                                    <span>
                                      <span className="text-emerald-400">+{pr.additions}</span>
                                      {" / "}
                                      <span className="text-red-400">-{pr.deletions}</span>
                                    </span>
                                  </>
                                )}
                              </div>
                              {pr.labels && pr.labels.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {pr.labels.slice(0, 3).map((l) => (
                                    <span
                                      key={l.name}
                                      className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                                      style={{
                                        backgroundColor: "#" + l.color + "20",
                                        color: "#" + l.color,
                                      }}
                                    >
                                      {l.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.a>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Expand/Collapse Button */}
                  {group.prs.length > 3 && (
                    <button
                      onClick={() => toggleRepo(group.repoName)}
                      className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-background/30 transition-colors flex items-center justify-center gap-2 border-t border-border/20"
                    >
                      {isExpanded ? (
                        <>
                          Show less <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show {group.prs.length - 3} more <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
