"use client";

import React from "react";
import { GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  EDUCATION as DEFAULT_EDUCATION,
  type EducationItem,
} from "@/lib/personal-data";

interface EducationSectionProps {
  items?: ReadonlyArray<EducationItem>;
}

const isLogoAsset = (value?: string) =>
  !!value && (/^https?:\/\//.test(value) || value.startsWith("/"));

export function EducationSection({
  items = DEFAULT_EDUCATION,
}: EducationSectionProps) {
  return (
    <section id="education" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            Academic Background
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Education
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            A snapshot of formal learning that complements my hands-on engineering work.
          </p>
        </div>

        <div className="space-y-5">
          {items.map((item, idx) => {
            const highlightAchievements = item.achievements?.slice(0, 3);
            const highlightCoursework = item.coursework?.slice(0, 6);

            return (
              <motion.article
                key={`${item.institution}-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm/0 hover:border-primary/40 hover:shadow-sm transition-colors"
              >
                <div className="flex flex-col gap-5">
                  <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                        {isLogoAsset(item.logo) ? (
                          <Image
                            src={item.logo as string}
                            alt={item.institution}
                            width={40}
                            height={40}
                            className="h-8 w-8 object-contain"
                          />
                        ) : item.logo ? (
                          <span className="text-lg select-none" aria-hidden>
                            {item.logo}
                          </span>
                        ) : (
                          <GraduationCap className="h-5 w-5" />
                        )}
                      </span>

                      <div>
                        <h3 className="font-medium text-base md:text-lg leading-snug text-foreground">
                          {item.degree}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium text-primary/80">
                            {item.institution}
                          </span>
                          {item.location && <span>• {item.location}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 rounded-md border border-border/80 px-2 py-1 uppercase tracking-wide">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </span>
                      {item.gpa && (
                        <span className="rounded-md bg-emerald-500/10 px-2 py-1 font-medium text-emerald-600 dark:text-emerald-400">
                          GPA {item.gpa}
                        </span>
                      )}
                    </div>
                  </header>

                  {item.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  {highlightAchievements && highlightAchievements.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-muted-foreground/90">
                      {highlightAchievements.map((achievement) => (
                        <li key={achievement} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {highlightCoursework && highlightCoursework.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {highlightCoursework.map((course) => (
                        <span
                          key={course}
                          className="text-[11px] tracking-wide rounded-md px-2 py-0.5 bg-muted text-foreground/70"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}