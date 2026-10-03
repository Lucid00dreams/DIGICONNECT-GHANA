export interface ApplicationSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  programOfInterest: string;
  educationLevel: string;
  digitalExperience: string;
  motivation: string;
  status: "pending" | "under_review" | "accepted" | "rejected";
  date: string;
  notes?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  date: string;
}

export interface InvolvementSubmission {
  id: string;
  type: "volunteer" | "partner" | "donate";
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  category?: string;
  message: string;
  status: "new" | "in_progress" | "completed";
  date: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
  dateAdded: string;
}

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
  category: "workshop" | "bootcamp" | "meetup" | "conference" | "hackathon";
  status: "upcoming" | "past";
  registrationUrl?: string;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Program {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: "blue" | "red" | "yellow" | "green" | "dark";
  icon: string;
  image: string;
  audience: string;
  duration: string;
  skills: string[];
  outcomes: string[];
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "guide" | "video" | "tutorial" | "pdf";
  image: string;
  date: string;
  readTime?: string;
  content?: string;
}

export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  accent: "blue" | "red" | "yellow" | "green";
}

export interface DatabaseSchema {
  applications: ApplicationSubmission[];
  contacts: ContactSubmission[];
  involvements: InvolvementSubmission[];
  gallery: GalleryItem[];
  events: DCGEvent[];
  news: NewsPost[];
  programs: Program[];
  resources: Resource[];
  impactStats: ImpactStat[];
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    hours: string;
  };
}
