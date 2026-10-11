export interface JargonTerm {
  term: string;
  pronunciation?: string;
  category: "basics" | "internet" | "security" | "coding";
  simpleDefinition: string;
  africanAnalogy: string;
  exampleInSentence: string;
}

export const JARGON_TERMS: JargonTerm[] = [
  {
    term: "Browser",
    pronunciation: "BROW-zer",
    category: "basics",
    simpleDefinition: "The application program you open on your phone or computer to explore and view websites.",
    africanAnalogy: "Like a trotro or taxi that transports you along internet roads to visit different shops and offices.",
    exampleInSentence: "Google Chrome, Safari, and Microsoft Edge are all popular web browsers."
  },
  {
    term: "URL / Web Address",
    pronunciation: "U-R-L (You-Are-Ell)",
    category: "internet",
    simpleDefinition: "The exact letters and numbers you type to visit a specific page on the internet.",
    africanAnalogy: "Like your Ghana Post Digital GPS address (e.g. GA-183-9214). It tells anyone in the world exactly which digital house to visit.",
    exampleInSentence: "digiconnectghana.org is the URL for the DigiConnect Ghana website."
  },
  {
    term: "The Cloud",
    pronunciation: "KLAWD",
    category: "internet",
    simpleDefinition: "Computers and servers connected to the internet that store your photos, documents, and messages safely so you can access them from any phone or PC.",
    africanAnalogy: "Like keeping your money in a national bank vault instead of under your mattress at home. If you lose your phone, your photos are still safe in the cloud.",
    exampleInSentence: "My Google Drive photos are saved in the cloud, so I never lose them."
  },
  {
    term: "Phishing",
    pronunciation: "FISH-ing",
    category: "security",
    simpleDefinition: "A scam where dishonest people send fake text messages or emails pretending to be a bank, MTN, or government agency to steal your money or passwords.",
    africanAnalogy: "Like an impostor wearing an MTN or Vodafone shirt coming to your shop and asking for your Mobile Money secret PIN. Real agents never ask for your PIN!",
    exampleInSentence: "Never click strange links promising free 50GB data—it is almost always a phishing trick."
  },
  {
    term: "Hardware vs Software",
    pronunciation: "HARD-ware vs SOFT-ware",
    category: "basics",
    simpleDefinition: "Hardware is the physical machine you can touch with your hands. Software is the programs and apps that run inside it.",
    africanAnalogy: "Hardware is like the physical radio receiver or television set in your living room; Software is the music or news program being broadcast through it.",
    exampleInSentence: "Your laptop keyboard and screen are hardware; WhatsApp and Microsoft Word are software."
  },
  {
    term: "Password & PIN",
    pronunciation: "PASS-word & PIN",
    category: "security",
    simpleDefinition: "A secret combination of letters, numbers, and symbols that only you should know to unlock your accounts.",
    africanAnalogy: "Like the padlock key to your personal bedroom or shop. You never leave the key hanging outside the gate for strangers to copy.",
    exampleInSentence: "Use a strong password with letters, numbers, and special symbols like @ or #."
  },
  {
    term: "Click, Double-Click & Right-Click",
    pronunciation: "KLIK",
    category: "basics",
    simpleDefinition: "Pressing the buttons on your computer mouse to give commands to the computer.",
    africanAnalogy: "Left click is like pointing your finger to say 'this one'. Double-click is like knocking twice on a door to open it. Right-click is like asking 'what can I do with this item?'.",
    exampleInSentence: "Double-click the blue folder icon on your desktop to open your homework files."
  },
  {
    term: "Copy & Paste",
    pronunciation: "KOP-ee and PAYST",
    category: "basics",
    simpleDefinition: "Making an identical duplicate of words or pictures from one place and placing them in another place without having to retype them.",
    africanAnalogy: "Like making a photocopy of your Ghana Card at the printing shop and placing the copy inside your school application folder.",
    exampleInSentence: "Press Ctrl+C to copy the student registration number, then Ctrl+V to paste it into the form."
  },
  {
    term: "Download vs Upload",
    pronunciation: "DOWN-load vs UP-load",
    category: "internet",
    simpleDefinition: "Downloading is bringing a file from the internet down onto your device. Uploading is sending a file from your device up onto the internet.",
    africanAnalogy: "Downloading is like buying yam from Kejetia or Makola market and bringing it home. Uploading is like taking your crop harvest to the market stall to display to others.",
    exampleInSentence: "Download your certificate to print it; upload your resume when applying for the tech job."
  },
  {
    term: "WiFi vs Mobile Data",
    pronunciation: "WY-fy vs MO-byl DAY-tuh",
    category: "internet",
    simpleDefinition: "WiFi is wireless internet provided by a router in a building. Mobile Data is internet purchased from your SIM network (like MTN, Telecel, AT).",
    africanAnalogy: "WiFi is like tap water piped into the library or school that everyone can use freely. Mobile Data is like buying bottled water or sachets for your own phone.",
    exampleInSentence: "Connect to the DCG community center WiFi to save your mobile airtime and data bundles."
  },
  {
    term: "Server",
    pronunciation: "SER-ver",
    category: "coding",
    simpleDefinition: "A powerful computer that stays turned on 24 hours a day to hold websites and deliver them to users whenever they ask for them.",
    africanAnalogy: "Like a wholesale warehouse keeper who stays at the store counter all day to fetch goods whenever a customer places an order.",
    exampleInSentence: "When you tap 'Send' in WhatsApp, your message travels through a server before reaching your friend."
  },
  {
    term: "HTML, CSS, & JavaScript",
    pronunciation: "H-T-M-L, C-S-S, and JA-va-skript",
    category: "coding",
    simpleDefinition: "The three core building blocks of every website on Earth. HTML builds the structure, CSS adds styles and colors, JavaScript adds interactivity.",
    africanAnalogy: "Building a house in Accra: HTML is the cement blocks and foundation; CSS is the beautiful paint, tiles, and curtains; JavaScript is the electrical wiring, light switches, and doorbell.",
    exampleInSentence: "In Module 1 of DIGIHub, you learn HTML to create headings and buttons on your first webpage."
  },
  {
    term: "Bug",
    pronunciation: "BUG",
    category: "coding",
    simpleDefinition: "A small mistake, typo, or error in a computer program that prevents it from working correctly.",
    africanAnalogy: "Like a tiny grain of sand trapped in a bicycle chain. It doesn't break the whole bike, but you need to clean it out for the wheel to spin smoothly.",
    exampleInSentence: "Don't be afraid when code has a bug—every programmer makes bugs and fixes them every day."
  },
  {
    term: "Search Engine",
    pronunciation: "SERCH EN-jin",
    category: "internet",
    simpleDefinition: "A website (like Google or Bing) where you type questions and it finds matching web pages, videos, and articles for you.",
    africanAnalogy: "Like asking the chief librarian at the university library to find every book on computer repairs for you.",
    exampleInSentence: "Use the Google search engine to look up 'how to write an email'."
  },
  {
    term: "Scroll",
    pronunciation: "SKROHL",
    category: "basics",
    simpleDefinition: "Moving the page content up or down on your screen so you can see things that don't fit in one view.",
    africanAnalogy: "Like unrolling an ancient cloth or paper document to read the paragraphs written further down.",
    exampleInSentence: "Scroll down to the bottom of the page to submit your answers."
  }
];
