"use client";
import React, { useEffect, useRef } from "react";
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
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiRedis,
  SiRedux,
  SiPostman,
} from "react-icons/si";
import { MdApi, MdAccountTree } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";

export function HeroTechStack() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      name: "MongoDB",
      icon: <SiMongodb className="h-8 w-8 text-green-500" />,
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
      name: "AWS",
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
      name: "Redux",
      icon: <SiRedux className="h-8 w-8 text-purple-600" />,
    },
    {
      name: "REST APIs",
      icon: <MdApi className="h-8 w-8 text-green-600" />,
    },
    {
      name: "WebSocket",
      icon: <BiNetworkChart className="h-8 w-8 text-blue-600" />,
    },
    {
      name: "Postman",
      icon: <SiPostman className="h-8 w-8 text-orange-500" />,
    },
    {
      name: "Microservices",
      icon: <MdAccountTree className="h-8 w-8 text-gray-600" />,
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset when we've scrolled past half the content (seamless loop)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="mt-4 w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Duplicate the items for seamless scrolling */}
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
