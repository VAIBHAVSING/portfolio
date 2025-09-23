// Centralized personal/portfolio data for SSR-friendly imports.
// Only static objects and plain data here (no JSX / functions relying on browser APIs).

export const PERSONAL_INFO = {
  name: 'Vaibhav Singh',
  firstName: 'Vaibhav',
  lastName: 'Singh',
  headlineWords: [
    { text: 'Open' },
    { text: 'Source' },
    { text: 'Contributor' },
    { text: '&' },
    { text: 'Software', className: 'text-blue-500 dark:text-blue-500' },
    { text: 'Engineer', className: 'text-blue-500 dark:text-blue-500' },
  ],
  bio: 'I build innovative solutions and contribute to open source projects. Currently pursuing Computer Science while creating impactful software that makes a difference.',
  avatar: '/avatar.webp',
  resume: {
    downloadName: 'Vaibhav_Singh_Resume.pdf',
    path: '/resume.pdf'
  },
  socials: {
    github: 'https://github.com/VAIBHAVSING',
    linkedin: 'https://linkedin.com/in/vaibhavsingh',
    email: 'mailto:vaibhav@example.com'
  }
} as const;

export const PROJECTS = [
  {
    title: 'AI-Powered Code Review Tool',
    description: 'An intelligent code review assistant that uses machine learning to identify potential bugs and suggest improvements in real-time.',
    tags: ['Python', 'Machine Learning', 'OpenAI', 'FastAPI'],
    icon: '🤖',
    liveUrl: 'https://example.com/code-review',
    githubUrl: 'https://github.com/VAIBHAVSING/code-review-ai',
    highlight: 'ML + AI'
  },
  {
    title: 'Real-time Collaboration Platform',
    description: 'A web-based platform for real-time collaborative coding and project management, featuring live editing and video conferencing.',
    tags: ['React', 'Node.js', 'Socket.io', 'WebRTC'],
    icon: '⚡',
    liveUrl: 'https://example.com/collab',
    githubUrl: 'https://github.com/VAIBHAVSING/realtime-collab',
    highlight: 'Realtime'
  },
  {
    title: 'Open Source UI Component Library',
    description: 'A comprehensive React component library with 50+ customizable components, used by developers worldwide.',
    tags: ['React', 'TypeScript', 'Storybook', 'Rollup'],
    icon: '🎨',
    liveUrl: 'https://example.com/ui-kit',
    githubUrl: 'https://github.com/VAIBHAVSING/ui-component-lib',
    highlight: 'Library'
  }
] as const;

export const DOCK_ITEMS = [
  { name: 'About', icon: '/home.webp', targetId: 'about' },
  { name: 'Projects', icon: '/projects.webp', targetId: 'projects' },
  { name: 'Skills', icon: '/skills.webp', targetId: 'skills' },
  { name: 'Contact', icon: '/email.webp', targetId: 'contact' },
  { name: 'GitHub', icon: '/github.webp', external: 'https://github.com/VAIBHAVSING' },
  { name: 'LinkedIn', icon: '/linkedin.webp', external: 'https://linkedin.com/in/vaibhavsingh' },
  { name: 'Resume', icon: '/resume.webp', download: true },
] as const;

export type Project = typeof PROJECTS[number];
