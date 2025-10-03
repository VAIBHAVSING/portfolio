"use client";
import React from "react";
import { Cpu, Globe2, Database, Cloud, Wrench } from "lucide-react";

interface StackGroup {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const groups: StackGroup[] = [
  {
    title: "Frontend",
    icon: <Globe2 className="h-5 w-5" />,
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    icon: <Cpu className="h-5 w-5" />,
    items: ["Node.js", "Express", "FastAPI", "REST", "GraphQL", "JWT", "tRPC"],
  },
  {
    title: "Databases",
    icon: <Database className="h-5 w-5" />,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="h-5 w-5" />,
    items: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Vercel",
      "AWS",
      "Linux",
      "Terraform",
    ],
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="h-5 w-5" />,
    items: [
      "Jest",
      "Playwright",
      "Storybook",
      "Stripe",
      "Figma",
      "ESLint",
      "Prettier",
      "Postman",
      "NeoVim",
    ],
  },
];

export function TechStackSection() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_15%_20%,rgba(120,119,198,0.12),transparent_55%),radial-gradient(circle_at_85%_40%,rgba(56,189,248,0.10),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Technologies I use to architect performant, maintainable &
            product-focused solutions across the stack.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.title}
              className="relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors group"
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="relative flex items-center gap-3 mb-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent text-primary ring-1 ring-inset ring-primary/20">
                  {g.icon}
                </span>
                <h3 className="font-semibold text-lg">{g.title}</h3>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] tracking-wide rounded-md px-2 py-1 bg-primary/5 text-primary border border-primary/10 uppercase font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
