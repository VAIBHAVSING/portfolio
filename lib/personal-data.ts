// Centralized personal/portfolio data for SSR-friendly imports.
// Only static objects and plain data here (no JSX / functions relying on browser APIs).

export const PERSONAL_INFO = {
  name: "Vaibhav Patil",
  firstName: "Vaibhav",
  lastName: "Patil",
  headlineWords: [
    { text: "Open" },
    { text: "Source" },
    { text: "Contributor" },
    { text: "&" },
    { text: "Software", className: "text-blue-500 dark:text-blue-500" },
    { text: "Engineer", className: "text-blue-500 dark:text-blue-500" },
  ],
  bio: "I build innovative solutions and contribute to open source projects. Currently pursuing Computer Science while creating impactful software that makes a difference.",
  avatar: "/avatar.webp",
  resume: {
    downloadName: "Vaibhav_Patil_Resume.pdf",
    path: "/resume.pdf",
  },
  socials: {
    github: "https://github.com/VAIBHAVSING",
    linkedin: "https://www.linkedin.com/in/vaibhavpatil24/",
    email: "mailto:vpatil5212@gmail.com",
  },
} as const;

export const PROJECTS = [
  {
    title: "Unified Cloud SDK",
    description:
      "A Go Unified Cloud SDK designed to give developers a consistent, intuitive API for integrating multiple cloud services with minimal friction.",
    tags: ["Golang", "SDK", "Cloud", "AWS", "GCP", "AZURE"],
    icon: "🤖",
    liveUrl: "https://pkg.go.dev/github.com/VAIBHAVSING/Cloudsdk/go",
    githubUrl: "https://github.com/VAIBHAVSING/Cloudsdk",
    highlight: "CLOUD + SDK",
  },
] as const;

export const DOCK_ITEMS = [
  { name: "About", icon: "/home.webp", targetId: "about" },
  { name: "Skills", icon: "/skills.webp", targetId: "skills" },
  { name: "Projects", icon: "/projects.webp", targetId: "projects" },
  { name: "Schedule-meet", icon: "/calender.webp", targetId: "contact" },
  {
    name: "Contact",
    icon: "/email.webp",
    targetId: "mailto:vpatil5212@gmail.com",
  },
  {
    name: "GitHub",
    icon: "/github.webp",
    external: "https://github.com/VAIBHAVSING",
  },
  {
    name: "LinkedIn",
    icon: "/linkedin.webp",
    external: "https://www.linkedin.com/in/vaibhavpatil24/",
  },
  { name: "Resume", icon: "/resume.webp", download: true },
] as const;

export type Project = (typeof PROJECTS)[number];
