"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: React.ReactNode;
  liveUrl?: string;
  githubUrl?: string;
  highlight?: string; // short caption or status
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project; index: number; isExpanded: boolean; onToggle: () => void }> = ({ 
  project, 
  index, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        layout: { duration: 0.3 }
      }}
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        "group relative bg-gradient-to-br from-card/80 to-card border border-border/50",
        "rounded-2xl p-6 cursor-pointer overflow-hidden backdrop-blur-sm",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300",
        isExpanded ? "md:col-span-2" : ""
      )}
      onClick={onToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Highlight badge */}
      {project.highlight && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 right-4 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
        >
          {project.highlight}
        </motion.div>
      )}

      <div className="relative z-10">
        {/* Project icon/image */}
        <motion.div 
          className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          {project.imageContent}
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p 
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "text-sm text-muted-foreground leading-relaxed mb-4",
              isExpanded ? "" : "line-clamp-2"
            )}
          >
            {project.description}
          </motion.p>
        </AnimatePresence>

        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.tags.slice(0, isExpanded ? 8 : 4).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + tagIndex * 0.1 }}
              className="px-2.5 py-1 rounded-lg bg-muted/50 text-xs font-medium text-foreground/80 border border-border/30 hover:border-primary/30 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="projects" className="w-full py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills in building innovative solutions and contributing to open source.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isExpanded={expandedProject === index}
                onToggle={() => toggleProject(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      
      </div>
    </section>
  );
};
