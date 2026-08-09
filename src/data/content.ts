/**
 * ============================================================
 * SITE CONFIG — edit this file to update every section at once.
 * Anything marked "⚠ CONFIG" is a placeholder you should replace
 * with your real key before deploying.
 * ============================================================
 */

// Resolves correctly whether the site is deployed at a domain root
// (Vercel/Netlify/custom domain) or a GitHub Pages subpath
// (username.github.io/repo-name/) — do not hardcode a leading "/" here.
const BASE = import.meta.env.BASE_URL

export const SITE = {
  name: 'Shashwat Pandey',
  shortName: 'Shashwat',
  fullTitle: 'Full-Stack Developer',
  location: 'Satna, Madhya Pradesh, India',
  email: 'shashwat565b@gmail.com',
  phone: '+91 70244 87353',
  github: 'https://github.com/shashwat094',
  githubUsername: 'shashwat094', // used for the live GitHub stats section
  linkedin: 'https://linkedin.com/in/shashwat094',
  twitter: 'https://x.com/shashwat_s92',
  resumeUrl: `${BASE}resume.pdf`, // drop your resume.pdf into /public
  photoUrl: `${BASE}pic.jpeg`, // drop your pic.jpeg into /public
  novaUrl: 'https://nova-ai-xi-khaki.vercel.app',
  repoUrl: 'https://github.com/shashwat094/SHASHWAT-DEV',
  // ⚠ CONFIG — Web3Forms (https://web3forms.com) — free, no account/dashboard,
  // just enter your email there and they send you an access key instantly.
  web3formsKey: 'ff5d4976-0b8a-461b-a9f1-0045ecd9e4ce',
}

export const ROLES = [
  'Full-Stack Developer',
  'AI Product Builder',
  'React Native Engineer',
  'Founder @ ChitrakootDhamTour',
  'BCA Graduate · 2026',
  'Problem Solver',
]

