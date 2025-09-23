"use client";
import React from 'react';
import { Briefcase, Code2, GraduationCap, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
      role: 'Full Stack Engineer',
      company: 'Open Source / Community',
      period: '2024 - Present',
      description: 'Ship production-grade features & performance improvements across React / Node microservices & CI automation.',
      impact: [
        'Optimized bundle & introduced code-splitting reducing initial load ~30%',
        'Implemented PR quality gates (tests + lint) cutting regressions',
        'Led migration toward design system tokens improving UI consistency'
      ],
      tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'CI/CD'],
      type: 'work',
      logo: '🌐'
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Tech Startup',
      period: 'Summer 2024',
      description: 'Owned UI component library & performance uplift initiative.',
      impact: [
        'Refactored legacy CSS to utility-first Tailwind architecture',
        'Improved Lighthouse Performance 72 ➜ 95 & Accessibility 88 ➜ 100',
        'Introduced Storybook driven component documentation'
      ],
      tech: ['React', 'Tailwind', 'Vite', 'Storybook'],
      type: 'internship',
      logo: '⚡'
    },
    {
      role: 'Freelance Developer',
      company: 'Independent',
      period: '2023 - 2024',
      description: 'Delivered SaaS dashboards, landing pages & workflow automations.',
      impact: [
        'Reduced manual ops for a client ~15 hrs/month via automation',
        'Implemented secure Stripe billing & webhook handlers',
        'Delivered multi-tenant RBAC & audit logging'
      ],
      tech: ['Next.js', 'FastAPI', 'Stripe', 'Prisma', 'Docker'],
      type: 'freelance',
      logo: '🛠️'
    },
    {
      role: 'Computer Science (B.Tech)',
      company: 'Academic',
      period: '2021 - 2025',
      description: 'Foundations in algorithms, data structures, distributed systems & software engineering.',
      impact: [
        'Built capstone full‑stack project applying microservice principles',
        'Hackathon finalist – rapid prototype delivery under 24h',
        'Active peer mentor for data structure labs'
      ],
      tech: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
      type: 'education',
      logo: '🎓'
    }
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
                    {item.logo ? <span className="select-none" aria-hidden>{item.logo}</span> : <Icon className="h-5 w-5" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                      <h3 className="font-medium text-sm md:text-base leading-snug">{item.role}</h3>
                      <span className="text-[10px] rounded-md bg-primary/10 text-primary px-2 py-0.5 tracking-wide font-medium border border-primary/15 uppercase">{item.company}</span>
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
