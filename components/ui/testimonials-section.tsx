"use client";

import React, { useState } from "react";
import { Card } from "./card";
import { Quote, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  text: string;
  avatar?: string;
  linkedinUrl?: string;
}

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[];
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  if (testimonials.length === 0) return null;

  return (
    <section
      className="relative w-full py-28 px-6 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(244,114,182,0.12),transparent_55%)]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Recommendations
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
          >
            What People Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Trusted feedback from colleagues, mentors, and collaborators I have
            had the privilege to work with
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textLength = testimonial.text.length;
  const shouldTruncate = textLength > 200;

  return (
    <Card className="group relative h-full bg-card/40 backdrop-blur-sm border border-border/40 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6 flex flex-col h-full">
        {/* Quote Icon */}
        <div className="mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
            <Quote className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Testimonial Text */}
        <blockquote className="flex-grow mb-6">
          <p
            className={`text-foreground/90 leading-relaxed text-base transition-all duration-300 ${
              !isExpanded && shouldTruncate ? "line-clamp-4" : ""
            }`}
          >
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-primary hover:text-primary/80 text-xs font-medium inline-flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </blockquote>

        {/* Author Section */}
        <div className="pt-5 border-t border-border/30">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover border border-border/40 group-hover:border-primary/30 transition-all duration-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-lg group-hover:scale-105 transition-transform duration-300 shadow-lg">
                {testimonial.name.charAt(0)}
              </div>
            )}

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors duration-300">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {testimonial.title} @ {testimonial.company}
              </p>
            </div>

            {/* LinkedIn Link */}
            {testimonial.linkedinUrl && (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-9 h-9 rounded-lg bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center text-[#0077b5] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 hover:scale-110"
                aria-label={`View ${testimonial.name}'s LinkedIn`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>

          {/* Relationship badge */}
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-primary/80 bg-primary/5 px-3 py-1.5 rounded-lg font-medium border border-primary/10">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {testimonial.relationship}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
