"use client";
import React from "react";
import Image from "next/image";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HeroTechStack } from "@/components/ui/hero-tech-stack";
import { PERSONAL_INFO } from "@/lib/personal-data";

interface LandingHeroProps {
  words: { text: string; className?: string }[];
}
export const LandingHero: React.FC<LandingHeroProps> = ({ words }) => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 md:py-20 overflow-hidden"
    >
      <div className="max-w-[80%] mx-auto text-center relative z-10">
        <div className="mb-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
            <Image
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-light text-foreground mb-2 font-sans tracking-tight">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-semibold">
              {PERSONAL_INFO.name}
            </span>
          </h1>
        </div>
        <div className="mb-9 flex justify-center">
          <TypewriterEffectSmooth words={words} />
        </div>
        <HeroTechStack />
        <div className="mb-10" />
        <div className="mb-8">
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed font-sans text-muted-foreground mx-auto">
            {PERSONAL_INFO.bio}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group bg-primary hover:bg-primary/90 px-6 py-3 text-primary-foreground rounded-lg font-medium text-sm min-w-[160px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View My Work
          </button>
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group bg-card/50 backdrop-blur-sm hover:bg-card/70 min-w-[160px] font-sans text-sm font-medium text-foreground rounded-lg px-6 py-3 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
};
