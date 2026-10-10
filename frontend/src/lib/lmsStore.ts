/**
 * DIGIHub LMS & Mentorship Store
 * Self-teaching tracks: Basic Coding & Cybersecurity Defense
 * 1-on-1 Mentorship Booking & Progress Tracking
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodeSandboxConfig {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  expectedKeywords?: string[];
  challengeInstructions: string;
}

export type CyberLabType = "phishing-detector" | "password-auditor" | "sqli-defender" | "network-inspector";

export interface CyberLabConfig {
  type: CyberLabType;
  title: string;
  scenario: string;
  targetData?: Record<string, any>;
  prompt: string;
  hint: string;
}

export interface TopicSection {
  heading: string;
  explanation: string;
  analogy?: string;
  keyPoints?: string[];
  codeSnippet?: {
    language: string;
    code: string;
    title?: string;
  };
}

export interface PythonLabConfig {
  title: string;
  scenario: string;
  initialCode: string;
  challengeInstructions: string;
  expectedOutputSubstring?: string;
  expectedVariables?: Record<string, any>;
  hint?: string;
}

export interface DigitalLiteracyLabConfig {
  type: "cloud-permissions" | "spreadsheet-formulas";
  title: string;
  scenario: string;
  prompt: string;
  hint: string;
}

export interface Topic {
  id: string;
  topicNumber: number;
  title: string;
  durationMinutes: number;
  summary: string;
  sections: TopicSection[];
  keyTakeaways: string[];
  hasLab: boolean;
  labType?: "sandbox" | "cyber" | "python" | "digital-literacy" | "quiz";
  sandboxConfig?: CodeSandboxConfig;
  cyberLabConfig?: CyberLabConfig;
  pythonLabConfig?: PythonLabConfig;
  digitalLiteracyLabConfig?: DigitalLiteracyLabConfig;
  quiz?: QuizQuestion[];
}

export interface Lesson {
  id: string;
  trackId: "coding" | "cybersecurity" | "digital-literacy" | "python" | string;
  moduleNumber: number;
  moduleTitle: string;
  lessonNumber: number;
  title: string;
  durationMinutes: number;
  level: "Beginner" | "Intermediate";
  xpAward: number;
  summary: string;
  videoUrl?: string;
  topics?: Topic[];
  markdownContent?: string;
  keyTakeaways: string[];
  sandboxConfig?: CodeSandboxConfig;
  cyberLabConfig?: CyberLabConfig;
  pythonLabConfig?: PythonLabConfig;
  digitalLiteracyLabConfig?: DigitalLiteracyLabConfig;
  quiz: QuizQuestion[];
}

export interface CourseSyllabusWeek {
  week: number;
  title: string;
  description: string;
  hours: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  badge: string;
  category:
    | "Coding & Web"
    | "Cybersecurity"
    | "Digital Literacy"
    | "Programming"
    | "Data & AI"
    | "Cloud & DevOps"
    | "Mobile & Apps"
    | "IT & Systems"
    | string;
  headline: string;
  description: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  organization: string;
  durationWeeks: number;
  totalModules: number;
  estimatedHours: number;
  level: "Beginner" | "Intermediate" | "All Levels" | "Beginner to Intermediate";
  language: string;
  rating: number;
  reviewsCount: number;
  enrolledStudentsCount: number;
  skillsGained: string[];
  prerequisites: string[];
  accentColor: "blue" | "red" | "green" | "yellow" | "purple" | "indigo";
  lessons: Lesson[];
  certificateEnabled: boolean;
  syllabus: CourseSyllabusWeek[];
}

export interface CertificateSettings {
  signerName: string;
  signerTitle: string;
  signatureUrl: string;
  sealUrl?: string;
  autoApproveOnCompletion: boolean;
  institutionName: string;
  accreditationText: string;
  lastUpdated?: string;
}

export interface CertificateRecord {
  id: string; // e.g. "DCG-CERT-2026-X812"
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  status: "pending_approval" | "approved" | "rejected";
  completionDate: string;
  approvedDate?: string;
  approvedBy?: string;
  signerName?: string;
  signerTitle?: string;
  signatureUrl?: string;
  sealUrl?: string;
  verificationCode: string;
  rejectionReason?: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: string;
  accentColor: "blue" | "red" | "green" | "yellow" | "purple" | "indigo";
  totalModules: number;
  totalLessons: number;
  totalHours: number;
  skillsGained: string[];
  lessons: Lesson[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  title: string;
  companyOrOrg: string;
  specialty: string;
  specialties: string[];
  avatar: string;
  bio: string;
  languages: string[];
  availableSlots: string[];
  rating: number;
  sessionsCompleted: number;
  totalSessions: number;
}

export interface MentorshipSession {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  mentorId: string;
  mentorName: string;
  mentorTitle?: string;
  mentorAvatar?: string;
  topic?: string;
  track?: "coding" | "cybersecurity" | "career";
  trackTopic?: "coding" | "cybersecurity" | "career";
  date: string;
  timeSlot: string;
  notes?: string;
  meetingLink: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface LMSUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "email" | "google" | "facebook" | "apple" | "github";
  role: "student" | "mentor" | "admin";
  createdAt: string;
  lastActive: string;
  completedLessonIds: string[];
  enrolledTracks: ("coding" | "cybersecurity" | string)[];
  enrolledCourseIds: string[];
  currentTrackId: "coding" | "cybersecurity" | string;
  certificateClaimed: boolean;
  notes?: string;
  onboardingCompleted?: boolean;
  careerGoal?: string;
  currentRole?: string;
  targetSkills?: string[];
  educationLevel?: string;
}

export interface LearnerProgress {
  completedLessonIds: string[];
  currentTrackId: "coding" | "cybersecurity" | string;
  enrolledCourseIds: string[];
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  certificateClaimed: boolean;
  studentName: string;
  onboardingCompleted?: boolean;
  careerGoal?: string;
  currentRole?: string;
  targetSkills?: string[];
  educationLevel?: string;
}

// ─── INITIAL LESSON DATA ───────────────────────────────────────────────
import { INITIAL_LESSONS } from "./lmsLessonsData";
export { INITIAL_LESSONS };

// ─── DIGICONNECT GHANA ACADEMY COURSE CATALOG ─────────────────────────

export const COURSES: Course[] = [
  {
    id: "cybersecurity-architecture",
    title: "Cybersecurity Architecture & IAM Defense",
    slug: "cybersecurity-architecture-iam",
    badge: "DCG Cyber Architecture Diploma",
    category: "Cybersecurity",
    headline: "Design enterprise Zero-Trust architectures, secure hybrid cloud identities, and configure Identity & Access Management (IAM) governance.",
    description: "Developed by DigiConnect Ghana Technical Faculty. Step into the role of a Principal Security Architect: master enterprise cloud identity, role-based access control (RBAC), multi-factor authentication (MFA), and zero-trust verification for resilient digital infrastructure.",
    instructorName: "Sarah Mensah",
    instructorTitle: "Principal Cloud Security Architect, DCG",
    instructorAvatar: "/images/testimonials/participant-2.jpg",
    organization: "DigiConnect Cyber Academy",
    durationWeeks: 4,
    totalModules: 3,
    estimatedHours: 8,
    level: "Beginner to Intermediate",
    language: "English",
    rating: 4.9,
    reviewsCount: 68,
    enrolledStudentsCount: 312,
    skillsGained: [
      "Zero Trust Architecture",
      "Identity & Access Management (IAM)",
      "Role-Based Access Control (RBAC)",
      "Authentication vs Authorization",
      "Credential Auditing & MFA",
    ],
    prerequisites: ["Basic familiarity with computer networks and cloud fundamentals"],
    accentColor: "blue",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Identity & Access Management (IAM) & Cloud Access Controls",
        description: "Authentication vs Authorization, directory services, and central identity providers.",
        hours: 2,
      },
      {
        week: 2,
        title: "Role-Based Access Control (RBAC) & Least Privilege",
        description: "Designing security hierarchies, separating administrative duties, and just-in-time access.",
        hours: 2,
      },
      {
        week: 3,
        title: "Zero Trust Architecture & Enterprise Hardening",
        description: "Continuous micro-segmentation, packet encryption, and credential auditing.",
        hours: 2,
      },
      {
        week: 4,
        title: "Capstone: Enterprise Cloud Identity Posture Assessment",
        description: "Audit a real-world enterprise infrastructure configuration and remediate identity risks.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "cybersecurity-architecture"),
  },
  {
    id: "coding",
    title: "Foundations of Web Development & Basic Coding",
    slug: "web-development-foundations",
    badge: "DCG Web Engineering Certificate",
    category: "Coding & Web",
    headline: "Build modern, responsive websites and interactive web applications from scratch with HTML5, CSS3, and JavaScript.",
    description: "Designed specifically by DigiConnect Ghana for aspiring software developers and young creators in Ghana. This hands-on course takes you from foundational web architecture through to writing responsive CSS and dynamic JavaScript event listeners with live interactive browser sandboxes in every module.",
    instructorName: "Patrick Paul",
    instructorTitle: "Lead Technology Instructor & Director",
    instructorAvatar: "/images/testimonials/participant-1.jpg",
    organization: "DigiConnect Software Lab",
    durationWeeks: 4,
    totalModules: 3,
    estimatedHours: 6,
    level: "Beginner",
    language: "English",
    rating: 4.9,
    reviewsCount: 48,
    enrolledStudentsCount: 184,
    skillsGained: [
      "Semantic HTML5",
      "CSS Grid & Flexbox",
      "Mobile-First Responsive Design",
      "JavaScript ES6+",
      "DOM Manipulation",
      "Web Sandbox Debugging",
    ],
    prerequisites: ["No prior coding experience required • Basic computer literacy"],
    accentColor: "blue",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Web Architecture & HTML5 Essentials",
        description: "How the web works, client-server models, semantic markup, and launching your first webpage.",
        hours: 2,
      },
      {
        week: 2,
        title: "Modern CSS Styling, Flexbox & Responsive Layouts",
        description: "Visual design, layout systems, mobile viewports, and CSS custom variables.",
        hours: 2,
      },
      {
        week: 3,
        title: "Interactive JavaScript & DOM Event Listeners",
        description: "Event-driven scripting, dynamic UI manipulation, and browser interactivity.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "coding"),
  },
  {
    id: "cybersecurity",
    title: "Applied Cybersecurity & Defensive Threat Analysis",
    slug: "applied-cybersecurity-defense",
    badge: "DCG Cyber Defense Credential",
    category: "Cybersecurity",
    headline: "Deconstruct real-world cyber threats: detect phishing, evaluate password entropy, and defend against database injection attacks.",
    description: "Step into the role of a community digital defender with DigiConnect Ghana. Learn how malicious actors craft social engineering exploits and develop practical skills to defend corporate credentials and web databases using industry-standard OWASP best practices.",
    instructorName: "Kwame Osei-Tutu",
    instructorTitle: "Cyber Defense Specialist, DCG",
    instructorAvatar: "/images/testimonials/participant-2.jpg",
    organization: "DigiConnect Cyber Academy",
    durationWeeks: 4,
    totalModules: 3,
    estimatedHours: 6,
    level: "Beginner to Intermediate",
    language: "English",
    rating: 4.9,
    reviewsCount: 36,
    enrolledStudentsCount: 142,
    skillsGained: [
      "Phishing Forensic Analysis",
      "Social Engineering Detection",
      "Password Entropy & 2FA",
      "SQL Injection Mitigation",
      "OWASP Top 10 Hygiene",
    ],
    prerequisites: ["Basic familiarity with internet browsing and web security principles"],
    accentColor: "red",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Social Engineering & Phishing Email Forensic Analysis",
        description: "Deconstructing lookalike domains, deceptive headers, and urgent coercion.",
        hours: 2,
      },
      {
        week: 2,
        title: "Cryptographic Entropy & Authentication Hardening",
        description: "Mathematical entropy, dictionary attacks, brute-force timelines, and 2FA.",
        hours: 2,
      },
      {
        week: 3,
        title: "Web Application Database Defense & SQLi Neutralization",
        description: "Analyzing tautology injections and implementing parameterized queries.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "cybersecurity"),
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    slug: "data-analytics-business-intelligence",
    badge: "DCG Data & BI Diploma",
    category: "Data & AI",
    headline: "Harness data to solve organizational challenges: master spreadsheet modeling, SQL data extraction, and executive visual dashboards.",
    description: "Prepare for entry-level data analyst and intelligence roles. Learn the complete five-phase lifecycle: ask structured questions, clean messy spreadsheets, write SQL aggregation queries, and present dynamic business recommendations.",
    instructorName: "Eunice Addo",
    instructorTitle: "Senior Business Intelligence Analyst, DCG",
    instructorAvatar: "/images/testimonials/participant-3.jpg",
    organization: "DigiConnect Data Labs",
    durationWeeks: 4,
    totalModules: 3,
    estimatedHours: 8,
    level: "Beginner",
    language: "English",
    rating: 4.8,
    reviewsCount: 52,
    enrolledStudentsCount: 226,
    skillsGained: [
      "Data Analysis Lifecycle",
      "Spreadsheet Formulas (XLOOKUP, SUM)",
      "Data Cleaning & Hygiene",
      "SQL Extraction & Aggregation",
      "Visual Storytelling & Dashboards",
    ],
    prerequisites: ["None • Basic comfort with numbers"],
    accentColor: "indigo",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "The Data Analysis Lifecycle: Ask, Prepare & Process",
        description: "Problem formulation, data integrity, and cleaning corrupted or duplicate entries.",
        hours: 2,
      },
      {
        week: 2,
        title: "Spreadsheet Modeling & Business Formulas",
        description: "SUM, AVERAGE, COUNTIF, pivot tables, and financial calculation models.",
        hours: 2,
      },
      {
        week: 3,
        title: "Data Visualization & Dashboard Design",
        description: "Designing high-impact charts and communicating insights to executive stakeholders.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "data-analytics"),
  },
  {
    id: "python",
    title: "Python for Problem Solving & Automation",
    slug: "python-problem-solving",
    badge: "DCG Python Automation Certificate",
    category: "Programming",
    headline: "Learn the world's most versatile programming language to automate routine workflows, parse files, and solve real-world problems.",
    description: "An approachable and practical introduction to Python created by DigiConnect Ghana. Write scripts to automate repetitive tasks, manipulate data collections, and build algorithmic problem-solving confidence.",
    instructorName: "Patrick Paul",
    instructorTitle: "Lead Technology Instructor & Director",
    instructorAvatar: "/images/testimonials/participant-1.jpg",
    organization: "DigiConnect Software Lab",
    durationWeeks: 4,
    totalModules: 2,
    estimatedHours: 5,
    level: "Beginner",
    language: "English",
    rating: 4.9,
    reviewsCount: 54,
    enrolledStudentsCount: 210,
    skillsGained: [
      "Python 3 Syntax",
      "Control Flow & Loops",
      "File & Data Processing",
      "Scripting Automation",
      "Algorithmic Thinking",
    ],
    prerequisites: ["None • Recommended to take Basic Web Coding first"],
    accentColor: "yellow",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Python Syntax, Variables & Dynamic Typing",
        description: "Core syntax, data types, console I/O, and writing first Python automation script.",
        hours: 2.5,
      },
      {
        week: 2,
        title: "Control Flow, Loops & Data Structures",
        description: "Conditionals, iteration loops, lists, dictionaries, and file processing.",
        hours: 2.5,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "python"),
  },
  {
    id: "cloud-devops",
    title: "Cloud Architecture & DevOps Deployment",
    slug: "cloud-architecture-devops",
    badge: "DCG Cloud Architecture Certificate",
    category: "Cloud & DevOps",
    headline: "Deploy scalable cloud infrastructure, master Docker containerization, configure CI/CD pipelines, and secure modern cloud workloads.",
    description: "Designed by DigiConnect Ghana for aspiring cloud engineers. Learn how modern tech ecosystems replace physical hardware with elastic virtual compute, object storage, and continuous automated deployment pipelines.",
    instructorName: "Kofi Owusu",
    instructorTitle: "Senior Cloud DevOps Lead, DCG",
    instructorAvatar: "/images/testimonials/participant-2.jpg",
    organization: "DigiConnect Cloud Academy",
    durationWeeks: 5,
    totalModules: 3,
    estimatedHours: 8,
    level: "Beginner to Intermediate",
    language: "English",
    rating: 4.9,
    reviewsCount: 44,
    enrolledStudentsCount: 195,
    skillsGained: [
      "Cloud Infrastructure Fundamentals",
      "Virtual Private Cloud (VPC)",
      "Docker Containers",
      "CI/CD Pipelines",
      "High Availability & Elastic Scaling",
    ],
    prerequisites: ["Basic command line familiarity and web fundamentals"],
    accentColor: "blue",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Cloud Infrastructure Architecture & Core Fundamentals",
        description: "Regions, availability zones, compute instances, and cloud networking.",
        hours: 2,
      },
      {
        week: 2,
        title: "Containerization with Docker & Microservices",
        description: "Writing Dockerfiles, building container images, and container registries.",
        hours: 2,
      },
      {
        week: 3,
        title: "Automated Deployments & Continuous Integration (CI/CD)",
        description: "GitHub Actions, automated testing, and zero-downtime rolling releases.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "cloud-devops"),
  },
  {
    id: "machine-learning",
    title: "Machine Learning & AI Foundations",
    slug: "machine-learning-ai-foundations",
    badge: "DCG AI & Machine Learning Diploma",
    category: "Data & AI",
    headline: "Build predictive models with Python: master linear regression, classification, model evaluation, and neural network concepts.",
    description: "Unlock the mathematical foundations of artificial intelligence with DigiConnect Ghana. Discover how algorithms learn predictive patterns from historical datasets, compute gradient descent, and evaluate generalization error.",
    instructorName: "Dr. Yaw Asare",
    instructorTitle: "Machine Learning Researcher, DCG",
    instructorAvatar: "/images/testimonials/participant-3.jpg",
    organization: "DigiConnect AI Institute",
    durationWeeks: 5,
    totalModules: 3,
    estimatedHours: 8,
    level: "Intermediate",
    language: "English",
    rating: 4.9,
    reviewsCount: 38,
    enrolledStudentsCount: 165,
    skillsGained: [
      "Supervised vs Unsupervised Learning",
      "Linear & Logistic Regression",
      "Loss Functions & Gradient Descent",
      "Training vs Testing Validation",
      "Scikit-Learn & Python Data Science",
    ],
    prerequisites: ["Python fundamentals and basic algebra concepts"],
    accentColor: "purple",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Introduction to Machine Learning & Predictive Modeling",
        description: "Core paradigms, feature engineering, and model training workflows.",
        hours: 2.5,
      },
      {
        week: 2,
        title: "Regression & Optimization with Gradient Descent",
        description: "Minimizing loss functions and calculating optimal model coefficients.",
        hours: 2.5,
      },
      {
        week: 3,
        title: "Classification Algorithms & Model Generalization",
        description: "Logistic regression, precision/recall metrics, and avoiding overfitting.",
        hours: 3,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "machine-learning"),
  },
  {
    id: "prompt-engineering",
    title: "Generative AI Prompt Engineering for Professionals",
    slug: "generative-ai-prompt-engineering",
    badge: "DCG Generative AI Credential",
    category: "Data & AI",
    headline: "Master prompt design for Large Language Models: few-shot reasoning, chain of thought, structured JSON, and agentic workflows.",
    description: "Turn generative AI into your superpower with DigiConnect Ghana's applied course. Learn how tokens, context windows, and probabilistic completions work, and apply proven prompting patterns to generate reliable code, analysis, and structured outputs.",
    instructorName: "Patrick Paul",
    instructorTitle: "Lead Technology Instructor & Director",
    instructorAvatar: "/images/testimonials/participant-1.jpg",
    organization: "DigiConnect AI Institute",
    durationWeeks: 3,
    totalModules: 2,
    estimatedHours: 5,
    level: "Beginner",
    language: "English",
    rating: 4.9,
    reviewsCount: 62,
    enrolledStudentsCount: 280,
    skillsGained: [
      "Tokens & Context Window Mechanics",
      "Few-Shot & Zero-Shot Prompting",
      "Chain-of-Thought (CoT) Reasoning",
      "Structured Output Formatting (JSON)",
      "Hallucination Mitigation & Guardrails",
    ],
    prerequisites: ["None"],
    accentColor: "blue",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "LLM Mechanics, Tokens & Cognitive Constraints",
        description: "Understanding probabilistic text generation, roles, and context framing.",
        hours: 2,
      },
      {
        week: 2,
        title: "Advanced Prompting Patterns & System Guardrails",
        description: "Few-shot templates, step-by-step reasoning, and enforcing schema compliance.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "prompt-engineering"),
  },
  {
    id: "mobile-dev",
    title: "Cross-Platform Mobile App Development with React Native",
    slug: "mobile-app-development-react-native",
    badge: "DCG Mobile Engineering Certificate",
    category: "Mobile & Apps",
    headline: "Build and deploy production mobile apps for iOS and Android using modern component-driven architectures and native APIs.",
    description: "Master cross-platform mobile development with DigiConnect Ghana. Build rich, responsive smartphone user interfaces with React Native, flexbox layout, touch gestures, state management, and device camera/GPS access.",
    instructorName: "Emmanuel Mensah",
    instructorTitle: "Mobile Engineering Lead, DCG",
    instructorAvatar: "/images/testimonials/participant-2.jpg",
    organization: "DigiConnect Software Lab",
    durationWeeks: 5,
    totalModules: 3,
    estimatedHours: 8,
    level: "Beginner to Intermediate",
    language: "English",
    rating: 4.8,
    reviewsCount: 41,
    enrolledStudentsCount: 178,
    skillsGained: [
      "React Native & JSX",
      "Mobile Component Hierarchy",
      "Mobile-First Flexbox Layouts",
      "Touch Gesture Handling",
      "Native Device APIs & Navigation",
    ],
    prerequisites: ["Basic JavaScript and web development fundamentals"],
    accentColor: "indigo",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Native Mobile UI vs Web Views",
        description: "Architecture of React Native, Hermes engine, and native runtime widgets.",
        hours: 2.5,
      },
      {
        week: 2,
        title: "Layout Systems, SafeAreas & Touch Ergonomics",
        description: "Flexbox direction, responsive phone screens, and 44px tap targets.",
        hours: 2.5,
      },
      {
        week: 3,
        title: "State Management & Device Navigation",
        description: "Stack navigators, tab bars, local storage, and app publishing preparation.",
        hours: 3,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "mobile-dev"),
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking & Network Penetration Testing",
    slug: "ethical-hacking-penetration-testing",
    badge: "DCG Ethical Hacking Credential",
    category: "Cybersecurity",
    headline: "Scan network perimeters, analyze open ports with Nmap, and ethically identify infrastructure vulnerabilities before attackers strike.",
    description: "Train with DigiConnect Ghana's cybersecurity team. Learn reconnaissance methodologies, packet sniffing with Wireshark, scanning open ports, identifying unencrypted legacy protocols, and compiling executive remediation reports.",
    instructorName: "Kwame Osei-Tutu",
    instructorTitle: "Certified Ethical Hacker & Defense Specialist, DCG",
    instructorAvatar: "/images/testimonials/participant-2.jpg",
    organization: "DigiConnect Cyber Academy",
    durationWeeks: 5,
    totalModules: 3,
    estimatedHours: 8,
    level: "Intermediate",
    language: "English",
    rating: 4.9,
    reviewsCount: 47,
    enrolledStudentsCount: 198,
    skillsGained: [
      "Penetration Testing Methodology",
      "Network Port Scanning & Nmap",
      "Packet Sniffing with Wireshark",
      "Vulnerability Identification",
      "Perimeter Defense Hardening",
    ],
    prerequisites: ["Foundations of cybersecurity and TCP/IP networking"],
    accentColor: "red",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Ethical Hacking Ethics & Rules of Engagement",
        description: "Legal boundaries, written authorization, and assessment scoping.",
        hours: 2.5,
      },
      {
        week: 2,
        title: "Network Reconnaissance & Port Scanning",
        description: "TCP three-way handshakes, SYN scans, banner grabbing, and service detection.",
        hours: 2.5,
      },
      {
        week: 3,
        title: "Vulnerability Assessment & Security Remediation",
        description: "Identifying dangerous unencrypted ports (Telnet, FTP) and firewall configuration.",
        hours: 3,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "ethical-hacking"),
  },
  {
    id: "it-support",
    title: "IT Support Professional & Systems Engineering",
    slug: "it-support-professional-systems",
    badge: "DCG IT Systems Certificate",
    category: "IT & Systems",
    headline: "Master computer hardware diagnostics, operating systems administration, local area networking, and client ticketing troubleshooting.",
    description: "Launch your career in IT infrastructure with DigiConnect Ghana. Learn how CPUs, RAM, and SSDs communicate, troubleshoot Windows and Linux operating systems via command line, and isolate network connectivity outages systematically.",
    instructorName: "Blessing Appiah",
    instructorTitle: "IT Systems Specialist, DCG",
    instructorAvatar: "/images/testimonials/participant-3.jpg",
    organization: "DigiConnect Systems & IT Faculty",
    durationWeeks: 4,
    totalModules: 3,
    estimatedHours: 7,
    level: "Beginner",
    language: "English",
    rating: 4.8,
    reviewsCount: 39,
    enrolledStudentsCount: 160,
    skillsGained: [
      "Computer Hardware Architecture",
      "BIOS & POST Boot Diagnostics",
      "Command Line Administration",
      "TCP/IP, DNS & DHCP Troubleshooting",
      "Client Support Ticketing",
    ],
    prerequisites: ["None • Eagerness to understand physical and digital computer systems"],
    accentColor: "green",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Hardware Architecture & Motherboard Components",
        description: "CPU, memory buses, solid state storage, and power supply diagnostics.",
        hours: 2,
      },
      {
        week: 2,
        title: "Operating Systems & Command Line Troubleshooting",
        description: "Process management, file permissions, and system recovery environments.",
        hours: 2,
      },
      {
        week: 3,
        title: "Networking Diagnostics: Ping, DNS & Default Gateways",
        description: "4-step network troubleshooting checklist and restoring client internet access.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "it-support"),
  },
  {
    id: "digital-literacy",
    title: "Digital Workplace Productivity & Cloud Collaboration",
    slug: "digital-workplace-productivity",
    badge: "DCG Digital Workplace Certificate",
    category: "Digital Literacy",
    headline: "Master essential cloud productivity tools, collaborative workspaces, professional digital communication, and data hygiene.",
    description: "Designed by DigiConnect Ghana to prepare students and career entrants for modern digital office environments across Africa and global remote teams. Covers cloud workspaces, document collaboration, spreadsheets, and digital privacy.",
    instructorName: "Akosua Mensah",
    instructorTitle: "Digital Workforce Specialist, DCG",
    instructorAvatar: "/images/testimonials/participant-3.jpg",
    organization: "DigiConnect Community Literacy Center",
    durationWeeks: 3,
    totalModules: 2,
    estimatedHours: 4,
    level: "Beginner",
    language: "English",
    rating: 4.8,
    reviewsCount: 29,
    enrolledStudentsCount: 98,
    skillsGained: [
      "Cloud Workspaces & Storage",
      "Data Hygiene & Spreadsheets",
      "Document Versioning",
      "Remote Team Etiquette",
    ],
    prerequisites: ["None"],
    accentColor: "green",
    certificateEnabled: true,
    syllabus: [
      {
        week: 1,
        title: "Cloud Workspaces & Document Versioning",
        description: "Organizing collaborative cloud folders, access controls, and real-time editing.",
        hours: 2,
      },
      {
        week: 2,
        title: "Data Management & Digital Productivity Workflows",
        description: "Spreadsheet fundamentals, formulas, survey form collection, and privacy hygiene.",
        hours: 2,
      },
    ],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "digital-literacy"),
  },
];

// ─── INITIAL TRACKS (BACKWARD COMPATIBILITY) ───────────────────────────

export const LEARNING_TRACKS: LearningTrack[] = COURSES.map((c) => ({
  id: c.id,
  title: c.title,
  badge: c.badge,
  description: c.description,
  icon: c.id === "coding" ? "Code" : c.id === "cybersecurity" ? "ShieldCheck" : c.id === "digital-literacy" ? "BookOpen" : "Terminal",
  accentColor: c.accentColor,
  totalModules: c.totalModules,
  totalLessons: c.lessons.length,
  totalHours: c.estimatedHours,
  skillsGained: c.skillsGained,
  lessons: c.lessons,
}));

// ─── INITIAL MENTORS ───────────────────────────────────────────────────

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: "mentor-1",
    name: "Kofi Boateng",
    role: "Founder & Lead Software Architect",
    title: "Founder & Lead Software Architect",
    companyOrOrg: "DigiConnect Ghana",
    specialty: "Frontend & Web",
    specialties: ["Frontend & Web", "React", "TypeScript", "Career Mentorship"],
    avatar: "/images/testimonials/participant-1.jpg",
    bio: "Fullstack software engineer with 8+ years experience guiding Ghanaian youth through HTML, CSS, JavaScript, and career readiness.",
    languages: ["English", "Twi"],
    availableSlots: [
      "Tuesdays, 3:00 PM – 4:00 PM GMT",
      "Thursdays, 4:00 PM – 5:00 PM GMT",
      "Saturdays, 11:00 AM – 12:00 PM GMT",
    ],
    rating: 4.9,
    sessionsCompleted: 48,
    totalSessions: 48,
  },
  {
    id: "mentor-2",
    name: "Kwame Osei-Tutu",
    role: "Cybersecurity Analyst & Threat Specialist",
    title: "Cybersecurity Analyst & Threat Specialist",
    companyOrOrg: "Accra CyberSec Labs",
    specialty: "Cyber Defense",
    specialties: ["Cyber Defense", "Phishing Analysis", "OWASP Security", "Ethical Hacking"],
    avatar: "/images/testimonials/participant-2.jpg",
    bio: "Information security specialist focused on digital hygiene, phishing mitigation, and training future African security defenders.",
    languages: ["English", "Ga"],
    availableSlots: [
      "Mondays, 5:00 PM – 6:00 PM GMT",
      "Wednesdays, 2:00 PM – 3:00 PM GMT",
      "Saturdays, 2:00 PM – 3:00 PM GMT",
    ],
    rating: 5.0,
    sessionsCompleted: 35,
    totalSessions: 35,
  },
  {
    id: "mentor-3",
    name: "Dr. Ama Owusu-Ansah",
    role: "Head of Learning & CS Curriculum",
    title: "Head of Learning & CS Curriculum",
    companyOrOrg: "DigiConnect Faculty",
    specialty: "JavaScript & Logic",
    specialties: ["JavaScript & Logic", "Algorithms", "CS Education", "Women in Tech"],
    avatar: "/images/testimonials/participant-3.jpg",
    bio: "Computer science educator passionate about breaking down complex algorithmic concepts and supporting female students in tech.",
    languages: ["English", "Twi", "Fante"],
    availableSlots: [
      "Wednesdays, 4:00 PM – 5:00 PM GMT",
      "Fridays, 10:00 AM – 11:00 AM GMT",
    ],
    rating: 4.8,
    sessionsCompleted: 62,
    totalSessions: 62,
  },
  {
    id: "mentor-4",
    name: "Abena Serwaa",
    role: "Junior Web Developer & Alumni Mentor",
    title: "Junior Web Developer & Alumni Mentor",
    companyOrOrg: "DigiConnect Cohort 1 Alumni",
    specialty: "Tech Careers",
    specialties: ["Tech Careers", "Junior Dev Prep", "CSS Styling", "Portfolio Reviews"],
    avatar: "/images/testimonials/participant-4.jpg",
    bio: "Former DCG bootcamp graduate now building commercial web products. Passionate about CV reviews, portfolio polish, and junior dev prep.",
    languages: ["English", "Twi"],
    availableSlots: [
      "Thursdays, 5:30 PM – 6:30 PM GMT",
      "Saturdays, 4:00 PM – 5:00 PM GMT",
    ],
    rating: 4.9,
    sessionsCompleted: 27,
    totalSessions: 27,
  },
];

// ─── INITIAL SESSIONS ──────────────────────────────────────────────────

export const INITIAL_SESSIONS: MentorshipSession[] = [
  {
    id: "sess-1",
    studentName: "Emmanuel Adjei",
    studentEmail: "emmanuel.adjei@example.com",
    studentPhone: "+233 24 555 0192",
    mentorId: "mentor-1",
    mentorName: "Kofi Boateng",
    mentorTitle: "Founder & Lead Software Architect",
    mentorAvatar: "/images/testimonials/participant-1.jpg",
    topic: "Reviewing my first Flexbox portfolio layout",
    track: "coding",
    trackTopic: "coding",
    date: "2026-10-10",
    timeSlot: "Saturdays, 11:00 AM – 12:00 PM GMT",
    meetingLink: "https://meet.jit.si/dcg-mentorship-kofi-emmanuel",
    status: "confirmed",
    createdAt: "2026-10-02T10:00:00Z",
  },
  {
    id: "sess-2",
    studentName: "Akosua Mensah",
    studentEmail: "akosua.m@example.com",
    studentPhone: "+233 50 123 4567",
    mentorId: "mentor-2",
    mentorName: "Kwame Osei-Tutu",
    mentorTitle: "Cybersecurity Analyst & Threat Specialist",
    mentorAvatar: "/images/testimonials/participant-2.jpg",
    topic: "Understanding SMS Phishing & 2FA authentication models",
    track: "cybersecurity",
    trackTopic: "cybersecurity",
    date: "2026-10-12",
    timeSlot: "Mondays, 5:00 PM – 6:00 PM GMT",
    meetingLink: "https://meet.jit.si/dcg-mentorship-kwame-akosua",
    status: "confirmed",
    createdAt: "2026-10-03T14:30:00Z",
  },
];

// ─── REGISTERED STUDENTS (PERSISTED IN STORAGE) ─────────────────────────

export const INITIAL_STUDENTS: LMSUser[] = [];

// ─── LOCAL STORAGE KEYS & STORE HELPERS ────────────────────────────────

const LMS_USERS_KEY = "dcg_digihub_users_v3";
const LMS_ACTIVE_USER_KEY = "dcg_digihub_active_user_v3";
const LMS_PROGRESS_KEY = "dcg_digihub_progress_v3";
const LMS_SESSIONS_KEY = "dcg_digihub_sessions_v3";
const LMS_LESSONS_KEY = "dcg_digihub_lessons_v3";

export function getAllLMSUsers(): LMSUser[] {
  if (typeof window === "undefined") return INITIAL_STUDENTS;
  try {
    const raw = localStorage.getItem(LMS_USERS_KEY);
    if (!raw) {
      localStorage.setItem(LMS_USERS_KEY, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_STUDENTS;
  }
}

export function saveLMSUsers(users: LMSUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LMS_USERS_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event("digihub_users_updated"));
}

export function getActiveUser(): LMSUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LMS_ACTIVE_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setActiveUser(user: LMSUser | null): void {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(LMS_ACTIVE_USER_KEY);
  } else {
    localStorage.setItem(LMS_ACTIVE_USER_KEY, JSON.stringify(user));
  }
  window.dispatchEvent(new Event("digihub_auth_changed"));
}

export function signInWithEmail(email: string, _password?: string): { success: boolean; user?: LMSUser; error?: string } {
  const users = getAllLMSUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    existing.lastActive = new Date().toISOString();
    saveLMSUsers(users);
    setActiveUser(existing);
    return { success: true, user: existing };
  }
  return { success: false, error: "No account found with this email address. Please sign up." };
}

export function signUpWithEmail(
  name: string,
  email: string,
  _password?: string,
  track: "coding" | "cybersecurity" = "coding"
): { success: boolean; user?: LMSUser; error?: string } {
  const users = getAllLMSUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    setActiveUser(existing);
    return { success: true, user: existing };
  }

  const newUser: LMSUser = {
    id: `stu-${Date.now().toString(36)}`,
    name: name.trim() || "Student",
    email: normalizedEmail,
    provider: "email",
    role: "student",
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    completedLessonIds: [],
    enrolledTracks: [track],
    enrolledCourseIds: [track],
    currentTrackId: track,
    certificateClaimed: false,
  };

  users.unshift(newUser);
  saveLMSUsers(users);
  setActiveUser(newUser);
  return { success: true, user: newUser };
}

export function signInWithSocialProvider(
  provider: "google" | "facebook" | "apple" | "github",
  customName?: string,
  customEmail?: string
): LMSUser {
  const users = getAllLMSUsers();
  const email = (customEmail || `learner.${Date.now().toString(36)}@auth.${provider}.com`).trim().toLowerCase();
  const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1);
  const name = customName?.trim() || `${providerLabel} Learner`;

  const existing = users.find((u) => u.email.toLowerCase() === email);
  let activeUser: LMSUser;

  if (existing) {
    existing.lastActive = new Date().toISOString();
    existing.provider = provider;
    if (!existing.enrolledCourseIds || existing.enrolledCourseIds.length === 0) {
      existing.enrolledCourseIds = ["cybersecurity-architecture", "coding", "data-analytics"];
    }
    if (!existing.currentTrackId) {
      existing.currentTrackId = "cybersecurity-architecture";
    }
    activeUser = existing;
  } else {
    activeUser = {
      id: `stu-${provider[0]}-${Date.now().toString(36)}`,
      name,
      email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      provider,
      role: "student",
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      completedLessonIds: [],
      enrolledTracks: ["cybersecurity-architecture", "coding", "data-analytics"],
      enrolledCourseIds: ["cybersecurity-architecture", "coding", "data-analytics"],
      currentTrackId: "cybersecurity-architecture",
      certificateClaimed: false,
    };
    users.unshift(activeUser);
  }

  saveLMSUsers(users);
  setActiveUser(activeUser);
  return activeUser;
}

export function signInWithGoogle(customName?: string, customEmail?: string): LMSUser {
  return signInWithSocialProvider("google", customName, customEmail);
}

export function signOutLMS(): void {
  setActiveUser(null);
}

export function completeLearnerOnboarding(
  goal: string,
  role: string,
  skills: string[],
  educationLevel?: string,
  recommendedCourseIds?: string[]
): LMSUser | null {
  const active = getActiveUser();
  if (!active) return null;

  active.onboardingCompleted = true;
  active.careerGoal = goal;
  active.currentRole = role;
  active.targetSkills = skills;
  active.educationLevel = educationLevel;
  active.lastActive = new Date().toISOString();

  if (recommendedCourseIds && recommendedCourseIds.length > 0) {
    if (!active.enrolledCourseIds) active.enrolledCourseIds = [];
    for (const cid of recommendedCourseIds) {
      if (!active.enrolledCourseIds.includes(cid)) {
        active.enrolledCourseIds.push(cid);
      }
      if (!active.enrolledTracks.includes(cid)) {
        active.enrolledTracks.push(cid);
      }
    }
    if (recommendedCourseIds[0]) {
      active.currentTrackId = recommendedCourseIds[0];
    }
  }

  const users = getAllLMSUsers();
  const updatedUsers = users.map((u) => (u.id === active.id ? active : u));
  saveLMSUsers(updatedUsers);
  setActiveUser(active);

  const progress = getLearnerProgress();
  progress.onboardingCompleted = true;
  progress.careerGoal = goal;
  progress.currentRole = role;
  progress.targetSkills = skills;
  progress.educationLevel = educationLevel;
  if (recommendedCourseIds && recommendedCourseIds.length > 0) {
    progress.enrolledCourseIds = active.enrolledCourseIds;
    progress.currentTrackId = active.currentTrackId;
  }
  saveLearnerProgress(progress);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("digihub_progress_updated"));
    window.dispatchEvent(new Event("digihub_auth_changed"));
    window.dispatchEvent(new Event("digihub_enrollment_updated"));
  }

  return active;
}

export function getLearnerProgress(): LearnerProgress {
  const activeUser = getActiveUser();

  if (typeof window === "undefined") {
    return {
      completedLessonIds: activeUser ? activeUser.completedLessonIds : [],
      currentTrackId: activeUser ? activeUser.currentTrackId : "coding",
      enrolledCourseIds: activeUser?.enrolledCourseIds || ["coding"],
      xp: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      certificateClaimed: activeUser ? activeUser.certificateClaimed : false,
      studentName: activeUser ? activeUser.name : "Learner",
      onboardingCompleted: activeUser ? activeUser.onboardingCompleted : false,
      careerGoal: activeUser?.careerGoal,
      currentRole: activeUser?.currentRole,
      targetSkills: activeUser?.targetSkills,
      educationLevel: activeUser?.educationLevel,
    };
  }

  try {
    const raw = localStorage.getItem(LMS_PROGRESS_KEY);
    if (!raw) {
      const initial: LearnerProgress = {
        completedLessonIds: activeUser ? activeUser.completedLessonIds : [],
        currentTrackId: activeUser ? activeUser.currentTrackId : "coding",
        enrolledCourseIds: activeUser?.enrolledCourseIds || ["coding"],
        xp: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        certificateClaimed: activeUser ? activeUser.certificateClaimed : false,
        studentName: activeUser ? activeUser.name : "Learner",
        onboardingCompleted: activeUser ? activeUser.onboardingCompleted : false,
        careerGoal: activeUser?.careerGoal,
        currentRole: activeUser?.currentRole,
        targetSkills: activeUser?.targetSkills,
        educationLevel: activeUser?.educationLevel,
      };
      localStorage.setItem(LMS_PROGRESS_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (activeUser) {
      // Sync with active user
      parsed.completedLessonIds = activeUser.completedLessonIds;
      parsed.studentName = activeUser.name;
      parsed.certificateClaimed = activeUser.certificateClaimed;
      parsed.onboardingCompleted = activeUser.onboardingCompleted;
      parsed.careerGoal = activeUser.careerGoal;
      parsed.currentRole = activeUser.currentRole;
      parsed.targetSkills = activeUser.targetSkills;
      parsed.educationLevel = activeUser.educationLevel;
    }
    return parsed;
  } catch {
    return {
      completedLessonIds: activeUser ? activeUser.completedLessonIds : [],
      currentTrackId: activeUser ? activeUser.currentTrackId : "coding",
      enrolledCourseIds: activeUser ? (activeUser.enrolledCourseIds || ["coding", "cybersecurity"]) : ["coding", "cybersecurity"],
      xp: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      certificateClaimed: activeUser ? activeUser.certificateClaimed : false,
      studentName: activeUser ? activeUser.name : "Learner",
      onboardingCompleted: activeUser ? activeUser.onboardingCompleted : false,
      careerGoal: activeUser?.careerGoal,
      currentRole: activeUser?.currentRole,
      targetSkills: activeUser?.targetSkills,
      educationLevel: activeUser?.educationLevel,
    };
  }
}

export function saveLearnerProgress(progress: LearnerProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LMS_PROGRESS_KEY, JSON.stringify(progress));

  // Sync to active user if logged in
  const activeUser = getActiveUser();
  if (activeUser) {
    activeUser.completedLessonIds = progress.completedLessonIds;
    activeUser.name = progress.studentName;
    activeUser.certificateClaimed = progress.certificateClaimed;
    activeUser.onboardingCompleted = progress.onboardingCompleted;
    activeUser.careerGoal = progress.careerGoal;
    activeUser.currentRole = progress.currentRole;
    activeUser.targetSkills = progress.targetSkills;
    activeUser.educationLevel = progress.educationLevel;
    activeUser.lastActive = new Date().toISOString();
    setActiveUser(activeUser);

    const allUsers = getAllLMSUsers();
    const updated = allUsers.map((u) => (u.id === activeUser.id ? activeUser : u));
    saveLMSUsers(updated);
  }

  window.dispatchEvent(new Event("digihub_progress_updated"));
}

export function markLessonCompleted(lessonId: string, xpAward: number): LearnerProgress {
  const current = getLearnerProgress();
  if (!current.completedLessonIds.includes(lessonId)) {
    current.completedLessonIds.push(lessonId);
    current.xp += xpAward;
    current.streakDays = Math.max(1, current.streakDays);
    current.lastActiveDate = new Date().toISOString().split("T")[0];
    saveLearnerProgress(current);

    // Sync active user if signed in
    const active = getActiveUser();
    if (active) {
      active.completedLessonIds = current.completedLessonIds;
      active.lastActive = new Date().toISOString();
      const users = getAllLMSUsers().map((u) => (u.id === active.id ? active : u));
      saveLMSUsers(users);
      setActiveUser(active);

      // Check if any course is 100% completed to generate certificate
      const courses = getAllCourses();
      for (const course of courses) {
        const cLessonIds = course.lessons.map((l) => l.id);
        const isFinished = cLessonIds.length > 0 && cLessonIds.every((id) => current.completedLessonIds.includes(id));
        if (isFinished) {
          requestCourseCertificate(course.id, active);
        }
      }
    }
  }
  return current;
}

export function adminToggleUserLesson(userId: string, lessonId: string): void {
  const users = getAllLMSUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  if (user.completedLessonIds.includes(lessonId)) {
    user.completedLessonIds = user.completedLessonIds.filter((id) => id !== lessonId);
  } else {
    user.completedLessonIds.push(lessonId);
  }

  user.certificateClaimed = user.completedLessonIds.length >= 4;
  user.lastActive = new Date().toISOString();

  // If this completed any course, request certificate for user
  const courses = getAllCourses();
  for (const course of courses) {
    const cLessonIds = course.lessons.map((l) => l.id);
    const isFinished = cLessonIds.length > 0 && cLessonIds.every((id) => user.completedLessonIds.includes(id));
    if (isFinished) {
      requestCourseCertificate(course.id, user);
    }
  }

  saveLMSUsers(users);

  // If this user is currently active in browser, sync active user
  const active = getActiveUser();
  if (active && active.id === userId) {
    setActiveUser(user);
    const progress = getLearnerProgress();
    progress.completedLessonIds = user.completedLessonIds;
    progress.certificateClaimed = user.certificateClaimed;
    saveLearnerProgress(progress);
  }
}

export function adminDeleteUser(userId: string): void {
  const users = getAllLMSUsers().filter((u) => u.id !== userId);
  saveLMSUsers(users);

  const active = getActiveUser();
  if (active && active.id === userId) {
    signOutLMS();
  }
}

export function getBookedSessions(): MentorshipSession[] {
  if (typeof window === "undefined") return INITIAL_SESSIONS;
  try {
    const raw = localStorage.getItem(LMS_SESSIONS_KEY);
    if (!raw) {
      localStorage.setItem(LMS_SESSIONS_KEY, JSON.stringify(INITIAL_SESSIONS));
      return INITIAL_SESSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SESSIONS;
  }
}

export function bookMentorshipSession(sessionData: Omit<MentorshipSession, "id" | "createdAt" | "status" | "meetingLink">): MentorshipSession {
  const sessions = getBookedSessions();
  const roomName = `dcg-${sessionData.mentorId}-${Date.now().toString(36)}`;
  const newSession: MentorshipSession = {
    ...sessionData,
    id: `sess-${Date.now()}`,
    meetingLink: `https://meet.jit.si/${roomName}`,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  sessions.unshift(newSession);
  if (typeof window !== "undefined") {
    localStorage.setItem(LMS_SESSIONS_KEY, JSON.stringify(sessions));
    window.dispatchEvent(new Event("digihub_sessions_updated"));
  }
  return newSession;
}

export function updateSessionStatus(id: string, status: MentorshipSession["status"]): void {
  const sessions = getBookedSessions().map((s) => (s.id === id ? { ...s, status } : s));
  if (typeof window !== "undefined") {
    localStorage.setItem(LMS_SESSIONS_KEY, JSON.stringify(sessions));
    window.dispatchEvent(new Event("digihub_sessions_updated"));
  }
}

export function getAllLessons(): Lesson[] {
  if (typeof window === "undefined") return INITIAL_LESSONS;
  try {
    const raw = localStorage.getItem(LMS_LESSONS_KEY);
    if (!raw) {
      localStorage.setItem(LMS_LESSONS_KEY, JSON.stringify(INITIAL_LESSONS));
      return INITIAL_LESSONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed[0]?.topics || parsed.length < INITIAL_LESSONS.length) {
      localStorage.setItem(LMS_LESSONS_KEY, JSON.stringify(INITIAL_LESSONS));
      return INITIAL_LESSONS;
    }
    return parsed;
  } catch {
    return INITIAL_LESSONS;
  }
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find((l) => l.id === id);
}

// ─── CERTIFICATE & SIGNATURE AUTHORITY KEYS & DEFAULTS ─────────────────

export const LMS_CERTIFICATES_KEY = "dcg_digihub_certificates_v1";
export const LMS_CERT_SETTINGS_KEY = "dcg_digihub_cert_settings_v1";

export const DEFAULT_OFFICIAL_SIGNATURE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="320" height="90"><path d="M 25,65 Q 45,15 70,25 T 95,70 Q 110,30 135,20 Q 150,15 160,40 T 180,65 Q 195,20 215,25 Q 230,30 240,55 T 270,45 Q 285,40 300,50" fill="none" stroke="%231565A8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M 55,42 Q 130,38 210,40" fill="none" stroke="%231565A8" stroke-width="2" stroke-linecap="round"/><path d="M 75,70 Q 140,82 250,72" fill="none" stroke="%232196D3" stroke-width="1.8" stroke-linecap="round"/></svg>`;

export const DEFAULT_CERTIFICATE_SETTINGS: CertificateSettings = {
  signerName: "Patrick Paul",
  signerTitle: "Executive Director & Academic Lead, DigiConnect Ghana",
  signatureUrl: DEFAULT_OFFICIAL_SIGNATURE,
  sealUrl: "/images/crest.png",
  autoApproveOnCompletion: false,
  institutionName: "DigiConnect Ghana Academy",
  accreditationText: "Conferred under the authority of the Academic Directorate of DigiConnect Ghana",
  lastUpdated: new Date().toISOString(),
};

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: "DCG-CERT-CYBER-8821",
    studentId: "stu-2",
    studentName: "Akosua Mensah",
    studentEmail: "akosua.m@gmail.com",
    courseId: "cybersecurity",
    courseTitle: "Applied Cybersecurity & Defensive Threat Analysis",
    status: "pending_approval",
    completionDate: "2026-10-03",
    verificationCode: "DCG-VERIFY-CYB-8821",
  },
  {
    id: "DCG-CERT-WEB-4109",
    studentId: "stu-4",
    studentName: "Blessing Appiah",
    studentEmail: "blessing.appiah@example.com",
    courseId: "coding",
    courseTitle: "Foundations of Web Development & Basic Coding",
    status: "approved",
    completionDate: "2026-10-02",
    approvedDate: "2026-10-03",
    approvedBy: "Patrick Paul",
    signerName: "Patrick Paul",
    signerTitle: "Executive Director & Academic Lead, DigiConnect Ghana",
    signatureUrl: DEFAULT_OFFICIAL_SIGNATURE,
    verificationCode: "DCG-VERIFY-WEB-4109",
  },
];

// ─── COURSE & ENROLLMENT HELPERS ───────────────────────────────────────

export const LMS_COURSES_KEY = "dcg_lms_courses_v2";

export function getAllCourses(): Course[] {
  if (typeof window === "undefined") return COURSES;
  try {
    const raw = localStorage.getItem(LMS_COURSES_KEY);
    if (!raw) {
      localStorage.setItem(LMS_COURSES_KEY, JSON.stringify(COURSES));
      return COURSES;
    }
    const parsed: Course[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length < COURSES.length) {
      localStorage.setItem(LMS_COURSES_KEY, JSON.stringify(COURSES));
      return COURSES;
    }
    return parsed;
  } catch {
    return COURSES;
  }
}

export function saveCourse(course: Course): Course[] {
  const current = getAllCourses();
  const index = current.findIndex((c) => c.id === course.id);
  let updated: Course[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...current[index], ...course };
  } else {
    updated = [course, ...current];
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(LMS_COURSES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("digihub_courses_updated"));
    // Asynchronously notify backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/lms/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    }).catch(() => {});
  }
  return updated;
}

export function deleteCourse(courseId: string): Course[] {
  const current = getAllCourses();
  const updated = current.filter((c) => c.id !== courseId);
  if (typeof window !== "undefined") {
    localStorage.setItem(LMS_COURSES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("digihub_courses_updated"));
    // Asynchronously notify backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/lms/courses/${courseId}`, {
      method: "DELETE",
    }).catch(() => {});
  }
  return updated;
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id || c.slug === id);
}

export function getEnrolledCourses(user?: LMSUser | null): Course[] {
  const targetUser = user || getActiveUser();
  if (!targetUser) return [COURSES[0]]; // Default first course for guests
  const enrolledIds = targetUser.enrolledCourseIds || targetUser.enrolledTracks || ["coding"];
  const list = COURSES.filter((c) => enrolledIds.includes(c.id));
  return list.length > 0 ? list : [COURSES[0]];
}

export function isEnrolledInCourse(courseId: string, user?: LMSUser | null): boolean {
  const targetUser = user || getActiveUser();
  if (!targetUser) return false;
  const enrolledIds = targetUser.enrolledCourseIds || targetUser.enrolledTracks || [];
  return enrolledIds.includes(courseId);
}

export function enrollInCourse(courseId: string, studentOrId?: string | LMSUser | null): boolean {
  const users = getAllLMSUsers();
  let targetUser: LMSUser | undefined;

  if (studentOrId && typeof studentOrId === "object") {
    targetUser = users.find((u) => u.id === studentOrId.id) || studentOrId;
  } else if (typeof studentOrId === "string") {
    targetUser = users.find((u) => u.id === studentOrId || u.email.toLowerCase() === studentOrId.toLowerCase());
  } else {
    targetUser = getActiveUser() || undefined;
  }

  if (!targetUser) return false;

  if (!targetUser.enrolledCourseIds) {
    targetUser.enrolledCourseIds = [];
  }
  if (!targetUser.enrolledCourseIds.includes(courseId)) {
    targetUser.enrolledCourseIds.push(courseId);
  }
  if (!targetUser.enrolledTracks.includes(courseId)) {
    targetUser.enrolledTracks.push(courseId);
  }
  targetUser.currentTrackId = courseId;
  targetUser.lastActive = new Date().toISOString();

  // Save to roster
  const updatedUsers = users.map((u) => (u.id === targetUser!.id ? targetUser! : u));
  saveLMSUsers(updatedUsers);

  // Sync active user if active
  const active = getActiveUser();
  if (active && active.id === targetUser.id) {
    setActiveUser(targetUser);
    const progress = getLearnerProgress();
    progress.enrolledCourseIds = targetUser.enrolledCourseIds;
    progress.currentTrackId = courseId;
    saveLearnerProgress(progress);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("digihub_enrollment_updated"));
  }
  return true;
}

export function unenrollFromCourse(courseId: string, studentOrId?: string | LMSUser | null): boolean {
  const users = getAllLMSUsers();
  let targetUser: LMSUser | undefined;

  if (studentOrId && typeof studentOrId === "object") {
    targetUser = users.find((u) => u.id === studentOrId.id) || studentOrId;
  } else if (typeof studentOrId === "string") {
    targetUser = users.find((u) => u.id === studentOrId || u.email.toLowerCase() === studentOrId.toLowerCase());
  } else {
    targetUser = getActiveUser() || undefined;
  }

  if (!targetUser) return false;

  targetUser.enrolledCourseIds = (targetUser.enrolledCourseIds || []).filter((id) => id !== courseId);
  targetUser.enrolledTracks = targetUser.enrolledTracks.filter((id) => id !== courseId);

  const updatedUsers = users.map((u) => (u.id === targetUser!.id ? targetUser! : u));
  saveLMSUsers(updatedUsers);

  const active = getActiveUser();
  if (active && active.id === targetUser.id) {
    setActiveUser(targetUser);
    const progress = getLearnerProgress();
    progress.enrolledCourseIds = targetUser.enrolledCourseIds;
    saveLearnerProgress(progress);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("digihub_enrollment_updated"));
  }
  return true;
}

export function getCourseProgress(
  courseId: string,
  completedLessonIds?: string[]
): { completed: number; total: number; percentage: number; isCompleted: boolean } {
  const course = getCourseById(courseId);
  if (!course) return { completed: 0, total: 0, percentage: 0, isCompleted: false };

  const completed = completedLessonIds || getLearnerProgress().completedLessonIds;
  const courseLessonIds = course.lessons.map((l) => l.id);
  const completedInCourse = courseLessonIds.filter((id) => completed.includes(id)).length;
  const total = courseLessonIds.length || 1;
  const percentage = Math.round((completedInCourse / total) * 100);
  const isCompleted = completedInCourse >= total && total > 0;

  return { completed: completedInCourse, total, percentage, isCompleted };
}

// ─── CERTIFICATE & FACULTY SIGNATURE STORE ─────────────────────────────

export function getCertificateSettings(): CertificateSettings {
  if (typeof window === "undefined") return DEFAULT_CERTIFICATE_SETTINGS;
  try {
    const raw = localStorage.getItem(LMS_CERT_SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(LMS_CERT_SETTINGS_KEY, JSON.stringify(DEFAULT_CERTIFICATE_SETTINGS));
      return DEFAULT_CERTIFICATE_SETTINGS;
    }
    return { ...DEFAULT_CERTIFICATE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CERTIFICATE_SETTINGS;
  }
}

export function saveCertificateSettings(newSettings: Partial<CertificateSettings>): CertificateSettings {
  const current = getCertificateSettings();
  const updated: CertificateSettings = {
    ...current,
    ...newSettings,
    lastUpdated: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(LMS_CERT_SETTINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("digihub_cert_settings_updated"));
  }
  return updated;
}

export function getAllCertificates(): CertificateRecord[] {
  if (typeof window === "undefined") return INITIAL_CERTIFICATES;
  try {
    const raw = localStorage.getItem(LMS_CERTIFICATES_KEY);
    if (!raw) {
      localStorage.setItem(LMS_CERTIFICATES_KEY, JSON.stringify(INITIAL_CERTIFICATES));
      return INITIAL_CERTIFICATES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CERTIFICATES;
  }
}

export function saveAllCertificates(certs: CertificateRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LMS_CERTIFICATES_KEY, JSON.stringify(certs));
  window.dispatchEvent(new Event("digihub_certificates_updated"));
}

export function getCertificatesForStudent(studentIdOrEmail: string): CertificateRecord[] {
  const all = getAllCertificates();
  const query = studentIdOrEmail.toLowerCase().trim();
  return all.filter((c) => c.studentId === studentIdOrEmail || c.studentEmail.toLowerCase() === query);
}

export function getCertificateForCourse(
  studentIdOrEmail: string,
  courseId: string
): CertificateRecord | undefined {
  const studentCerts = getCertificatesForStudent(studentIdOrEmail);
  return studentCerts.find((c) => c.courseId === courseId);
}

export function requestCourseCertificate(courseId: string, student?: LMSUser | null): CertificateRecord {
  const user = student || getActiveUser();
  const course = getCourseById(courseId);
  const settings = getCertificateSettings();
  const existingCerts = getAllCertificates();

  const studentId = user ? user.id : `guest-${Date.now().toString(36)}`;
  const studentName = user ? user.name : "Learner";
  const studentEmail = user ? user.email : "student@example.com";
  const courseTitle = course ? course.title : "Technical Specialization";

  // Check if certificate already exists
  const existing = existingCerts.find(
    (c) => (c.studentId === studentId || c.studentEmail.toLowerCase() === studentEmail.toLowerCase()) && c.courseId === courseId
  );
  if (existing) {
    return existing;
  }

  const certId = `DCG-CERT-${courseId.toUpperCase().slice(0, 4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const verificationCode = `DCG-VERIFY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const isAutoApproved = settings.autoApproveOnCompletion;

  const newCert: CertificateRecord = {
    id: certId,
    studentId,
    studentName,
    studentEmail,
    courseId,
    courseTitle,
    status: isAutoApproved ? "approved" : "pending_approval",
    completionDate: new Date().toISOString().split("T")[0],
    approvedDate: isAutoApproved ? new Date().toISOString().split("T")[0] : undefined,
    approvedBy: isAutoApproved ? settings.signerName : undefined,
    signerName: settings.signerName,
    signerTitle: settings.signerTitle,
    signatureUrl: isAutoApproved ? settings.signatureUrl : undefined,
    sealUrl: settings.sealUrl,
    verificationCode,
  };

  existingCerts.unshift(newCert);
  saveAllCertificates(existingCerts);
  return newCert;
}

export function adminApproveCertificate(
  certificateId: string,
  customSignerName?: string,
  customSignatureUrl?: string
): CertificateRecord | undefined {
  const certs = getAllCertificates();
  const settings = getCertificateSettings();
  const target = certs.find((c) => c.id === certificateId);
  if (!target) return undefined;

  target.status = "approved";
  target.approvedDate = new Date().toISOString().split("T")[0];
  target.approvedBy = customSignerName || settings.signerName;
  target.signerName = customSignerName || settings.signerName;
  target.signerTitle = settings.signerTitle;
  target.signatureUrl = customSignatureUrl || settings.signatureUrl;
  target.sealUrl = settings.sealUrl;

  saveAllCertificates(certs);
  return target;
}

export function adminRejectCertificate(certificateId: string, reason?: string): CertificateRecord | undefined {
  const certs = getAllCertificates();
  const target = certs.find((c) => c.id === certificateId);
  if (!target) return undefined;

  target.status = "rejected";
  target.rejectionReason = reason || "Course completion criteria review incomplete.";

  saveAllCertificates(certs);
  return target;
}

export function adminUploadSignature(
  dataUrl: string,
  signerName?: string,
  signerTitle?: string
): void {
  saveCertificateSettings({
    signatureUrl: dataUrl,
    ...(signerName ? { signerName } : {}),
    ...(signerTitle ? { signerTitle } : {}),
  });
}

// ─── MASTER BIDIRECTIONAL SYNC ENGINE WITH CONNECT HUB & BACKEND ───────

export async function syncLMSWithBackendServer(): Promise<{
  success: boolean;
  message: string;
  syncedAt: string;
}> {
  if (typeof window === "undefined") {
    return { success: false, message: "Client-side only", syncedAt: new Date().toISOString() };
  }

  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const clientCourses = getAllCourses();
    const clientStudents = getAllLMSUsers();
    const clientCertificates = getAllCertificates();
    const clientSettings = getCertificateSettings();
    const clientSessions = getBookedSessions();

    const res = await fetch(`${API_BASE}/lms/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientCourses,
        clientStudents,
        clientCertificates,
        clientSettings,
        clientSessions,
      }),
    });

    if (!res.ok) {
      throw new Error(`Sync responded with HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.success && json.data) {
      const { courses, students, certificates, settings, sessions } = json.data;

      if (Array.isArray(courses) && courses.length > 0) {
        localStorage.setItem(LMS_COURSES_KEY, JSON.stringify(courses));
      }
      if (Array.isArray(students) && students.length > 0) {
        localStorage.setItem(LMS_USERS_KEY, JSON.stringify(students));
      }
      if (Array.isArray(certificates) && certificates.length > 0) {
        localStorage.setItem(LMS_CERTIFICATES_KEY, JSON.stringify(certificates));
      }
      if (settings) {
        localStorage.setItem(LMS_CERT_SETTINGS_KEY, JSON.stringify(settings));
      }
      if (Array.isArray(sessions) && sessions.length > 0) {
        localStorage.setItem(LMS_SESSIONS_KEY, JSON.stringify(sessions));
      }

      window.dispatchEvent(new CustomEvent("digihub_cloud_synced", { detail: json.data }));
      window.dispatchEvent(new Event("digihub_courses_updated"));
      window.dispatchEvent(new Event("digihub_users_updated"));
      window.dispatchEvent(new Event("digihub_certificates_updated"));
      window.dispatchEvent(new Event("digihub_cert_settings_updated"));
      window.dispatchEvent(new Event("digihub_sessions_updated"));

      return {
        success: true,
        message: "Successfully synchronized with DIGIHub Cloud Engine!",
        syncedAt: new Date().toLocaleTimeString(),
      };
    }
    return { success: false, message: "Sync response incomplete", syncedAt: new Date().toISOString() };
  } catch (err: any) {
    return {
      success: false,
      message: `Offline mode active (Local Cache). Reason: ${err.message || "Server unreachable"}`,
      syncedAt: new Date().toLocaleTimeString(),
    };
  }
}



