"use client";

import React from "react";

interface Stat {
  value: string;
  label: string;
}

interface SkillsSectionProps {
  stats: Stat[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ stats }) => {
  return (
    <section id="skills" className="w-full py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 font-sans">
            By the{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Key metrics that showcase my journey and impact in software
            development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-card/20 backdrop-blur-sm border border-border/30 rounded-2xl p-8 text-center hover:bg-card/40 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-primary/30"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-light text-foreground mb-3 font-sans tracking-tight group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-base font-sans font-medium group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional skills showcase */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-light text-foreground mb-8 font-sans">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Expertise
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Python",
              "Machine Learning",
              "PostgreSQL",
              "MongoDB",
              "AWS",
              "Docker",
              "Git",
              "GraphQL",
            ].map((skill, index) => (
              <span
                key={skill}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium font-sans hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
