import type { Lesson } from "./lmsStore";

/**
 * Comprehensive DIGIHub LMS Lessons & Topics
 * Structured topic-by-topic learning with real-world analogies,
 * clean typography (zero asterisks in texts), and dedicated interactive labs.
 */

export const INITIAL_LESSONS: Lesson[] = [
  // ─── CODING TRACK ──────────────────────────────────────────────────────────
  {
    id: "code-101",
    trackId: "coding",
    moduleNumber: 1,
    moduleTitle: "Web Architecture & HTML5",
    lessonNumber: 1,
    title: "How the Web Works & Your First Webpage",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Discover how browsers, servers, and HTML cooperate to display websites, and write your first semantic HTML markup.",
    keyTakeaways: [
      "Websites are built from HTML for structure, CSS for styling, and JavaScript for interactivity.",
      "The client device sends requests, and the web server returns the files to render on screen.",
      "HTML tags enclose content with opening and closing syntax to create headings, paragraphs, and buttons.",
    ],
    topics: [
      {
        id: "code-101-top-1",
        topicNumber: 1,
        title: "How the Internet Delivers Web Pages to Your Screen",
        durationMinutes: 6,
        summary: "Understand the client-server journey when opening any website on your phone or laptop.",
        sections: [
          {
            heading: "The Journey of a Web Request",
            explanation: "When you type a web address like digiconnectghana.org into your phone or computer, your browser acts as the client. It sends a message across the internet asking for that page. On the other end, a remote computer called a web server receives the request, gathers the files, and sends them back to your screen.",
            analogy: "Think of ordering food via a dispatch rider in Accra. Your smartphone is the customer placing an order. The internet cables and telecom cell towers are the roads. The web server is the restaurant kitchen preparing your meal, which arrives back at your doorstep as a finished web page.",
            keyPoints: [
              "The Client is your device (smartphone, laptop, tablet) running a web browser.",
              "The Server is a powerful computer connected to the internet that stores the website files.",
              "The Response delivers three essential languages: HTML for structure, CSS for presentation, and JavaScript for behavior.",
            ],
          },
          {
            heading: "The Three Core Languages of the Web",
            explanation: "Every website you interact with is composed of three building blocks working in harmony. HTML creates the text headings, paragraphs, images, and buttons. CSS paints colors, arranges spacing, and adapts layouts to mobile screens. JavaScript adds live intelligence, such as clicking a button to show an alert or submit an application.",
            keyPoints: [
              "HTML is the skeleton and foundation.",
              "CSS is the clothing, paint, and visual styling.",
              "JavaScript is the muscular movement and live brain.",
            ],
          },
        ],
        keyTakeaways: [
          "Every web page begins with an HTTP or HTTPS request from client to server.",
          "Browsers read code top-to-bottom and turn text instructions into visual pages.",
          "Mastering HTML gives you full control over how digital content is presented.",
        ],
        hasLab: false,
      },
      {
        id: "code-101-top-2",
        topicNumber: 2,
        title: "HTML Page Structure & Essential Semantic Tags",
        durationMinutes: 7,
        summary: "Learn the core tags that structure text, headings, and paragraphs in every digital document.",
        sections: [
          {
            heading: "Anatomy of an HTML Element",
            explanation: "HTML stands for HyperText Markup Language. It uses elements wrapped in opening tags and closing tags to tell the browser what kind of content it is displaying. For example, opening an h1 tag tells the browser to display an important main heading until it reaches the closing h1 tag.",
            analogy: "Like the concrete foundation and blockwork of a building in Ghana. Before you install glass windows or paint the walls, you need solid pillars and brick walls. HTML provides those structural walls.",
            codeSnippet: {
              language: "html",
              title: "Basic Semantic HTML Tags",
              code: "<h1>Welcome to DigiConnect Ghana</h1>\n<p>Empowering youth across Africa with practical technology skills.</p>\n<button>Get Started Today</button>",
            },
            keyPoints: [
              "Heading tags range from h1 (most important page title) down to h6 (subsections).",
              "Paragraph tags (p) hold standard readable body text.",
              "Button tags create clickable actions for users.",
            ],
          },
        ],
        keyTakeaways: [
          "Always close your tags properly with a forward slash to maintain clean document structure.",
          "Using accurate heading hierarchy makes websites accessible for screen readers and search engines.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="welcome-card">
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
          challengeInstructions: "Change the heading inside <h1> to your own name or city, add a second paragraph with a tech goal, then click 'Run Code' to see your live website!",
        },
      },
      {
        id: "code-101-top-3",
        topicNumber: 3,
        title: "Clickable Hyperlinks & Call-to-Action Buttons",
        durationMinutes: 7,
        summary: "Connect multiple pages together with links and create interactive buttons.",
        sections: [
          {
            heading: "Navigating the Web with Links and Buttons",
            explanation: "The true magic of the World Wide Web is hyperlinks. The anchor tag (a) with the href attribute allows visitors to jump from one page to another across the globe. Buttons, on the other hand, are designed for actions like opening popups, adding items to a cart, or submitting forms.",
            analogy: "Like signboards and doorways in a bustling market. A link is a signboard pointing you to another street. A button is a light switch that immediately turns on an appliance in the room.",
            codeSnippet: {
              language: "html",
              title: "Hyperlinks and Buttons",
              code: '<a href="https://digiconnectghana.org" target="_blank">Visit DigiConnect Ghana</a>\n<button type="button" class="btn">Enroll in Track</button>',
            },
            keyPoints: [
              "The href attribute specifies the destination URL address.",
              "Buttons trigger events and JavaScript actions rather than standard navigation.",
              "Clear button labels like 'Submit Application' create intuitive user experiences.",
            ],
          },
        ],
        keyTakeaways: [
          "Hyperlinks connect independent pages into a unified digital platform.",
          "Interactive buttons are the primary trigger for user actions on modern websites.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="portal-card">
  <h2>DigiConnect Learning Portal</h2>
  <p>Select your learning pathway:</p>
  <div class="actions">
    <a href="#" class="link-btn">Explore Courses</a>
    <button id="enroll-btn" class="action-btn">Enroll Free</button>
  </div>
</div>`,
          initialCss: `.portal-card {
  font-family: sans-serif;
  background: white;
  border: 2px solid #2196d3;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}
.link-btn {
  padding: 10px 18px;
  border: 1px solid #2196d3;
  color: #2196d3;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}
.action-btn {
  background: #2196d3;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}`,
          initialJs: `document.getElementById('enroll-btn').addEventListener('click', () => {
  alert('Congratulations! You are enrolled in the Coding Track.');
});`,
          challengeInstructions: "Add a third action button inside the .actions container that says 'Contact Mentor', then click 'Run Code' to test it!",
        },
      },
    ],
    sandboxConfig: {
      initialHtml: `<div class="welcome-card">
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
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 120,
    summary: "Master CSS Flexbox to align buttons, navigation bars, and cards seamlessly across mobile phones and desktop displays.",
    keyTakeaways: [
      "display: flex turns any container into an intelligent alignment grid.",
      "justify-content centers or spaces items along the main horizontal axis.",
      "gap creates clean, uniform spacing between buttons and cards without messy margins.",
    ],
    topics: [
      {
        id: "code-102-top-1",
        topicNumber: 1,
        title: "What CSS Does: Colors, Typography & Clean Spacing",
        durationMinutes: 7,
        summary: "Understand how CSS rules target HTML tags to transform bare structures into beautiful interfaces.",
        sections: [
          {
            heading: "The Power of Visual Styling",
            explanation: "While HTML provides the text and buttons, CSS controls how they look. You can change background colors, make text bold, adjust line heights, and give cards smooth rounded corners with border-radius.",
            analogy: "Like plastering, painting, and interior decorating. HTML laid the grey concrete blocks. CSS now paints the walls vibrant white and blue, installs warm lighting, and arranges stylish furniture.",
            codeSnippet: {
              language: "css",
              title: "CSS Selector & Rule Block",
              code: ".card {\n  background-color: #ffffff;\n  color: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n}",
            },
            keyPoints: [
              "Selectors choose which HTML tags to style (e.g. .card, h1, button).",
              "Properties define what to change (e.g. color, padding, font-size).",
              "Values specify the exact styling (e.g. #2196D3, 16px, bold).",
            ],
          },
        ],
        keyTakeaways: [
          "CSS separates visual appearance from underlying document structure.",
          "Padding controls inside spacing, while margin controls outside spacing.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="hero-box">
  <h2>Design with DigiConnect</h2>
  <p>Learn CSS visual styling step by step.</p>
  <button class="brand-btn">Explore Colors</button>
</div>`,
          initialCss: `.hero-box {
  background: #e3f2fd;
  color: #0f172a;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  font-family: sans-serif;
  border: 2px solid #2196d3;
}
.brand-btn {
  background: #2196d3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
}`,
          initialJs: `console.log("CSS styling loaded.");`,
          challengeInstructions: "Change the background color of .hero-box to white, add a box-shadow, and make the button background emerald green (#10b981)!",
        },
      },
      {
        id: "code-102-top-2",
        topicNumber: 2,
        title: "Master CSS Flexbox: Rows, Columns & Fluid Alignment",
        durationMinutes: 9,
        summary: "Harness display: flex to arrange navigation bars, buttons, and cards with mathematical precision.",
        sections: [
          {
            heading: "Why Flexbox is Essential",
            explanation: "Before Flexbox, aligning items side-by-side required clunky floats and hacks. Flexbox makes alignment natural. By declaring display: flex on a parent container, all child items automatically line up in a row. You can center them, push them to opposite ends, or space them out evenly with a single rule.",
            analogy: "Like organizing chairs and tables for an event in a hall. Flexbox lets you line things up evenly in a row or stack them in a column with perfect spacing between each person.",
            codeSnippet: {
              language: "css",
              title: "Core Flexbox Properties",
              code: ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}",
            },
            keyPoints: [
              "display: flex activates the flexible container.",
              "justify-content controls spacing along the main horizontal axis.",
              "align-items centers items vertically.",
              "gap sets clean spacing between child items.",
            ],
          },
        ],
        keyTakeaways: [
          "Flexbox eliminates manual pixel calculations for alignment.",
          "justify-content: space-between is the standard pattern for website headers.",
        ],
        hasLab: true,
        labType: "sandbox",
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
      },
      {
        id: "code-102-top-3",
        topicNumber: 3,
        title: "Mobile-First Responsive Design for Smartphones",
        durationMinutes: 9,
        summary: "Ensure websites adapt seamlessly from 360px Android phones to widescreen desktop monitors.",
        sections: [
          {
            heading: "Designing for Ghana's Mobile Majority",
            explanation: "Over 80% of internet users in Ghana and across Africa browse the web on smartphones. A great web developer designs for small screens first, then enhances the layout for tablets and laptops. Adding flex-wrap: wrap ensures that when screen space runs out, cards smoothly wrap onto the next line without horizontal clipping.",
            analogy: "Like water poured into different containers. Water poured into a small calabash fits the calabash; poured into a wide bowl it spreads out naturally. Responsive websites behave like water.",
            keyPoints: [
              "Always check how your layout looks on small 360px mobile viewports.",
              "Use flex-wrap: wrap so multiple cards wrap cleanly on small phones.",
              "Use relative units like percentages and rem instead of hardcoded wide pixel widths.",
            ],
          },
        ],
        keyTakeaways: [
          "Mobile-first design guarantees that all learners have a great experience regardless of device.",
          "Preventing horizontal overflow creates smooth, professional websites.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="responsive-container">
  <div class="box">Item 1: HTML5</div>
  <div class="box">Item 2: CSS3</div>
  <div class="box">Item 3: Flexbox</div>
  <div class="box">Item 4: Mobile View</div>
</div>`,
          initialCss: `.responsive-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  background: #f1f5f9;
  border-radius: 12px;
}
.box {
  flex: 1 1 calc(50% - 12px);
  background: #2196d3;
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-family: sans-serif;
  box-sizing: border-box;
}`,
          initialJs: `console.log("Responsive flexbox grid initialized.");`,
          challengeInstructions: "Change the flex basis of .box to calc(33.33% - 12px) to see three items fit per row on desktop, and check how they wrap!",
        },
      },
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
    summary: "Add dynamic life to websites. Learn variables, functions, and how to update page content when users click buttons.",
    keyTakeaways: [
      "Variables store numbers, text strings, and data in computer memory.",
      "Functions organize reusable code recipes that can be called repeatedly.",
      "Event listeners connect user actions like clicks and taps to instant reactions on screen.",
    ],
    topics: [
      {
        id: "code-103-top-1",
        topicNumber: 1,
        title: "Variables: Storing Data in Program Memory",
        durationMinutes: 8,
        summary: "Discover how JavaScript remembers information like scores, student names, and settings.",
        sections: [
          {
            heading: "How Programs Remember Information",
            explanation: "A website needs to remember user information, such as who is logged in or how many points a student has earned. In JavaScript, we create variables to store this data. We use const for values that will never change, and let for values that change over time.",
            analogy: "Like labelled storage boxes in an office. A box labelled studentName holds text like 'Ama'. A box labelled xpScore holds a number like 100. When Ama finishes a quiz, we reach into the box and increase the number.",
            codeSnippet: {
              language: "javascript",
              title: "Declaring Variables in JavaScript",
              code: "const academyName = 'DigiConnect Ghana';\nlet learnerPoints = 100;\nlearnerPoints = learnerPoints + 50; // Now 150 points",
            },
            keyPoints: [
              "const creates a constant variable that cannot be reassigned.",
              "let creates a variable that can be updated as users interact.",
              "Data types include strings for text, numbers for mathematical values, and booleans for true/false.",
            ],
          },
        ],
        keyTakeaways: [
          "Choose meaningful variable names so your code is self-documenting.",
          "Use let for counters and scores, and const for permanent settings.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="calc-card">
  <h3>Learner Profile</h3>
  <p>Name: <span id="name-display">...</span></p>
  <p>Points: <span id="points-display">0</span></p>
  <button id="add-pts-btn">+25 XP Points</button>
</div>`,
          initialCss: `.calc-card {
  font-family: sans-serif;
  background: white;
  border: 2px solid #2196d3;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}
button {
  background: #2196d3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`,
          initialJs: `const student = "Kofi Mensah";
let points = 50;

document.getElementById('name-display').textContent = student;
document.getElementById('points-display').textContent = points;

document.getElementById('add-pts-btn').addEventListener('click', () => {
  points += 25;
  document.getElementById('points-display').textContent = points;
});`,
          challengeInstructions: "Change the initial points to 100 and update the student name to your own name, then click Run Code!",
        },
      },
      {
        id: "code-103-top-2",
        topicNumber: 2,
        title: "Functions: Reusable Code Instructions",
        durationMinutes: 8,
        summary: "Package instructions into reusable functions that execute whenever called.",
        sections: [
          {
            heading: "Why Functions Matter",
            explanation: "Instead of writing the same twenty lines of code every time a button is clicked, we write the instructions once inside a function. We give the function a descriptive name, and whenever we need that work done, we call the function.",
            analogy: "Like a recipe for Jollof rice. Instead of reinventing how to cook Jollof every time someone orders food, the kitchen follows a tested recipe function and serves it fresh to each customer.",
            codeSnippet: {
              language: "javascript",
              title: "Declaring and Calling a Function",
              code: "function calculateGrade(score) {\n  if (score >= 80) {\n    return 'Distinction';\n  }\n  return 'Pass';\n}\n\nconst amsaGrade = calculateGrade(88); // Returns 'Distinction'",
            },
            keyPoints: [
              "Functions take input parameters and return calculated outputs.",
              "Functions keep your codebase clean and avoid repetitive code.",
            ],
          },
        ],
        keyTakeaways: [
          "Functions are the core building blocks of modern application logic.",
          "Parameters allow one function to handle varied inputs dynamically.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="grade-card">
  <h3>Certificate Grade Evaluator</h3>
  <input type="number" id="score-input" value="85" placeholder="Enter score (0-100)" />
  <button id="calc-btn">Check Grade</button>
  <div id="result-badge" class="result">Score Status</div>
</div>`,
          initialCss: `.grade-card {
  font-family: sans-serif;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 24px;
  border-radius: 14px;
  text-align: center;
}
input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #94a3b8;
  margin-right: 8px;
}
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.result {
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #1e3a8a;
}`,
          initialJs: `function evaluate(score) {
  if (score >= 80) return "Distinction • Faculty Certificate Approved!";
  if (score >= 60) return "Pass • Standard Certificate Approved!";
  return "Review Needed • Keep Practicing Modules!";
}

document.getElementById('calc-btn').addEventListener('click', () => {
  const val = Number(document.getElementById('score-input').value);
  document.getElementById('result-badge').textContent = evaluate(val);
});`,
          challengeInstructions: "Test entering different numbers (e.g. 95, 65, 45) and click 'Check Grade' to observe the function logic!",
        },
      },
      {
        id: "code-103-top-3",
        topicNumber: 3,
        title: "Event Listeners: Reacting to User Clicks & Actions",
        durationMinutes: 9,
        summary: "Connect user clicks to immediate on-screen reactions with addEventListener.",
        sections: [
          {
            heading: "Listening for User Interaction",
            explanation: "JavaScript can listen for user events: clicking a button, typing into a search input, or submitting an application form. When the event occurs, JavaScript immediately runs a callback function to update the user interface without reloading the page.",
            analogy: "Like a doorbell at your front gate. When a visitor pushes the button outside, the bell rings inside your living room. An event listener connects the physical button press to the ring.",
            codeSnippet: {
              language: "javascript",
              title: "Attaching an Event Listener",
              code: "const enrollButton = document.getElementById('enroll');\nenrollButton.addEventListener('click', () => {\n  alert('Welcome aboard!');\n});",
            },
            keyPoints: [
              "addEventListener takes the event type ('click', 'input', 'submit') and a function to run.",
              "Dynamic UI updates make websites feel fast and app-like.",
            ],
          },
        ],
        keyTakeaways: [
          "Event listeners transform static documents into interactive web applications.",
          "Always test event listeners across both mouse clicks and mobile touch taps.",
        ],
        hasLab: true,
        labType: "sandbox",
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
      },
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

  // ─── CYBERSECURITY TRACK ───────────────────────────────────────────────────
  {
    id: "cyber-101",
    trackId: "cybersecurity",
    moduleNumber: 1,
    moduleTitle: "Personal Defense & Social Engineering",
    lessonNumber: 1,
    title: "Anatomy of a Phishing Attack & Social Engineering",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Inspect malicious emails, fake mobile money scams, spoofed domains, and learn how attackers exploit human psychology.",
    keyTakeaways: [
      "Over 90 percent of cyberattacks exploit human psychology and trust rather than technical encryption flaws.",
      "Always inspect sender email domains and link destinations before tapping or entering credentials.",
      "Legitimate institutions will never ask for your PIN or SMS OTP via chat or email.",
    ],
    topics: [
      {
        id: "cyber-101-top-1",
        topicNumber: 1,
        title: "What is Social Engineering & How Scammers Manipulate Trust",
        durationMinutes: 6,
        summary: "Understand the psychological tactics attackers use to rush victims into careless mistakes.",
        sections: [
          {
            heading: "Hacking the Human Mind",
            explanation: "Social engineering is the art of manipulating people so they give up confidential information like passwords, national IDs, or Mobile Money PINs. Rather than cracking military-grade encryption, criminals trick users into handing over the keys voluntarily.",
            analogy: "Like a con artist standing near an ATM in Accra pretending to be a bank agent. They do not break open the metal ATM safe with a hammer; they trick you into giving them your card and whispering your secret PIN.",
            keyPoints: [
              "Urgency: Claiming your account will be deleted in two hours unless you act immediately.",
              "Authority: Impersonating the National Communications Authority, banks, or telecom providers.",
              "Fear: Threatening legal action, account suspension, or financial loss.",
            ],
          },
        ],
        keyTakeaways: [
          "Urgency is the primary psychological weapon of online fraudsters.",
          "When you feel rushed or panicked, pause and verify through official channels.",
        ],
        hasLab: false,
      },
      {
        id: "cyber-101-top-2",
        topicNumber: 2,
        title: "Anatomy of Phishing & Detecting Lookalike Domains",
        durationMinutes: 8,
        summary: "Analyze malicious emails, inspect spoofed domains, and spot counterfeit hyperlinks.",
        sections: [
          {
            heading: "Spotting the Red Flags of Phishing",
            explanation: "Phishing emails and SMS messages mimic trusted brands. However, by inspecting the sender address closely, you can spot subtle errors like mtn-verify-alert.xyz instead of the genuine official mtn.com.gh domain.",
            analogy: "Like counterfeit currency or a fake ID card. At a quick glance in the dark, the paper looks real. But holding it under a bright light reveals missing watermarks and mismatched serial numbers.",
            keyPoints: [
              "Check the domain name after the @ symbol in email addresses.",
              "Hover over links to see where they actually point before clicking.",
              "Be wary of unencrypted raw IP addresses (e.g. http://185.220...).",
            ],
          },
        ],
        keyTakeaways: [
          "Attackers use cheap generic domains like .xyz, .top, or .info to impersonate banks.",
          "Always verify link destinations in your browser status bar.",
        ],
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "phishing-detector",
          title: "Interactive Phishing Analyzer Lab",
          scenario: "You received an urgent message supposedly from Ghana Digital Authority warning that your SIM card registration has expired.",
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
      },
      {
        id: "cyber-101-top-3",
        topicNumber: 3,
        title: "Four Golden Defense Rules for Personal & MoMo Security",
        durationMinutes: 6,
        summary: "Practical, daily defense habits to protect your financial and personal data.",
        sections: [
          {
            heading: "Unbreakable Defense Protocols",
            explanation: "By adopting four consistent security protocols, you can protect yourself and your family from over 99 percent of social engineering and online fraud attempts.",
            analogy: "Like locking your front gate and checking through the peephole before unlocking your home door. It costs nothing, but stops intruders in their tracks.",
            keyPoints: [
              "Rule 1: Never share your Mobile Money PIN or SMS OTP with anyone, including customer service agents.",
              "Rule 2: Verify out-of-band by calling official customer service lines found on physical branches or official cards.",
              "Rule 3: Look for the HTTPS padlock and exact domain spelling in your browser address bar.",
              "Rule 4: Report fraud immediately to your network operator to freeze fraudulent transfers.",
            ],
          },
        ],
        keyTakeaways: [
          "Your PIN and OTP codes are your digital signature—never disclose them.",
          "Official institutions will never ask for your credentials over phone calls or WhatsApp.",
        ],
        hasLab: false,
      },
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
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 120,
    summary: "Discover how automated brute-force attacks crack weak passwords in seconds, and test password entropy interactively.",
    keyTakeaways: [
      "Passphrases with 14+ characters are mathematically exponentially harder to crack than short complex passwords.",
      "Never reuse the same password across multiple online accounts.",
      "Enabling Multi-Factor Authentication (2FA) blocks 99 percent of automated credential attacks.",
    ],
    topics: [
      {
        id: "cyber-102-top-1",
        topicNumber: 1,
        title: "How Automated Brute-Force Password Attacks Work",
        durationMinutes: 8,
        summary: "Understand the high-speed GPU tools cybercriminals use to test billions of passwords per second.",
        sections: [
          {
            heading: "The Speed of Automated Cracking",
            explanation: "Hackers do not sit and type passwords by hand. They use specialized cracking software that tests billions of combinations every second against massive breach lists downloaded from the dark web. A simple 6-character password can be broken in less than a second.",
            analogy: "Like a robotic thief with a master key machine that tries 100,000 keys every single second until the door opens.",
            keyPoints: [
              "Dictionary attacks test common words and leaked password databases.",
              "Brute-force attacks test every permutation of letters and numbers.",
              "Short passwords offer negligible resistance to modern computer processors.",
            ],
          },
        ],
        keyTakeaways: [
          "Length is your strongest weapon against automated cracking engines.",
          "Common words like 'password123' are cracked instantly.",
        ],
        hasLab: false,
      },
      {
        id: "cyber-102-top-2",
        topicNumber: 2,
        title: "Password Entropy & Why Long Passphrases Beat Short Passwords",
        durationMinutes: 9,
        summary: "Learn why three or four random words separated by hyphens create unbreakable security.",
        sections: [
          {
            heading: "Understanding Mathematical Entropy",
            explanation: "Entropy measures the randomness and unpredictability of a password. Rather than using a short password full of hard-to-remember symbols like P@ss1!, security experts recommend passphrases made of multiple random words, such as coffee-accra-sunrise-2026. These are easy for humans to remember but mathematically impossible for supercomputers to crack within centuries.",
            analogy: "A heavy iron bank vault door secured by four independent steel deadbolts. Trying to pick all four locks simultaneously is practically impossible.",
            keyPoints: [
              "Each additional character exponentially multiplies the search space for attackers.",
              "Passphrases of 16+ characters are virtually uncrackable with current technology.",
              "Separate words with hyphens or spaces for readability and entropy.",
            ],
          },
        ],
        keyTakeaways: [
          "Password length beats short character complexity every time.",
          "Use passphrases to create passwords you can easily remember.",
        ],
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "password-auditor",
          title: "Real-Time Password Entropy & Strength Auditor Lab",
          scenario: "Test different password formats in our safe client-side entropy lab to see how fast automated brute-force systems can break them.",
          prompt: "Type a sample password below to analyze its mathematical entropy, character set diversity, and estimated crack time.",
          hint: "Notice how adding random dictionary words separated by hyphens skyrockets security compared to single-word substitutions.",
        },
      },
      {
        id: "cyber-102-top-3",
        topicNumber: 3,
        title: "Multi-Factor Authentication (2FA): The Two-Key Rule",
        durationMinutes: 8,
        summary: "Require two independent proofs of identity to stop account takeovers cold.",
        sections: [
          {
            heading: "The Essential Two-Key Security Shield",
            explanation: "Multi-Factor Authentication (MFA or 2FA) adds a second layer of defense beyond just a password. To log in, you must provide your password and a temporary verification code generated on your authenticator app. Even if a cybercriminal steals your password in a database breach, they cannot enter without the second key in your pocket.",
            analogy: "Like a bank safety deposit box requiring both your personal key and the bank manager key to open. If a burglar steals your key, the box remains firmly locked.",
            keyPoints: [
              "Something you know: Your password or passphrase.",
              "Something you have: Your smartphone or hardware security key.",
              "Something you are: Your fingerprint or facial biometric.",
            ],
          },
        ],
        keyTakeaways: [
          "Turn on 2FA for all your critical accounts: Google, email, and banking.",
          "Authenticator apps like Google Authenticator are more secure than SMS codes.",
        ],
        hasLab: false,
      },
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
    summary: "Understand the primary web database vulnerability from the OWASP Top 10 and learn how software engineers defend databases with prepared statements.",
    keyTakeaways: [
      "Never concatenate raw user input into database query strings.",
      "Prepared statements and parameterized queries separate query logic from user data.",
      "Input validation and Principle of Least Privilege keep backend data secure.",
    ],
    topics: [
      {
        id: "cyber-103-top-1",
        topicNumber: 1,
        title: "What is SQL Injection (SQLi) & How It Bypasses Login Screens",
        durationMinutes: 8,
        summary: "Understand how malicious text input tricks database engines into unauthorized data access.",
        sections: [
          {
            heading: "The Danger of Unsanitized Input",
            explanation: "When a website takes input from a login form (like username or password) and directly glues it into a database query string, an attacker can input special SQL symbols like quotes and boolean expressions to trick the database into running unauthorized commands.",
            analogy: "Like a visitor giving a security guard a badge that says: 'Admit everyone without checking credentials'. If the guard blindly follows whatever is written on the paper rather than checking an authorized register, intruders walk right in.",
            keyPoints: [
              "Databases use SQL to query tables and verify login credentials.",
              "Unchecked inputs allow attackers to inject malicious SQL commands.",
              "A single SQL injection vulnerability can expose an entire company database.",
            ],
          },
        ],
        keyTakeaways: [
          "SQL injection occurs when user input is treated as executable code.",
          "Every web form that talks to a database must be defended against SQLi.",
        ],
        hasLab: false,
      },
      {
        id: "cyber-103-top-2",
        topicNumber: 2,
        title: "Hands-on SQL Injection Simulation Lab",
        durationMinutes: 9,
        summary: "Observe how string interpolation allows bypass and test injection payloads in a safe simulator.",
        sections: [
          {
            heading: "Analyzing Vulnerable Queries",
            explanation: "In a vulnerable application, a login query looks like this: SELECT * FROM users WHERE email = 'USER_INPUT' AND password = 'PASSWORD'. If the attacker types admin@example.com' OR '1'='1 into the email box, the database evaluates '1'='1' as true and logs the attacker in as administrator without any valid password!",
            keyPoints: [
              "The single quote closes the string early.",
              "The OR condition creates a statement that is always true.",
              "Authentication logic is completely bypassed.",
            ],
          },
        ],
        keyTakeaways: [
          "Understanding how attackers exploit queries is the first step in defensive engineering.",
        ],
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "sqli-defender",
          title: "Interactive SQL Injection & Query Defense Lab",
          scenario: "Observe how raw string interpolation allows query bypass, and toggle Parameterized Defense mode to see how secure software neutralizes attacks.",
          prompt: "Simulate a login query test with an injection payload and inspect how parameterized queries prevent authentication bypass.",
          hint: "Compare vulnerable query assembly with parameterized SQL.",
        },
      },
      {
        id: "cyber-103-top-3",
        topicNumber: 3,
        title: "Defending Databases with Parameterized Queries",
        durationMinutes: 8,
        summary: "Implement prepared statements to permanently neutralize SQL injection vulnerabilities.",
        sections: [
          {
            heading: "The Industry Standard Defense",
            explanation: "Software engineers eliminate SQL injection by using Parameterized Queries (also known as Prepared Statements). The database query structure is compiled and locked in advance. User input is sent separately as pure literal data. Even if the user types SQL commands, the database treats them as harmless text.",
            analogy: "Like slipping a letter through a narrow mail slot in an iron gate. The letter is treated strictly as paper mail, not as a demolition hammer to break the gate open.",
            codeSnippet: {
              language: "typescript",
              title: "Secure Parameterized Query Example",
              code: "// Secure prepared query:\nconst query = 'SELECT * FROM users WHERE email = $1 AND password = $2';\nconst result = await db.query(query, [userEmail, hashedPassword]);",
            },
            keyPoints: [
              "Query structure is pre-compiled before receiving user values.",
              "User inputs are treated strictly as data, never as executable code.",
              "All modern web frameworks provide built-in parameterized query tools.",
            ],
          },
        ],
        keyTakeaways: [
          "Parameterized queries are the single most effective defense against SQL injection.",
          "Never concatenate raw user strings into SQL queries.",
        ],
        hasLab: false,
      },
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

  // ─── DIGITAL WORKPLACE LITERACY ───────────────────────────────────────────
  {
    id: "digi-101",
    trackId: "digital-literacy",
    moduleNumber: 1,
    moduleTitle: "Cloud Workspaces & Secure Collaboration",
    lessonNumber: 1,
    title: "Navigating Cloud Drives, Access Roles & Version Control",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Master organizing collaborative cloud folders, permissions, document sharing, and avoiding data leaks in remote teams.",
    keyTakeaways: [
      "Use Viewer or Commenter roles when sharing documents externally to protect core data integrity.",
      "Version history allows instant rollback of accidental deletions or errors.",
      "Always restrict confidential documents to authenticated organizational accounts.",
    ],
    topics: [
      {
        id: "digi-101-top-1",
        topicNumber: 1,
        title: "Cloud Storage vs Traditional Local Hard Drives",
        durationMinutes: 6,
        summary: "Understand why modern enterprises run on cloud document infrastructure.",
        sections: [
          {
            heading: "The Shift to Cloud Workspaces",
            explanation: "In traditional offices, files lived on desktop hard drives. If a computer broke, files were lost. Today, high-performing African enterprises collaborate in real time across cloud storage platforms like Google Drive, OneDrive, and secure cloud repositories.",
            analogy: "Like keeping money in a secure bank account accessible from your phone anywhere versus keeping cash under your mattress at home.",
            keyPoints: [
              "Cloud files are automatically backed up across redundant servers.",
              "Team members can work on the same document simultaneously from anywhere.",
            ],
          },
        ],
        keyTakeaways: [
          "Cloud workspaces ensure business continuity and seamless remote collaboration.",
        ],
        hasLab: false,
      },
      {
        id: "digi-101-top-2",
        topicNumber: 2,
        title: "Granular Access Permissions: Viewer vs Commenter vs Editor",
        durationMinutes: 7,
        summary: "Assign the exact right access levels to prevent accidental edits and leaks.",
        sections: [
          {
            heading: "Three Levels of Document Sharing",
            explanation: "Assigning proper permission levels is essential when collaborating with clients and partners. Viewers can read without changing content. Commenters can suggest edits in the margin. Editors have full power to modify content.",
            analogy: "Letting someone look at an official certificate through a glass window versus handing them a pen to scribble on it.",
            keyPoints: [
              "Viewer: Best for finalized reports and official certificates.",
              "Commenter: Ideal for collecting reviews without altering text.",
              "Editor: Reserved for trusted active collaborators.",
            ],
          },
        ],
        keyTakeaways: [
          "Never set sensitive spreadsheets to 'Anyone on the internet can edit'.",
          "Restrict organizational folders to verified corporate emails.",
        ],
        hasLab: false,
      },
      {
        id: "digi-101-top-3",
        topicNumber: 3,
        title: "Version History & Restoring Deleted Files",
        durationMinutes: 7,
        summary: "Recover previous revisions and protect documents against accidental deletions.",
        sections: [
          {
            heading: "The Built-In Time Machine",
            explanation: "Every modification in a cloud workspace is recorded with a timestamp and author tag. If an intern accidentally deletes a project table, you can restore previous revisions from 5 minutes or 5 months ago with one click.",
            keyPoints: [
              "Version history records who made each change and when.",
              "Named versions help bookmark major project milestones.",
              "Accidental deletions can be reverted in seconds.",
            ],
          },
        ],
        keyTakeaways: [
          "Use version history to review changes before finalizing reports.",
          "Cloud audit trails provide accountability in remote teams.",
        ],
        hasLab: false,
      },
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
    keyTakeaways: [
      "Standardized column formats prevent calculation errors and formula breakage.",
      "COUNTIF and SUM formulas automate counting and aggregating large datasets instantly.",
      "Clean tabular structure makes exporting to CSV or relational databases seamless.",
    ],
    topics: [
      {
        id: "digi-102-top-1",
        topicNumber: 1,
        title: "Spreadsheet Hygiene & Clean Column Standards",
        durationMinutes: 6,
        summary: "Organize records with one data type per column for dependable calculations.",
        sections: [
          {
            heading: "Rules of Tabular Data Hygiene",
            explanation: "Whether calculating youth program budgets, tracking community attendance, or preparing financial audits, spreadsheets are the backbone of digital decision-making. Keeping text in text columns, numbers in numeric columns, and dates in standardized formats prevents errors.",
            analogy: "Like organizing goods on neat supermarket shelves with clear price tags instead of tossing everything into an unorganized pile.",
            keyPoints: [
              "One data type per column prevents formula calculation errors.",
              "Freeze header rows so titles remain visible when scrolling.",
            ],
          },
        ],
        keyTakeaways: [
          "Consistent column formatting makes data sorting and filtering effortless.",
        ],
        hasLab: false,
      },
      {
        id: "digi-102-top-2",
        topicNumber: 2,
        title: "Essential Formulas: SUM, AVERAGE, and COUNTIF",
        durationMinutes: 7,
        summary: "Automate calculations across hundreds of records in milliseconds.",
        sections: [
          {
            heading: "Automating Math with Formulas",
            explanation: "Spreadsheet formulas start with an equals sign. SUM adds numeric ranges together. AVERAGE calculates mathematical means. COUNTIF counts only rows that match a specific criterion, such as counting how many students completed a course.",
            codeSnippet: {
              language: "excel",
              title: "Common Spreadsheet Formulas",
              code: "=SUM(B2:B50)\n=AVERAGE(C2:C50)\n=COUNTIF(D2:D50, 'Completed')",
            },
            keyPoints: [
              "=SUM(B2:B50) calculates total amounts.",
              "=AVERAGE(C2:C50) calculates mean scores.",
              "=COUNTIF(D2:D50, 'Completed') counts attendees who finished.",
            ],
          },
        ],
        keyTakeaways: [
          "Formulas update automatically whenever underlying data numbers change.",
        ],
        hasLab: false,
      },
      {
        id: "digi-102-top-3",
        topicNumber: 3,
        title: "Exporting Data Cleanly to CSV",
        durationMinutes: 7,
        summary: "Bridge spreadsheets and software applications with standardized CSV formats.",
        sections: [
          {
            heading: "The Universal Data Format",
            explanation: "CSV stands for Comma-Separated Values. It is a plain text format that stores tabular data. Because it lacks proprietary formatting, every programming language and database in the world can import and export CSV files effortlessly.",
            keyPoints: [
              "CSV files can be opened by Excel, Google Sheets, Python, and SQL databases.",
              "Standard exports avoid compatibility issues across different operating systems.",
            ],
          },
        ],
        keyTakeaways: [
          "CSV is the industry standard for transporting clean data between applications.",
        ],
        hasLab: false,
      },
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

  // ─── PYTHON TRACK ──────────────────────────────────────────────────────────
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
    summary: "Learn why Python is the world's most popular automation language, understand variables, and execute clean scripts.",
    keyTakeaways: [
      "Python utilizes whitespace indentation rather than semicolons or curly braces.",
      "Variables are dynamically typed: strings, integers, floats, and booleans.",
      "F-strings provide clean and expressive string interpolation.",
    ],
    topics: [
      {
        id: "py-101-top-1",
        topicNumber: 1,
        title: "Why Python Powers the Modern World",
        durationMinutes: 6,
        summary: "Discover why Python is the top choice for automation, data science, and AI.",
        sections: [
          {
            heading: "The Language of Readability",
            explanation: "Python is famous for its clean, human-readable syntax that resembles plain English. From automating routine spreadsheet calculations to building machine learning algorithms and web servers, Python is the world's most versatile programming language.",
            analogy: "Like speaking plain English compared to complex technical shorthand. Python was created to be easy to read, write, and maintain.",
            keyPoints: [
              "Python has a vast ecosystem of free open-source libraries.",
              "Beginner-friendly syntax with immense industrial power.",
            ],
          },
        ],
        keyTakeaways: [
          "Python lets you focus on solving problems rather than fighting syntax rules.",
        ],
        hasLab: false,
      },
      {
        id: "py-101-top-2",
        topicNumber: 2,
        title: "Variables, Numbers, Text Strings, and Lists",
        durationMinutes: 7,
        summary: "Declare data in Python without tedious type definitions.",
        sections: [
          {
            heading: "Dynamic Typing in Python",
            explanation: "In Python, you do not need to state whether a variable is a number or text. Python detects the data type automatically. You can store text strings in quotes, numbers directly, and collections inside square bracket lists.",
            codeSnippet: {
              language: "python",
              title: "Python Variables and Lists",
              code: "student_name = 'Ama Mensah'\nstudent_age = 19\nhas_completed = True\nscores = [95, 88, 92]\n\nprint(f'Student {student_name} scored {scores[0]}%!')",
            },
            keyPoints: [
              "Strings hold text in single or double quotes.",
              "Lists hold ordered collections of items inside square brackets.",
              "F-strings let you inject variables directly into text output.",
            ],
          },
        ],
        keyTakeaways: [
          "Python handles type detection behind the scenes.",
          "Lists are indexed starting from 0.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="python-output">
  <h3>Python Script Simulator</h3>
  <pre id="output-log">Click 'Run Script' to execute Python...</pre>
</div>`,
          initialCss: `.python-output {
  background: #0f172a;
  color: #38bdf8;
  padding: 20px;
  border-radius: 12px;
  font-family: monospace;
}`,
          initialJs: `const student = "Kofi";
const track = "Python Automation";
const modules = 3;
document.getElementById('output-log').textContent = 
  "Student: " + student + "\\nTrack: " + track + "\\nTotal Modules: " + modules + "\\nStatus: Ready for Automation!";`,
          challengeInstructions: "Inspect the output log and change student name or track title in the script!",
        },
      },
      {
        id: "py-101-top-3",
        topicNumber: 3,
        title: "Clean Indentation & Self-Documenting Code",
        durationMinutes: 7,
        summary: "Understand how Python uses 4-space indentation to structure code blocks.",
        sections: [
          {
            heading: "Indentation Replaces Curly Braces",
            explanation: "Unlike other languages that use semicolons and curly braces, Python enforces readable code by using 4-space indentation to define statement blocks. This guarantees that all Python code written by any developer is visually organized and easy to follow.",
            keyPoints: [
              "Always use 4 spaces for each indentation level.",
              "Consistent indentation prevents IndentationError in Python.",
            ],
          },
        ],
        keyTakeaways: [
          "Indentation in Python is not just for looks—it defines code hierarchy.",
        ],
        hasLab: false,
      },
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
    keyTakeaways: [
      "For-loops iterate sequentially through lists, dictionaries, or ranges.",
      "If/elif/else statements control dynamic execution paths based on conditions.",
      "Automation scripts can process thousands of records in milliseconds.",
    ],
    topics: [
      {
        id: "py-102-top-1",
        topicNumber: 1,
        title: "If, Elif, and Else Decision Making",
        durationMinutes: 8,
        summary: "Teach your program to make intelligent decisions based on data values.",
        sections: [
          {
            heading: "Branching Logic in Python",
            explanation: "Conditionals allow your script to take different paths depending on data. If an applicant is over 18, allow enrollment; otherwise prompt for guardian permission.",
            analogy: "Like a traffic light directing vehicles based on green, yellow, or red signals.",
            codeSnippet: {
              language: "python",
              title: "If-Elif-Else Statement",
              code: "score = 85\n\nif score >= 80:\n    print('Distinction Certificate')\nelif score >= 60:\n    print('Standard Certificate')\nelse:\n    print('Review Recommended')",
            },
            keyPoints: [
              "if checks the primary condition.",
              "elif checks alternate conditions sequentially.",
              "else catches all remaining fallback cases.",
            ],
          },
        ],
        keyTakeaways: [
          "Conditionals bring intelligent decision-making to your scripts.",
        ],
        hasLab: false,
      },
      {
        id: "py-102-top-2",
        topicNumber: 2,
        title: "For-Loops: Automating Repetitive Work in Milliseconds",
        durationMinutes: 9,
        summary: "Execute repetitive operations across collections without manual labor.",
        sections: [
          {
            heading: "Never Do Repetitive Work by Hand",
            explanation: "A programmer should never do manual repetitive work that a computer can perform in milliseconds. A for-loop visits every element in a list one by one and executes the required calculation automatically.",
            analogy: "An automated assembly line stamping 100 packages a minute instead of one person stamping them by hand all afternoon.",
            codeSnippet: {
              language: "python",
              title: "For-Loop Over a List of Students",
              code: "students = ['Kofi', 'Abena', 'Kwame', 'Akosua']\n\nfor name in students:\n    print(f'Sending welcome kit to {name} in Accra')",
            },
            keyPoints: [
              "for item in list loops through each element sequentially.",
              "Loops eliminate human errors in batch processing.",
            ],
          },
        ],
        keyTakeaways: [
          "Loops are the foundation of all digital data processing and automation.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="loop-box">
  <h3>Batch Notification Automation</h3>
  <div id="log-output" class="log-screen">Initializing batch processor...</div>
  <button id="run-loop-btn">Process All Students</button>
</div>`,
          initialCss: `.loop-box {
  background: white;
  border: 2px solid #0284c7;
  padding: 20px;
  border-radius: 12px;
  font-family: sans-serif;
}
.log-screen {
  background: #0f172a;
  color: #a5f3fc;
  padding: 16px;
  border-radius: 8px;
  margin: 12px 0;
  font-family: monospace;
  white-space: pre-line;
  max-height: 180px;
  overflow-y: auto;
}
button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`,
          initialJs: `const students = [
  { name: "Kofi", score: 92 },
  { name: "Abena", score: 74 },
  { name: "Kwesi", score: 88 },
  { name: "Akosua", score: 95 }
];

document.getElementById('run-loop-btn').addEventListener('click', () => {
  let logs = "Batch Processing Started...\\n";
  for (const s of students) {
    if (s.score >= 80) {
      logs += "✓ Certificate Conferred: " + s.name + " (" + s.score + "%)\\n";
    } else {
      logs += "• In Progress: " + s.name + " (" + s.score + "%)\\n";
    }
  }
  logs += "All 4 records processed in 2ms!";
  document.getElementById('log-output').textContent = logs;
});`,
          challengeInstructions: "Click 'Process All Students' to run the batch loop and observe conditional evaluation in action!",
        },
      },
      {
        id: "py-102-top-3",
        topicNumber: 3,
        title: "Building a Practical Automation Script",
        durationMinutes: 8,
        summary: "Assemble loops, conditionals, and output formatting into an automated workflow.",
        sections: [
          {
            heading: "Real-World Certificate Eligibility Workflow",
            explanation: "Combining loops and conditionals creates end-to-end automation pipelines. In this lesson, we inspect how organizations process hundreds of student exam scores, filter for distinction thresholds, and print certified honor rolls with zero manual effort.",
            keyPoints: [
              "Data is loaded into structured objects.",
              "Loops iterate through the cohort.",
              "Conditionals stamp approved certificates automatically.",
            ],
          },
        ],
        keyTakeaways: [
          "Automation saves hours of administrative time and eliminates human scoring errors.",
        ],
        hasLab: false,
      },
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
