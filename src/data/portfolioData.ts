export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
  features: string[];
  techStack: string[];
  category?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
  colSpan: string;
  bgColor: string;
  borderColor: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "Towfiqul Rafsan",
  role: "Full Stack Developer",
  tagline: "Hi, I'm a Full Stack Developer",
  bioHeadline: "Hi, my name is Towfiqul Rafsan",
  bio: "a passionate full-stack developer dedicated to crafting clean, functional, and highly scalable web applications.",
  location: "Worldwide Available",
  email: "rafsan350@gmail.com",
  github: "https://github.com/rafsan-dev",
  linkedin: "https://linkedin.com/in/rafsan-dev",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Development",
    description: "Building responsive, interactive user interfaces and web experiences.",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    colSpan: "md:col-span-2 lg:col-span-2",
    bgColor: "bg-purple-50/60",
    borderColor: "border-purple-100"
  },
  {
    category: "Backend Architecture",
    description: "Developing robust APIs and scalable database architectures.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "Java", "Python", "REST APIs", "JWT", "MySQL", "MongoDB"],
    colSpan: "md:col-span-2 lg:col-span-1",
    bgColor: "bg-blue-50/60",
    borderColor: "border-blue-100"
  },
  {
    category: "AI Tools & Assistants",
    description: "Leveraging generative AI to accelerate development.",
    skills: ["ChatGPT", "Claude", "GitHub Copilot", "Cursor", "Antigravity AI", "Codex", "OpenCode", "Midjourney"],
    colSpan: "md:col-span-2 lg:col-span-1",
    bgColor: "bg-purple-50/60",
    borderColor: "border-purple-100"
  },
  {
    category: "Cloud & Infrastructure",
    description: "Managing deployment, version control, and infrastructure.",
    skills: ["Git", "GitHub", "Docker", "Postman", "Linux", "CI/CD", "AWS", "Figma"],
    colSpan: "md:col-span-2 lg:col-span-2",
    bgColor: "bg-green-50/60",
    borderColor: "border-green-100"
  }
];

export const EXPERTISE_ITEMS = [
  {
    number: "01",
    title: "Frontend Development",
    text: "Crafting responsive and interactive user interfaces using React, Next.js, JavaScript, Tailwind CSS, and modern frontend technologies to deliver seamless user experiences.",
    topPosition: "md:top-[10px]"
  },
  {
    number: "02",
    title: "Backend Architecture",
    text: "Developing robust APIs, authentication mechanisms, and database schemas with Node.js, Express, MongoDB, and PostgreSQL for high reliability.",
    topPosition: "md:top-[560px]"
  },
  {
    number: "03",
    title: "Full-Stack & AI Integration",
    text: "Building end-to-end web applications enhanced with AI tools, automated workflows, state-of-the-art UI animations, and cloud deployment pipelines.",
    topPosition: "md:top-[1050px]"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "anspares",
    title: "AN Spare's & Accessories",
    subtitle: "Full-Stack Automotive E-Commerce Platform",
    description: "Designed and developed a scalable full-stack e-commerce platform for bike spare parts, car accessories, lubricants, garage tools, and automotive products. The platform includes a powerful admin dashboard for managing products, categories, orders, customers, and website content.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.anspares.com",
    features: [
      "Advanced Admin Dashboard for Inventory & Order Management",
      "Product Search & Smart Filtering",
      "Razorpay Payment Integration",
      "Responsive Mobile-First Design & SEO Optimized"
    ],
    techStack: ["Next.js 15", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "shadcn/ui", "Razorpay"]
  },
  {
    id: "mahi-jewellery",
    title: "Mahi Fashion Jewellery",
    subtitle: "Full-Stack E-Commerce Platform",
    description: "Designed and developed a modern, high-performance e-commerce platform for a fashion jewellery brand. The application delivers a seamless shopping experience with responsive design, fast page loads, secure backend services, and an intuitive admin workflow.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    link: "https://www.mahifashionjewellery.com",
    features: [
      "Live metal rates integration",
      "Responsive UI optimized for mobile, tablet, and desktop",
      "Product catalog with category-based browsing",
      "Advanced search and filtering",
      "Secure backend with real-time database integration"
    ],
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase"]
  },
  {
    id: "ronan-media",
    title: "Ronan Media Service",
    subtitle: "Premium Media Agency Website",
    description: "Designed and developed a premium digital media agency website showcasing creative services, brand identity, portfolio, and client engagement. The website emphasizes modern aesthetics, smooth animations, responsive layouts, and high performance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    link: "https://ronanmediaservice.vercel.app",
    features: [
      "Premium agency-style landing page with modern UI/UX",
      "Interactive animations & smooth page transitions",
      "Creative service showcase & portfolio case studies",
      "High-performance architecture using Next.js & Framer Motion"
    ],
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Zod", "Antigravity AI"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "mern-cert",
    title: "MERN Stack Certified Developer",
    organization: "BE-Practical Tech Solutions, Bangalore",
    description: "Comprehensive certification covering MongoDB, Express.js, React, and Node.js with hands-on full-stack projects."
  },
  {
    id: "rwd-cert",
    title: "Responsive Web Design",
    organization: "freeCodeCamp",
    description: "Mastered HTML5, CSS3, Flexbox, Grid, and responsive design principles for modern web applications."
  },
  {
    id: "js-cert",
    title: "JavaScript Algorithms",
    organization: "freeCodeCamp",
    description: "Advanced proficiency in JavaScript fundamentals, object-oriented programming, and complex problem solving."
  },
  {
    id: "rn-cert",
    title: "React Native Development",
    organization: "Coursera (Meta)",
    description: "Specialization in building scalable, cross-platform mobile applications using the React Native framework."
  }
];
