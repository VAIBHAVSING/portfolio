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
  bio: "I love to debug apps in production && build distributed systems.",
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
      "Open source alternative to GitHub Codespaces with GPU support. Built with Go to provide developers with powerful cloud-based development environments featuring GPU acceleration for ML/AI workloads.",
    tags: ["Golang", "Cloud", "GPU", "DevOps", "Infrastructure", "Open Source"],
    icon: "🚀",
    liveUrl: "https://github.com/VAIBHAVSING/Dev8.dev",
    githubUrl: "https://github.com/VAIBHAVSING/Dev8.dev",
    highlight: "GPU-POWERED CLOUD IDE",
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
      "Pursuing Computer Science with specialization in software engineering, algorithms, and modern web technologies. Maintaining strong academic performance while actively contributing to open source projects.",
    achievements: [
      "Active contributor to open source projects with 50+ contributions on GitHub",
      "Built and deployed multiple full-stack applications using modern technologies",
      "Participated in hackathons and coding competitions, securing top positions",
      "Led technical workshops and mentored junior students in web development",
      "Completed internship at Y Combinator startup, contributing to production systems",
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
      "Computer Graphics",
      "Compiler Design",
      "Cybersecurity",
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
