"use client";
import React from "react";

export function ScheduleCallSection() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_15%_20%,rgba(120,119,198,0.12),transparent_55%),radial-gradient(circle_at_85%_40%,rgba(56,189,248,0.10),transparent_55%)]" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent">
            Let&apos;s Talk
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Have a project, collaboration idea or mentoring request? Book a
            quick 15 minute call directly in my calendar.
          </p>
        </div>
        <div className="relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-4 md:p-6">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 pointer-events-none" />
          <iframe
            src="https://cal.com/vaibhavsing/15min?hide_event_type_details=1&background_color=0a0a0a&primary_color=6366f1"
            className="w-full h-[700px] rounded-xl border-0"
            allow="camera; microphone; fullscreen; clipboard-read; clipboard-write"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
