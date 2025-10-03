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
  {
    title: "Quiz App (MERN)",
    description:
      "Full-stack quiz platform where admins craft multi-question tests and participants get instant scored results with detailed feedback.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Recoil"],
    icon: "🧠",
    liveUrl: "https://quiz.vaibhavsing.me/",
    githubUrl: "https://github.com/VAIBHAVSING/Quiz-app-MERN",
    highlight: "MERN QUIZ PLATFORM",
  },
] as const;

export const DOCK_ITEMS = [
  { name: "About", icon: "/home.webp", targetId: "about" },
  { name: "Skills", icon: "/skills.webp", targetId: "skills" },
  { name: "Education", icon: "/education.webp", targetId: "education" },
  { name: "Projects", icon: "/projects.webp", targetId: "projects" },
  { name: "Schedule", icon: "/calender.webp", external: "/cal" },
  {
    name: "GitHub",
    icon: "/github.webp",
    external: "/gh",
  },
  {
    name: "Twitter",
    icon: "/twitter.webp",
    external: "/x",
  },
  {
    name: "Contact",
    icon: "/email.webp",
    external: "/email",
  },
  {
    name: "LinkedIn",
    icon: "/linkedin.webp",
    external: "/in",
  },
  { name: "Resume", icon: "/resume.webp", download: true },
] as const;

export const EDUCATION = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Pune University",
    period: "2022 - 2026",
    description:
      "Pursuing Computer Science with specialization in software engineering, algorithms, and modern web technologies. Maintaining strong academic performance while actively contributing to open source projects.",
    achievements: [
      "Maintained consistent academic excellence with CGPA of 8.5/10",
      "Active contributor to open source projects with 50+ contributions on GitHub",
      "Built and deployed multiple full-stack applications using modern technologies",
      "Participated in hackathons and coding competitions, securing top positions",
      "Led technical workshops and mentored junior students in web development",
      "Completed internship at Y Combinator startup, contributing to production systems",
    ],
    gpa: "8.5/10",
    location: "Pune, India",
    logo: "🎓",
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
      "Computer Graphics",
      "Compiler Design",
      "Cybersecurity",
    ],
    type: "bachelor" as const,
  },
] as const;

export type Project = (typeof PROJECTS)[number];
export type EducationItem = (typeof EDUCATION)[number];
