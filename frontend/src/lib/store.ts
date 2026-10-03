import {
  PROGRAMS,
  EVENTS,
  RESOURCES,
  IMPACT_STATS,
  CONTACT_INFO,
  GALLERY_IMAGES,
  TESTIMONIALS,
} from "./data";
import {
  Program,
  DCGEvent,
  Resource,
  ImpactStat,
  TeamMember,
  Partner,
  HistoryMilestone,
  Testimonial,
} from "./types";

export type {
  DCGEvent,
  Program,
  Resource,
  ImpactStat,
  TeamMember,
  Partner,
  HistoryMilestone,
  Testimonial,
};

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
  dateAdded: string;
}

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

export interface AppStore {
  gallery: GalleryItem[];
  applications: ApplicationSubmission[];
  messages: ContactSubmission[];
  inquiries: InvolvementSubmission[];
  programs: Program[];
  events: DCGEvent[];
  resources: Resource[];
  impactStats: ImpactStat[];
  news: NewsPost[];
  team: TeamMember[];
  partners: Partner[];
  historyMilestones: HistoryMilestone[];
  testimonials: Testimonial[];
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    hours: string;
  };
}

const STORAGE_KEY = "digiconnect_admin_store_v2";

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "team-1",
    name: "Kofi Boateng",
    role: "Executive Director & Founder",
    bio: "Tech entrepreneur and education advocate with 8+ years building digital solutions and mentoring youth in West Africa.",
    image: "/images/testimonials/participant-1.jpg",
    department: "Executive",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "team-2",
    name: "Dr. Ama Owusu-Ansah",
    role: "Head of Learning & Curriculum",
    bio: "Computer science researcher and educator dedicated to contextualizing hands-on STEM and coding curricula for African youth.",
    image: "/images/testimonials/participant-2.jpg",
    department: "Education",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "team-3",
    name: "Kwame Darko",
    role: "Lead Software Architect & Tech Mentor",
    bio: "Senior full-stack engineer and open-source contributor leading hands-on web development cohorts and hackathon mentorship.",
    image: "/images/testimonials/participant-3.jpg",
    department: "Technology",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "team-4",
    name: "Akosua Mensah",
    role: "Director of Partnerships & Community",
    bio: "Civic community strategist fostering alliances with tech hubs, universities, and corporate scholarship partners nationwide.",
    image: "/images/gallery/gallery-4.jpg",
    department: "Partnerships",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "team-5",
    name: "Emmanuel Sarpong",
    role: "Frontend Development Instructor",
    bio: "Frontend engineer specializing in React, Next.js, and TypeScript, coaching learners through real-world client builds.",
    image: "/images/gallery/gallery-1.jpg",
    department: "Education",
    specialty: "React, Tailwind CSS, TypeScript",
  },
  {
    id: "team-6",
    name: "Abena Frimpong",
    role: "UI/UX Design Mentor",
    bio: "Product designer passionate about accessibility, user research, and empowering young women to enter design leadership.",
    image: "/images/gallery/gallery-2.jpg",
    department: "Design",
    specialty: "Figma, User Research, Design Systems",
  },
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: "partner-1",
    name: "AfriTech Cloud Labs",
    category: "Technology",
    role: "Infrastructure Sponsor",
    location: "Accra, Ghana",
    logo: "/images/partners/partner-1.svg",
  },
  {
    id: "partner-2",
    name: "OpenCode Initiative Africa",
    category: "Technology",
    role: "Curriculum & Tooling Partner",
    location: "Regional",
    logo: "/images/partners/partner-2.svg",
  },
  {
    id: "partner-3",
    name: "DevHub Ghana",
    category: "Technology",
    role: "Incubation & Hackathon Venue",
    location: "Kumasi, Ghana",
    logo: "/images/partners/partner-3.svg",
  },
  {
    id: "partner-4",
    name: "Accra Girls Senior High School",
    category: "Education",
    role: "Girls-in-Tech Campus Hub",
    location: "Greater Accra",
    logo: "/images/partners/partner-4.svg",
  },
  {
    id: "partner-5",
    name: "Prempeh College Tech Club",
    category: "Education",
    role: "STEM & Robotics Lab Hub",
    location: "Ashanti Region",
    logo: "/images/partners/partner-5.svg",
  },
  {
    id: "partner-6",
    name: "Tamale Technical University Alliance",
    category: "Education",
    role: "Northern Region Hub",
    location: "Northern Region",
    logo: "/images/partners/partner-6.svg",
  },
  {
    id: "partner-7",
    name: "Ghana Youth Development Network",
    category: "NGO",
    role: "Grassroots Mobilizer",
    location: "National",
    logo: "/images/partners/partner-1.svg",
  },
  {
    id: "partner-8",
    name: "Apex Capital Ghana",
    category: "Corporate",
    role: "Bootcamp Scholarship Funder",
    location: "Accra",
    logo: "/images/partners/partner-2.svg",
  },
  {
    id: "partner-9",
    name: "WestBridge Telecom Foundation",
    category: "Corporate",
    role: "Fiber Connectivity Partner",
    location: "National",
    logo: "/images/partners/partner-3.svg",
  },
];

