/**
 * DIGIHub LMS - Lesson Discussion Forum & Q&A Store
 * Coursera-style question threads scoped per lesson.
 * Supports upvoting, mentor/faculty endorsements, code snippet formatting,
 * and category tags.
 */

import { LMSUser, INITIAL_MENTORS } from "./lmsStore";

export type ForumRole = "student" | "mentor" | "faculty" | "admin";

export interface ForumReply {
  id: string;
  questionId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: ForumRole;
  authorTitle?: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  createdAt: string;
  upvotes: number;
  upvotedByUserIds: string[];
  isEndorsedByMentor?: boolean;
  endorsedByName?: string;
}

export interface ForumQuestion {
  id: string;
  lessonId: string;
  topicTitle?: string;
  title: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: ForumRole;
  authorTitle?: string;
  createdAt: string;
  upvotes: number;
  upvotedByUserIds: string[];
  tags: string[];
  viewsCount: number;
  isResolved?: boolean;
  isPinned?: boolean;
  replies: ForumReply[];
}

const STORAGE_KEY = "dcg_lms_forum_questions_v1";

// ─── SEED QUESTIONS & ANSWERS FOR CORE LESSONS ──────────────────────────────
export const SEED_FORUM_QUESTIONS: ForumQuestion[] = [
  // ─── LESSON: code-101 (Web Architecture & HTML5) ──────────────────────────
  {
    id: "q-code-101-pin",
    lessonId: "code-101",
    topicTitle: "Web Architecture & HTML5",
    title: "Welcome to Lesson 1 Q&A! Tips from Volunteer Mentors",
    content:
      "Welcome to the discussion forum for Lesson 1! Feel free to ask anything about how browsers communicate with servers, HTML element syntax, or debugging your first tags. Volunteer mentors and peers check this thread regularly.",
    authorId: "mentor-1",
    authorName: "Kofi Boateng",
    authorRole: "faculty",
    authorTitle: "Lead Software Architect & Volunteer Mentor",
    authorAvatar: "/images/testimonials/participant-1.jpg",
    createdAt: "2025-02-10T08:30:00Z",
    upvotes: 24,
    upvotedByUserIds: ["demo-user-1", "student-2"],
    tags: ["Tips & Best Practices", "Welcome", "Getting Started"],
    viewsCount: 312,
    isResolved: false,
    isPinned: true,
    replies: [
      {
        id: "rep-code-101-1",
        questionId: "q-code-101-pin",
        authorId: "mentor-2",
        authorName: "Kwame Osei-Tutu",
        authorRole: "mentor",
        authorTitle: "Cybersecurity Analyst & Threat Specialist",
        authorAvatar: "/images/testimonials/participant-2.jpg",
        content:
          "Quick tip for beginners: Whenever writing HTML tags, write both the opening <tag> and closing </tag> immediately before filling in the text! This prevents 90% of layout bugs in your browser.",
        codeSnippet: "<button class=\"cta-btn\">\n  Click Here\n</button>",
        codeLanguage: "html",
        createdAt: "2025-02-10T09:15:00Z",
        upvotes: 18,
        upvotedByUserIds: ["demo-user-1"],
        isEndorsedByMentor: true,
        endorsedByName: "Kofi Boateng (Lead Mentor)",
      },
    ],
  },
  {
    id: "q-code-101-2",
    lessonId: "code-101",
    topicTitle: "How the Internet Delivers Web Pages",
    title: "Why do some tags like <img> and <br> not have a closing tag </...>? Confused about void elements.",
    content:
      "I noticed that <p>...</p> and <h1>...</h1> have closing tags, but <img src=\"...\"> and <br> don't have closing tags in the sandbox. How does the browser know where they end, and what are they called?",
    authorId: "student-akosua",
    authorName: "Akosua Addo",
    authorRole: "student",
    authorTitle: "DigiConnect Frontend Cohort",
    createdAt: "2025-02-12T14:20:00Z",
    upvotes: 15,
    upvotedByUserIds: [],
    tags: ["Syntax & Bugs", "Concept Question", "HTML5"],
    viewsCount: 184,
    isResolved: true,
    replies: [
      {
        id: "rep-code-101-2a",
        questionId: "q-code-101-2",
        authorId: "mentor-1",
        authorName: "Kofi Boateng",
        authorRole: "mentor",
        authorTitle: "Lead Software Architect",
        authorAvatar: "/images/testimonials/participant-1.jpg",
        content:
          "Great question Akosua! In HTML5, these are officially known as 'Void Elements' (or self-closing elements). They cannot contain any nested child text or tags. For example, an image gets all its information from attributes like `src` and `alt`, so there is no inner content between an opening and closing tag.\n\nOther common void elements include `<input>`, `<hr>`, `<meta>`, and `<link>`.",
        codeSnippet: "<!-- Standard element with inner text -->\n<p>Hello Ghana!</p>\n\n<!-- Void element (no children possible) -->\n<img src=\"logo.png\" alt=\"DigiConnect Logo\" />",
        codeLanguage: "html",
        createdAt: "2025-02-12T15:05:00Z",
        upvotes: 21,
        upvotedByUserIds: ["student-akosua", "demo-user-1"],
        isEndorsedByMentor: true,
        endorsedByName: "Faculty Verified Solution",
      },
      {
        id: "rep-code-101-2b",
        questionId: "q-code-101-2",
        authorId: "student-emmanuel",
        authorName: "Emmanuel Tetteh",
        authorRole: "student",
        authorTitle: "Peer Learner",
        content:
          "I used to get confused too! The food analogy from the lesson helped me: a box of takeaway food has a lid you close (<p>...</p>), but an apple (<img />) is already a complete single item you don't wrap.",
        createdAt: "2025-02-12T16:10:00Z",
        upvotes: 9,
        upvotedByUserIds: [],
      },
    ],
  },
  {
    id: "q-code-101-3",
    lessonId: "code-101",
    topicTitle: "Building Semantic HTML",
    title: "Can I use multiple <h1> tags on the same webpage or should there only be one?",
    content:
      "When designing my landing page in the sandbox, I wanted the hero title and the section titles to look big so I used <h1> for both. Is that standard practice or bad for accessibility?",
    authorId: "student-yaw",
    authorName: "Yaw Mensah",
    authorRole: "student",
    authorTitle: "DIGIHub Explorer",
    createdAt: "2025-02-15T10:05:00Z",
    upvotes: 11,
    upvotedByUserIds: [],
    tags: ["Best Practice", "Accessibility", "SEO"],
    viewsCount: 142,
    isResolved: true,
    replies: [
      {
        id: "rep-code-101-3a",
        questionId: "q-code-101-3",
        authorId: "mentor-4",
        authorName: "Ama Serwaa",
        authorRole: "mentor",
        authorTitle: "Junior Web Developer & Alumni Mentor",
        content:
          "Best practice is strictly ONE `<h1>` per page! The `<h1>` represents the main title or purpose of that entire document (vital for Google SEO and screen-readers for visually impaired users).\n\nFor major sections underneath, use `<h2>`. For subsections within those, use `<h3>`. If you just want text to appear visually larger, use CSS font-size rather than skipping heading tags!",
        createdAt: "2025-02-15T11:00:00Z",
        upvotes: 16,
        upvotedByUserIds: ["demo-user-1"],
        isEndorsedByMentor: true,
        endorsedByName: "Ama Serwaa (Mentor Endorsed)",
      },
    ],
  },

  // ─── LESSON: code-102 (CSS Styling & Modern Flexbox) ─────────────────────
  {
    id: "q-code-102-1",
    lessonId: "code-102",
    topicTitle: "CSS Flexbox Layouts",
    title: "Difference between justify-content and align-items in Flexbox?",
    content:
      "I always mix up `justify-content` and `align-items`. When `flex-direction` is set to `column`, does `justify-content` align horizontally or vertically?",
    authorId: "student-felix",
    authorName: "Felix Adjei",
    authorRole: "student",
    authorTitle: "Frontend Cohort Student",
    createdAt: "2025-02-18T11:45:00Z",
    upvotes: 19,
    upvotedByUserIds: [],
    tags: ["Concept Question", "CSS Flexbox", "Syntax & Bugs"],
    viewsCount: 220,
    isResolved: true,
    replies: [
      {
        id: "rep-code-102-1a",
        questionId: "q-code-102-1",
        authorId: "mentor-1",
        authorName: "Kofi Boateng",
        authorRole: "mentor",
        authorTitle: "Lead Software Architect",
        content:
          "Remember the golden rule of Flexbox:\n- `justify-content` ALWAYS controls the PRIMARY axis.\n- `align-items` ALWAYS controls the CROSS axis (perpendicular).\n\nWhen `flex-direction: row` (default):\n- Primary axis = horizontal (left to right)\n- Cross axis = vertical (top to bottom)\n\nWhen `flex-direction: column`:\n- Primary axis flips to VERTICAL (top to bottom) -> so `justify-content` controls vertical spacing!\n- Cross axis flips to HORIZONTAL -> so `align-items` controls horizontal centering!",
        codeSnippet: ".card-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; /* Centers vertically along the column */\n  align-items: center;     /* Centers horizontally across the width */\n}",
        codeLanguage: "css",
        createdAt: "2025-02-18T12:20:00Z",
        upvotes: 27,
        upvotedByUserIds: ["demo-user-1"],
        isEndorsedByMentor: true,
        endorsedByName: "Faculty Verified",
      },
    ],
  },

  // ─── LESSON: cyber-101 / cyber-arch-101 (Cybersecurity Defense) ───────────
  {
    id: "q-cyber-101-1",
    lessonId: "cyber-arch-101",
    topicTitle: "Enterprise Security Architecture",
    title: "How does the Zero Trust model apply to mobile money agents and local banking?",
    content:
      "In the lesson scenario on perimeter defense vs zero trust, how would a telecom mobile money merchant or fintech implement 'never trust, always verify' without slowing down customer transactions?",
    authorId: "student-grace",
    authorName: "Grace Asare",
    authorRole: "student",
    authorTitle: "Cyber Defense Track",
    createdAt: "2025-02-20T16:10:00Z",
    upvotes: 14,
    upvotedByUserIds: [],
    tags: ["Concept Question", "Fintech & MoMo", "Zero Trust"],
    viewsCount: 165,
    isResolved: true,
    replies: [
      {
        id: "rep-cyber-101-1a",
        questionId: "q-cyber-101-1",
        authorId: "mentor-2",
        authorName: "Kwame Osei-Tutu",
        authorRole: "faculty",
        authorTitle: "Cybersecurity Analyst & Threat Specialist",
        authorAvatar: "/images/testimonials/participant-2.jpg",
        content:
          "Excellent real-world scenario Grace! In Ghanaian fintech, Zero Trust means:\n1. Device Fingerprinting: Even if the correct PIN is entered, is the SIM in a recognized handset with expected IMEI?\n2. Behavioral Anomaly Detection: A merchant terminal in Kumasi suddenly issuing high-velocity cash-outs at 3 AM triggers step-up biometric / OTP verification.\n3. Microsegmentation: The point-of-sale agent portal cannot talk directly to the core ledger database without passing through an authenticated API gateway.",
        createdAt: "2025-02-20T17:00:00Z",
        upvotes: 22,
        upvotedByUserIds: ["demo-user-1"],
        isEndorsedByMentor: true,
        endorsedByName: "Threat Specialist Endorsed",
      },
    ],
  },
  {
    id: "q-cyber-101-2",
    lessonId: "cyber-101",
    topicTitle: "Phishing Detection Lab",
    title: "Lab Exercise: Is a link with https:// always 100% safe to click?",
    content:
      "In the phishing scenario, the email had an SSL padlock (https). A lot of people think https means the site is legitimate. Why is that a dangerous myth?",
    authorId: "student-kwabena",
    authorName: "Kwabena Frimpong",
    authorRole: "student",
    authorTitle: "DigiConnect Cybersecurity Trainee",
    createdAt: "2025-02-22T09:40:00Z",
    upvotes: 20,
    upvotedByUserIds: [],
    tags: ["Lab Exercise", "Security Myth", "Phishing"],
    viewsCount: 245,
    isResolved: true,
    replies: [
      {
        id: "rep-cyber-101-2a",
        questionId: "q-cyber-101-2",
        authorId: "mentor-2",
        authorName: "Kwame Osei-Tutu",
        authorRole: "mentor",
        authorTitle: "Threat Specialist & Volunteer Mentor",
        content:
          "Spot on Kwabena! `https://` only means that communication between your device and that server is encrypted (so eavesdroppers on public WiFi cannot read your packets in plaintext).\n\nHowever, ANY scammer can easily register a fake domain like `secure-mtn-momo-update.com` and obtain a 100% free, valid SSL certificate from Let's Encrypt in 2 minutes!\n\nAlways inspect the ACTUAL DOMAIN NAME before the first single slash `/`.",
        createdAt: "2025-02-22T10:15:00Z",
        upvotes: 29,
        upvotedByUserIds: ["demo-user-1"],
        isEndorsedByMentor: true,
        endorsedByName: "Kwame Osei-Tutu (Faculty Verified)",
      },
    ],
  },

  // ─── LESSON: python-101 (Python Basics) ──────────────────────────────────
  {
    id: "q-python-101-1",
    lessonId: "python-101",
    topicTitle: "Python Variables & Syntax",
    title: "Why does Python give IndentationError: unexpected indent when mixing tabs and spaces?",
    content:
      "I was working on the Python sandbox challenge and got `IndentationError`. How does Python handle whitespace compared to languages like HTML or JavaScript that use curly braces?",
    authorId: "student-nana",
    authorName: "Nana Yaa",
    authorRole: "student",
    authorTitle: "Python Cohort Student",
    createdAt: "2025-02-23T14:10:00Z",
    upvotes: 13,
    upvotedByUserIds: [],
    tags: ["Syntax & Bugs", "Python Basics", "Indentation"],
    viewsCount: 198,
    isResolved: true,
    replies: [
      {
        id: "rep-python-101-1a",
        questionId: "q-python-101-1",
        authorId: "mentor-1",
        authorName: "Kofi Boateng",
        authorRole: "mentor",
        authorTitle: "Software Architect",
        content:
          "In languages like JavaScript, spaces and line breaks are mostly cosmetic because curly braces `{ ... }` define code blocks. In Python, INDENTATION IS SYNTAX!\n\nPython uses indentation depth to know which lines belong inside a function, `if` statement, or `for` loop.\n\nBest practice: Configure your editor to always insert 4 spaces when you hit the Tab key. Never mix literal Tab characters with 4 spaces in the same file.",
        codeSnippet: "# Correct: exactly 4 spaces inside block\ndef greet_learner(name):\n    greeting = f\"Akwaaba {name}!\"\n    return greeting",
        codeLanguage: "python",
        createdAt: "2025-02-23T14:45:00Z",
        upvotes: 18,
        upvotedByUserIds: [],
        isEndorsedByMentor: true,
        endorsedByName: "Mentor Endorsed",
      },
    ],
  },
];

