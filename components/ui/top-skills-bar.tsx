"use client";
import React from 'react';

interface TopSkillsBarProps {
  skills?: string[];
}

export function TopSkillsBar({ skills = ['React','Next.js','TypeScript','Node.js','PostgreSQL','Docker','AWS'] }: TopSkillsBarProps) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-3 py-4 px-6">
      {skills.map(s => (
        <span key={s} className="text-xs md:text-sm rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary/90 hover:bg-primary/10 transition-colors">{s}</span>
      ))}
    </div>
  );
}