export const INITIAL_MILESTONES: HistoryMilestone[] = [
  {
    id: "milestone-2022",
    year: "2022",
    badge: "The Inception",
    title: "A Grassroots Idea in Accra",
    description:
      "Recognizing the deep digital divide facing Ghanaian high school and university leavers, a small group of tech enthusiasts and educators launched community coding sessions on weekends at local libraries in Accra.",
    achievements: [
      "First cohort of 35 youth trained in basic web fundamentals",
      "Formulation of the 'Tech for Youth. Tech for Good.' philosophy",
      "Volunteer network of 5 industry software engineers",
    ],
    accent: "blue",
  },
  {
    id: "milestone-2023",
    year: "2023",
    badge: "Proof of Concept",
    title: "First Hackathon & Bootcamps",
    description:
      "With increasing demand, DigiConnect Ghana formalized into an independent NGO. We partnered with local tech hubs to provide internet access and laptops for young learners who had never owned a computer.",
    achievements: [
      "Over 400 learners completed introductory digital literacy courses",
      "First Annual Tech for Youth Hackathon hosted at Accra Digital Centre",
      "Launch of the Girls-in-Tech mentorship track",
    ],
    accent: "yellow",
  },
  {
    id: "milestone-2024",
    year: "2024",
    badge: "Regional Expansion",
    title: "Reaching Beyond the Capital",
    description:
      "To ensure nationwide impact, DigiConnect Ghana expanded workshops to the Ashanti, Western, and Northern Regions, establishing community resource hubs in Kumasi, Takoradi, and Tamale.",
    achievements: [
      "Over 2,500 young people trained across 4 regional hubs",
      "Introduced remote freelancing and employability workshops",
      "Corporate laptop donation drive delivering 100+ refurbished devices",
    ],
    accent: "green",
  },
  {
    id: "milestone-2025",
    year: "2025",
    badge: "Digital Scale",
    title: "ConnectHub & National Footprint",
    description:
      "Deployed the ConnectHub digital management portal, established direct hiring partner pipelines with tech startups, and expanded free online access to project toolkits and coding tutorials.",
    achievements: [
      "Surpassed 5,000+ youth empowered nationwide",
      "78% of coding cohort graduates placed into internships or freelance contracts",
      "Active partnerships with universities, corporate sponsors, and civic agencies",
    ],
    accent: "red",
  },
];