// ─── STORAGE ACCESSORS ──────────────────────────────────────────────────────

export function getAllForumQuestions(): ForumQuestion[] {
  if (typeof window === "undefined") {
    return SEED_FORUM_QUESTIONS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_FORUM_QUESTIONS));
      return SEED_FORUM_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_FORUM_QUESTIONS));
      return SEED_FORUM_QUESTIONS;
    }
    return parsed;
  } catch (err) {
    console.error("Error loading forum questions from storage:", err);
    return SEED_FORUM_QUESTIONS;
  }
}

export function saveForumQuestions(questions: ForumQuestion[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (err) {
    console.error("Error saving forum questions:", err);
  }
}

/**
 * Returns questions relevant to the current lesson.
 * If the lesson has custom seed questions, returns those.
 * Otherwise, generates a welcoming starter thread so the community is never blank.
 */
export function getQuestionsForLesson(lessonId: string): ForumQuestion[] {
  const all = getAllForumQuestions();
  let lessonQuestions = all.filter((q) => q.lessonId === lessonId);

  // If no questions exist for this specific lesson yet, generate a starter welcome thread
  if (lessonQuestions.length === 0) {
    const welcomeQuestion: ForumQuestion = {
      id: `q-${lessonId}-welcome`,
      lessonId,
      topicTitle: "Lesson Community Q&A",
      title: "Welcome to this Lesson's Q&A! Have questions or need a code review?",
      content:
        "Welcome to the discussion forum for this lesson! If you encounter any bugs, need clarification on a concept, or want feedback on your lab exercise, click 'Ask a Question' above. Volunteer mentors and peers in your cohort are here to assist.",
      authorId: "mentor-1",
      authorName: "Kofi Boateng",
      authorRole: "faculty",
      authorTitle: "Lead Software Architect & Volunteer Mentor",
      authorAvatar: "/images/testimonials/participant-1.jpg",
      createdAt: new Date().toISOString(),
      upvotes: 5,
      upvotedByUserIds: [],
      tags: ["Welcome", "Q&A Tips", "Mentor Help"],
      viewsCount: 15,
      isResolved: false,
      isPinned: true,
      replies: [
        {
          id: `rep-${lessonId}-welcome-1`,
          questionId: `q-${lessonId}-welcome`,
          authorId: "mentor-2",
          authorName: "Kwame Osei-Tutu",
          authorRole: "mentor",
          authorTitle: "Volunteer Mentor",
          authorAvatar: "/images/testimonials/participant-2.jpg",
          content:
            "Tip: When posting a question, paste the specific code snippet or error message you're seeing so peers and mentors can test and help you faster!",
          createdAt: new Date().toISOString(),
          upvotes: 3,
          upvotedByUserIds: [],
          isEndorsedByMentor: true,
          endorsedByName: "Faculty Verified Tip",
        },
      ],
    };

    all.push(welcomeQuestion);
    saveForumQuestions(all);
    lessonQuestions = [welcomeQuestion];
  }

  // Sort pinned first, then by upvotes desc, then latest
  return lessonQuestions.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.upvotes - a.upvotes;
  });
}

