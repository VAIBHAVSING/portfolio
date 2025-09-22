"use client";

import React from 'react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: React.ReactNode;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="w-full py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 font-sans">
            Featured <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work and open source contributions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-left hover:bg-card/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30"
            >
              {/* Project image/icon */}
              <div className="bg-gradient-to-br from-muted/30 to-muted/60 rounded-xl h-32 mb-6 flex items-center justify-center group-hover:from-muted/50 group-hover:to-muted/70 transition-all duration-500 relative overflow-hidden">
                {project.imageContent}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <h3 className="text-xl font-semibold text-card-foreground mb-3 font-sans group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm font-sans mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium font-sans hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project number indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