export const ABOUT = {
  paragraphs: [
    "I'm a full-stack developer and recent BCA graduate who ships finished, production-grade products end to end — from database schema to deployed UI. I've independently designed, built, and deployed six full applications: a live customer-facing booking platform, two AI-integrated web apps with real-time voice and computer-vision features, a React Native gym-management app, a multi-portal college system, and the site you're looking at right now.",
    "I'm co-founder and lead developer of ChitrakootDhamTour, a live booking platform serving real pilgrimage visitors in Chitrakoot, MP — built and run with Dharmendra Sen, from the database schema to a custom saffron-and-teal design system, including iteratively resolving cross-browser rendering issues to keep it stable for real users.",
    "My stack spans React, React Native, PHP/MySQL, Firebase and Node.js, plus Java and Python — and lately, real AI integration: the Groq LLM API, the Web Speech API for voice interfaces, and MediaPipe for on-device computer vision. I'm comfortable owning a project from architecture through deployment, and I'm looking for a software or web development role — internship or full-time — where that ownership translates into shipped features from day one.",
  ],
  stats: [
    { label: 'Production Apps Shipped', value: 6, suffix: '' },
    { label: 'AI-Integrated Products', value: 2, suffix: '' },
    { label: 'DB Tables Designed (SCMS)', value: 10, suffix: '+' },
    { label: 'Months Professional Exp.', value: 6, suffix: '+' },
  ],
  strengths: [
    'Problem Solving',
    'Ownership',
    'Fast Learning',
    'Adaptability',
    'Teamwork & Leadership',
    'Communication',
  ],
  languages: [
    { name: 'Hindi', level: 5 },
    { name: 'English', level: 4 },
  ],
}

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  stack: string[]
  category: 'Web' | 'Mobile' | 'Systems'
  year: string
  role: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  highlights: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'nova-ai',
    title: 'Nova',
    tagline: 'A production AI chat assistant — the idea behind the bot on this page',
    description:
      'A deployed AI personal assistant with Firebase Authentication and Firestore-backed persistent chat history per user. The Groq LLM API is integrated through a custom serverless proxy so the model key never touches the client. The small guide bot in the corner of this page is a lightweight, scripted preview of the same idea.',
    stack: ['React 19', 'Vite', 'Firebase Auth', 'Firestore', 'Groq API', 'Serverless Functions'],
    category: 'Web',
    year: '2026 — Present',
    role: 'Solo Developer',
    liveUrl: 'https://nova-ai-xi-khaki.vercel.app',
    featured: true,
    highlights: [
      'Firebase Authentication — Google sign-in plus email/password — with Firestore-backed persistent chat history',
      'Groq LLM API routed through a serverless proxy — no API key ever shipped to the browser',
      'Boot-sequence animation, typewriter text effects, and cursor-reactive visuals; fully serverless on Vercel',
    ],
  },
  {
    id: 'chitrakootdhamtour',
    title: 'ChitrakootDhamTour',
    tagline: 'Live spiritual tourism platform, real visitors, real bookings',
    description:
      'A full booking platform for pilgrimage packages to Chitrakoot Dham — built and run as an actual business, not a case study. A custom saffron-and-teal design system, live reviews, and structured SEO, kept stable in production through iterative cross-browser fixes.',
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'Firebase', 'JavaScript', 'JSON-LD SEO'],
    category: 'Web',
    year: '2024 — Present',
    role: 'Co-Founder & Lead Developer',
    liveUrl: 'https://chitrakootdhamtour.in',
    featured: true,
    highlights: [
      'Firebase-powered dynamic review system and package/booking cards, fully mobile-responsive',
      'Custom saffron-and-teal design system built around the subject, not a generic travel template',
      'Iteratively resolved cross-browser rendering issues — icon-system migration, layout bugs — to keep production stable',
    ],
  },
  {
    id: 'cipher',
    title: 'Cipher',
    tagline: 'AI assistant with real-time bilingual voice and on-device computer vision',
    description:
      'A 9-page AI assistant application — voice console, device dashboard, notes, memory, conversation history, developer diagnostics — with client-side routing and persisted state throughout.',
    stack: ['React 19', 'Tailwind v4', 'Framer Motion', 'Zustand', 'Web Speech API', 'MediaPipe'],
    category: 'Web',
    year: '2026',
    role: 'Solo Developer',
    featured: true,
    highlights: [
      'Real-time bilingual (English/Hindi) voice interaction via the Web Speech API, with live interrupt-on-speech handling',
      'On-device computer vision with MediaPipe for facial-expression and hand-gesture recognition — zero video ever leaves the browser',
      'In-browser document pipeline (PDF.js, Mammoth.js) for querying PDF/Word files with no server roundtrip, plus a themeable system with 8 switchable palettes',
    ],
  },
  {
    id: 'shashwat-os',
    title: 'SHASHWAT_OS',
    tagline: "This site — an interactive developer portfolio, built to be handed to recruiters",
    description:
      'The portfolio you\'re looking at right now: a real, working terminal, a live Three.js background, scroll-driven animation, and a scripted Nova guide bot — tested with Playwright rather than just eyeballed.',
    stack: ['React 19', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS v4', 'Framer Motion'],
    category: 'Web',
    year: '2026',
    role: 'Solo Developer',
    repoUrl: 'https://github.com/shashwat094/SHASHWAT-DEV',
    highlights: [
      '3D scene rendering (Three.js) and scroll-driven animation (GSAP, Lenis smooth-scroll)',
      'A genuinely working terminal with 20+ commands, full-screen mode, and tap-to-run chips for mobile',
      'Automated browser testing with Playwright caught and fixed real stacking-context and scroll-jump bugs before launch',
    ],
  },
  {
    id: 'apexfit',
    title: 'ApexFit',
    tagline: 'Gym management, built from scratch in React Native',
    description:
      'A complete cross-platform gym management app with 6 screens: members, plans, payments and settings. Auto member ID generation, payment tracking across Cash/UPI/Other, and PDF export/import for digital ID cards.',
    stack: ['React Native', 'Expo', 'WebView', 'Leaflet.js', 'PDF Export'],
    category: 'Mobile',
    year: '2025',
    role: 'Solo Developer',
    featured: true,
    highlights: [
      'Custom Leaflet.js map picker inside a WebView, with a renew-plan flow that auto-calculates expiry dates',
      'Shareable digital ID cards generated on-device',
      'Resolved infinite re-render loops and non-serializable navigation state for a stable, smooth UX',
    ],
  },
  {
    id: 'scms',
    title: 'Smart College Management System',
    tagline: 'Multi-portal system: Admin, Faculty & Student',
    description:
      'A 3-role college management system handling attendance, notices, grades and academic records, on a 10-table relational schema — co-developed in a 2-person team under faculty guidance, with 100+ pages of formal documentation to university formatting standards.',
    stack: ['PHP 8', 'MySQL 8', 'Bootstrap 5', 'Chart.js'],
    category: 'Systems',
    year: '2025',
    role: 'Developer',
    highlights: [
      'Admin dashboard with Chart.js dual-axis visualizations and animated stat cards',
      '10-table relational schema covering attendance, notices, grades and records',
      'ER diagrams, DFDs and use-case diagrams generated via Graphviz for complete documentation',
    ],
  },
]

