"use client";
import React from "react";
import { Briefcase, Code2, GraduationCap, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  impact?: string[]; // bullet points of achievements
  tech: string[];
  type?: "work" | "freelance" | "internship" | "education";
  location?: string;
  logo?: string; // image path or emoji fallback
}

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ExperienceSection({
  items = [
    {
      role: "Software Engineering Intern",
      company: "Rankad AI",
      period: "Jan 2026 - Apr 2026",
      description:
        "Built AI SEO/GEO optimization infrastructure across analytics integrations, crawler workflows, LLM serving, and database performance.",
      impact: [
        "Built a Google Analytics 4 integration and website crawler to track backlinks across search engines.",
        "Deployed a QLoRA fine-tuned GPT-OSS 120B model on GCP GPU VMs with vLLM, serving 1,000+ tokens/sec.",
        "Reduced PostgreSQL/Supabase query latency from ~1,500ms to ~30ms through indexing and RLS optimization.",
      ],
      tech: [
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Deno",
        "vLLM",
        "QLoRA",
        "AWS Lambda",
        "GCP GPU VMs",
      ],
      type: "internship",
      location: "Remote (Sweden)",
      logo: "⚡",
    },
    {
      role: "Software Engineering Intern",
      company: "Lingo.dev[YC-F24]",
      period: "Jul 2025 - Sep 2025",
      description:
        "Contributed to a 5k+ star open-source i18n platform, improving SDKs, CLI tooling, compiler support, and contributor workflows.",
      impact: [
        "Built SDK and CLI features that improved developer workflows for localization and translation.",
        "Fixed compiler bugs and added EJS file support plus OpenRouter provider integration.",
        "Reviewed PRs and helped onboard new open-source contributors.",
      ],
      tech: ["TypeScript", "Deno", "Compiler", "CLI", "SDK", "Open Source"],
      type: "internship",
      logo: "https://avatars.githubusercontent.com/u/155387533?v=4",
    },
    {
      role: "Open Source Contributor",
      company: "90+ merged PRs",
      period: "2024 - Present",
      description:
        "Ship developer-tooling features, performance improvements, CI workflows, and integrations across open-source projects.",
      impact: [
        "Helped Coasts.dev (YC F25) ship remote runtime support for Codex/Claude Code workflows on VM resources.",
        "Shipped HumanLayer UI improvements, including editor-opening actions and web search result theming fixes.",
        "Added a WhatsApp MCP client for Klavis-AI and converted Traceroot-AI REST endpoints to async FastAPI.",
      ],
      tech: [
        "TypeScript",
        "React",
        "FastAPI",
        "Rust",
        "CI/CD",
        "Playwright",
        "Open Source",
      ],
      type: "work",
      logo: "🌐",
    },
  ],
}: ExperienceSectionProps) {
  return (
    <section className="py-28 relative">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_25%_30%,rgba(120,119,198,0.12),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(56,189,248,0.10),transparent_55%)]" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Work History
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto"
          >
            Building impactful products and contributing to the open source ecosystem
          </motion.p>
        </div>

        {/* Experience Cards */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, idx) => {
            const Icon =
              item.type === "education"
                ? GraduationCap
                : item.type === "work"
                  ? Briefcase
                  : item.type === "internship"
                    ? Zap
                    : Code2;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-5 md:p-6 hover:border-primary/40 transition-all duration-300 group overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border glow */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

                <div className="relative flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary ring-1 ring-inset ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all duration-300">
                    {(() => {
                      const isUrl = (str: string) =>
                        /^https?:\/\//.test(str) || str.startsWith("/");
                      return item.logo && isUrl(item.logo) ? (
                        <Image
                          src={item.logo}
                          alt={item.company}
                          width={40}
                          height={40}
                          className="object-contain rounded-lg"
                        />
                      ) : item.logo ? (
                        <span className="select-none text-xl" aria-hidden>
                          {item.logo}
                        </span>
                      ) : (
                        <Icon className="h-5 w-5" />
                      );
                    })()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <h3 className="font-semibold text-base md:text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                        {item.role}
                      </h3>
                      <span className="text-xs rounded-lg bg-primary/10 text-primary px-3 py-1 tracking-wide font-medium border border-primary/20">
                        {item.company}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      {item.period}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    {item.impact && (
                      <ul className="mt-4 space-y-2 text-sm leading-snug text-muted-foreground/90">
                        {item.impact.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-primary/60 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] tracking-wide rounded-lg px-2.5 py-1.5 bg-background/50 text-foreground/80 border border-border/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
