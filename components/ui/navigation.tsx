"use client";

import React from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  logo: {
    initials: string;
    name: string;
  };
  navLinks: NavLink[];
  resume: {
    label: string;
    onClick: () => void;
  };
}

export const Navigation: React.FC<NavigationProps> = ({
  logo,
  navLinks,
  resume,
}) => {
  return (
    <nav className="w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-border backdrop-blur-md border border-border flex items-center justify-center">
            <span className="font-sans text-sm font-bold text-foreground">
              {logo.initials}
            </span>
          </div>
          <span className="font-sans text-lg font-medium text-foreground">
            {logo.name}
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          onClick={resume.onClick}
          className="bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg text-foreground text-sm font-medium font-sans border border-primary/20 transition-colors"
        >
          {resume.label}
        </button>
      </div>
    </nav>
  );
};
