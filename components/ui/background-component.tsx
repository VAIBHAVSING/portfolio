"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface BackgroundComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundComponent: React.FC<BackgroundComponentProps> = ({
  children,
  className = ""
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize from localStorage / system
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      // default to dark
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try { localStorage.setItem('theme', next); } catch {}
      return next;
    });
  }, []);

  return (
    <div className={cn("min-h-screen w-full relative bg-background overflow-hidden", className)}>
      {/* Static subtle base gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(circle at 40% 20%, hsl(350 89% 60% / 0.08), transparent 60%),
                     radial-gradient(circle at 80% 70%, hsl(350 89% 60% / 0.06), transparent 65%),
                     linear-gradient(180deg, hsl(350 32% 18% / 0.02), transparent 55%)`
      }} />

      {/* Aurora animated layer */}
      <div className="aurora-layer z-0">
        <div className="aurora-blob" style={{ left: '-20%', top: '-10%' }} />
        <div className="aurora-blob" data-variant="2" />
        <div className="aurora-blob" data-variant="3" />
        <div className="aurora-gradient-overlay" />
      </div>

      {/* Theme toggle button (top-left corner) */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={cn(
          "group fixed top-4 left-4 z-50 inline-flex items-center justify-center",
          "h-10 w-10 rounded-full border border-border/60 backdrop-blur-md",
          "bg-card/70 shadow-sm hover:shadow-md transition-all",
          "hover:scale-105 active:scale-95"
        )}
      >
        {/* Icon swap */}
        <span className="relative flex items-center justify-center w-5 h-5">
          {/* Sun */}
          <svg
            className={cn("absolute inset-0 transition-all", theme === 'light' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90')}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.42-1.42M8.35 8.35 6.93 6.93m0 10.14 1.42-1.42m9.3-9.3-1.42 1.42" />
          </svg>
          {/* Moon */}
            <svg
              className={cn("absolute inset-0 transition-all", theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90')}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 0 0 12 21a9 9 0 0 0 9-8.21Z" />
            </svg>
        </span>
        <span className="sr-only">Toggle {theme === 'dark' ? 'light' : 'dark'} mode</span>
      </button>

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