export function getQuestionById(questionId: string): ForumQuestion | null {
  const all = getAllForumQuestions();
  return all.find((q) => q.id === questionId) || null;
}

export function getLessonQuestionCount(lessonId: string): number {
  const all = getAllForumQuestions();
  return all.filter((q) => q.lessonId === lessonId).length;
}

/**
 * Creates and saves a new question
 */
export function createForumQuestion(params: {
  lessonId: string;
  title: string;
  content: string;
  tags: string[];
  author: LMSUser | null;
  codeSnippet?: string;
  codeLanguage?: string;
  topicTitle?: string;
}): ForumQuestion {
  const all = getAllForumQuestions();
  const authorName = params.author?.name || "Student Learner";
  const authorRole: ForumRole =
    params.author?.role === "mentor"
      ? "mentor"
      : params.author?.role === "admin"
      ? "faculty"
      : "student";

  const newQuestion: ForumQuestion = {
    id: `q-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    lessonId: params.lessonId,
    topicTitle: params.topicTitle || "Lesson Discussion",
    title: params.title.trim(),
    content: params.content.trim(),
    codeSnippet: params.codeSnippet?.trim() || undefined,
    codeLanguage: params.codeLanguage || "javascript",
    authorId: params.author?.id || `anon-${Date.now()}`,
    authorName,
    authorAvatar: params.author?.avatar,
    authorRole,
    authorTitle:
      params.author?.currentRole || (authorRole === "mentor" ? "Volunteer Mentor" : "DigiConnect Student"),
    createdAt: new Date().toISOString(),
    upvotes: 1, // Author automatically upvotes their own question
    upvotedByUserIds: params.author?.id ? [params.author.id] : [],
    tags: params.tags.length > 0 ? params.tags : ["General Q&A"],
    viewsCount: 1,
    isResolved: false,
    isPinned: false,
    replies: [],
  };

  all.unshift(newQuestion);
  saveForumQuestions(all);
  return newQuestion;
}

/**
 * Adds a reply to a question
 */
export function addForumReply(params: {
  questionId: string;
  content: string;
  author: LMSUser | null;
  codeSnippet?: string;
  codeLanguage?: string;
}): ForumReply | null {
  const all = getAllForumQuestions();
  const targetIndex = all.findIndex((q) => q.id === params.questionId);
  if (targetIndex === -1) return null;

  const authorName = params.author?.name || "Peer Learner";
  const authorRole: ForumRole =
    params.author?.role === "mentor"
      ? "mentor"
      : params.author?.role === "admin"
      ? "faculty"
      : "student";

  const newReply: ForumReply = {
    id: `rep-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    questionId: params.questionId,
    authorId: params.author?.id || `anon-${Date.now()}`,
    authorName,
    authorAvatar: params.author?.avatar,
    authorRole,
    authorTitle:
      params.author?.currentRole || (authorRole === "mentor" ? "Volunteer Mentor" : "DigiConnect Student"),
    content: params.content.trim(),
    codeSnippet: params.codeSnippet?.trim() || undefined,
    codeLanguage: params.codeLanguage || "javascript",
    createdAt: new Date().toISOString(),
    upvotes: 1,
    upvotedByUserIds: params.author?.id ? [params.author.id] : [],
    isEndorsedByMentor: authorRole === "mentor" || authorRole === "faculty",
    endorsedByName:
      authorRole === "mentor" || authorRole === "faculty"
        ? `${authorName} (Mentor Response)`
        : undefined,
  };

  all[targetIndex].replies.push(newReply);
  all[targetIndex].viewsCount += 1;
  saveForumQuestions(all);
  return newReply;
}

