"use client";

import React from 'react';
import { ProjectsSection } from "@/components/ui/projects-section";
import { SkillsSection } from "@/components/ui/skills-section";
import MacOSDock from "@/components/ui/mac-dock";
import { BackgroundComponent } from "@/components/ui/background-component";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { GitHubEvents } from "@/components/ui/github-events";
// Removed Logos3 from hero position; replaced with HeroTechStack
import { HeroTechStack } from "@/components/ui/hero-tech-stack";
import { ExperienceSection } from "@/components/ui/experience-section";
import { OpenSourceSection } from "@/components/ui/open-source-section";
import { TopSkillsBar } from "@/components/ui/top-skills-bar";
import { TechStackSection } from "@/components/ui/tech-stack-section";
import { ScheduleCallSection } from "@/components/ui/schedule-call";


// Portfolio data
const portfolioData = {
  projects: [
    {
      title: 'AI-Powered Code Review Tool',
      description: 'An intelligent code review assistant that uses machine learning to identify potential bugs and suggest improvements in real-time.',
      tags: ['Python', 'Machine Learning', 'OpenAI', 'FastAPI'],
      imageContent: <div className="text-2xl text-white/50">🤖</div>,
      liveUrl: 'https://example.com/code-review',
      githubUrl: 'https://github.com/VAIBHAVSING/code-review-ai',
      highlight: 'ML + AI'
    },
    {
      title: 'Real-time Collaboration Platform',
      description: 'A web-based platform for real-time collaborative coding and project management, featuring live editing and video conferencing.',
      tags: ['React', 'Node.js', 'Socket.io', 'WebRTC'],
      imageContent: <div className="text-2xl text-white/50">⚡</div>,
      liveUrl: 'https://example.com/collab',
      githubUrl: 'https://github.com/VAIBHAVSING/realtime-collab',
      highlight: 'Realtime'
    },
    {
      title: 'Open Source UI Component Library',
      description: 'A comprehensive React component library with 50+ customizable components, used by developers worldwide.',
      tags: ['React', 'TypeScript', 'Storybook', 'Rollup'],
      imageContent: <div className="text-2xl text-white/50">🎨</div>,
      liveUrl: 'https://example.com/ui-kit',
      githubUrl: 'https://github.com/VAIBHAVSING/ui-component-lib',
      highlight: 'Library'
    },
  ],
  stats: [
    { value: '50+', label: 'Open Source Contributions' },
    { value: '15+', label: 'Projects Completed' },
    { value: '1000+', label: 'GitHub Stars' },
  ],
  dockItems: [
    {
      name: 'About',
      icon: '/home.webp',
      onClick: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }
    },
    // {
    //   name: 'Experience',
    //   icon: '/projects.webp',
    //   onClick: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }
    // },
    {
      name: 'Projects',
      icon: '/projects.webp',
      onClick: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }
    },
    // {
    //   name: 'Stack',
    //   icon: '/skills.webp',
    //   onClick: () => { document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }); }
    // },
    {
      name: 'Skills',
      icon: '/skills.webp',
      onClick: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }
    },
    // {
    //   name: 'OSS',
    //   icon: '/github.webp',
    //   onClick: () => { document.getElementById('oss')?.scrollIntoView({ behavior: 'smooth' }); }
    // },
    {
      name: 'Contact',
      icon: '/email.webp',
      onClick: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }
    },
    {
      name: 'GitHub',
      icon: '/github.webp',
      onClick: () => { window.open('https://github.com/VAIBHAVSING', '_blank'); }
    },
    {
      name: 'LinkedIn',
      icon: '/linkedin.webp',
      onClick: () => { window.open('https://linkedin.com/in/vaibhavsingh', '_blank'); }
    },
    // email handled by Contact section / scheduling
    {
      name: 'Resume',
      icon: '/resume.webp',
      onClick: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Vaibhav_Singh_Resume.pdf';
        link.click();
      }
    },
  ],
};

export default function Home() {
  const typewriterWords = [
    {
      text: "Open",
    },
    {
      text: "Source",
    },
    {
      text: "Contributor",
    },
    {
      text: "&",
    },
    {
      text: "Software",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Engineer",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <BackgroundComponent>
      <div className="relative z-10">
        {/* GitHub Events - Notification system at bottom right */}
        <div className="fixed bottom-6 right-6 z-[100]">
          <GitHubEvents />
        </div>

        {/* New Hero Section with Typewriter Effect */}
        <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-6 overflow-hidden">
          <div className="max-w-[80%] mx-auto text-center relative z-10">
            {/* Avatar */}
            <div className="mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="/avatar.webp"
                  alt="Vaibhav Singh"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <div className="mb-2">
              <h1 className="text-3xl md:text-5xl font-light text-foreground mb-2 font-sans tracking-tight">
                Hi, I'm <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-semibold">Vaibhav Singh</span>
              </h1>
            </div>

            {/* Typewriter Effect */}
            <div className="mb-9 flex justify-center">
              <TypewriterEffectSmooth words={typewriterWords} />
            </div>

            <HeroTechStack  />
            <div className="mb-10"></div>
            {/* Description */}
            <div className="mb-8">
              <p className="text-lg md:text-xl max-w-3xl leading-relaxed font-sans text-muted-foreground mx-auto">
                I build innovative solutions and contribute to open source projects. Currently pursuing Computer Science while creating impactful software that makes a difference.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group bg-primary hover:bg-primary/90 px-6 py-3 text-primary-foreground rounded-lg font-medium text-sm min-w-[160px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                View My Work
              </button>
              <button
                onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group bg-card/50 backdrop-blur-sm hover:bg-card/70 min-w-[160px] font-sans text-sm font-medium text-foreground rounded-lg px-6 py-3 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Schedule a Call
              </button>
            </div>
          </div>

          {/* Bottom floating elements */}
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary/20 rounded-full animate-pulse delay-1300"></div>
          <div className="absolute bottom-40 left-16 w-1 h-4 bg-primary/40 animate-pulse delay-1500"></div>
        </section>

  {/* (Former carousel removed to emphasize concise hero tech stack) */}

  {/* Detailed Tech Stack Section */}
  <TechStackSection />

  {/* Experience Section */}
  <ExperienceSection />

  {/* Projects Section */}
  <ProjectsSection projects={portfolioData.projects} />

  {/* Open Source */}
  <OpenSourceSection />

  <ScheduleCallSection />
      </div>

      {/* Mac Dock */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <MacOSDock
          apps={portfolioData.dockItems.map(item => ({
            id: item.name.toLowerCase(),
            name: item.name,
            icon: item.icon
          }))}
          onAppClick={(appId) => {
            const item = portfolioData.dockItems.find(item => item.name.toLowerCase() === appId);
            if (item?.onClick) item.onClick();
          }}
          openApps={['about']}
        />
      </div>
    </BackgroundComponent>
  );
}