// Initial seed data
export const INITIAL_STORE: AppStore = {
  gallery: GALLERY_IMAGES.map((img, i) => ({
    id: `gal-${i + 1}`,
    src: img.src,
    alt: img.alt,
    category: i % 2 === 0 ? "Workshops" : "Mentorship",
    caption: img.alt,
    dateAdded: "2025-02-15",
  })),
  applications: [
    {
      id: "app-101",
      fullName: "Emanuel Osei",
      email: "emanuel.osei@gmail.com",
      phone: "+233 24 555 1234",
      age: "22",
      location: "Accra",
      programOfInterest: "coding-technology",
      educationLevel: "undergraduate",
      digitalExperience: "basic",
      motivation: "I want to become a full-stack software engineer and build digital solutions for local logistics in Ghana.",
      status: "pending",
      date: "2025-03-01",
    },
    {
      id: "app-102",
      fullName: "Akosua Frimpong",
      email: "akosua.f@yahoo.com",
      phone: "+233 50 123 9876",
      age: "19",
      location: "Kumasi",
      programOfInterest: "digital-literacy",
      educationLevel: "high_school",
      digitalExperience: "none",
      motivation: "I want to learn computer applications to support my family business and apply for university.",
      status: "accepted",
      date: "2025-02-28",
    },
    {
      id: "app-103",
      fullName: "Kwesi Mensah",
      email: "kwesi.m@outlook.com",
      phone: "+233 20 888 4321",
      age: "24",
      location: "Takoradi",
      programOfInterest: "career-employability",
      educationLevel: "graduate",
      digitalExperience: "intermediate",
      motivation: "Looking to gain remote freelancing skills and build an international client base.",
      status: "under_review",
      date: "2025-02-27",
    },
  ],
  messages: [
    {
      id: "msg-201",
      name: "Kwabena Boateng",
      email: "k.boateng@africadev.org",
      phone: "+233 24 000 1122",
      organization: "Africa Dev Hub",
      subject: "Partnership Opportunity for Youth Hackathon",
      message: "Hello DigiConnect team, we would love to collaborate on your upcoming Code Academy hackathon in Kumasi. We can provide venue space and mentors.",
      status: "unread",
      date: "2025-03-02",
    },
    {
      id: "msg-202",
      name: "Abena Serwaa",
      email: "abena.serwaa@gmail.com",
      phone: "+233 27 333 4455",
      subject: "Inquiry about Girls in Tech Cohort",
      message: "Good day, I am interested in enrolling my sister in the upcoming Girls in Tech coding bootcamp. What are the prerequisites?",
      status: "read",
      date: "2025-02-26",
    },
  ],
  inquiries: [
    {
      id: "inq-301",
      type: "volunteer",
      fullName: "Nana Kwame Bediako",
      email: "nana.bediako@techhub.gh",
      phone: "+233 24 999 7777",
      organization: "Senior Frontend Engineer at PaySwitch",
      category: "Technical Mentorship (Coding & Web Development)",
      message: "I would love to mentor cohort students on weekends and review code assignments for the Code Academy.",
      status: "new",
      date: "2025-03-02",
    },
    {
      id: "inq-302",
      type: "partner",
      fullName: "Grace Tetteh",
      email: "gtetteh@africafuture.org",
      phone: "+233 55 222 3344",
      organization: "Africa Future Foundation",
      category: "Corporate Sponsorship & CSR",
      message: "We have funding allocated for youth digital transformation in the Northern Region and wish to co-sponsor cohorts.",
      status: "in_progress",
      date: "2025-02-25",
    },
  ],
  programs: PROGRAMS,
  events: EVENTS,
  resources: RESOURCES,
  impactStats: IMPACT_STATS,
  contactInfo: CONTACT_INFO,
  news: [
    {
      id: "news-1",
      slug: "digiconnect-launches-2025-kumasi-tech-cohort",
      title: "DigiConnect Ghana Launches 2025 Youth Tech Cohort in Kumasi",
      excerpt: "Over 120 young participants began their journey in web engineering and digital literacy at our newly equipped community hub.",
      content: "DigiConnect Ghana officially kicked off its first flagship youth cohort of 2025 in Kumasi, bringing together 120 enthusiastic young learners from across the Ashanti Region. The intensive program covers foundational digital skills, modern frontend web development, and problem-solving through technology. With support from our community mentors and corporate partners, each participant receives hands-on access to laptops and dedicated project guidance.",
      category: "Bootcamps",
      author: "DigiConnect Team",
      date: "March 15, 2025",
      readTime: "3 min read",
      image: "/images/gallery/gallery-2.jpg",
    },
    {
      id: "news-2",
      slug: "bridging-digital-divide-rural-schools",
      title: "Bridging the Digital Divide: Practical Skills for Rural Communities",
      excerpt: "Expanding our digital outreach into peri-urban and rural schools to ensure no young Ghanaian is left behind in the digital economy.",
      content: "Access to digital tools remains unequal across different regions of Ghana. Our rural outreach initiative is addressing this directly by deploying mobile digital labs and volunteer tech educators. In the past quarter, over 300 junior high students experienced their first structured computer science lessons, discovering how software and internet connectivity can transform local communities.",
      category: "Community",
      author: "Program Lead",
      date: "February 28, 2025",
      readTime: "4 min read",
      image: "/images/gallery/gallery-1.jpg",
    },
    {
      id: "news-3",
      slug: "hackathon-winners-build-local-logistics-app",
      title: "Code Academy Hackathon Winners Showcase Community Solutions",
      excerpt: "Students from our recent Code Academy cohort built an open-source logistics platform designed for local market traders.",
      content: "At our recent weekend hackathon, youth teams pitched innovative web solutions designed to solve real-world problems in Ghana. The winning team designed 'MarketLink', an accessible platform helping local traders coordinate affordable delivery logistics. The project was built entirely using skills acquired during their 12-week training with DigiConnect mentors.",
      category: "Innovation",
      author: "Lead Tech Mentor",
      date: "February 12, 2025",
      readTime: "3 min read",
      image: "/images/gallery/gallery-5.jpg",
    },
  ],
  team: INITIAL_TEAM,
  partners: INITIAL_PARTNERS,
  historyMilestones: INITIAL_MILESTONES,
  testimonials: TESTIMONIALS,
};

