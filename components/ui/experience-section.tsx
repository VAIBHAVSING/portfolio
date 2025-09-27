"use client";
import React from 'react';
import { Briefcase, Code2, GraduationCap, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  impact?: string[]; // bullet points of achievements
  tech: string[];
  type?: 'work' | 'freelance' | 'internship' | 'education';
  location?: string;
  logo?: string; // image path or emoji fallback
}

interface ExperienceSectionProps {
  items?: ExperienceItem[];
}

export function ExperienceSection({
  items = [
    {
      role: 'Open Source Developer',
      company: 'Open Source / Community',
      period: '2024 - Present',
      description: 'Ship production-grade features & performance improvements across React / Node microservices & CI automation.',
      impact: [
        'Optimized bundle & introduced code-splitting reducing initial load ~30%',
        'Implemented PR quality gates (tests + lint) cutting regressions',
      ],
      tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'CI/CD','Github-Action','Python'],
      type: 'work',
      logo: '🌐'
    },
    {
      role: 'Software Engineering Intern',
      company: 'Lingo.dev[YC-F24]',
      period: 'July-25 Aug-25',
      description: 'Owned UI component library & performance uplift initiative.',
      impact: [
        'Contributed to SDKs and CLI at Lingo.dev, helping developers integrate the platform into their products.',
        'Developed and maintained end-to-end Deno.js SDKs to streamline adoption and usage.',
        'Enhanced tooling and contribution workflows, supporting the open-source community.'
      ],
      tech: ['React', 'Typescript', 'Compiler', 'Cli','SDK', 'Discord'],
      type: 'internship',
      logo: 'https://avatars.githubusercontent.com/u/155387533?v=4'
    },
  ]
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">Experience</h2>
        <div className="space-y-6">
          {items.map((item, idx) => {
            const Icon = item.type === 'education' ? GraduationCap : item.type === 'work' ? Briefcase : item.type === 'internship' ? Zap : Code2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                viewport={{ once: true, margin: '-40px' }}
                className="relative rounded-xl border border-border bg-card p-4 md:p-5 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary text-lg font-semibold">
                    {(() => {
                      const isUrl = (str: string) => /^https?:\/\//.test(str) || str.startsWith('/');
                        return item.logo && isUrl(item.logo) ? (
                        <Image src={item.logo} alt={item.company} width={40} height={40} className="object-contain" />
                        ) : item.logo ? (
                        <span className="select-none" aria-hidden>{item.logo}</span>
                        ) : (
                        <Icon className="h-5 w-5" />
                        );
                    })()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                      <h3 className="font-medium text-sm md:text-base leading-snug">{item.role}</h3>
                      <span className="text-[10px] rounded-md bg-primary/10 text-primary px-2 py-0.5 tracking-wide font-medium border border-primary/15 ">{item.company}</span>
                    </div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">{item.period}</p>
                    <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    {item.impact && (
                      <ul className="mt-3 space-y-1.5 text-[11px] md:text-[12px] leading-snug text-muted-foreground/90">
                        {item.impact.map(point => (
                          <li key={point} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60" /> <span>{point}</span></li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tech.map(t => (
                        <span key={t} className="text-[10px] tracking-wide rounded-md px-2 py-0.5 bg-muted text-foreground/70 font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
