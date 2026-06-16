"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedDate: string;
  readTime?: string;
  tags?: string[];
  platform: "Medium" | "Dev.to" | "Personal Blog";
}

interface WritingSectionAutoProps {
  username?: string;
  limit?: number;
  fallbackArticles?: readonly {
    id: string;
    title: string;
    excerpt: string;
    url: string;
    publishedDate: string;
    readTime?: string;
    tags?: readonly string[];
    platform: "Medium" | "Dev.to" | "Personal Blog";
  }[];
}

// Medium icon SVG component
const MediumIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

export const WritingSectionAuto: React.FC<WritingSectionAutoProps> = ({
  username = "vpatil5212",
  limit = 10,
  fallbackArticles = [],
}) => {
  const hasFallbackArticles = fallbackArticles.length > 0;
  const [articles, setArticles] = useState<Article[]>(
    fallbackArticles.map((a) => ({ ...a, tags: a.tags ? [...a.tags] : [] })),
  );
  const [loading, setLoading] = useState(!hasFallbackArticles);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchArticles = async () => {
      try {
        if (!hasFallbackArticles) setLoading(true);
        const response = await fetch(
          `/api/medium?username=${username}&limit=${limit}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();

        if (cancelled) return;

        if (data.success && data.articles.length > 0) {
          setArticles(data.articles);
        } else if (fallbackArticles.length > 0) {
          setArticles(
            fallbackArticles.map((a) => ({
              ...a,
              tags: a.tags ? [...a.tags] : [],
            })),
          );
        }
      } catch (err) {
        console.error("Error fetching Medium articles:", err);
        setError("Failed to load articles");
        if (fallbackArticles.length > 0) {
          setArticles(
            fallbackArticles.map((a) => ({
              ...a,
              tags: a.tags ? [...a.tags] : [],
            })),
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (hasFallbackArticles && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(fetchArticles, {
        timeout: 4000,
      });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(
      fetchArticles,
      hasFallbackArticles ? 1500 : 0,
    );
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [username, limit, fallbackArticles, hasFallbackArticles]);

  // Loading state with skeleton embeds
  if (loading) {
    return (
      <section
        id="writing"
        className="relative w-full py-20 px-6 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ab6c]/10 border border-[#00ab6c]/20 mb-6">
              <MediumIcon className="w-4 h-4 text-[#00ab6c]" />
              <span className="text-sm font-medium text-[#00ab6c]">
                Medium Articles
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              Writing & Insights
            </h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse border border-border rounded-lg p-4"
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="h-4 bg-muted/50 rounded w-1/4 mb-3" />
                    <div className="h-5 bg-muted/50 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted/50 rounded w-full" />
                  </div>
                  <div className="w-24 h-24 bg-muted/50 rounded shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && articles.length === 0) {
    return null;
  }

  if (articles.length === 0) return null;

  return (
    <section
      id="writing"
      className="relative w-full py-20 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ab6c]/10 border border-[#00ab6c]/20 mb-6">
            <MediumIcon className="w-4 h-4 text-[#00ab6c]" />
            <span className="text-sm font-medium text-[#00ab6c]">
              Medium Articles
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Writing & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge and experiences from my journey in software
            development
          </p>
        </div>

        {/* Articles as Embedded Cards */}
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleEmbed key={article.id} article={article} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href={`https://medium.com/@${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#00ab6c] text-white rounded-full font-medium hover:bg-[#00ab6c]/90 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            View All on Medium
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Medium-style Embed Card Component
const ArticleEmbed: React.FC<{ article: Article }> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="relative border border-border rounded-lg overflow-hidden bg-card hover:border-[#00ab6c]/50 hover:shadow-md transition-all duration-200">
        {/* Main Content */}
        <div className="p-4 sm:p-5">
          <div className="flex gap-4">
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              {/* Platform & Meta */}
              <div className="flex items-center gap-2 mb-2">
                <MediumIcon className="w-4 h-4 text-[#00ab6c]" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(article.publishedDate)}
                </span>
                {article.readTime && (
                  <>
                    <span className="text-muted-foreground/50">·</span>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-foreground group-hover:text-[#00ab6c] transition-colors text-base sm:text-lg leading-snug mb-2 line-clamp-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">
                {article.excerpt}
              </p>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail placeholder with Medium branding */}
            <div className="shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-md bg-gradient-to-br from-[#00ab6c]/20 to-[#00ab6c]/5 flex items-center justify-center border border-[#00ab6c]/10">
              <MediumIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#00ab6c]/40" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 sm:px-5 py-3 bg-muted/30 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#00ab6c] flex items-center justify-center">
              <MediumIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Read on Medium
            </span>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#00ab6c] transition-colors" />
        </div>
      </article>
    </a>
  );
};
