"use client";
import React from "react";
import { Cpu, Globe2, Database, Cloud, Wrench } from "lucide-react";
import { motion } from "framer-motion";

interface StackGroup {
  title: string;
  icon: React.ReactNode;
  items: string[];
  gradient: string;
}

const groups: StackGroup[] = [
  {
    title: "Frontend",
    icon: <Globe2 className="h-5 w-5" />,
    gradient: "from-blue-500/20 to-cyan-500/10",
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
    gradient: "from-purple-500/20 to-pink-500/10",
    items: ["Node.js", "Express", "FastAPI", "REST", "GraphQL", "JWT", "tRPC"],
  },
  {
    title: "Databases",
    icon: <Database className="h-5 w-5" />,
    gradient: "from-emerald-500/20 to-green-500/10",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="h-5 w-5" />,
    gradient: "from-orange-500/20 to-amber-500/10",
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
    gradient: "from-rose-500/20 to-red-500/10",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TechStackSection() {
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_15%_20%,rgba(120,119,198,0.12),transparent_55%),radial-gradient(circle_at_85%_40%,rgba(56,189,248,0.10),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Technologies I use to architect performant, maintainable &
            product-focused solutions across the stack.
          </p>
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {groups.map((g) => (
            <motion.div
              key={g.title}
              variants={cardVariants}
              className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 transition-all duration-300 group overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${g.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Animated border glow */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

              <div className="relative flex items-center gap-3 mb-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary ring-1 ring-inset ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all duration-300">
                  {g.icon}
                </span>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                  {g.title}
                </h3>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {g.items.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="text-[11px] tracking-wide rounded-lg px-2.5 py-1.5 bg-background/50 text-foreground/80 border border-border/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-default font-medium"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
