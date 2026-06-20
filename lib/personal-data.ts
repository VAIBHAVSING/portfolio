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
    { text: "AI", className: "text-blue-500 dark:text-blue-500" },
    { text: "Engineer", className: "text-blue-500 dark:text-blue-500" },
  ],
  bio: "I build AI developer tools, distributed runtimes, and production systems.",
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
    title: "Dev8.dev",
    description:
      "Open-source cloud IDE for AI agents with containerized workspaces and GPU support. Designed layered Docker runtimes, Azure Container Apps deployment, and workspace data models for SSH keys, secrets, and backups.",
    tags: ["Go", "Docker", "Azure", "TypeScript", "GPU", "Infrastructure", "Open Source"],
    icon: "🚀",
    liveUrl: "https://github.com/VAIBHAVSING/Dev8.dev",
    githubUrl: "https://github.com/VAIBHAVSING/Dev8.dev",
    highlight: "GPU-POWERED CLOUD IDE",
  },
  {
    title: "OpenGhost",
    description:
      "Open-source AI pentesting harness for authorized web and API security assessments. Built a Codex/Claude agent skill with Docker sandboxing, scope files, evidence capture, findings, reports, and OWASP WSTG/API Top 10 workflows.",
    tags: ["TypeScript", "Bun", "Docker", "Vercel AI SDK", "Playwright", "OWASP", "Security"],
    icon: "🛡️",
    liveUrl: "https://github.com/VAIBHAVSING/openghost",
    githubUrl: "https://github.com/VAIBHAVSING/open-ghost",
    highlight: "AI SECURITY HARNESS",
  },
] as const;

export const DOCK_ITEMS = [
  // Navigation - in order of page sections
  { name: "About", icon: "/home.webp", targetId: "about" },
  { name: "Skills", icon: "/skills.webp", targetId: "skills" },
  { name: "Experience", icon: "/projects.webp", targetId: "experience" },
  { name: "Education", icon: "/education.webp", targetId: "education" },
  { name: "OSS", icon: "/github.webp", targetId: "oss" },
  { name: "Projects", icon: "/projects.webp", targetId: "projects" },
  { name: "Writing", icon: "/writing.webp", targetId: "writing" },
  { name: "Testimonials", icon: "/email.webp", targetId: "testimonials" },
  { name: "Contact", icon: "/calender.webp", targetId: "contact" },
  // External links
  {
    name: "GitHub",
    icon: "/github.webp",
    external: "/gh",
  },
  {
    name: "LinkedIn",
    icon: "/linkedin.webp",
    external: "/in",
  },
  {
    name: "Twitter",
    icon: "/twitter.webp",
    external: "/x",
  },
  { name: "Resume", icon: "/resume.webp", download: true },
] as const;

export const EDUCATION = [
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: "K.K Wagh Institute Of Engineering Education and Research",
    period: "2022 - 2026",
    description:
      "Studying information technology with a focus on software engineering, systems, databases, and modern web technologies while building production projects and contributing to open source.",
    achievements: [
      "Active open-source contributor with 90+ merged pull requests across developer-tooling projects",
      "Built and deployed AI/devtool projects using TypeScript, Go, Docker, cloud runtimes, and LLM infrastructure",
      "Participated in hackathons and coding competitions, securing top positions",
      "Led web development workshops and mentored junior students on React and Node.js",
      "Completed software engineering internships and contributed to YC-backed developer tools",
    ],
    location: "Nashik, India",
    logo: "/kk-wagh-logo.png",
    coursework: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Object-Oriented Programming",
      "Web Technologies",
      "Machine Learning",
      "System Design",
      "Compiler Design",
      "Cybersecurity",
      "Cloud Computing",
    ],
    type: "bachelor" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Max Prilutskiy",
    title: "Co-founder & CEO",
    company: "Lingo.dev[YC-F24]",
    relationship: "Worked together at Company",
    text:  `I had the pleasure of working with Vaibhav Patil during his internship at Lingo.dev, where he contributed to our open-source i18n, localization and translation tools.

Vaibhav stood out for his curiosity and eagerness to dive deep into complex systems, quickly grasping how our platform integrates with modern i18n workflows. He asked thoughtful questions, explored new approaches, and consistently turned insights into practical improvements.

Excited to see where his curiosity and technical talent take him next!`,
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEAvc4AmrtLiQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703891537293?e=1766620800&v=beta&t=uIy7WmVoTvYpYtYcwdflo8-QehCkufMruwrlbFfP2-Y", // Add profile picture URL here
    linkedinUrl:
      "https://www.linkedin.com/in/vaibhavpatil24/details/recommendations/",
  },
  // Add more testimonials as needed:
  // {
  //   id: "2",
  //   name: "Another Person",
  //   title: "Their Title",
  //   company: "Company Name",
  //   relationship: "Colleague/Manager",
  //   text: "Their recommendation text...",
  //   avatar: "/their-profile-pic.jpg",
  //   linkedinUrl: "https://linkedin.com/...",
  // },
] as const;

export const ARTICLES = [
  {
    id: "1",
    title: "Building Scalable Web Applications: Lessons from Production",
    excerpt:
      "Deep dive into architectural patterns, performance optimization, and real-world challenges in building modern web applications at scale.",
    url: "https://medium.com/@vpatil5212/building-scalable-web-applications-lessons-from-production-e83d5bc33411",
    publishedDate: "2024-01-15",
    readTime: "2 min read",
    tags: ["Web Development", "Architecture", "Performance"],
    platform: "Medium" as const,
  },
] as const;

export type Project = (typeof PROJECTS)[number];
export type EducationItem = (typeof EDUCATION)[number];
export type Testimonial = (typeof TESTIMONIALS)[number];
export type Article = (typeof ARTICLES)[number];
