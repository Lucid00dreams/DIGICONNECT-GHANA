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

export interface Topic {
  id: string;
  topicNumber: number;
  title: string;
  durationMinutes: number;
  summary: string;
  sections: TopicSection[];
  keyTakeaways: string[];
  hasLab: boolean;
  labType?: "sandbox" | "cyber" | "quiz";
  sandboxConfig?: CodeSandboxConfig;
  cyberLabConfig?: CyberLabConfig;
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
  quiz: QuizQuestion[];
}

export interface CourseSyllabusWeek {
  week: number;
  title: string;
  description: string;
  hours: number;
}

export interface Course {
  id: string; // "coding" | "cybersecurity" | "digital-literacy" | "python"
  title: string;
  slug: string;
  badge: string;
  category: "Coding & Web" | "Cybersecurity" | "Digital Literacy" | "Programming";
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
  accentColor: "blue" | "red" | "green" | "yellow";
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
  accentColor: "blue" | "red" | "green" | "yellow";
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
  provider: "email" | "google";
  role: "student" | "mentor" | "admin";
  createdAt: string;
  lastActive: string;
  completedLessonIds: string[];
  enrolledTracks: ("coding" | "cybersecurity" | string)[];
  enrolledCourseIds: string[];
  currentTrackId: "coding" | "cybersecurity" | string;
  certificateClaimed: boolean;
  notes?: string;
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
}

// ─── INITIAL LESSON DATA ───────────────────────────────────────────────
import { INITIAL_LESSONS } from "./lmsLessonsData";
export { INITIAL_LESSONS };

// ─── COURSERA-STYLE COURSE CATALOG ─────────────────────────────────────

