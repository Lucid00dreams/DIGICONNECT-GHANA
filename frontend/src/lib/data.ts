import {
  Program,
  ImpactStat,
  Testimonial,
  DCGEvent,
  Resource,
  Partner,
  Value,
  NavItem,
  InvolvementOption,
} from './types';

// ─── Navigation ──────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      {
        title: 'Our Story & Purpose',
        href: '/about',
        description: 'Why DigiConnect Ghana was founded and our founding vision.',
        icon: 'Sparkles',
      },
      {
        title: 'Our History',
        href: '/about/history',
        description: 'Our journey, milestones, and expansion across Ghana.',
        icon: 'Clock',
      },
      {
        title: 'Leadership & Team',
        href: '/about/team',
        description: 'Meet our passionate executives, mentors, and ambassadors.',
        icon: 'Users',
      },
      {
        title: 'Mission & Values',
        href: '/about/mission',
        description: 'Our core pillars: Tech for Youth, Tech for Good, and Innovation.',
        icon: 'Target',
      },
      {
        title: 'Partners & Alliances',
        href: '/about/partners',
        description: 'Collaborating with tech hubs, schools, and corporate sponsors.',
        icon: 'Handshake',
      },
    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      {
        title: 'Digital Literacy',
        href: '/programs/digital-literacy',
        description: 'Basic computer fundamentals, internet safety & office productivity.',
        icon: 'Monitor',
      },
      {
        title: 'Coding & Technology',
        href: '/programs/coding-technology',
        description: 'Web development, Python programming & building software applications.',
        icon: 'Code',
      },
      {
        title: 'Career & Employability',
        href: '/programs/career-employability',
        description: 'CV development, technical interview prep & remote freelancing.',
        icon: 'Briefcase',
      },
      {
        title: 'Entrepreneurship',
        href: '/programs/entrepreneurship',
        description: 'Launching and growing sustainable digital businesses in Africa.',
        icon: 'Rocket',
      },
      {
        title: 'Community Innovation',
        href: '/programs/community-innovation',
        description: 'Solving real-world community challenges with civic tech.',
        icon: 'Lightbulb',
      },
      {
        title: 'All Programs Catalog',
        href: '/programs',
        description: 'Explore full curricula, cohort timelines, and admission criteria.',
        icon: 'GraduationCap',
      },
    ],
  },
  {
    label: 'Impact',
    href: '/impact',
    children: [
      {
        title: 'Impact Overview',
        href: '/impact',
        description: 'Operational metrics, verified statistics & beneficiary growth.',
        icon: 'TrendingUp',
      },
      {
        title: 'Success Stories',
        href: '/impact/stories',
        description: 'Inspiring career breakthroughs from our alumni and students.',
        icon: 'Award',
      },
      {
        title: 'Annual Reports',
        href: '/impact/reports',
        description: 'Transparent milestone summaries, governance, and PDF reports.',
        icon: 'FileText',
      },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'News',
    href: '/news',
    children: [
      {
        title: 'Latest News & Stories',
        href: '/news',
        description: 'Community articles, cohort graduations, and press announcements.',
        icon: 'Newspaper',
      },
      {
        title: 'Upcoming Events & Calendar',
        href: '/events',
        description: 'Workshops, hackathons, bootcamps, and community meetups.',
        icon: 'Calendar',
      },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      {
        title: 'Join as a Learner',
        href: '/join',
        description: 'Apply for upcoming cohorts in coding, design, and employability.',
        icon: 'GraduationCap',
      },
      {
        title: 'Volunteer & Mentor',
        href: '/get-involved#volunteer',
        description: 'Guide aspiring developers and lead hands-on workshops.',
        icon: 'Heart',
      },
      {
        title: 'Partner with Us',
        href: '/about/partners',
        description: 'Schools, tech hubs, and corporate CSR collaborations.',
        icon: 'Handshake',
      },
      {
        title: 'Donate & Support',
        href: '/donate',
        description: 'Contribute laptops, hardware, and scholarship funding.',
        icon: 'Gift',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      {
        title: 'All Resource Guides',
        href: '/resources',
        description: 'Comprehensive library of tutorials, toolkits, and cheat sheets.',
        icon: 'BookOpen',
      },
      {
        title: 'Digital Skills Guides',
        href: '/resources?category=Digital%20Skills',
        description: 'Foundational computer literacy, typing, and cloud productivity.',
        icon: 'Monitor',
      },
      {
        title: 'AI & Emerging Tech',
        href: '/resources?category=AI',
        description: 'Modern prompt engineering, generative AI, and ethical usage.',
        icon: 'Sparkles',
      },
      {
        title: 'Career & Freelancing',
        href: '/resources?category=Career%20Development',
        description: 'Resume templates, Upwork guides, and international client tips.',
        icon: 'Briefcase',
      },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

// ─── Programs ────────────────────────────────────────────
export const PROGRAMS: Program[] = [
  {
    slug: 'digital-literacy',
    number: '01',
    title: 'Digital Literacy',
    shortTitle: 'Digital Literacy',
    description:
      'Equip young people with essential digital skills for navigating the modern world — from computer fundamentals to digital citizenship.',
    accent: 'blue',
    icon: 'Monitor',
    image: '/images/programs/digital-literacy.jpg',
    audience: 'Young people aged 15–30 with limited digital experience',
    duration: '8 weeks',
    skills: [
      'Computer fundamentals',
      'Internet safety & privacy',
      'Productivity tools (docs, spreadsheets, presentations)',
      'Digital communication & email',
      'Online research & information literacy',
      'Digital citizenship & online responsibility',
    ],
    outcomes: [
      'Confident use of computers and digital tools',
      'Ability to navigate the internet safely',
      'Competency with productivity software',
      'Understanding of digital rights and responsibilities',
    ],
  },
  {
    slug: 'coding-technology',
    number: '02',
    title: 'Coding & Technology',
    shortTitle: 'Code Academy',
    description:
      'Introduce young people to programming and software development — building problem-solving skills through hands-on technology projects.',
    accent: 'red',
    icon: 'Code',
    image: '/images/programs/coding-technology.jpg',
    audience: 'Young people aged 15–30 interested in software and technology careers',
    duration: '12 weeks',
    skills: [
      'Programming fundamentals (Python, JavaScript)',
      'Web development (HTML, CSS, JS)',
      'Software development principles',
      'Problem-solving & computational thinking',
      'AI & emerging technology fundamentals',
      'Building real technology projects',
    ],
    outcomes: [
      'Ability to build basic web applications',
      'Understanding of programming concepts',
      'Portfolio of completed projects',
      'Foundation for technology careers',
    ],
  },
  {
    slug: 'career-employability',
    number: '03',
    title: 'Career & Employability',
    shortTitle: 'Youth Employment',
    description:
      'Support young people in translating their skills into real-world career opportunities — from CV development to freelancing.',
    accent: 'green',
    icon: 'Briefcase',
    image: '/images/programs/career-employability.jpg',
    audience: 'Young people aged 18–30 preparing for employment or freelancing',
    duration: '6 weeks',
    skills: [
      'CV & resume development',
      'LinkedIn profile optimization',
      'Portfolio building',
      'Freelancing & remote work',
      'Job readiness & interview preparation',
      'Career mentorship & professional networking',
    ],
    outcomes: [
      'Professional CV and online presence',
      'Understanding of job market and opportunities',
      'Readiness for employment or freelance work',
      'Connection to mentors and industry professionals',
    ],
  },
  {
    slug: 'entrepreneurship',
    number: '04',
    title: 'Entrepreneurship',
    shortTitle: 'Entrepreneurship',
    description:
      'Help young people develop business ideas and build digital ventures — turning creativity into sustainable opportunities.',
    accent: 'yellow',
    icon: 'Rocket',
    image: '/images/programs/entrepreneurship.jpg',
    audience: 'Young people aged 18–35 interested in starting digital businesses',
    duration: '10 weeks',
    skills: [
      'Business idea development & validation',
      'Building digital businesses',
      'Digital marketing fundamentals',
      'Building an online presence & brand',
      'Identifying market opportunities',
      'Developing sustainable ventures',
    ],
    outcomes: [
      'Validated business concept',
      'Digital marketing and branding skills',
      'Basic business plan',
      'Network of entrepreneurial peers and mentors',
    ],
  },
  {
    slug: 'community-innovation',
    number: '05',
    title: 'Community Innovation',
    shortTitle: 'Community Innovation',
    description:
      'Enable young people to use technology to solve real community problems — building solutions that create positive local impact.',
    accent: 'blue',
    icon: 'Lightbulb',
    image: '/images/programs/community-innovation.jpg',
    audience: 'Young people passionate about community development and technology',
    duration: '8 weeks',
    skills: [
      'Identifying community challenges',
      'Design thinking & problem-solving',
      'Technology solution development',
      'Project management',
      'Community engagement & collaboration',
      'Impact measurement',
    ],
    outcomes: [
      'Completed community technology project',
      'Problem-solving and leadership skills',
      'Experience in community engagement',
      'Portfolio of impact-driven work',
    ],
  },
];

// ─── Impact Stats ────────────────────────────────────────
export const IMPACT_STATS: ImpactStat[] = [
  { value: 1000, suffix: '+', label: 'Young People Reached', accent: 'blue' },
  { value: 500, suffix: '+', label: 'Digital Skills Graduates', accent: 'red' },
  { value: 20, suffix: '+', label: 'Community Projects', accent: 'yellow' },
  { value: 10, suffix: '+', label: 'Community Partnerships', accent: 'green' },
];

// ─── Testimonials (placeholder) ──────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Participant Name',
    location: 'Accra, Ghana',
    program: 'Digital Literacy',
    quote:
      'DigiConnect helped me move from being a beginner with computers to confidently building my own digital projects. The mentors were patient and the learning environment was welcoming.',
    image: '/images/testimonials/participant-1.jpg',
    outcome: 'Now works as a freelance digital assistant',
  },
  {
    id: '2',
    name: 'Participant Name',
    location: 'Kumasi, Ghana',
    program: 'Coding & Technology',
    quote:
      'I never thought I could learn to code, but the Code Academy program showed me that anyone can build technology. I built my first website in just three weeks.',
    image: '/images/testimonials/participant-2.jpg',
    outcome: 'Currently pursuing a career in web development',
  },
  {
    id: '3',
    name: 'Participant Name',
    location: 'Tamale, Ghana',
    program: 'Career & Employability',
    quote:
      'The employability program gave me the confidence and tools I needed to present myself professionally. Within a month of completing the program, I landed my first remote job.',
    image: '/images/testimonials/participant-3.jpg',
    outcome: 'Secured remote employment',
  },
];

// ─── Events (placeholder) ────────────────────────────────
export const EVENTS: DCGEvent[] = [
  {
    id: '1',
    slug: 'digital-skills-workshop-accra',
    title: 'Digital Skills Workshop',
    date: '2025-03-15',
    time: '9:00 AM – 4:00 PM',
    location: 'Accra, Ghana',
    description:
      'A hands-on workshop covering essential digital skills — from computer basics to productivity tools and internet safety.',
    image: '/images/events/workshop.jpg',
    category: 'workshop',
    status: 'upcoming',
  },
  {
    id: '2',
    slug: 'code-bootcamp-kumasi',
    title: 'Introduction to Web Development Bootcamp',
    date: '2025-04-05',
    time: '10:00 AM – 5:00 PM',
    location: 'Kumasi, Ghana',
    description:
      'An intensive bootcamp introducing participants to HTML, CSS, and JavaScript — building real web pages from scratch.',
    image: '/images/events/bootcamp.jpg',
    category: 'bootcamp',
    status: 'upcoming',
  },
  {
    id: '3',
    slug: 'community-tech-meetup',
    title: 'Community Tech Meetup',
    date: '2025-02-20',
    time: '2:00 PM – 6:00 PM',
    location: 'Accra, Ghana',
    description:
      'A community gathering for young tech enthusiasts to network, share ideas, and collaborate on technology projects.',
    image: '/images/events/meetup.jpg',
    category: 'meetup',
    status: 'upcoming',
  },
];

// ─── Resources (placeholder) ─────────────────────────────
export const RESOURCES: Resource[] = [
  {
    id: '1',
    slug: 'getting-started-with-digital-literacy',
    title: 'Getting Started with Digital Literacy',
    description:
      'A beginner-friendly guide to building foundational digital skills — understanding computers, the internet, and productivity tools.',
    category: 'Digital Skills',
    type: 'guide',
    image: '/images/resources/digital-literacy-guide.jpg',
    date: '2025-01-10',
    readTime: '8 min read',
    content: 'Full article content would go here. This is placeholder content for development purposes.',
  },
  {
    id: '2',
    slug: 'staying-safe-online',
    title: 'Staying Safe Online: Cybersecurity for Young People',
    description:
      'Essential cybersecurity awareness — protecting your data, recognizing threats, and practicing safe digital habits.',
    category: 'Cybersecurity Awareness',
    type: 'article',
    image: '/images/resources/cybersecurity.jpg',
    date: '2025-01-18',
    readTime: '6 min read',
    content: 'Full article content would go here. This is placeholder content for development purposes.',
  },
  {
    id: '3',
    slug: 'introduction-to-python-programming',
    title: 'Introduction to Python Programming',
    description:
      'Your first steps in programming — learn the fundamentals of Python and start building simple programs.',
    category: 'Technology',
    type: 'tutorial',
    image: '/images/resources/python-tutorial.jpg',
    date: '2025-02-01',
    readTime: '12 min read',
    content: 'Full article content would go here. This is placeholder content for development purposes.',
  },
  {
    id: '4',
    slug: 'building-your-professional-cv',
    title: 'Building a Professional CV That Stands Out',
    description:
      'Step-by-step guidance on creating a CV that effectively communicates your skills and experience to employers.',
    category: 'Career Development',
    type: 'guide',
    image: '/images/resources/cv-guide.jpg',
    date: '2025-02-10',
    readTime: '10 min read',
    content: 'Full article content would go here. This is placeholder content for development purposes.',
  },
  {
    id: '5',
    slug: 'ai-and-the-future-of-work',
    title: 'AI and the Future of Work in Africa',
    description:
      'Understanding how artificial intelligence is reshaping industries and how young Africans can prepare for the opportunities ahead.',
    category: 'AI',
    type: 'article',
    image: '/images/resources/ai-future.jpg',
    date: '2025-02-20',
    readTime: '7 min read',
    content: 'Full article content would go here. This is placeholder content for development purposes.',
  },
  {
    id: '6',
    slug: 'starting-a-digital-business',
    title: 'Starting a Digital Business: A Guide for Young Entrepreneurs',
    description:
      'Practical advice on identifying opportunities, building digital products, and launching your first online business.',
    category: 'Entrepreneurship',
    type: 'guide',
    image: '/images/resources/digital-business.jpg',
    date: '2025-03-01',
    readTime: '15 min read',
    content: 'Full article content would go here. This is placeholder content for development purposes.',
  },
];

// ─── Resource Categories ─────────────────────────────────
export const RESOURCE_CATEGORIES = [
  'All',
  'Digital Skills',
  'Cybersecurity Awareness',
  'AI',
  'Career Development',
  'Entrepreneurship',
  'Technology',
  'Youth Development',
];

// ─── Partners (placeholder) ──────────────────────────────
export const PARTNERS: Partner[] = [
  { id: '1', name: 'Partner Organization', logo: '/images/partners/partner-1.svg', category: 'ngo' },
  { id: '2', name: 'Tech Company', logo: '/images/partners/partner-2.svg', category: 'technology' },
  { id: '3', name: 'University Partner', logo: '/images/partners/partner-3.svg', category: 'education' },
  { id: '4', name: 'Corporate Partner', logo: '/images/partners/partner-4.svg', category: 'corporate' },
  { id: '5', name: 'Community Org', logo: '/images/partners/partner-5.svg', category: 'community' },
  { id: '6', name: 'NGO Partner', logo: '/images/partners/partner-6.svg', category: 'ngo' },
];

// ─── Values ──────────────────────────────────────────────
export const VALUES: Value[] = [
  { title: 'Inclusion', description: 'Making technology accessible to every young person', icon: 'Users' },
  { title: 'Innovation', description: 'Embracing creative solutions and new ideas', icon: 'Lightbulb' },
  { title: 'Integrity', description: 'Operating with transparency and accountability', icon: 'Shield' },
  { title: 'Collaboration', description: 'Building together through partnerships', icon: 'Handshake' },
  { title: 'Impact', description: 'Measuring and maximizing our outcomes', icon: 'TrendingUp' },
  { title: 'Empowerment', description: 'Enabling young people to lead', icon: 'Zap' },
];

// ─── Get Involved Options ────────────────────────────────
export const INVOLVEMENT_OPTIONS: InvolvementOption[] = [
  {
    title: 'Join a Program',
    description: 'Develop practical digital skills that prepare you for the future of work and opportunity.',
    icon: 'GraduationCap',
    cta: 'Apply Now',
    href: '/join',
    accent: 'blue',
  },
  {
    title: 'Volunteer',
    description: 'Share your time and expertise to help young people develop digital skills and confidence.',
    icon: 'Heart',
    cta: 'Get Started',
    href: '/get-involved#volunteer',
    accent: 'red',
  },
  {
    title: 'Partner With Us',
    description: 'Collaborate with DigiConnect Ghana as a school, company, NGO, or community organization.',
    icon: 'Building2',
    cta: 'Learn More',
    href: '/get-involved#partner',
    accent: 'green',
  },
  {
    title: 'Support Our Work',
    description: 'Contribute resources to help expand digital literacy and technology access for young people.',
    icon: 'Gift',
    cta: 'Support Us',
    href: '/get-involved#support',
    accent: 'yellow',
  },
];

// ─── Social Links ────────────────────────────────────────
export const SOCIAL_LINKS = [
  { platform: 'Facebook', url: '#', icon: 'Facebook' },
  { platform: 'Instagram', url: '#', icon: 'Instagram' },
  { platform: 'LinkedIn', url: '#', icon: 'Linkedin' },
  { platform: 'X', url: '#', icon: 'Twitter' },
  { platform: 'YouTube', url: '#', icon: 'Youtube' },
];

// ─── Contact Info ────────────────────────────────────────
export const CONTACT_INFO = {
  email: 'info@digiconnectghana.org',
  phone: '+233 XX XXX XXXX',
  location: 'Accra, Ghana',
  hours: 'Monday – Friday, 9:00 AM – 5:00 PM',
};

// ─── Gallery Images (placeholder paths) ──────────────────
export const GALLERY_IMAGES = [
  { src: '/images/gallery/gallery-1.jpg', alt: 'Young people learning digital skills in a training session' },
  { src: '/images/gallery/gallery-2.jpg', alt: 'Participants coding together at a workshop' },
  { src: '/images/gallery/gallery-3.jpg', alt: 'Community technology event with mentors and participants' },
  { src: '/images/gallery/gallery-4.jpg', alt: 'Young person presenting a digital project' },
  { src: '/images/gallery/gallery-5.jpg', alt: 'Group collaboration during a hackathon' },
  { src: '/images/gallery/gallery-6.jpg', alt: 'Mentorship session between a volunteer and participant' },
];