export function getStore(): AppStore {
  if (typeof window === "undefined") {
    return INITIAL_STORE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORE));
      return INITIAL_STORE;
    }
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STORE,
      ...parsed,
      news: parsed.news && parsed.news.length > 0 ? parsed.news : INITIAL_STORE.news,
      gallery: parsed.gallery && parsed.gallery.length > 0 ? parsed.gallery : INITIAL_STORE.gallery,
      events: parsed.events && parsed.events.length > 0 ? parsed.events : INITIAL_STORE.events,
      programs: parsed.programs && parsed.programs.length > 0 ? parsed.programs : INITIAL_STORE.programs,
      impactStats: parsed.impactStats && parsed.impactStats.length > 0 ? parsed.impactStats : INITIAL_STORE.impactStats,
      contactInfo: parsed.contactInfo || INITIAL_STORE.contactInfo,
      team: parsed.team && parsed.team.length > 0 ? parsed.team : INITIAL_STORE.team,
      partners: parsed.partners && parsed.partners.length > 0 ? parsed.partners : INITIAL_STORE.partners,
      historyMilestones: parsed.historyMilestones && parsed.historyMilestones.length > 0 ? parsed.historyMilestones : INITIAL_STORE.historyMilestones,
      testimonials: parsed.testimonials && parsed.testimonials.length > 0 ? parsed.testimonials : INITIAL_STORE.testimonials,
      resources: parsed.resources && parsed.resources.length > 0 ? parsed.resources : INITIAL_STORE.resources,
    };
  } catch {
    return INITIAL_STORE;
  }
}

