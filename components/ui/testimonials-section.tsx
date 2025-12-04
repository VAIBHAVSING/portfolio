"use client";

import React, { useState } from "react";
import { Card } from "./card";
import { Quote, Star, ChevronDown, ChevronUp } from "lucide-react";

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

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Star className="w-4 h-4 text-primary fill-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Recommendations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-900">
            Trusted feedback from colleagues, mentors, and collaborators I have
            had the privilege to work with
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="animate-in fade-in slide-in-from-bottom-6 duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Improved Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textLength = testimonial.text.length;
  const shouldTruncate = textLength > 200;

  return (
    <Card className="group relative h-full bg-gradient-to-br from-card to-card/80 border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6 flex flex-col h-full">
        {/* Quote Icon with animation */}
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Quote className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Testimonial Text with expand/collapse */}
        <blockquote className="flex-grow mb-6">
          <p
            className={`text-foreground/90 leading-relaxed text-xl font-bold transition-all duration-300 ${
              !isExpanded && shouldTruncate ? "line-clamp-4" : ""
            }`}
          >
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-primary hover:text-primary/80 text-xs font-medium inline-flex items-center gap-1 transition-colors"
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

        {/* Rating Stars with animation
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div> */}

        {/* Author Section */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-3">
            {/* Avatar with hover effect */}
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-lg group-hover:scale-105 transition-transform duration-300 shadow-md">
                {testimonial.name.charAt(0)}
              </div>
            )}

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors duration-300">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {testimonial.title+" "+testimonial.company}
              </p>
            </div>

            {/* LinkedIn Link with improved design */}
            {testimonial.linkedinUrl && (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-9 h-9 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-md"
                aria-label={`View ${testimonial.name}'s LinkedIn`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>

          {/* Relationship badge with improved styling */}
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full font-medium border border-primary/20">
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
