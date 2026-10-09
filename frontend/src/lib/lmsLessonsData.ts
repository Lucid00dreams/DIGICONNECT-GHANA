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
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "network-inspector",
          title: "Network Port Forensic & Packet Sniffer Lab",
          scenario: "Inspect open ports on server 192.168.1.100 and enforce firewall protection",
          prompt: "Run an Nmap scan to find insecure legacy ports (21 FTP, 23 Telnet), and apply firewall policy to enforce TLS encryption.",
          hint: "Click 'Run Nmap Port Scan', review the listening ports, and click 'Apply Firewall Policy' to secure the host."
        },
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
        hasLab: true,
        labType: "digital-literacy",
        digitalLiteracyLabConfig: {
          type: "cloud-permissions",
          title: "Cloud Document Access Control Lab",
          scenario: "Configure safe sharing for confidential payroll file with external consultant",
          prompt: "Prevent unauthorized editing and leaks by locking general access to 'Restricted (Invite Only)', setting role to 'Viewer', and enforcing 2FA verification.",
          hint: "Confidential company records must never be 'Public' and consultants must never have 'Editor' rights. Select Restricted and Viewer."
        },
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
        hasLab: true,
        labType: "digital-literacy",
        digitalLiteracyLabConfig: {
          type: "spreadsheet-formulas",
          title: "Interactive Spreadsheet Formula Sandbox",
          scenario: "Calculate the total equipment budget for a youth coding bootcamp in Kumasi",
          prompt: "Write the formula '=SUM(D2:D5)' into the fx formula bar to sum all item totals and verify budget calculation.",
          hint: "Type '=SUM(D2:D5)' into the formula bar and click Calculate to compute the sum."
        },
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
        labType: "python",
        pythonLabConfig: {
          title: "Python 3 Variables & F-String Lab",
          scenario: "Create a welcome notification script for a new student at DigiConnect Ghana Academy",
          initialCode: `# Python Variables & F-String Formatting
student_name = "Kofi"
track = "Python Automation"
xp_score = 150

print(f"Welcome to DigiConnect Ghana, {student_name}!")
print(f"Enrolled Track: {track}")
print(f"Starting XP: {xp_score}")`,
          challengeInstructions: "Change student_name to your name, set xp_score to 200, and click 'Run Script' to verify!",
          expectedOutputSubstring: "Welcome to DigiConnect Ghana",
          expectedVariables: {
            xp_score: 200,
          },
          hint: "Update student_name = 'YourName' and xp_score = 200, then click 'Run Script'."
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
        labType: "python",
        pythonLabConfig: {
          title: "Python For-Loop & Batch Automation Lab",
          scenario: "Automate batch notifications for tech bootcamp students across Ghana",
          initialCode: `# For-Loop Batch Processing
cities = ["Accra", "Kumasi", "Tamale", "Takoradi"]

for city in cities:
    print(f"Launching DigiConnect tech workshop in {city}!")
`,
          challengeInstructions: "Add 'Cape Coast' to the cities list and run the script to automate notifications to all 5 cities!",
          expectedOutputSubstring: "Cape Coast",
          hint: "Add 'Cape Coast' inside the cities = [...] list with quotes, e.g. cities = ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast']"
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

  // ─── CYBERSECURITY ARCHITECTURE & IAM TRACK (IBM & DCG) ─────────────────────
  {
    id: "iam-101",
    trackId: "cybersecurity-architecture",
    moduleNumber: 1,
    moduleTitle: "Cloud Security & Identity Architecture",
    lessonNumber: 1,
    title: "Identity and Access Management (IAM) & Cloud Access Controls",
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 120,
    summary: "Master enterprise identity governance: differentiate authentication from authorization, implement role-based access control, and enforce Zero Trust principles.",
    keyTakeaways: [
      "Authentication validates identity (who you are), while Authorization determines permissions (what you can do).",
      "Role-Based Access Control (RBAC) assigns permissions to job roles rather than individual accounts.",
      "The Principle of Least Privilege guarantees users and applications receive only the minimum access necessary.",
      "Zero Trust operates under the core mantra: never trust, always verify every access request.",
    ],
    topics: [
      {
        id: "iam-101-top-1",
        topicNumber: 1,
        title: "The Fundamentals of IAM: Authentication vs Authorization",
        durationMinutes: 8,
        summary: "Understand the critical distinction between proving who you are and granting specific resource rights.",
        sections: [
          {
            heading: "Who Are You vs What Can You Access?",
            explanation: "Identity and Access Management (IAM) is the frontline defense of any modern corporate infrastructure. When an employee attempts to sign into a company database, two distinct checkpoints occur: Authentication (AuthN) verifies the user's claimed identity with passwords or biometrics. Once verified, Authorization (AuthZ) checks the access policy matrix to determine if that specific employee is permitted to view, edit, or delete the target records.",
            analogy: "Think of checking in at Kotoka International Airport in Accra. Your Ghana Passport or National ID proves your identity (Authentication). Your boarding pass proves you are authorized to enter Flight 204 to London (Authorization). A valid passport without a boarding pass will not get you past the departure gate.",
            keyPoints: [
              "AuthN (Authentication): Verifying identity via password, SMS OTP, or authenticator app.",
              "AuthZ (Authorization): Verifying permissions via token scopes, claims, or ACLs.",
              "Centralized Identity Providers (IdPs) like IBM Security Verify, Okta, and Azure AD unify logins across all cloud apps.",
            ],
          },
        ],
        keyTakeaways: [
          "Authentication must always precede authorization in any secure architecture.",
        ],
        hasLab: false,
      },
      {
        id: "iam-101-top-2",
        topicNumber: 2,
        title: "Role-Based Access Control (RBAC) & Principle of Least Privilege",
        durationMinutes: 9,
        summary: "Design scalable access hierarchies that prevent privilege escalation and unauthorized data exposure.",
        sections: [
          {
            heading: "Why Individual Account Permissions Fail at Scale",
            explanation: "In an organization with hundreds of employees, assigning individual permissions to each staff member creates chaotic configuration drift and security loopholes. Role-Based Access Control solves this by defining roles such as Financial Auditor, Software Engineer, or Human Resource Officer. Employees are assigned to roles, and roles inherit policies. If an employee leaves the company or shifts departments, simply updating their role assignment instantly revokes or grants the appropriate permissions.",
            analogy: "Like issuing master keycards in a corporate bank. Tellers receive teller cards granting access to the cash counter. Managers receive vault keycards. You never give a teller full access to the bank vault just in case they might need it someday.",
            keyPoints: [
              "The Principle of Least Privilege: Never grant wildcard permissions (e.g., *:* admin access) when specific read-only access suffices.",
              "Separation of Duties prevents any single user from initiating and approving high-risk transactions alone.",
              "Just-In-Time (JIT) access grants elevated privileges temporarily and expires them automatically.",
            ],
          },
        ],
        keyTakeaways: [
          "Always design IAM policies around minimum necessary permissions and role-based groupings.",
        ],
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "password-auditor",
          title: "Enterprise IAM & Credential Hardening Lab",
          scenario: "Audit enterprise cloud accounts for weak credentials, shared service accounts, and missing Multi-Factor Authentication (MFA).",
          prompt: "Identify accounts lacking MFA, enforce a minimum 16-character passphrase policy, and configure automatic session timeout.",
          hint: "Eliminate generic admin accounts and require hardware security keys or authenticator apps for all privileged roles."
        },
      },
      {
        id: "iam-101-top-3",
        topicNumber: 3,
        title: "Zero Trust Architecture: Never Trust, Always Verify",
        durationMinutes: 8,
        summary: "Transition from old perimeter firewalls to identity-driven continuous verification across all network packets.",
        sections: [
          {
            heading: "The Death of the Traditional Corporate Perimeter",
            explanation: "Historically, companies relied on perimeter security: once a device was inside the office building or connected via VPN, it was implicitly trusted. Modern threats have made this model obsolete. Zero Trust Architecture assumes the network is already hostile. Every single request—whether from a remote laptop in Kumasi or a local server in Accra—must authenticate, prove device compliance, and verify context before accessing sensitive assets.",
            keyPoints: [
              "Continuous verification evaluates user location, device posture, and risk score on every request.",
              "Microsegmentation limits lateral movement if an attacker breaches one server.",
              "Encrypt data both in transit (TLS 1.3) and at rest (AES-256).",
            ],
          },
        ],
        keyTakeaways: [
          "Zero Trust is not a single software product—it is a comprehensive architecture of continuous verification.",
        ],
        hasLab: false,
      },
    ],
    quiz: [
      {
        id: "iam-q1",
        question: "What is the primary difference between Authentication and Authorization in IAM?",
        options: [
          "Authentication is for mobile phones; Authorization is for desktop laptops",
          "Authentication verifies who you are; Authorization determines what you are allowed to access",
          "Authentication encrypts files; Authorization deletes malicious files",
          "Authentication is managed by databases; Authorization is managed by firewalls",
        ],
        correctAnswer: 1,
        explanation: "Authentication proves your claimed identity; Authorization checks whether that identity has permissions for the requested action.",
      },
      {
        id: "iam-q2",
        question: "What does the Principle of Least Privilege dictate?",
        options: [
          "Every employee should receive full administrator access to work quickly",
          "Users should only be granted the minimum permissions strictly necessary to perform their job duties",
          "Passwords should never exceed 6 characters for ease of memory",
          "Cloud permissions should never be revoked even when employees change teams",
        ],
        correctAnswer: 1,
        explanation: "The Principle of Least Privilege limits access strictly to what is required, minimizing the blast radius of any compromised credential.",
      },
    ],
  },

  // ─── DATA ANALYTICS TRACK (GOOGLE & DCG) ────────────────────────────────────
  {
    id: "data-101",
    trackId: "data-analytics",
    moduleNumber: 1,
    moduleTitle: "Foundations of Data Analytics",
    lessonNumber: 1,
    title: "Data-Driven Decision Making & Spreadsheet Analytics",
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 110,
    summary: "Discover how organizations transform raw rows into actionable business intelligence through spreadsheets, SQL, and visual storytelling.",
    keyTakeaways: [
      "The 5 phases of data analysis: Ask questions, Prepare data, Process hygiene, Analyze trends, and Share insights.",
      "Spreadsheet formulas (SUM, AVERAGE, COUNTIF, XLOOKUP) automate quantitative business modeling.",
      "Clean data is the prerequisite for accurate decision making and avoiding garbage-in, garbage-out errors.",
    ],
    topics: [
      {
        id: "data-101-top-1",
        topicNumber: 1,
        title: "The Five Core Phases of Data Analytics",
        durationMinutes: 8,
        summary: "Learn the systematic workflow used by Google and top tech enterprises to solve complex problems.",
        sections: [
          {
            heading: "From Raw Numbers to Business Strategy",
            explanation: "Data analytics is the process of collecting, transforming, and modeling raw data to discover actionable insights. Successful analytics projects follow a structured five-step lifecycle: Ask the right business questions, Prepare raw data sources, Process and clean missing values, Analyze patterns with formulas or queries, and Share conclusions through visual charts.",
            analogy: "Like a chef preparing a banquet in Accra. You don't just dump raw cassava and tomatoes onto a plate. You ask what the guests desire, procure fresh ingredients, wash and peel thoroughly, cook with precision, and present a beautifully plated meal.",
            keyPoints: [
              "Ask: Define the specific problem statement and metric goals.",
              "Prepare & Process: Clean typos, eliminate duplicate records, and standardize date formats.",
              "Analyze & Share: Translate numerical patterns into executive recommendations.",
            ],
          },
        ],
        keyTakeaways: [
          "High-impact data analysts focus on answering real business questions rather than just calculating numbers.",
        ],
        hasLab: false,
      },
      {
        id: "data-101-top-2",
        topicNumber: 2,
        title: "Spreadsheet Analytics & Quantitative Modeling",
        durationMinutes: 9,
        summary: "Harness formulas and logic to model startup revenue, growth percentages, and customer cohorts.",
        sections: [
          {
            heading: "The Swiss Army Knife of Modern Business",
            explanation: "Whether working at Google or launching a tech startup in Ghana, spreadsheets remain the universal tool for quick quantitative modeling. Mastering formulas like SUM, AVERAGE, COUNTIF, and XLOOKUP allows you to summarize thousands of customer transactions in seconds.",
            keyPoints: [
              "=SUM(range) aggregates total revenue or user numbers.",
              "=AVERAGE(range) calculates the statistical mean value per customer.",
              "=COUNTIF(range, criterion) counts items that meet specific condition thresholds.",
            ],
          },
        ],
        keyTakeaways: [
          "Always test your formulas against sample test rows before applying them across whole datasets.",
        ],
        hasLab: true,
        labType: "digital-literacy",
        digitalLiteracyLabConfig: {
          type: "spreadsheet-formulas",
          title: "Startup Revenue & Cohort Metrics Lab",
          scenario: "Calculate quarterly revenue and average transaction value for digital innovation hubs in Accra.",
          prompt: "Write =SUM(B2:B5) and =AVERAGE(B2:B5) to compute the quarterly total and mean customer purchase.",
          hint: "Input the standard spreadsheet syntax starting with an equals sign = followed by the formula name."
        },
      },
      {
        id: "data-101-top-3",
        topicNumber: 3,
        title: "Data Visualization & Executive Dashboards",
        durationMinutes: 8,
        summary: "Transform complex tables into intuitive charts that communicate trends in seconds.",
        sections: [
          {
            heading: "Choosing the Right Visual Chart",
            explanation: "Executives rarely read through raw spreadsheet rows; they make decisions based on clear visual dashboards. Matching the chart type to your communication goal is essential: line charts show trends over time, bar charts compare categorical groups, and pie charts show percentage breakdowns of a whole.",
            keyPoints: [
              "Use Line Charts for chronological trends (e.g. monthly active users).",
              "Use Bar Charts for discrete category comparisons (e.g. sales by city).",
              "Avoid 3D charts and visual clutter that distract from the core data story.",
            ],
          },
        ],
        keyTakeaways: [
          "A great chart explains a complex trend in five seconds or less.",
        ],
        hasLab: false,
      },
    ],
    quiz: [
      {
        id: "data-q1",
        question: "What is the primary risk of analyzing data without first completing the cleaning/processing phase?",
        options: [
          "The computer screen will turn off automatically",
          "Duplicate, null, or corrupted data will produce inaccurate and misleading conclusions (Garbage In, Garbage Out)",
          "The internet connection will be permanently terminated",
          "The spreadsheet will convert all numbers into plain text",
        ],
        correctAnswer: 1,
        explanation: "Analyzing uncleaned data leads to flawed conclusions that can severely mislead organizational strategy.",
      },
    ],
  },

  // ─── CLOUD & DEVOPS TRACK (AWS & DCG) ───────────────────────────────────────
  {
    id: "cloud-101",
    trackId: "cloud-devops",
    moduleNumber: 1,
    moduleTitle: "Cloud Infrastructure Architecture",
    lessonNumber: 1,
    title: "AWS Cloud Fundamentals & Scalable Infrastructure",
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 120,
    summary: "Learn how modern cloud providers replace physical server rooms with virtual machines, container orchestration, and continuous delivery pipelines.",
    keyTakeaways: [
      "Cloud computing replaces capital expenditure on physical servers with elastic on-demand resources.",
      "The three main service models are IaaS (Infrastructure), PaaS (Platform), and SaaS (Software).",
      "Docker containers package application code and dependencies into portable, reproducible runtime units.",
    ],
    topics: [
      {
        id: "cloud-101-top-1",
        topicNumber: 1,
        title: "Demystifying Cloud Architecture: Regions, VPCs & EC2",
        durationMinutes: 8,
        summary: "Understand how Amazon Web Services organizes worldwide data centers for high availability.",
        sections: [
          {
            heading: "The Shift from On-Premises Server Rooms to the Cloud",
            explanation: "Before cloud computing, businesses had to purchase physical servers, lease air-conditioned server rooms, and employ round-the-clock maintenance engineers. Cloud platforms like AWS, Google Cloud, and Microsoft Azure provide virtualized compute (EC2), storage (S3), and networking on demand, allowing developers to spin up enterprise servers in seconds.",
            analogy: "Like electricity from the national power grid in Ghana. You do not build a personal hydroelectric dam in your backyard to power your laptop; you plug into the wall and pay only for the kilowatt-hours you consume.",
            keyPoints: [
              "Regions are geographic locations around the world with multiple isolated data centers (Availability Zones).",
              "Virtual Private Clouds (VPCs) create isolated private network subnets for your company's servers.",
              "Elasticity allows servers to scale up automatically during high traffic and scale down when traffic drops.",
            ],
          },
        ],
        keyTakeaways: [
          "Cloud computing delivers agility, global reach, and pay-as-you-go financial flexibility.",
        ],
        hasLab: false,
      },
      {
        id: "cloud-101-top-2",
        topicNumber: 2,
        title: "Docker Containers & Microservices Architecture",
        durationMinutes: 9,
        summary: "Package software into lightweight containers that run reliably anywhere from laptop to cloud cluster.",
        sections: [
          {
            heading: "Eliminating 'It Works on My Machine' Forever",
            explanation: "A common frustration in software development is when code works perfectly on a developer's laptop but crashes in production due to different operating system libraries. Docker solves this by packaging the application code, runtime libraries, and environment variables into an immutable Docker container.",
            keyPoints: [
              "Dockerfiles define step-by-step instructions for building a container image.",
              "Containers share the host OS kernel, making them much faster and lighter than full virtual machines.",
              "Container registries store and version images for deployment.",
            ],
          },
        ],
        keyTakeaways: [
          "Containers guarantee that software behaves identically across development, testing, and production environments.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="cloud-status">
  <h2>Cloud Cluster Health Check</h2>
  <div class="pod-grid">
    <div class="pod status-green">EC2-Web-Node-01: Running</div>
    <div class="pod status-green">EC2-Web-Node-02: Running</div>
    <div class="pod status-amber">Docker-Worker-03: Scaling Up</div>
  </div>
  <button id="deploy-btn">Trigger Blue-Green Deploy</button>
</div>`,
          initialCss: `.cloud-status {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  padding: 24px;
  border-radius: 16px;
}
.pod-grid {
  display: grid;
  gap: 10px;
  margin: 16px 0;
}
.pod {
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
.status-green { background: #065f46; color: #a7f3d0; }
.status-amber { background: #78350f; color: #fde68a; }
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`,
          initialJs: `document.getElementById('deploy-btn').addEventListener('click', function() {
  alert('Initiating zero-downtime rolling deployment across AWS cluster!');
});`,
          challengeInstructions: "Add a new pod element for 'S3-Storage-Bucket: Active' and test the deploy button.",
        },
      },
    ],
    quiz: [
      {
        id: "cloud-q1",
        question: "What is the primary advantage of Docker containerization over traditional virtual machines?",
        options: [
          "Containers make computers completely immune to all passwords",
          "Containers share the host OS kernel, making them much lighter, faster to launch, and highly portable",
          "Containers can only run on Linux computers manufactured in 2026",
          "Containers consume 100% of all available CPU continuously",
        ],
        correctAnswer: 1,
        explanation: "Containers share the host operating system kernel and isolate dependencies, enabling rapid deployment and portability.",
      },
    ],
  },

  // ─── MACHINE LEARNING & AI FOUNDATIONS (DEEPLEARNING.AI & DCG) ─────────────
  {
    id: "ml-101",
    trackId: "machine-learning",
    moduleNumber: 1,
    moduleTitle: "Supervised Learning & Python Data Science",
    lessonNumber: 1,
    title: "Foundations of Machine Learning & Predictive Models",
    durationMinutes: 30,
    level: "Beginner",
    xpAward: 130,
    summary: "Understand how computers learn from historical patterns to make predictions without being explicitly hardcoded with rules.",
    keyTakeaways: [
      "Traditional programming writes explicit rules; Machine Learning learns rules from input data and target labels.",
      "Supervised learning trains on labeled datasets to perform regression (continuous numbers) or classification (categories).",
      "Splitting data into training and test sets ensures models generalize to new unseen data rather than just memorizing.",
    ],
    topics: [
      {
        id: "ml-101-top-1",
        topicNumber: 1,
        title: "Traditional Programming vs Machine Learning",
        durationMinutes: 10,
        summary: "Understand the fundamental paradigm shift from rule-based code to data-driven learning.",
        sections: [
          {
            heading: "Teaching Computers by Example",
            explanation: "In traditional software, a programmer writes rules (if/else logic) that take inputs and generate outputs. In machine learning, we provide inputs and historical outputs to an algorithm, and the computer calculates the underlying mathematical relationship. This allows algorithms to recognize spoken voices, detect fraud, and diagnose medical scans where writing manual if/else rules would be impossible.",
            keyPoints: [
              "Traditional Code: Data + Handcrafted Rules = Answers.",
              "Machine Learning: Data + Answers = Discovered Rules (The Model).",
              "Features are the measurable properties (e.g. house size, rooms), and Labels are the targets we predict (e.g. price).",
            ],
          },
        ],
        keyTakeaways: [
          "Machine learning excels at complex pattern recognition tasks where manual rules are too intricate to specify.",
        ],
        hasLab: false,
      },
      {
        id: "ml-101-top-2",
        topicNumber: 2,
        title: "Linear Regression & Predictive Model Training",
        durationMinutes: 10,
        summary: "Build intuition for how a model finds the optimal line of best fit through data points.",
        sections: [
          {
            heading: "Finding the Line of Best Fit",
            explanation: "Linear regression is the simplest and most interpretable supervised learning algorithm. It calculates a mathematical relationship y = mx + b where m is the slope factor and b is the intercept. The algorithm iteratively minimizes the prediction error (loss function) across all training samples.",
            keyPoints: [
              "Loss functions measure the numerical distance between the model's prediction and the actual truth.",
              "Gradient Descent is the optimization algorithm that adjusts parameters to minimize prediction loss.",
            ],
          },
        ],
        keyTakeaways: [
          "All machine learning models fundamentally minimize loss between prediction and reality.",
        ],
        hasLab: true,
        labType: "python",
        pythonLabConfig: {
          title: "Python Linear Predictive Model Lab",
          scenario: "Train a predictive model to forecast mobile data consumption for tech hubs in Ghana.",
          initialCode: `# Linear Demand Prediction Model
x_users = [100, 200, 300, 400]
y_gigabytes = [150, 300, 450, 600]

# Calculate slope rate (gigabytes per user)
slope = (y_gigabytes[-1] - y_gigabytes[0]) / (x_users[-1] - x_users[0])
print(f"Calculated usage rate: {slope} GB per active user")

# Test prediction on new user cohort
new_cohort = 500
predicted_bandwidth = new_cohort * slope
print(f"Predicted bandwidth for {new_cohort} users: {predicted_bandwidth} GB")
`,
          challengeInstructions: "Change new_cohort = 600 and run the script to predict bandwidth demand for a 600-person cohort.",
          expectedOutputSubstring: "900.0 GB",
          hint: "Update new_cohort = 600 on line 10 and click Run Script."
        },
      },
    ],
    quiz: [
      {
        id: "ml-q1",
        question: "In supervised learning, what do we call the target value that the model is trying to predict?",
        options: [
          "The hardware processor",
          "The label (or target variable)",
          "The browser cookie",
          "The CSS stylesheet",
        ],
        correctAnswer: 1,
        explanation: "The label is the ground truth output that the supervised learning model learns to predict.",
      },
    ],
  },

  // ─── PROMPT ENGINEERING & GENERATIVE AI (VANDERBILT & DCG) ──────────────────
  {
    id: "prompt-101",
    trackId: "prompt-engineering",
    moduleNumber: 1,
    moduleTitle: "LLM Mechanics & Cognitive Prompting",
    lessonNumber: 1,
    title: "Generative AI Prompt Engineering for Professionals",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Master the principles of instructing Large Language Models with few-shot reasoning, structured outputs, and cognitive chains of thought.",
    keyTakeaways: [
      "Large Language Models (LLMs) are next-token probabilistic predictors trained on massive text corpuses.",
      "Providing concrete examples (Few-Shot Prompting) dramatically improves accuracy and formatting consistency.",
      "Chain-of-Thought (CoT) prompting encourages models to reason step-by-step before producing final conclusions.",
    ],
    topics: [
      {
        id: "prompt-101-top-1",
        topicNumber: 1,
        title: "How Large Language Models Process Language",
        durationMinutes: 7,
        summary: "Understand tokens, context windows, and why precision phrasing matters.",
        sections: [
          {
            heading: "Tokens and Probabilistic Completion",
            explanation: "LLMs do not understand human language the way humans do; they break text into numerical fragments called tokens. Given a sequence of preceding tokens, the model computes the mathematical probability distribution of which token should come next. When you write a vague prompt, you leave the probability space wide open, leading to generic or inaccurate answers. By providing role, context, and clear constraints, you steer the model toward high-precision completions.",
            keyPoints: [
              "Tokens are chunks of characters (1 token is roughly 4 characters or 0.75 words).",
              "Context window is the total memory limit of input plus output tokens the model can hold at once.",
              "Hallucination occurs when a model produces confident-sounding statements that are factually incorrect.",
            ],
          },
        ],
        keyTakeaways: [
          "Vague prompts produce vague answers; specific constraints unlock precise, production-grade intelligence.",
        ],
        hasLab: false,
      },
      {
        id: "prompt-101-top-2",
        topicNumber: 2,
        title: "Advanced Prompting Patterns: Few-Shot & Chain-of-Thought",
        durationMinutes: 8,
        summary: "Apply proven engineering patterns to dramatically reduce hallucinations and enforce structured JSON.",
        sections: [
          {
            heading: "The Power of Few-Shot Examples",
            explanation: "Rather than simply describing what you want in paragraph form, providing 2-3 concrete input/output examples teaches the model the exact schema, tone, and reasoning style required. Adding the instruction 'Think step-by-step before answering' (Chain of Thought) activates intermediate reasoning tokens, dramatically reducing logic errors.",
            keyPoints: [
              "Zero-Shot: Asking the model directly without examples.",
              "Few-Shot: Showing 2-3 demonstration pairs before asking the real query.",
              "Chain of Thought: Asking the model to show intermediate reasoning steps.",
            ],
          },
        ],
        keyTakeaways: [
          "Always provide explicit output format constraints (e.g. valid JSON) when integrating LLMs into software.",
        ],
        hasLab: true,
        labType: "python",
        pythonLabConfig: {
          title: "Automated Prompt Evaluation & Template Lab",
          scenario: "Construct and validate a structured system prompt template for an automated student mentoring advisor.",
          initialCode: `# Prompt Template Engineering
persona = "Senior Academic Advisor at DigiConnect Ghana"
target_task = "Provide a 2-step study recommendation for learning cybersecurity IAM."
output_format = "Format strictly as a JSON object with 'milestone' and 'duration' keys."

system_prompt = f"Role: {persona}\nTask: {target_task}\nConstraint: {output_format}"
print("Engineered Prompt:\n" + system_prompt)
`,
          challengeInstructions: "Add 'and include real-world analogies' to the target_task string and run the script.",
          expectedOutputSubstring: "real-world analogies",
          hint: "Edit line 3: target_task = 'Provide a 2-step study recommendation for learning cybersecurity IAM and include real-world analogies.'"
        },
      },
    ],
    quiz: [
      {
        id: "prompt-q1",
        question: "Why does adding 'Think step-by-step' (Chain-of-Thought) improve the accuracy of LLM answers?",
        options: [
          "It forces the user's internet browser to refresh its cache",
          "It prompts the model to generate intermediate reasoning tokens, giving it more computational space before arriving at the conclusion",
          "It disables all security firewalls on the server",
          "It reduces the size of the computer memory by 50%",
        ],
        correctAnswer: 1,
        explanation: "Chain-of-thought prompting forces the model to generate intermediate reasoning steps, which mathematically conditions higher accuracy on subsequent tokens.",
      },
    ],
  },

  // ─── CROSS-PLATFORM MOBILE APP DEV (META & DCG) ─────────────────────────────
  {
    id: "mobile-101",
    trackId: "mobile-dev",
    moduleNumber: 1,
    moduleTitle: "Mobile UI Architecture & React Native",
    lessonNumber: 1,
    title: "Cross-Platform Mobile App Architecture with React Native",
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 120,
    summary: "Discover how React Native compiles TypeScript and JSX into native Android and iOS user interfaces with 60 FPS performance.",
    keyTakeaways: [
      "React Native uses native platform widgets (UIView on iOS, android.view on Android) rather than mobile web views.",
      "The core components are View (container), Text (typography), Image, and TouchableOpacity (buttons).",
      "Flexbox layout on mobile defaults to flexDirection: 'column' (unlike CSS web which defaults to row).",
    ],
    topics: [
      {
        id: "mobile-101-top-1",
        topicNumber: 1,
        title: "Native Mobile UI vs Mobile Web Views",
        durationMinutes: 8,
        summary: "Understand the performance advantages of compiling to native widgets.",
        sections: [
          {
            heading: "True Native Feel on Every Device",
            explanation: "While mobile web apps run inside a browser shell, React Native connects your JavaScript logic to real native platform components via a high-speed bridge and Hermes engine. When you write a <Text> component, it renders as a native Android TextView or iOS UILabel, ensuring silky-smooth touch gestures and device battery efficiency.",
            keyPoints: [
              "Native components render using the operating system's native graphics engine.",
              "Single codebase deploys simultaneously to Google Play Store and Apple App Store.",
              "Access native hardware sensors: GPS, camera, biometric face unlock, and accelerometer.",
            ],
          },
        ],
        keyTakeaways: [
          "React Native bridges web developer skillsets to high-performance native mobile devices.",
        ],
        hasLab: false,
      },
      {
        id: "mobile-101-top-2",
        topicNumber: 2,
        title: "Mobile Layout Systems & Touch Ergonomics",
        durationMinutes: 9,
        summary: "Master mobile-first flexbox and thumb-friendly interactive tap targets.",
        sections: [
          {
            heading: "Designing for One-Handed Smartphone Interaction",
            explanation: "Mobile screens range from small 4.7-inch smartphones to large 12.9-inch tablets. Mobile layouts must accommodate safe areas (notches and home indicator bars) and adhere to minimum tap target sizes (at least 44x44 points) so users can tap comfortably with their thumbs.",
            keyPoints: [
              "Flexbox is the default layout engine on both Android and iOS.",
              "SafeAreaView prevents content from rendering under the smartphone camera notch or speaker grill.",
              "Touchable feedback provides immediate visual confirmation when users tap buttons.",
            ],
          },
        ],
        keyTakeaways: [
          "Always design with touch targets of at least 44px to prevent user frustration.",
        ],
        hasLab: true,
        labType: "sandbox",
        sandboxConfig: {
          initialHtml: `<div class="phone-frame">
  <div class="notch"></div>
  <div class="screen-content">
    <div class="app-header">
      <h3>DIGIHub Mobile</h3>
      <span class="badge">Accra, GH</span>
    </div>
    <div class="card">
      <h4>Cybersecurity Architecture</h4>
      <p>Lesson 1: Identity & Access Management</p>
      <div class="progress-bar"><div class="fill" style="width:27%"></div></div>
      <button id="tap-btn">Resume Lesson (27%)</button>
    </div>
  </div>
</div>`,
          initialCss: `.phone-frame {
  width: 280px;
  margin: 0 auto;
  background: #18181b;
  border-radius: 36px;
  padding: 12px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
  border: 4px solid #27272a;
}
.notch {
  width: 90px;
  height: 18px;
  background: #27272a;
  margin: 0 auto 8px;
  border-radius: 10px;
}
.screen-content {
  background: #fafafa;
  border-radius: 24px;
  padding: 16px;
  font-family: system-ui, sans-serif;
}
.app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.card { background: white; border-radius: 16px; padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.progress-bar { height: 6px; background: #e4e4e7; border-radius: 99px; margin: 8px 0 12px; overflow: hidden; }
.fill { height: 100%; background: #0056D2; }
button { width: 100%; background: #0056D2; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer; }`,
          initialJs: `document.getElementById('tap-btn').addEventListener('click', function() {
  alert('Haptic feedback simulated! Resuming interactive lesson on mobile.');
});`,
          challengeInstructions: "Change the progress fill to width: 50% and click the button to simulate mobile tap feedback.",
        },
      },
    ],
    quiz: [
      {
        id: "mob-q1",
        question: "What is the recommended minimum tap target size for buttons on mobile interfaces?",
        options: [
          "5x5 pixels",
          "At least 44x44 points (or pixels) to accommodate human thumb taps comfortably",
          "1000x1000 pixels",
          "Buttons should never be tappable on smartphones",
        ],
        correctAnswer: 1,
        explanation: "Apple and Google accessibility standards recommend minimum 44x44 or 48x48 point touch targets for mobile accessibility.",
      },
    ],
  },

  // ─── ETHICAL HACKING & PENETRATION TESTING (EC-COUNCIL & DCG) ───────────────
  {
    id: "hack-101",
    trackId: "ethical-hacking",
    moduleNumber: 1,
    moduleTitle: "Penetration Testing Methodology & Network Recon",
    lessonNumber: 1,
    title: "Network Reconnaissance, Port Scanning & Nmap",
    durationMinutes: 25,
    level: "Beginner",
    xpAward: 125,
    summary: "Step into the boots of an authorized white-hat ethical hacker: scan target networks, analyze open listening ports, and detect unpatched vulnerabilities.",
    keyTakeaways: [
      "Ethical hacking operates strictly under legal authorization and defined Rules of Engagement (RoE).",
      "Network reconnaissance identifies live IP hosts, open TCP/UDP ports, and running service versions.",
      "Unencrypted legacy protocols like Telnet (port 23) and FTP (port 21) leak credentials in plaintext.",
    ],
    topics: [
      {
        id: "hack-101-top-1",
        topicNumber: 1,
        title: "The Ethical Hacking Code & Rules of Engagement",
        durationMinutes: 8,
        summary: "Understand the strict legal boundaries and ethics that separate white-hat defenders from cybercriminals.",
        sections: [
          {
            heading: "Authorization Is the Line in the Sand",
            explanation: "The techniques used by ethical penetration testers and criminal black-hat hackers are technically identical. What distinguishes ethical hackers is explicit written authorization. Penetration testers sign formal Rules of Engagement that dictate scope, permissible time windows, and emergency communication protocols to verify security posture without disrupting business operations.",
            keyPoints: [
              "Never scan or test any network or computer system without explicit written consent.",
              "Confidentiality agreements protect sensitive customer data discovered during assessments.",
              "Detailed remediation reports provide actionable recommendations to secure identified vulnerabilities.",
            ],
          },
        ],
        keyTakeaways: [
          "Without written authorization, scanning any remote network is illegal and unethical.",
        ],
        hasLab: false,
      },
      {
        id: "hack-101-top-2",
        topicNumber: 2,
        title: "TCP Handshakes, Port Scanning & Nmap Inspection",
        durationMinutes: 9,
        summary: "Inspect how computers negotiate connections and discover open network service listeners.",
        sections: [
          {
            heading: "How Port Scanning Reveals the Attack Surface",
            explanation: "Every network computer has 65,535 possible communication ports. Common services listen on standardized numbers: web servers on port 80 (HTTP) and 443 (HTTPS), remote consoles on port 22 (SSH). Tools like Nmap send network packets to detect which ports respond, exposing what software versions are running and whether dangerous services are open to the internet.",
            keyPoints: [
              "SYN scans (half-open scans) send a SYN packet to check if the target responds with SYN-ACK.",
              "Banner grabbing reads the welcoming text string sent by a service to reveal exact version numbers.",
              "Exposed legacy ports like Telnet (23) transmit passwords across the internet unencrypted.",
            ],
          },
        ],
        keyTakeaways: [
          "Hardening a network begins by closing every unnecessary listening port.",
        ],
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "network-inspector",
          title: "Network Port Inspection & Vulnerability Detection",
          scenario: "Perform an authorized network audit of a corporate gateway in Accra. Detect unencrypted ports and recommend firewall hardening.",
          prompt: "Identify the open insecure port (Telnet on port 23) transmitting plaintext data, and configure the firewall to enforce SSH on port 22.",
          hint: "Filter the connection table for port 23 and flag it as a critical security vulnerability."
        },
      },
    ],
    quiz: [
      {
        id: "hack-q1",
        question: "Why is Telnet (port 23) considered a severe security risk on modern networks?",
        options: [
          "Telnet causes computer monitors to overheat",
          "Telnet transmits all usernames, passwords, and commands in plaintext with zero encryption, allowing anyone on the network to intercept credentials",
          "Telnet can only be accessed using rotary telephones",
          "Telnet cannot connect to the internet",
        ],
        correctAnswer: 1,
        explanation: "Telnet transmits data unencrypted, meaning attackers capturing network packets can read passwords directly in plaintext. SSH (port 22) must always be used instead.",
      },
    ],
  },

  // ─── IT SUPPORT & SYSTEMS ENGINEERING (GOOGLE / COMPTIA & DCG) ─────────────
  {
    id: "itsup-101",
    trackId: "it-support",
    moduleNumber: 1,
    moduleTitle: "Hardware, Operating Systems & Client Diagnostics",
    lessonNumber: 1,
    title: "Hardware Troubleshooting, Operating Systems & Networking",
    durationMinutes: 20,
    level: "Beginner",
    xpAward: 100,
    summary: "Master the diagnostic toolset of systems engineers: dissect computer hardware, troubleshoot OS crashes, and resolve networking failures.",
    keyTakeaways: [
      "The CPU executes instructions, RAM provides temporary fast memory, and SSD/NVMe provides permanent storage.",
      "The BIOS/UEFI initiates Power-On Self-Test (POST) before handing control over to the operating system bootloader.",
      "Command-line networking tools (ping, traceroute, ipconfig/ifconfig, nslookup) quickly isolate root causes of connection drops.",
    ],
    topics: [
      {
        id: "itsup-101-top-1",
        topicNumber: 1,
        title: "Computer Hardware Architecture & Boot Diagnostics",
        durationMinutes: 7,
        summary: "Understand how Motherboards, CPUs, RAM, and Storage communicate during the boot process.",
        sections: [
          {
            heading: "Inside the Physical Machine",
            explanation: "Every modern computer—from budget smartphones to massive server racks—shares the core Von Neumann architecture: the Central Processing Unit (CPU) acts as the brain; Random Access Memory (RAM) provides lightning-fast temporary working memory; and Solid State Drives (SSDs) store the operating system and files permanently. When powered on, the firmware (UEFI/BIOS) executes a hardware test before loading Windows, Linux, or macOS.",
            keyPoints: [
              "POST (Power-On Self-Test) checks that RAM and essential components are responding before loading the OS.",
              "Overheating due to clogged fans or dry thermal paste is a primary cause of unexpected system shutdowns.",
              "Storage drives can fail; always maintain 3-2-1 backup strategies for critical organizational data.",
            ],
          },
        ],
        keyTakeaways: [
          "Accurate hardware troubleshooting requires isolating whether a failure is physical hardware or software configuration.",
        ],
        hasLab: false,
      },
      {
        id: "itsup-101-top-2",
        topicNumber: 2,
        title: "Networking Diagnostics: Ping, DNS & Default Gateways",
        durationMinutes: 8,
        summary: "Diagnose and restore internet connectivity using essential network troubleshooting commands.",
        sections: [
          {
            heading: "The 4-Step Network Diagnostic Checklist",
            explanation: "When a user in an office complains that 'the internet is down', professional IT support specialists isolate the layer: 1) Verify physical cable or Wi-Fi link. 2) Ping 127.0.0.1 (local loopback) to verify the network card. 3) Ping the local default gateway (router) to verify the local LAN. 4) Ping 8.8.8.8 and test DNS with nslookup to verify external internet name resolution.",
            keyPoints: [
              "ping tests ICMP reachability and packet latency.",
              "Default gateway is the local router IP that forwards packets outside the local subnet.",
              "DNS converts human-friendly domain names (e.g. digiconnectghana.org) into numerical IP addresses.",
            ],
          },
        ],
        keyTakeaways: [
          "Systematic elimination isolates network outages in minutes instead of guessing.",
        ],
        hasLab: true,
        labType: "cyber",
        cyberLabConfig: {
          type: "network-inspector",
          title: "Workstation Network Connectivity & DNS Diagnostics",
          scenario: "An office computer in Accra can connect to the local printer on the LAN but cannot load websites due to a misconfigured DNS server.",
          prompt: "Inspect the network configuration, update the primary DNS address to Google Public DNS (8.8.8.8), and verify external connection.",
          hint: "Check DNS settings and verify default gateway routing."
        },
      },
    ],
    quiz: [
      {
        id: "it-q1",
        question: "What is the primary role of the Default Gateway in a local network configuration?",
        options: [
          "It controls the brightness of the computer screen",
          "It is the router address that forwards network traffic from the local network to external networks like the internet",
          "It permanently erases old files at midnight",
          "It powers the computer cooling fans",
        ],
        correctAnswer: 1,
        explanation: "The default gateway is the local network router that forwards traffic destined for outside IP addresses onto the wider internet.",
      },
    ],
  },
];

