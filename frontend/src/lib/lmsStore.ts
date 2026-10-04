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
  markdownContent: string;
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

export const INITIAL_LESSONS: Lesson[] = [
  // ─── CODING TRACK ───
  {
    id: "code-101",
    trackId: "coding",
    moduleNumber: 1,
    moduleTitle: "Web Architecture & HTML5",
    lessonNumber: 1,
    title: "How the Web Works & Your First Webpage",
    durationMinutes: 15,
    level: "Beginner",
    xpAward: 100,
    summary: "Discover how browsers, servers, and HTML cooperate to display websites, and write your first HTML markup.",
    markdownContent: `### How Does the Internet Deliver Websites?
When you type an address like \`digiconnectghana.org\` into your smartphone or computer browser:
1. **The Request:** Your device sends an HTTP/HTTPS request across the internet to a server hosting the website files.
2. **The Response:** The server sends back files composed of **HTML** (the structure), **CSS** (the presentation/styling), and **JavaScript** (the interactivity).
3. **The Rendering Engine:** The web browser reads the HTML code top-to-bottom and transforms it into the visual elements you can tap and click.

### HTML: The Skeleton of the Digital World
HTML stands for **HyperText Markup Language**. Everything on the web uses elements wrapped in opening and closing tags:
\`\`\`html
<h1>Welcome to Ghana's Tech Future</h1>
<p>DigiConnect empowers youth with real-world digital skills.</p>
\`\`\`

### Key Core Elements:
- \`<h1>\` to \`<h6>\`: Headings indicating section hierarchy.
- \`<p>\`: Paragraphs for standard readable text.
- \`<button>\`: Clickable actions that trigger events.
- \`<a>\`: Anchor links to navigate between pages.`,
    keyTakeaways: [
      "Websites are built from HTML (structure), CSS (styling), and JavaScript (behavior).",
      "HTML tags enclose content with opening <tag> and closing </tag> syntax.",
      "Semantic HTML makes websites accessible and easy to search.",
    ],
    sandboxConfig: {
      initialHtml: `<!-- Welcome to DIGIHub Code Sandbox! -->
<div class="welcome-card">
  <h1>Hello Accra! 🇬🇭</h1>
  <p>I am learning to code with DigiConnect Ghana.</p>
  <button id="cta-btn">Click Me to Connect</button>
</div>`,
      initialCss: `.welcome-card {
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #1e3a8a, #0284c7);
  color: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
}
button {
  background: #facc15;
  color: #1e293b;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 12px;
}`,
      initialJs: `const btn = document.getElementById('cta-btn');
btn.addEventListener('click', () => {
  alert('Akwaaba! You just ran your first web event listener!');
});`,
      challengeInstructions: "Change the heading inside <h1> to your own name or city, then click 'Run Code' to see your live website!",
    },
    quiz: [
      {
        id: "q1",
        question: "What does HTML provide to a website?",
        options: [
          "Interactive animations and database storage",
          "The semantic structure, headings, paragraphs, and elements",
          "Encrypted network routing across telecom masts",
          "Graphic acceleration and GPU drivers",
        ],
        correctAnswer: 1,
        explanation: "HTML provides the underlying structure and content skeleton of every web document.",
      },
      {
        id: "q2",
        question: "Which HTML tag is used for the most important heading on a page?",
        options: ["<heading>", "<h6>", "<h1>", "<title-main>"],
        correctAnswer: 2,
        explanation: "<h1> represents the primary top-level heading on any web page.",
      },
    ],
  },
  {
    id: "code-102",
    trackId: "coding",
    moduleNumber: 2,
    moduleTitle: "Modern Styling with CSS",
    lessonNumber: 2,
    title: "Layouts with CSS Flexbox & Responsive Design",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 120,
    summary: "Master CSS Flexbox to align buttons, navigation bars, and cards seamlessly across mobile phones and desktop displays.",
    markdownContent: `### Why Flexbox is Essential
In modern web development, websites must look great whether viewed on an Android smartphone in Kumasi or a widescreen laptop in Accra. 

**Flexbox** (Flexible Box Layout) is the industry standard for distributing space and aligning items inside a container along a row or column.

### Core Flexbox Properties:
1. \`display: flex;\` — Turns an element into a flex container.
2. \`flex-direction: row | column;\` — Sets the main flow direction.
3. \`justify-content: center | space-between | flex-start;\` — Controls alignment along the main axis.
4. \`align-items: center | stretch;\` — Controls alignment along the cross axis.
5. \`gap: 16px;\` — Clean spacing between adjacent flex items without messy margins.`,
    keyTakeaways: [
      "display: flex turns any container into an intelligent alignment grid.",
      "justify-content centers or spaces items along the main axis.",
      "gap creates clean, uniform spacing between buttons and cards.",
    ],
    sandboxConfig: {
      initialHtml: `<div class="navbar">
  <div class="logo">DIGIConnect</div>
  <div class="nav-links">
    <a href="#">Tracks</a>
    <a href="#">Mentors</a>
    <a href="#">Profile</a>
  </div>
</div>

<div class="card-grid">
  <div class="card">Coding Track</div>
  <div class="card">Cybersecurity Track</div>
  <div class="card">1-on-1 Mentorship</div>
</div>`,
      initialCss: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 16px;
  background: #f8fafc;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
}
.nav-links {
  display: flex;
  gap: 16px;
}
.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
}
.card-grid {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.card {
  flex: 1 1 120px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  color: #1e3a8a;
}`,
      initialJs: `console.log("Flexbox layout loaded successfully!");`,
      challengeInstructions: "Try modifying the background color of .card to light yellow (#fef08a) or increase the gap in .card-grid to 24px!",
    },
    quiz: [
      {
        id: "q3",
        question: "Which CSS property is required on a parent element to activate Flexbox?",
        options: ["position: absolute;", "display: flex;", "float: left;", "flex-wrap: true;"],
        correctAnswer: 1,
        explanation: "Setting 'display: flex;' on a parent activates the Flexbox formatting context.",
      },
    ],
  },
  {
    id: "code-103",
    trackId: "coding",
    moduleNumber: 3,
    moduleTitle: "JavaScript Logic & Interactivity",
    lessonNumber: 3,
    title: "Variables, Functions & Event Listeners",
    durationMinutes: 25,
    level: "Intermediate",
    xpAward: 150,
    summary: "Add dynamic life to websites. Learn variables, conditional statements, and how to update page content when users click buttons.",
    markdownContent: `### JavaScript: The Brain of the Web
While HTML gives structure and CSS adds styling, **JavaScript** gives a website life and intelligence.

### 1. Variables (Data Storage)
Use \`const\` for values that don't change, and \`let\` for variables that will update:
\`\`\`js
const studentName = "Ama";
let xpPoints = 100;
xpPoints += 50; // now 150
\`\`\`

### 2. Functions (Reusable Actions)
A function bundles instructions so you can execute them whenever needed:
\`\`\`js
function awardBadge(badgeName) {
  return \`Congratulations! You earned the \${badgeName} badge.\`;
}
\`\`\`

### 3. Listening to User Clicks
With \`addEventListener\`, JavaScript reacts immediately when a user interacts:
\`\`\`js
button.addEventListener('click', () => {
  counter++;
  display.textContent = counter;
});
\`\`\``,
    keyTakeaways: [
      "Variables store numbers, text strings, and data.",
      "Functions organize reusable code logic.",
      "Event listeners connect user actions (clicks, keypresses) to code reactions.",
    ],
    sandboxConfig: {
      initialHtml: `<div class="interactive-box">
  <h2>DIGIHub XP Counter</h2>
  <p class="score-display">Current XP: <span id="xp-val">0</span></p>
  <button id="learn-btn">+50 XP (Study Lesson)</button>
  <button id="reset-btn">Reset</button>
</div>`,
      initialCss: `.interactive-box {
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  font-family: system-ui;
}
.score-display {
  font-size: 20px;
  font-weight: bold;
  color: #1e3a8a;
}
button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  margin: 4px;
  cursor: pointer;
  font-weight: 600;
}
#reset-btn {
  background: #ef4444;
}`,
      initialJs: `let currentXp = 0;
const xpSpan = document.getElementById('xp-val');
const learnBtn = document.getElementById('learn-btn');
const resetBtn = document.getElementById('reset-btn');

learnBtn.addEventListener('click', () => {
  currentXp += 50;
  xpSpan.textContent = currentXp;
  if (currentXp >= 150) {
    alert("Level Up! You reached Level 2 in DIGIHub!");
  }
});

resetBtn.addEventListener('click', () => {
  currentXp = 0;
  xpSpan.textContent = currentXp;
});`,
      challengeInstructions: "Click the '+50 XP' button in the live preview to test the event listener and see the alert pop up when reaching 150 XP!",
    },
    quiz: [
      {
        id: "q4",
        question: "Which keyword should you use in modern JavaScript for a variable that will change value?",
        options: ["const", "let", "static", "fixed"],
        correctAnswer: 1,
        explanation: "'let' allows reassignment, making it ideal for counters and changing states.",
      },
    ],
  },

  // ─── CYBERSECURITY TRACK ───
  {
    id: "cyber-101",
    trackId: "cybersecurity",
    moduleNumber: 1,
    moduleTitle: "Personal Defense & Social Engineering",
    lessonNumber: 1,
    title: "Anatomy of a Phishing Attack & Social Engineering",
    durationMinutes: 15,
    level: "Beginner",
    xpAward: 100,
    summary: "Inspect malicious emails, fake mobile money scams, spoofed domains, and learn how hackers trick human psychology.",
    markdownContent: `### What is Social Engineering?
Over 90% of successful cyberattacks do not break military-grade encryption—they exploit human trust. 

**Phishing** is when an attacker impersonates a trusted authority (such as your bank, mobile telecom network, or university) to trick you into revealing passwords, verification codes (OTPs), or downloading malware.

### The Anatomy of Phishing in West Africa:
1. **Urgency & Fear Tactics:** *"Your account will be suspended within 2 hours unless you confirm your PIN."*
2. **Domain Spoofing:** Looking like \`service-mtn-ghana.com\` instead of the authentic \`mtn.com.gh\`.
3. **Mismatched Hyperlinks:** The text says "Click to log in to bank", but hovering reveals a random foreign IP address.
4. **Request for Sensitive Secrets:** Legitimate institutions **never** ask for your password or SMS OTP via chat or email.`,
    keyTakeaways: [
      "Attackers manipulate urgency and fear to make victims act without thinking.",
      "Always verify the exact sender email domain and link URLs before clicking.",
      "Never share OTPs (One-Time Passwords) or private keys with anyone.",
    ],
    cyberLabConfig: {
      type: "phishing-detector",
      title: "Interactive Phishing Analyzer",
      scenario: "You received an urgent email supposedly from 'Ghana Digital Authority' warning that your SIM registration is expired.",
      targetData: {
        sender: "support@ghana-telecom-security-alert.xyz",
        subject: "URGENT: Your Phone Line Suspended Within 2 Hours!",
        body: "Dear Customer, due to mandatory cyber compliance, your phone number has been flagged. Verify your national ID and Mobile Money PIN immediately using the secure link below or line will be deactivated permanently.",
        ctaUrl: "http://185.220.101.5/verify-pin.php",
        redFlags: [
          "Suspicious top-level domain (.xyz instead of official .gov.gh)",
          "Artificial panic and severe 2-hour deadline",
          "Requests confidential Mobile Money PIN",
          "Link points to an unencrypted raw IP address (http://185.220...)",
        ],
      },
      prompt: "Inspect the email below. Can you identify the red flags that prove this is a phishing attack?",
      hint: "Check the sender email domain and look at where the verification link actually points.",
    },
    quiz: [
      {
        id: "cq1",
        question: "What is the best immediate action if you receive an urgent message requesting your Mobile Money PIN?",
        options: [
          "Send the PIN quickly to prevent line suspension",
          "Click the link to verify if the website looks authentic",
          "Ignore the link and verify directly through the official telecom shortcode or branch",
          "Forward the message to all your contacts to warn them",
        ],
        correctAnswer: 2,
        explanation: "Always communicate out-of-band using official, verified contact numbers rather than trusting links in unexpected messages.",
      },
    ],
  },
  {
    id: "cyber-102",
    trackId: "cybersecurity",
    moduleNumber: 2,
    moduleTitle: "Credential Defense & Cryptography",
    lessonNumber: 2,
    title: "Password Entropy, Credential Stuffing & Multi-Factor Auth",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 120,
    summary: "Discover how automated brute-force attacks crack weak passwords in seconds, and test password entropy interactively.",
    markdownContent: `### How Attackers Crack Passwords
Cybercriminals do not sit and guess passwords one by one. They use automated GPU cracking tools (like Hashcat) capable of testing **billions of combinations per second**, cross-referenced against billions of leaked passwords in breach databases.

### Key Security Concepts:
1. **Password Length > Complexity:** A 16-character passphrase like \`coffee-kumasi-sunrise-2026\` has exponentially higher entropy than a short complex password like \`P@ss1!\`.
2. **Credential Stuffing:** If you use the same password on social media and your email, a breach on one site allows hackers to unlock all your accounts automatically.
3. **Multi-Factor Authentication (MFA/2FA):** Requires a second verification proof (e.g. an authenticator app code or hardware key) so that even if a hacker steals your password, they cannot log in.`,
    keyTakeaways: [
      "Passphrases with 14+ characters are mathematically harder to crack than short complex strings.",
      "Never reuse passwords across different platforms.",
      "Enabling Multi-Factor Authentication (2FA) blocks 99% of automated credential attacks.",
    ],
    cyberLabConfig: {
      type: "password-auditor",
      title: "Real-Time Password Entropy & Strength Auditor",
      scenario: "Test different password formats in our safe client-side entropy lab to see how fast automated brute-force systems can break them.",
      prompt: "Type a sample password below to analyze its mathematical entropy, character set diversity, and estimated crack time.",
      hint: "Notice how adding random dictionary words separated by hyphens skyrockets security compared to single-word substitutions.",
    },
    quiz: [
      {
        id: "cq2",
        question: "Why is Multi-Factor Authentication (2FA) considered essential?",
        options: [
          "It makes your internet connection run faster",
          "It prevents account takeover even if your password is compromised",
          "It eliminates the need for strong passwords entirely",
          "It encrypts your local computer hard drive automatically",
        ],
        correctAnswer: 1,
        explanation: "2FA ensures that possessing the password alone is not enough to gain unauthorized access.",
      },
    ],
  },
  {
    id: "cyber-103",
    trackId: "cybersecurity",
    moduleNumber: 3,
    moduleTitle: "Web Security & Ethical Defense",
    lessonNumber: 3,
    title: "SQL Injection (SQLi) & Parameterized Queries",
    durationMinutes: 25,
    level: "Intermediate",
    xpAward: 150,
    summary: "Understand the #1 web database vulnerability from OWASP Top 10 and learn how software engineers defend databases with prepared statements.",
    markdownContent: `### What is SQL Injection (SQLi)?
When a web application takes user input (such as a login username) and carelessly concatenates it directly into a database query string:
\`\`\`sql
-- Insecure code:
SELECT * FROM users WHERE email = 'USER_INPUT' AND password = 'PASSWORD';
\`\`\`

If an attacker inputs: \`admin@example.com' OR '1'='1\`
The query becomes:
\`\`\`sql
SELECT * FROM users WHERE email = 'admin@example.com' OR '1'='1' AND password = '...';
\`\`\`
Because \`'1'='1'\` is always true, the database bypasses authentication and logs the attacker in as an administrator!

### The Defense: Parameterized Queries (Prepared Statements)
Engineers prevent SQL injection by treating user input strictly as **literal data**, never as executable SQL commands:
\`\`\`ts
// Secure parameterized query:
db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, hashedPass]);
\`\`\``,
    keyTakeaways: [
      "Never concatenate raw user input into database query strings.",
      "Prepared statements and parameterized queries separate query logic from user data.",
      "Input validation and Principle of Least Privilege keep backend data secure.",
    ],
    cyberLabConfig: {
      type: "sqli-defender",
      title: "Interactive SQL Injection & Query Defense Lab",
      scenario: "Observe how raw string interpolation allows query bypass, and toggle Parameterized Defense mode to see how secure software neutralizes attacks.",
      prompt: "Simulate a login query test with an injection payload and inspect how parameterized queries prevent authentication bypass.",
      hint: "Compare vulnerable query assembly with parameterized SQL.",
    },
    quiz: [
      {
        id: "cq3",
        question: "What is the primary method to defend web applications against SQL Injection?",
        options: [
          "Using longer database table names",
          "Using Parameterized Queries (Prepared Statements)",
          "Removing all login forms from the website",
          "Storing passwords in plain text for easier verification",
        ],
        correctAnswer: 1,
        explanation: "Parameterized queries ensure user input is treated strictly as data rather than executable SQL logic.",
      },
    ],
  },
  // ─── DIGITAL WORKPLACE LITERACY ───
  {
    id: "digi-101",
    trackId: "digital-literacy",
    moduleNumber: 1,
    moduleTitle: "Cloud Workspaces & Secure Collaboration",
    lessonNumber: 1,
    title: "Navigating Cloud Drives, Access Roles & Version Control",
    durationMinutes: 15,
    level: "Beginner",
    xpAward: 100,
    summary: "Master organizing collaborative cloud folders, permissions, document sharing, and avoiding data leaks in remote teams.",
    markdownContent: `### Modern Work Runs on Cloud Infrastructure
In traditional offices, files lived on desktop hard drives. Today, high-performing African enterprises and global remote organizations collaborate in real time across cloud storage platforms like Google Drive, OneDrive, and secure cloud repositories.

### Key Principles of Cloud Collaboration:
1. **Granular Access Permissions:**
   - **Viewer:** Can read documents without modifying content. Best for public briefings and official reports.
   - **Commenter:** Can leave inline margin feedback and annotations without changing the source text.
   - **Editor:** Can make direct changes, accept suggestions, and manage document structure.
2. **Version History & Audit Trails:**
   Every modification in a cloud workspace is recorded. If a colleague accidentally deletes an important table, you can restore previous revisions from 5 minutes or 5 months ago with one click.
3. **Data Security & Public Link Precautions:**
   Never set sensitive internal spreadsheets to "Anyone with the link can edit". Restrict access to designated emails with Multi-Factor Authentication.`,
    keyTakeaways: [
      "Use 'Viewer' or 'Commenter' roles when sharing documents externally to protect core data integrity.",
      "Version history allows instant rollback of accidental deletions or errors.",
      "Always restrict confidential documents to authenticated organizational accounts.",
    ],
    quiz: [
      {
        id: "dq1",
        question: "What permission level should you assign when sharing a finalized project report with an external client?",
        options: [
          "Full Editor with ownership transfer",
          "Viewer (or Commenter for feedback)",
          "Public anonymous editor",
          "Administrator role",
        ],
        correctAnswer: 1,
        explanation: "Viewer or Commenter permissions protect the report from accidental alteration while allowing the client to review it.",
      },
    ],
  },
  {
    id: "digi-102",
    trackId: "digital-literacy",
    moduleNumber: 2,
    moduleTitle: "Digital Productivity & Tabular Data Hygiene",
    lessonNumber: 2,
    title: "Spreadsheet Architecture, Essential Formulas & Data Hygiene",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Structure clean tabular data, apply essential formulas (SUM, AVERAGE, COUNTIF), and implement validation rules.",
    markdownContent: `### The Power of Tabular Data
Whether calculating youth program budgets, tracking community attendance, or preparing financial audits, spreadsheets are the backbone of digital decision-making.

### Fundamental Spreadsheet Hygiene:
- **One Data Type Per Column:** Keep text in text columns, numbers in numeric columns, and dates in standardized format (YYYY-MM-DD).
- **Freeze Header Rows:** Keep the top row visible when scrolling through hundreds of records.
- **Core Formulas:**
  - \`=SUM(B2:B50)\`: Computes total sums across a numeric range.
  - \`=AVERAGE(C2:C50)\`: Returns mathematical mean.
  - \`=COUNTIF(D2:D50, "Completed")\`: Counts how many rows meet specific conditions.`,
    keyTakeaways: [
      "Standardized column formats prevent calculation errors and formula breakage.",
      "COUNTIF and SUM formulas automate counting and aggregating large datasets instantly.",
      "Clean tabular structure makes exporting to CSV or relational databases seamless.",
    ],
    quiz: [
      {
        id: "dq2",
        question: "Which formula counts the number of attendees who completed a training session?",
        options: [
          "=TOTAL('Completed')",
          "=COUNTIF(D2:D100, 'Completed')",
          "=AVERAGE(D2:D100)",
          "=FIND('Completed')",
        ],
        correctAnswer: 1,
        explanation: "COUNTIF evaluates a specified cell range and counts only cells matching the criterion.",
      },
    ],
  },
  // ─── PYTHON TRACK ───
  {
    id: "py-101",
    trackId: "python",
    moduleNumber: 1,
    moduleTitle: "Python Fundamentals & Syntax",
    lessonNumber: 1,
    title: "Python 3 Syntax, Variables & Dynamic Typing",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Learn why Python is the world's most popular automation language, understand variables, and execute clean console scripts.",
    markdownContent: `### Why Python for Automation and Problem Solving?
Python is famous for its clean, human-readable syntax that emphasizes clarity. From automating routine spreadsheet calculations to building machine learning algorithms and web servers, Python powers modern technology.

### Variables & Data Types:
\`\`\`python
# Declaring variables:
student_name = "Ama Mensah"      # String (str)
student_age = 19                  # Integer (int)
has_completed_lab = True          # Boolean (bool)
modules_scores = [95, 88, 92]     # List (list)

print(f"Student {student_name} scored {modules_scores[0]}% in Module 1!")
\`\`\`

### The Philosophy of Clean Code:
- Use indentation (4 spaces) rather than curly brackets to structure blocks.
- Meaningful variable names make your code self-documenting.`,
    keyTakeaways: [
      "Python utilizes whitespace indentation rather than semicolons or braces.",
      "Variables are dynamically typed: strings, integers, floats, and booleans.",
      "F-strings provide clean and expressive string interpolation.",
    ],
    quiz: [
      {
        id: "pq1",
        question: "How does Python define code blocks such as functions and loops?",
        options: [
          "With semicolons (;) at the end of each line",
          "With consistent indentation (usually 4 spaces)",
          "With curly braces { }",
          "With XML opening and closing tags",
        ],
        correctAnswer: 1,
        explanation: "Python enforces readability by using indentation to define statement blocks.",
      },
    ],
  },
  {
    id: "py-102",
    trackId: "python",
    moduleNumber: 2,
    moduleTitle: "Control Flow & Automation Workflows",
    lessonNumber: 2,
    title: "Conditionals, Loops & Batch Processing",
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 120,
    summary: "Harness if/else logic and for-loops to automate repetitive data checks and batch calculations.",
    markdownContent: `### Automating Repetitive Work with Loops
A programmer should never do manual repetitive work that a computer can perform in milliseconds.

### For-Loops & Conditionals in Action:
\`\`\`python
students = [
    {"name": "Kofi", "score": 92},
    {"name": "Abena", "score": 74},
    {"name": "Kwesi", "score": 88}
]

for student in students:
    if student["score"] >= 80:
        print(f"Certificate Awarded to {student['name']} (Distinction)")
    else:
        print(f"Review required for {student['name']}")
\`\`\``,
    keyTakeaways: [
      "For-loops iterate sequentially through lists, dictionaries, or ranges.",
      "If/elif/else statements control dynamic execution paths.",
      "Batch scripts can process thousands of records in seconds.",
    ],
    quiz: [
      {
        id: "pq2",
        question: "Which loop construct is best for iterating over each item in a list of students?",
        options: [
          "loop student while true",
          "for student in students:",
          "repeat until student.end",
          "goto next student",
        ],
        correctAnswer: 1,
        explanation: "for item in collection: is Python's idiomatic iterator construct.",
      },
    ],
  },
];

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
    return JSON.parse(raw);
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


