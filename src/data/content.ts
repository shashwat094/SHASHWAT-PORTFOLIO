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
  novaUrl: 'https://nova-ai-bice-five.vercel.app',
  // ⚠ CONFIG — EmailJS (https://emailjs.com) — free tier works fine
  emailjs: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  },
}

export const ROLES = [
  'Full-Stack Developer',
  'React Native Engineer',
  'Founder @ ChitrakootDhamTour',
  'BCA Graduate · 2026',
  'PHP / MySQL Systems Builder',
  'Problem Solver',
]

export const ABOUT = {
  paragraphs: [
    "I'm a BCA graduate (2026) from Makhanlal Chaturvedi National University, Bhopal, with hands-on expertise in full-stack web and cross-platform mobile development — and six months of professional experience as a Data Entry Operator that taught me a lot about data integrity and doing things properly the first time.",
    "I'm co-founder and lead developer of ChitrakootDhamTour, a live spiritual tourism platform serving real pilgrimage visitors in Chitrakoot, MP — built and run with Dharmendra Sen, from the database schema to the last pixel.",
    "My stack centers on React.js, React Native, PHP, Node.js and MySQL. I build complete applications end-to-end — UI/UX, database architecture, and everything between — and I'm currently looking for a software or web development internship to keep growing.",
  ],
  stats: [
    { label: 'Production Apps Shipped', value: 4, suffix: '' },
    { label: 'Months Professional Exp.', value: 6, suffix: '+' },
    { label: 'DB Tables Designed (SCMS)', value: 10, suffix: '+' },
    { label: 'Typing Speed', value: 30, suffix: '+ WPM' },
  ],
  strengths: [
    'Problem Solving',
    'Fast Learning',
    'Adaptability',
    'Teamwork & Leadership',
    'Communication',
    'Data Accuracy',
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
    title: 'Nova AI',
    tagline: 'A personal AI agent, built from scratch — the assistant powering this site',
    description:
      'A full conversational AI agent with persistent chat history, Google and email/password authentication, and a serverless proxy layer so the model provider key never touches the client. The small assistant in the corner of this page is a lightweight preview of the same idea.',
    stack: ['React 19', 'Vite', 'Firebase Auth', 'Firestore', 'Groq API', 'Serverless Functions'],
    category: 'Web',
    year: '2026 — Present',
    role: 'Solo Developer',
    liveUrl: 'https://nova-ai-bice-five.vercel.app',
    featured: true,
    highlights: [
      'Firestore-backed persistent chat history across sessions and devices',
      'Google sign-in plus email/password auth, with email verification enforced',
      'Model calls routed through a serverless proxy — no API key ever shipped to the browser',
    ],
  },
  {
    id: 'chitrakootdhamtour',
    title: 'ChitrakootDhamTour',
    tagline: 'Live spiritual tourism platform, real visitors, real bookings',
    description:
      'A full booking platform for pilgrimage packages to Chitrakoot Dham — built and run as an actual business, not a case study. Responsive UI/UX with live reviews, WhatsApp booking, AdSense, and structured JSON-LD SEO.',
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'Firebase', 'JavaScript', 'JSON-LD SEO'],
    category: 'Web',
    year: '2024 — Present',
    role: 'Co-Founder & Lead Developer',
    liveUrl: 'https://chitrakootdhamtour.in',
    featured: true,
    highlights: [
      'Live customer reviews powered by Firebase, plus direct WhatsApp booking',
      'Dynamic FAQ / Policies sections built with HTML5 accordions',
      'Structured JSON-LD schema and AdSense integration for real-world SEO and monetization',
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
      'A 3-role college management system handling attendance, notices, grades and academic records, on a 10-table relational schema — paired with full documentation generated programmatically.',
    stack: ['PHP 8', 'MySQL 8', 'Bootstrap 5', 'Chart.js'],
    category: 'Systems',
    year: '2025',
    role: 'Developer',
    featured: true,
    highlights: [
      'Admin dashboard with Chart.js dual-axis visualizations and animated stat cards',
      '10-table relational schema covering attendance, notices, grades and records',
      'ER diagrams, DFDs and use-case diagrams generated via Graphviz for complete documentation',
    ],
  },
  {
    id: 'ecommerce-storefront',
    title: 'E-Commerce Storefront',
    tagline: 'A full storefront built on React, PHP and vanilla fundamentals',
    description:
      'A product storefront covering catalog browsing, cart logic and checkout flow — built to get the fundamentals of state and data flow exactly right before reaching for a framework to hide them.',
    stack: ['React.js', 'PHP', 'HTML5', 'CSS3', 'JavaScript'],
    category: 'Web',
    year: '2024',
    role: 'Solo Developer',
    highlights: ['Full cart and checkout flow', 'PHP-backed product data layer'],
  },
  {
    id: 'music-player',
    title: 'Advanced Music Player',
    tagline: 'Custom playlist management, built in vanilla JS',
    description:
      'A browser-based music player with full playlist management, built to explore custom audio controls and state handling without relying on a UI library.',
    stack: ['JavaScript', 'HTML5', 'CSS3'],
    category: 'Web',
    year: '2024',
    role: 'Solo Developer',
    highlights: ['Custom playlist management', 'Hand-built audio controls'],
  },
]