export function saveStore(store: AppStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new Event("digiconnect_store_updated"));
  } catch (err) {
    console.error("Failed to save store to localStorage", err);
  }
}

// ─── CRUD Functions ───────────────────────────────────────

export function addApplication(app: Omit<ApplicationSubmission, "id" | "date" | "status">): ApplicationSubmission {
  const store = getStore();
  const newApp: ApplicationSubmission = {
    ...app,
    id: `app-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  };
  store.applications.unshift(newApp);
  saveStore(store);
  return newApp;
}

export function updateApplicationStatus(
  id: string,
  status: ApplicationSubmission["status"],
  notes?: string
): void {
  const store = getStore();
  store.applications = store.applications.map((app) =>
    app.id === id ? { ...app, status, ...(notes !== undefined ? { notes } : {}) } : app
  );
  saveStore(store);
}

export function removeApplication(id: string): void {
  const store = getStore();
  store.applications = store.applications.filter((app) => app.id !== id);
  saveStore(store);
}

export function addContactMessage(msg: Omit<ContactSubmission, "id" | "date" | "status">): ContactSubmission {
  const store = getStore();
  const newMsg: ContactSubmission = {
    ...msg,
    id: `msg-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    status: "unread",
  };
  store.messages.unshift(newMsg);
  saveStore(store);
  return newMsg;
}

