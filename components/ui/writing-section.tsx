"use client";

import React from "react";
import { Card } from "./card";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedDate: string;
  readTime?: string;
  tags?: readonly string[];
  platform: "Medium" | "Dev.to" | "Personal Blog";
}

interface WritingSectionProps {
  articles: readonly Article[];
}

export const WritingSection: React.FC<WritingSectionProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <section
      id="writing"
      className="relative w-full py-20 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Writing & Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge, insights, and experiences from my journey in
            software development
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden"
            >
              {/* Platform Badge */}
              <div className="px-6 pt-6 pb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {article.platform === "Medium" && (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  )}
                  {article.platform}
                </span>
              </div>

              {/* Article Content */}
              <div className="px-6 pb-6 flex-grow">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(article.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                  {article.readTime && (
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {article.readTime}
                    </span>
                  )}
                </div>

                {/* Read More Link */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                >
                  Read Article
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <a
            href="https://medium.com/@vpatil5212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View All Articles
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
