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
  trackId: "coding" | "cybersecurity";
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

export interface LearningTrack {
  id: "coding" | "cybersecurity";
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

export interface LearnerProgress {
  completedLessonIds: string[];
  currentTrackId: "coding" | "cybersecurity";
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
];

// ─── INITIAL TRACKS ────────────────────────────────────────────────────

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "coding",
    title: "Web Development & Coding Foundations",
    badge: "Core Software Track",
    description: "Learn to build modern, responsive websites and interactive web applications from scratch with HTML5, CSS3, and JavaScript.",
    icon: "Code",
    accentColor: "blue",
    totalModules: 3,
    totalLessons: 3,
    totalHours: 4,
    skillsGained: ["Semantic HTML5", "CSS Flexbox & Grid", "Mobile-First Design", "JavaScript ES6+", "DOM Manipulation"],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "coding"),
  },
  {
    id: "cybersecurity",
    title: "Practical Cybersecurity & Digital Defense",
    badge: "Security & Threat Defense",
    description: "Understand digital threat vectors, defend against phishing and social engineering, protect credentials, and learn ethical defense principles.",
    icon: "ShieldCheck",
    accentColor: "red",
    totalModules: 3,
    totalLessons: 3,
    totalHours: 4,
    skillsGained: ["Threat Identification", "Phishing Analysis", "Password Entropy & 2FA", "Network Security", "OWASP Top 10 Fundamentals"],
    lessons: INITIAL_LESSONS.filter((l) => l.trackId === "cybersecurity"),
  },
];

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

// ─── LOCAL STORAGE KEYS & STORE HELPERS ────────────────────────────────

const LMS_PROGRESS_KEY = "dcg_digihub_progress_v1";
const LMS_SESSIONS_KEY = "dcg_digihub_sessions_v1";
const LMS_LESSONS_KEY = "dcg_digihub_lessons_v1";

export function getLearnerProgress(): LearnerProgress {
  if (typeof window === "undefined") {
    return {
      completedLessonIds: [],
      currentTrackId: "coding",
      xp: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      certificateClaimed: false,
      studentName: "Learner",
    };
  }
  try {
    const raw = localStorage.getItem(LMS_PROGRESS_KEY);
    if (!raw) {
      const initial: LearnerProgress = {
        completedLessonIds: [],
        currentTrackId: "coding",
        xp: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        certificateClaimed: false,
        studentName: "Learner",
      };
      localStorage.setItem(LMS_PROGRESS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {
      completedLessonIds: [],
      currentTrackId: "coding",
      xp: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      certificateClaimed: false,
      studentName: "Learner",
    };
  }
}

export function saveLearnerProgress(progress: LearnerProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LMS_PROGRESS_KEY, JSON.stringify(progress));
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
  }
  return current;
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
