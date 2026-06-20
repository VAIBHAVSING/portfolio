"use client";
import React from "react";
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaAws,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiExpress,
  SiRedis,
  SiPostman,
  SiDeno,
  SiSupabase,
  SiGooglecloud,
  SiOpenai,
} from "react-icons/si";
import { MdApi } from "react-icons/md";

const items = [
  {
    name: "React",
    icon: <FaReact className="h-8 w-8 text-sky-500" />,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="h-8 w-8" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="h-8 w-8 text-blue-600" />,
  },
  {
    name: "JavaScript",
    icon: <FaJs className="h-8 w-8 text-yellow-500" />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="h-8 w-8 text-green-600" />,
  },
  {
    name: "Python",
    icon: <FaPython className="h-8 w-8 text-blue-500" />,
  },
  {
    name: "HTML",
    icon: <FaHtml5 className="h-8 w-8 text-orange-600" />,
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="h-8 w-8 text-blue-600" />,
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="h-8 w-8 text-cyan-500" />,
  },
  {
    name: "Supabase",
    icon: <SiSupabase className="h-8 w-8 text-green-500" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="h-8 w-8 text-blue-700" />,
  },
  {
    name: "Express.js",
    icon: <SiExpress className="h-8 w-8" />,
  },
  {
    name: "AWS Lambda",
    icon: <FaAws className="h-8 w-8 text-orange-500" />,
  },
  {
    name: "Docker",
    icon: <FaDocker className="h-8 w-8 text-blue-500" />,
  },
  {
    name: "Redis",
    icon: <SiRedis className="h-8 w-8 text-red-600" />,
  },
  {
    name: "Git",
    icon: <FaGitAlt className="h-8 w-8 text-orange-600" />,
  },
  {
    name: "Deno",
    icon: <SiDeno className="h-8 w-8" />,
  },
  {
    name: "REST APIs",
    icon: <MdApi className="h-8 w-8 text-green-600" />,
  },
  {
    name: "QLoRA",
    icon: <SiOpenai className="h-8 w-8 text-emerald-500" />,
  },
  {
    name: "Postman",
    icon: <SiPostman className="h-8 w-8 text-orange-500" />,
  },
  {
    name: "vLLM",
    icon: <SiGooglecloud className="h-8 w-8 text-blue-600" />,
  },
];

export function HeroTechStack() {
  return (
    <div className="mt-4 w-full overflow-hidden tech-stack-mask">
      <div className="flex w-max gap-3 tech-stack-marquee">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-card/40 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
          >
            {item.icon}
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