/**
 * Toggles upvote on a question
 */
export function toggleUpvoteQuestion(
  questionId: string,
  userId: string
): { upvoted: boolean; count: number } {
  const all = getAllForumQuestions();
  const q = all.find((item) => item.id === questionId);
  if (!q) return { upvoted: false, count: 0 };

  const hasUpvoted = q.upvotedByUserIds.includes(userId);
  if (hasUpvoted) {
    q.upvotedByUserIds = q.upvotedByUserIds.filter((id) => id !== userId);
    q.upvotes = Math.max(0, q.upvotes - 1);
  } else {
    q.upvotedByUserIds.push(userId);
    q.upvotes += 1;
  }

  saveForumQuestions(all);
  return { upvoted: !hasUpvoted, count: q.upvotes };
}

/**
 * Toggles upvote on a reply
 */
export function toggleUpvoteReply(
  questionId: string,
  replyId: string,
  userId: string
): { upvoted: boolean; count: number } {
  const all = getAllForumQuestions();
  const q = all.find((item) => item.id === questionId);
  if (!q) return { upvoted: false, count: 0 };

  const reply = q.replies.find((r) => r.id === replyId);
  if (!reply) return { upvoted: false, count: 0 };

  const hasUpvoted = reply.upvotedByUserIds.includes(userId);
  if (hasUpvoted) {
    reply.upvotedByUserIds = reply.upvotedByUserIds.filter((id) => id !== userId);
    reply.upvotes = Math.max(0, reply.upvotes - 1);
  } else {
    reply.upvotedByUserIds.push(userId);
    reply.upvotes += 1;
  }

  saveForumQuestions(all);
  return { upvoted: !hasUpvoted, count: reply.upvotes };
}