export const SKILLS: Record<string, { name: string; level: number }[]> = {
  Languages: [
    { name: 'JavaScript (ES6+)', level: 90 },
    { name: 'TypeScript', level: 82 },
    { name: 'PHP', level: 88 },
    { name: 'SQL', level: 85 },
    { name: 'Python', level: 68 },
    { name: 'Java', level: 65 },
    { name: 'C', level: 55 },
  ],
  'Frontend & Mobile': [
    { name: 'React.js', level: 92 },
    { name: 'React Native (Expo)', level: 85 },
    { name: 'Tailwind CSS', level: 88 },
    { name: 'Bootstrap 5', level: 85 },
    { name: 'Framer Motion', level: 78 },
    { name: 'Chart.js', level: 78 },
  ],
  'Backend & APIs': [
    { name: 'Node.js', level: 78 },
    { name: 'PHP 8', level: 85 },
    { name: 'RESTful APIs', level: 85 },
    { name: 'Serverless Functions (Vercel)', level: 75 },
    { name: 'Groq LLM API', level: 72 },
  ],
  Databases: [
    { name: 'MySQL', level: 85 },
    { name: 'Firebase Firestore', level: 80 },
    { name: 'Firebase Realtime Database', level: 72 },
  ],
  'AI & Specialized': [
    { name: 'Web Speech API (voice UI)', level: 75 },
    { name: 'MediaPipe (computer vision)', level: 70 },
    { name: 'PDF.js & Mammoth.js', level: 68 },
  ],
  'Tools & Platforms': [
    { name: 'Git / GitHub', level: 88 },
    { name: 'Vercel', level: 82 },
    { name: 'Firebase Auth', level: 80 },
    { name: 'Postman', level: 75 },
    { name: 'Playwright', level: 70 },
  ],
}

export const EXPERIENCE = [
  {
    role: 'Co-Founder & Lead Developer',
    org: 'ChitrakootDhamTour',
    period: '2024 — Present',
    description:
      'Co-founded and built a live spiritual-tourism booking platform currently serving real customers, owning the product end to end from UI design through deployment. Implemented a Firebase-powered dynamic review system and a custom saffron-and-teal design system, and iteratively resolved cross-browser rendering issues to keep the production site stable for live users.',
  },
  {
    role: 'Data Entry Operator',
    org: 'Sadguru Software & IT Services, Chitrakoot, MP',
    period: '6 Months',
    description:
      'Maintained accuracy across high-volume data entry and record-management workflows — 98%+ accuracy at 30+ WPM — building a practical understanding of database structures and business software operations that now informs how I design backend schemas.',
  },
]