export const SKILLS: Record<string, { name: string; level: number }[]> = {
  Languages: [
    { name: 'JavaScript', level: 88 },
    { name: 'PHP', level: 88 },
    { name: 'SQL', level: 85 },
    { name: 'Python', level: 65 },
    { name: 'HTML5 / CSS3', level: 90 },
  ],
  'Frontend & Mobile': [
    { name: 'React.js', level: 90 },
    { name: 'React Native / Expo', level: 85 },
    { name: 'Bootstrap 5', level: 88 },
    { name: 'Chart.js', level: 80 },
  ],
  'Backend & Database': [
    { name: 'MySQL', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'REST APIs', level: 80 },
    { name: 'Oracle', level: 55 },
  ],
  'Office & Data Tools': [
    { name: 'Advanced Excel', level: 85 },
    { name: 'MS Word / PowerPoint', level: 80 },
    { name: 'Tally', level: 60 },
  ],
  'Tools & Platforms': [
    { name: 'Git / GitHub', level: 85 },
    { name: 'Firebase', level: 75 },
    { name: 'VS Code', level: 90 },
    { name: 'AWS', level: 55 },
  ],
}

export const EXPERIENCE = [
  {
    role: 'Co-Founder & Lead Developer',
    org: 'ChitrakootDhamTour',
    period: '2024 — Present',
    description:
      'Built and launched a live spiritual tourism platform serving real pilgrimage visitors in Chitrakoot, MP. Designed responsive UI/UX with Firebase reviews, WhatsApp booking, AdSense and JSON-LD SEO schema. Implemented dynamic FAQ/Policies sections with HTML5 accordions.',
  },
  {
    role: 'Data Entry Operator',
    org: 'Sadguru Software & IT Services, Chitrakoot, MP',
    period: 'Jan 2026 — Jun 2026',
    description:
      'Accurately entered, verified and maintained large volumes of structured data with 98%+ accuracy at 30+ WPM. Produced client-facing reports in Advanced Excel (VLOOKUP, pivot tables), MS Word and PowerPoint. Managed digital records across SQL-based internal databases and collaborated with the IT team to streamline data pipelines, cutting processing time by ~20%.',
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
  { label: 'Full-stack apps shipped', value: '5+', detail: 'Web, mobile and systems projects, start to finish' },
  { label: 'Data accuracy on the job', value: '98%+', detail: 'Structured data entry at 30+ WPM' },
  { label: 'Report pages generated', value: '100+', detail: 'MCU-formatted, built programmatically with docx + Graphviz' },
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
