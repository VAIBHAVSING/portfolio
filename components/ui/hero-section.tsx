"use client";

import React from "react";

interface HeroSectionProps {
  titleLine1: string;
  titleLine2Gradient: string;
  subtitle: string;
  primaryButton: {
    label: string;
    onClick: () => void;
  };
  secondaryButton: {
    label: string;
    onClick: () => void;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  titleLine1,
  titleLine2Gradient,
  subtitle,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Floating elements for modern look */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-primary/30 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-32 w-2 h-2 bg-primary/20 rounded-sm transform rotate-45 animate-pulse delay-300"></div>
      <div className="absolute top-40 right-16 w-1 h-6 bg-primary/40 animate-pulse delay-500"></div>
      <div className="absolute top-48 right-24 w-4 h-1 bg-primary/25 animate-pulse delay-700"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <h1 className="md:text-6xl lg:text-7xl leading-[1.1] font-sans text-5xl font-light text-foreground tracking-tight mb-4">
            {titleLine1}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent block tracking-tight">
              {titleLine2Gradient}
            </span>
          </h1>
          <p className="md:text-xl max-w-3xl leading-relaxed font-sans text-lg font-light text-muted-foreground mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={primaryButton.onClick}
            className="group bg-primary hover:bg-primary/90 px-6 py-3 text-primary-foreground rounded-lg font-medium text-sm min-w-[160px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {primaryButton.label}
          </button>
          <button
            onClick={secondaryButton.onClick}
            className="group bg-card/50 backdrop-blur-sm hover:bg-card/70 min-w-[160px] font-sans text-sm font-medium text-foreground rounded-lg px-6 py-3 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {secondaryButton.label}
          </button>
        </div>
      </div>

    </section>
  );
};