export const EDUCATION = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sadguru Institute of Computer Studies (SICS), Chitrakoot',
    affiliation: 'Makhanlal Chaturvedi National University (MCU), Bhopal',
    period: '2023 — 2026',
    detail: 'CGPA 6.5',
  },
]

export const SERVICES = [
  {
    title: 'Full-Stack Web Apps',
    description: 'End-to-end platforms in React, PHP, MySQL and Node.js — from schema to shipped product.',
  },
  {
    title: 'React Native Mobile Apps',
    description: 'Cross-platform apps built with Expo, covering real flows: payments, offline data, maps, PDF export.',
  },
  {
    title: 'AI-Integrated Products',
    description: 'Chat assistants, voice interfaces, and on-device computer vision — Groq LLM, Web Speech API, MediaPipe — shipped, not just prototyped.',
  },
  {
    title: 'Admin Dashboards & Systems',
    description: 'Role-based portals with real reporting: attendance, leaderboards, dual-axis analytics.',
  },
  {
    title: 'Business Websites That Convert',
    description: 'Like ChitrakootDhamTour — a site built and run as an actual revenue channel, not a portfolio piece.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'He treats every feature like it has to work for a real customer, not just demo well — that discipline is what makes ChitrakootDhamTour actually convert bookings.',
    name: 'Dharmendra Sen',
    role: 'Co-Founder, ChitrakootDhamTour',
  },
  {
    quote:
      'Direct, results-oriented, and he iterates until the output actually looks and feels premium — not just "done".',
    name: 'Project Guide',
    role: 'Sadguru Institute of Computer Studies',
  },
  {
    quote:
      'Fast learner, highly adaptable, and reliable with data — exactly what you want on a team handling real records.',
    name: 'Team Lead',
    role: 'Sadguru Software & IT Services',
  },
]

export const ACHIEVEMENTS = [
  { label: 'Live production platform', value: '1', detail: 'ChitrakootDhamTour, real customers, real bookings' },
  { label: 'Full-stack apps shipped', value: '6', detail: 'Web, mobile and AI-integrated products, start to finish' },
  { label: 'AI-integrated products', value: '2', detail: 'Real-time voice UI and on-device computer vision' },
  { label: 'Report pages generated', value: '100+', detail: 'University-formatted, built programmatically with docx + Graphviz' },
]

export const TERMINAL_HELP = [
  { cmd: 'about', desc: 'Who I am' },
  { cmd: 'skills', desc: 'Technical skill list' },
  { cmd: 'projects', desc: 'List of shipped projects' },
  { cmd: 'experience', desc: 'Work history' },
  { cmd: 'education', desc: 'Academic background' },
  { cmd: 'contact', desc: 'How to reach me' },
  { cmd: 'github', desc: 'Open GitHub profile' },
  { cmd: 'linkedin', desc: 'Open LinkedIn profile' },
  { cmd: 'resume', desc: 'Download resume' },
  { cmd: 'whoami', desc: 'Current session identity' },
  { cmd: 'sudo', desc: 'Try it' },
  { cmd: 'matrix', desc: 'Toggle matrix rain' },
  { cmd: 'ascii', desc: 'Print ASCII banner' },
  { cmd: 'date', desc: 'Current date' },
  { cmd: 'time', desc: 'Current time' },
  { cmd: 'joke', desc: 'A dev joke' },
  { cmd: 'coffee', desc: 'Brew status' },
  { cmd: 'music', desc: 'Play a synth arpeggio' },
  { cmd: 'hack', desc: 'Run a fake hacking sequence' },
  { cmd: 'theme', desc: 'Cycle accent color' },
  { cmd: 'fullscreen', desc: 'Toggle full-screen terminal' },
  { cmd: 'weather', desc: 'Local system weather (simulated)' },
  { cmd: 'clear', desc: 'Clear the terminal' },
  { cmd: 'help', desc: 'List all commands' },
]