/**
 * Endorses or un-endorses an answer as verified/accepted
 */
export function toggleEndorseReply(
  questionId: string,
  replyId: string,
  endorserName: string
): boolean {
  const all = getAllForumQuestions();
  const q = all.find((item) => item.id === questionId);
  if (!q) return false;

  const reply = q.replies.find((r) => r.id === replyId);
  if (!reply) return false;

  reply.isEndorsedByMentor = !reply.isEndorsedByMentor;
  reply.endorsedByName = reply.isEndorsedByMentor
    ? `Verified by ${endorserName}`
    : undefined;

  // If endorsed, mark question as resolved
  if (reply.isEndorsedByMentor) {
    q.isResolved = true;
  }

  saveForumQuestions(all);
  return reply.isEndorsedByMentor;
}

/**
 * Toggles resolved state for a question
 */
export function toggleResolveQuestion(questionId: string): boolean {
  const all = getAllForumQuestions();
  const q = all.find((item) => item.id === questionId);
  if (!q) return false;

  q.isResolved = !q.isResolved;
  saveForumQuestions(all);
  return q.isResolved;
}

/**
 * Deletes a question (author or admin)
 */
export function deleteForumQuestion(questionId: string, userId: string): boolean {
  const all = getAllForumQuestions();
  const index = all.findIndex((q) => q.id === questionId);
  if (index === -1) return false;

  const q = all[index];
  // Allow if user is author or demo admin
  if (q.authorId === userId || userId === "demo-user-1") {
    all.splice(index, 1);
    saveForumQuestions(all);
    return true;
  }
  return false;
}
