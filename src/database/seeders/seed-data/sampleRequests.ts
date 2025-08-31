// src/seed-data/sampleRequests.ts
export type RequestSeed = {
  userId: number;
  title: string;
  description?: string | null;
  postContent: string;
  contentType: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'blog' | 'other';
  tags?: string[] | null;         // maps to DataTypes.JSON
  imageUrl?: string | null;       // optional
  currentPoints: number;
  status: 'pending_review' | 'in_review' | 'completed' | 'archived';
};

export const makeSampleRequests = (userId: number): RequestSeed[] => [
  {
    userId,
    title: "Resume Review Request",
    description:
      "Looking for feedback on my software developer resume. Focus on highlighting technical skills and removing unnecessary details.",
    postContent: "Here's my resume content... [Full resume text would go here]",
    contentType: "other",
    tags: ["Career Advice", "Resume", "Tech"],
    imageUrl: null,
    currentPoints: 50,
    status: "pending_review",
  },
  {
    userId,
    title: "LinkedIn Post Review",
    description:
      "Need help improving my LinkedIn post about career growth. Want to increase engagement.",
    postContent:
      "Just got promoted to Senior Developer! 🚀 Here's what I learned in my journey...",
    contentType: "linkedin",
    tags: ["Career Advice", "Personal Branding", "LinkedIn"],
    imageUrl: null,
    currentPoints: 75,
    status: "in_review",
  },
  {
    userId,
    title: "Tweet Optimization",
    description: "Want to make this tweet more engaging and shareable.",
    postContent: "Working on my new side project. Any feedback?",
    contentType: "twitter",
    tags: ["Social Media", "Marketing", "Twitter"],
    imageUrl: null,
    currentPoints: 25,
    status: "pending_review",
  },
  {
    userId,
    title: "Portfolio Landing Copy Review",
    description:
      "Tighten hero headline and subheading; optimize for clarity and credibility.",
    postContent:
      "I build fast, scalable web apps for startups. Let’s ship something great together.",
    contentType: "blog",
    tags: ["Copywriting", "Portfolio", "UX Writing"],
    imageUrl: null,
    currentPoints: 40,
    status: "pending_review",
  },
  {
    userId,
    title: "Thread Draft: Lessons from Building a SaaS",
    description:
      "Review a 6-tweet thread for clarity, flow, and hook quality.",
    postContent:
      "1/ I spent 30 days shipping my MVP. Here are 7 things I wish I knew...",
    contentType: "twitter",
    tags: ["SaaS", "Thread", "Twitter"],
    imageUrl: null,
    currentPoints: 35,
    status: "pending_review",
  },
  {
    userId,
    title: "LinkedIn About Section Rewrite",
    description: "Punchier summary with quantified impact and keywords.",
    postContent:
      "Full-stack developer passionate about DX and performance. Built apps used by thousands.",
    contentType: "linkedin",
    tags: ["Branding", "SEO", "LinkedIn"],
    imageUrl: null,
    currentPoints: 60,
    status: "in_review",
  },
  {
    userId,
    title: "Cold Email to Hiring Manager",
    description:
      "Short, specific email for a Node/React role. Improve subject and CTA.",
    postContent:
      "Subject: Quick note re: your Node/React opening\nBody: Hi <Name>, I built...",
    contentType: "other",
    tags: ["Job Search", "Email", "Networking"],
    imageUrl: null,
    currentPoints: 55,
    status: "pending_review",
  },
  {
    userId,
    title: "Project README Polish",
    description:
      "Strengthen README structure (badges, demo GIF, quickstart, roadmap).",
    postContent:
      "# Helpify\nA platform for trading feedback points...\n## Getting Started\n",
    contentType: "other",
    tags: ["Open Source", "Docs", "GitHub"],
    imageUrl: null,
    currentPoints: 30,
    status: "pending_review",
  },
  {
    userId,
    title: "Hook Testing for LinkedIn Carousel",
    description:
      "A/B test first slide copy. Need 3 alternative hooks.",
    postContent:
      "Slide 1: 7 React patterns I wish I knew earlier",
    contentType: "linkedin",
    tags: ["Design", "Content", "LinkedIn"],
    imageUrl: null,
    currentPoints: 45,
    status: "pending_review",
  },
  {
    userId,
    title: "Tweet CTA Variations",
    description:
      "Generate stronger CTAs without sounding needy.",
    postContent:
      "Shipped a feature that cut load times by 40%. Want the breakdown?",
    contentType: "twitter",
    tags: ["Growth", "Marketing", "Twitter"],
    imageUrl: null,
    currentPoints: 20,
    status: "pending_review",
  },
];