export function addInvolvement(inq: Omit<InvolvementSubmission, "id" | "date" | "status">): InvolvementSubmission {
  const store = getStore();
  const newInq: InvolvementSubmission = {
    ...inq,
    id: `inq-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    status: "new",
  };
  store.inquiries.unshift(newInq);
  saveStore(store);
  return newInq;
}

export function addGalleryImage(img: Omit<GalleryItem, "id" | "dateAdded">): GalleryItem {
  const store = getStore();
  const newItem: GalleryItem = {
    ...img,
    id: `gal-${Date.now()}`,
    dateAdded: new Date().toISOString().split("T")[0],
  };
  store.gallery.unshift(newItem);
  saveStore(store);
  return newItem;
}

export function removeGalleryImage(id: string): void {
  const store = getStore();
  store.gallery = store.gallery.filter((item) => item.id !== id);
  saveStore(store);
}

export function addNewsPost(post: Omit<NewsPost, "id" | "date" | "slug">): NewsPost {
  const store = getStore();
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const newPost: NewsPost = {
    ...post,
    id: `news-${Date.now()}`,
    slug: `${slug}-${Date.now()}`,
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
  store.news.unshift(newPost);
  saveStore(store);
  return newPost;
}

export function removeNewsPost(id: string): void {
  const store = getStore();
  store.news = store.news.filter((item) => item.id !== id);
  saveStore(store);
}

export function addEvent(evt: Omit<DCGEvent, "id" | "slug" | "image"> & { slug?: string; image?: string }): DCGEvent {
  const store = getStore();
  const slug = evt.slug || evt.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const newEvent: DCGEvent = {
    ...evt,
    image: evt.image || "/images/gallery/gallery-2.jpg",
    id: `evt-${Date.now()}`,
    slug: `${slug}-${Date.now()}`,
  };
  store.events.unshift(newEvent);
  saveStore(store);
  return newEvent;
}

export function removeEvent(id: string): void {
  const store = getStore();
  store.events = store.events.filter((item) => item.id !== id);
  saveStore(store);
}

// ─── Team CRUD ────────────────────────────────────────────

export function addTeamMember(member: Omit<TeamMember, "id">): TeamMember {
  const store = getStore();
  const newMember: TeamMember = {
    ...member,
    id: `team-${Date.now()}`,
  };
  store.team.push(newMember);
  saveStore(store);
  return newMember;
}

export function updateTeamMember(id: string, updated: Partial<TeamMember>): void {
  const store = getStore();
  store.team = store.team.map((m) => (m.id === id ? { ...m, ...updated } : m));
  saveStore(store);
}

export function removeTeamMember(id: string): void {
  const store = getStore();
  store.team = store.team.filter((m) => m.id !== id);
  saveStore(store);
}

// ─── Partners CRUD ────────────────────────────────────────

export function addPartner(partner: Omit<Partner, "id">): Partner {
  const store = getStore();
  const newPartner: Partner = {
    ...partner,
    id: `partner-${Date.now()}`,
  };
  store.partners.push(newPartner);
  saveStore(store);
  return newPartner;
}

export function updatePartner(id: string, updated: Partial<Partner>): void {
  const store = getStore();
  store.partners = store.partners.map((p) => (p.id === id ? { ...p, ...updated } : p));
  saveStore(store);
}

export function removePartner(id: string): void {
  const store = getStore();
  store.partners = store.partners.filter((p) => p.id !== id);
  saveStore(store);
}

// ─── Milestones CRUD ──────────────────────────────────────

export function addHistoryMilestone(milestone: Omit<HistoryMilestone, "id">): HistoryMilestone {
  const store = getStore();
  const newMilestone: HistoryMilestone = {
    ...milestone,
    id: `milestone-${Date.now()}`,
  };
  store.historyMilestones.push(newMilestone);
  // sort by year
  store.historyMilestones.sort((a, b) => parseInt(a.year || "0") - parseInt(b.year || "0"));
  saveStore(store);
  return newMilestone;
}

export function updateHistoryMilestone(id: string, updated: Partial<HistoryMilestone>): void {
  const store = getStore();
  store.historyMilestones = store.historyMilestones.map((m) => (m.id === id ? { ...m, ...updated } : m));
  saveStore(store);
}

export function removeHistoryMilestone(id: string): void {
  const store = getStore();
  store.historyMilestones = store.historyMilestones.filter((m) => m.id !== id);
  saveStore(store);
}

// ─── Programs CRUD ────────────────────────────────────────

export function addProgram(prog: Program): Program {
  const store = getStore();
  store.programs.push(prog);
  saveStore(store);
  return prog;
}

export function updateProgram(slug: string, updated: Partial<Program>): void {
  const store = getStore();
  store.programs = store.programs.map((p) => (p.slug === slug ? { ...p, ...updated } : p));
  saveStore(store);
}

export function removeProgram(slug: string): void {
  const store = getStore();
  store.programs = store.programs.filter((p) => p.slug !== slug);
  saveStore(store);
}

// ─── Resources CRUD ───────────────────────────────────────

export function addResource(res: Omit<Resource, "id">): Resource {
  const store = getStore();
  const newResource: Resource = {
    ...res,
    id: `res-${Date.now()}`,
  };
  store.resources.unshift(newResource);
  saveStore(store);
  return newResource;
}

export function updateResource(id: string, updated: Partial<Resource>): void {
  const store = getStore();
  store.resources = store.resources.map((r) => (r.id === id ? { ...r, ...updated } : r));
  saveStore(store);
}

export function removeResource(id: string): void {
  const store = getStore();
  store.resources = store.resources.filter((r) => r.id !== id);
  saveStore(store);
}

// ─── Testimonials CRUD ────────────────────────────────────

export function addTestimonial(t: Omit<Testimonial, "id">): Testimonial {
  const store = getStore();
  const newTestimonial: Testimonial = {
    ...t,
    id: `test-${Date.now()}`,
  };
  store.testimonials.unshift(newTestimonial);
  saveStore(store);
  return newTestimonial;
}

export function updateTestimonial(id: string, updated: Partial<Testimonial>): void {
  const store = getStore();
  store.testimonials = store.testimonials.map((item) => (item.id === id ? { ...item, ...updated } : item));
  saveStore(store);
}

export function removeTestimonial(id: string): void {
  const store = getStore();
  store.testimonials = store.testimonials.filter((item) => item.id !== id);
  saveStore(store);
}
