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

export function EducationSection({
  items = DEFAULT_EDUCATION,
}: EducationSectionProps) {
  return (
    <section className="py-28 relative">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_70%_25%,rgba(120,119,198,0.12),transparent_55%),radial-gradient(circle_at_30%_70%,rgba(56,189,248,0.10),transparent_55%)]" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Academic Background
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent"
          >
            Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto"
          >
            A snapshot of formal learning that complements my hands-on engineering work
          </motion.p>
        </div>

        {/* Education Cards */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, idx) => {
            const highlightAchievements = item.achievements?.slice(0, 3);
            const highlightCoursework = item.coursework?.slice(0, 6);

            return (
              <motion.article
                key={`${item.institution}-${idx}`}
                variants={cardVariants}
                className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 md:p-7 hover:border-primary/40 transition-all duration-300 group overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border glow */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

                <div className="relative flex flex-col gap-5">
                  <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary ring-1 ring-inset ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all duration-300">
                        {isLogoAsset(item.logo) ? (
                          <Image
                            src={item.logo as string}
                            alt={item.institution}
                            width={40}
                            height={40}
                            className="h-8 w-8 object-contain"
                          />
                        ) : item.logo ? (
                          <span className="text-xl select-none" aria-hidden>
                            {item.logo}
                          </span>
                        ) : (
                          <GraduationCap className="h-5 w-5" />
                        )}
                      </span>

                      <div>
                        <h3 className="font-semibold text-base md:text-lg leading-snug text-foreground group-hover:text-primary transition-colors duration-300">
                          {item.degree}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-primary/80">
                            {item.institution}
                          </span>
                          {item.location && <span>• {item.location}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 px-3 py-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </span>
                    </div>
                  </header>

                  {item.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  {highlightAchievements && highlightAchievements.length > 0 && (
                    <ul className="space-y-2 text-sm text-muted-foreground/90">
                      {highlightAchievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-primary/60 shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {highlightCoursework && highlightCoursework.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {highlightCoursework.map((course) => (
                        <span
                          key={course}
                          className="text-[11px] tracking-wide rounded-lg px-2.5 py-1.5 bg-background/50 text-foreground/80 border border-border/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium"
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
        </motion.div>
      </div>
    </section>
  );
}