export const COURSES: Course[] = [
  {
    id: "coding",
    title: "Foundations of Web Development & Basic Coding",
    slug: "web-development-foundations",
    badge: "Professional Certificate",
    category: "Coding & Web",
    headline: "Build modern, responsive websites and interactive web applications from scratch with HTML5, CSS3, and JavaScript.",
    description: "Designed specifically for aspiring software developers and young creators in Ghana. This hands-on course takes you from foundational web architecture through to writing responsive CSS and dynamic JavaScript event listeners with live interactive browser sandboxes in every module.",
    instructorName: "Patrick Paul",
    instructorTitle: "Lead Technology Instructor & Director",
    instructorAvatar: "/images/testimonials/participant-1.jpg",
    organization: "DigiConnect Ghana Academy",
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
    badge: "Security Specialization",
    category: "Cybersecurity",
    headline: "Deconstruct real-world cyber threats: detect phishing, evaluate password entropy, and defend against database injection attacks.",
    description: "Step into the role of a digital defender. Learn how malicious actors craft social engineering exploits and develop practical skills to defend corporate credentials and web databases using industry-standard OWASP best practices.",
    instructorName: "Kwame Osei-Tutu",
    instructorTitle: "Cyber Defense Specialist",
    instructorAvatar: "/images/testimonials/participant-2.jpg",
    organization: "DigiConnect Ghana Academy",
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
    id: "digital-literacy",
    title: "Digital Workplace Productivity & Cloud Collaboration",
    slug: "digital-workplace-productivity",
    badge: "Foundational Certificate",
    category: "Digital Literacy",
    headline: "Master essential cloud productivity tools, collaborative workspaces, professional digital communication, and data hygiene.",
    description: "Designed to prepare students and career entrants for modern digital office environments across Africa and global remote teams. Covers cloud workspaces, document collaboration, spreadsheets, and digital privacy.",
    instructorName: "Akosua Mensah",
    instructorTitle: "Digital Workforce Specialist",
    instructorAvatar: "/images/testimonials/participant-3.jpg",
    organization: "DigiConnect Ghana Academy",
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
  {
    id: "python",
    title: "Python for Problem Solving & Automation",
    slug: "python-problem-solving",
    badge: "High Demand Track",
    category: "Programming",
    headline: "Learn the world's most versatile programming language to automate routine workflows, parse files, and solve real-world problems.",
    description: "An approachable and practical introduction to Python. Write scripts to automate repetitive tasks, manipulate data collections, and build algorithmic problem-solving confidence.",
    instructorName: "Patrick Paul",
    instructorTitle: "Lead Technology Instructor & Director",
    instructorAvatar: "/images/testimonials/participant-1.jpg",
    organization: "DigiConnect Ghana Academy",
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

// ─── INITIAL REGISTERED STUDENTS (FOR CONNECTHUB MONITORING) ───────────

export const INITIAL_STUDENTS: LMSUser[] = [
  {
    id: "stu-1",
    name: "Emmanuel Adjei",
    email: "emmanuel.adjei@example.com",
    avatar: "/images/testimonials/participant-1.jpg",
    provider: "email",
    role: "student",
    createdAt: "2026-09-15T09:00:00Z",
    lastActive: "2026-10-04T08:15:00Z",
    completedLessonIds: ["code-101", "code-102"],
    enrolledTracks: ["coding"],
    enrolledCourseIds: ["coding"],
    currentTrackId: "coding",
    certificateClaimed: false,
    notes: "Active participant in Accra HTML/CSS workshop cohorts.",
  },
  {
    id: "stu-2",
    name: "Akosua Mensah",
    email: "akosua.m@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    provider: "google",
    role: "student",
    createdAt: "2026-09-18T14:30:00Z",
    lastActive: "2026-10-03T18:40:00Z",
    completedLessonIds: ["cyber-101", "cyber-102", "cyber-103", "code-101"],
    enrolledTracks: ["cybersecurity", "coding"],
    enrolledCourseIds: ["cybersecurity", "coding"],
    currentTrackId: "cybersecurity",
    certificateClaimed: true,
    notes: "Completed all 3 cyber threat simulations and earned verified diploma.",
  },
  {
    id: "stu-3",
    name: "Kweku Frimpong",
    email: "kweku.frimpong@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    provider: "google",
    role: "student",
    createdAt: "2026-09-24T11:20:00Z",
    lastActive: "2026-10-02T16:05:00Z",
    completedLessonIds: ["code-101"],
    enrolledTracks: ["coding"],
    enrolledCourseIds: ["coding"],
    currentTrackId: "coding",
    certificateClaimed: false,
    notes: "Kumasi high school graduate studying responsive design.",
  },
  {
    id: "stu-4",
    name: "Blessing Appiah",
    email: "blessing.appiah@example.com",
    avatar: "/images/testimonials/participant-3.jpg",
    provider: "email",
    role: "student",
    createdAt: "2026-09-10T10:00:00Z",
    lastActive: "2026-10-04T07:22:00Z",
    completedLessonIds: ["code-101", "code-102", "code-103", "cyber-101", "cyber-102"],
    enrolledTracks: ["coding", "cybersecurity"],
    enrolledCourseIds: ["coding", "cybersecurity"],
    currentTrackId: "coding",
    certificateClaimed: true,
    notes: "Outstanding progress across both tracks; ready for internship placement.",
  },
  {
    id: "stu-5",
    name: "Kofi Danso",
    email: "kofi.danso@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    provider: "google",
    role: "student",
    createdAt: "2026-10-01T15:00:00Z",
    lastActive: "2026-10-03T09:12:00Z",
    completedLessonIds: [],
    enrolledTracks: ["cybersecurity"],
    enrolledCourseIds: ["cybersecurity"],
    currentTrackId: "cybersecurity",
    certificateClaimed: false,
    notes: "Enrolled recently. Needs onboarding check-in.",
  },
];

// ─── LOCAL STORAGE KEYS & STORE HELPERS ────────────────────────────────

const LMS_USERS_KEY = "dcg_digihub_users_v1";
const LMS_ACTIVE_USER_KEY = "dcg_digihub_active_user_v1";
const LMS_PROGRESS_KEY = "dcg_digihub_progress_v1";
const LMS_SESSIONS_KEY = "dcg_digihub_sessions_v1";
const LMS_LESSONS_KEY = "dcg_digihub_lessons_v1";

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

export function signInWithGoogle(customName?: string, customEmail?: string): LMSUser {
  const users = getAllLMSUsers();
  const email = (customEmail || "student.learner@gmail.com").trim().toLowerCase();
  const name = customName?.trim() || "Google Learner";

  let user = users.find((u) => u.email.toLowerCase() === email);
  if (user) {
    user.lastActive = new Date().toISOString();
    user.provider = "google";
    if (!user.enrolledCourseIds || user.enrolledCourseIds.length === 0) {
      user.enrolledCourseIds = ["coding", "cybersecurity"];
    }
  } else {
    user = {
      id: `stu-g-${Date.now().toString(36)}`,
      name,
      email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      provider: "google",
      role: "student",
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      completedLessonIds: [],
      enrolledTracks: ["coding", "cybersecurity"],
      enrolledCourseIds: ["coding", "cybersecurity"],
      currentTrackId: "coding",
      certificateClaimed: false,
    };
    users.unshift(user);
  }

  saveLMSUsers(users);
  setActiveUser(user);
  return user;
}

export function signOutLMS(): void {
  setActiveUser(null);
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

export function getAllCourses(): Course[] {
  return COURSES;
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


