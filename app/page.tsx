import React from "react";
import { ProjectsSection } from "@/components/ui/projects-section";
import { BackgroundComponent } from "@/components/ui/background-component";
import { GitHubEvents } from "@/components/ui/github-events";
import { LandingHero } from "@/components/ui/landing-hero";
import { DockWrapper } from "@/components/ui/dock-wrapper";
import { ExperienceSection } from "@/components/ui/experience-section";
import { EducationSection } from "@/components/ui/education-section";
import { OpenSourceSection } from "@/components/ui/open-source-section";
import { TechStackSection } from "@/components/ui/tech-stack-section";
import { ScheduleCallSection } from "@/components/ui/schedule-call";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { WritingSectionAuto } from "@/components/ui/writing-section-auto";
import { SectionObserver } from "@/components/ui/section-observer";
import {
  PERSONAL_INFO,
  PROJECTS,
  EDUCATION,
  TESTIMONIALS,
  ARTICLES,
} from "@/lib/personal-data";
import { GithubShowcase } from "@/components/ui/GithubShowcase";

// Derived project objects enriched for UI (map static PROJECTS to expected shape)
const mappedProjects = PROJECTS.map((p) => ({
  title: p.title,
  description: p.description,
  // Spread to ensure mutable array type if consumer expects string[]
  tags: [...p.tags],
  imageContent: (
    <div className="text-2xl text-white/50" aria-hidden>
      {p.icon}
    </div>
  ),
  liveUrl: p.liveUrl,
  githubUrl: p.githubUrl,
  highlight: p.highlight,
}));

// Dock items require client behavior; we keep data static and handle runtime actions inline below.

export default function Home() {
  // All words pulled from central data for consistency
  const typewriterWords = PERSONAL_INFO.headlineWords.map((w) => ({ ...w }));

  return (
    <BackgroundComponent>
      {/* Section Observer - Updates URL hash on scroll */}
      <SectionObserver
        sectionIds={[
          "about",
          "skills",
          "experience",
          "education",
          "oss",
          "projects",
          "writing",
          "testimonials",
          "contact",
        ]}
      />

      <div className="relative z-10 space-y-10 ">
        {/* GitHub Events - Notification system at bottom right */}
        <div className="fixed bottom-4 right-4 z-[100]">
          <GitHubEvents />
        </div>

        {/* New Hero Section with Typewriter Effect */}
        <LandingHero words={typewriterWords} />

        {/* (Former carousel removed to emphasize concise hero tech stack) */}

        {/* Detailed Tech Stack Section */}
        <div id="stack" className="px-6">
          <TechStackSection />
        </div>

        {/* Experience Section */}
        <div id="experience" className="px-6">
          <ExperienceSection />
        </div>

        {/* Education Section */}
        <div id="education" className="px-6">
          <EducationSection items={EDUCATION} />
        </div>

        {/* Open Source */}
        <div id="oss" className="px-6">
          <OpenSourceSection />
        </div>

        {/* Projects Section */}
        <div id="projects" className="px-6">
          <ProjectsSection projects={mappedProjects} />
          <GithubShowcase />
        </div>

        {/* Writing Section - Automatically fetches from Medium RSS */}
        <div id="writing" className="px-6">
          <WritingSectionAuto
            username="vpatil5212"
            limit={10}
            fallbackArticles={ARTICLES}
          />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="px-6">
          <TestimonialsSection testimonials={TESTIMONIALS} />
        </div>

        <div id="contact" className="px-6">
          <ScheduleCallSection />
        </div>
      </div>

      {/* Mac Dock */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <DockWrapper />
      </div>
    </BackgroundComponent>
  );
}
