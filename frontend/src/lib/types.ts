// ─── Program ─────────────────────────────────────────────
export interface Program {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: 'blue' | 'red' | 'yellow' | 'green' | 'dark';
  color?: string;
  icon: string;
  image: string;
  audience: string;
  duration: string;
  skills: string[];
  outcomes: string[];
  highlights?: string[];
  prerequisites?: string;
}

// ─── Impact Stat ─────────────────────────────────────────
export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  accent: 'blue' | 'red' | 'yellow' | 'green';
}

// ─── Testimonial ─────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  program: string;
  quote: string;
  image: string;
  outcome: string;
  role?: string;
  rating?: number;
}

// ─── Event ───────────────────────────────────────────────
export interface DCGEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: 'workshop' | 'bootcamp' | 'meetup' | 'conference' | 'hackathon';
  status: 'upcoming' | 'past';
  registrationUrl?: string;
}

// ─── Resource ────────────────────────────────────────────
export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
  date: string;
  readTime?: string;
  content?: string;
  level?: string;
  downloadUrl?: string;
}

// ─── Team Member ─────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  department?: string;
  specialty?: string;
  linkedin?: string;
  twitter?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

// ─── Partner ─────────────────────────────────────────────
export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  role?: string;
  location?: string;
  url?: string;
  website?: string;
}

// ─── Value ───────────────────────────────────────────────
export interface Value {
  title: string;
  description: string;
  icon: string;
}

// ─── History Milestone ───────────────────────────────────
export interface HistoryMilestone {
  id: string;
  year: string;
  badge: string;
  title: string;
  description: string;
  achievements: string[];
  accent?: string;
}

// ─── Nav Item ────────────────────────────────────────────
export interface NavDropdownItem {
  title: string;
  href: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavDropdownItem[];
}

// ─── Contact Form ────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
}

// ─── Application Form ────────────────────────────────────
export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  programOfInterest: string;
  educationLevel: string;
  digitalExperience: string;
  motivation: string;
  consent: boolean;
}

// ─── Involvement Card ────────────────────────────────────
export interface InvolvementOption {
  title: string;
  description: string;
  icon: string;
  cta: string;
  href: string;
  accent: 'blue' | 'red' | 'yellow' | 'green';
}
