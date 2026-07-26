// Firebase Configuration & Dynamic Portfolio State Management Helper
// For Mamun Wifi, we disable cloud sync and focus on direct state values
export interface PortfolioSectionConfig {
  id: string;
  defaultName: string;
  navLabel: string;
  isActive: boolean;
}

export interface ExpertiseCardItem {
  number: string;
  title: string;
  description: string;
  price?: string;
  isActive: boolean;
}

export interface SkillCardCategory {
  id: string;
  category: string;
  description: string;
  skillsText: string;
  isActive: boolean;
  videoUrl?: string; // Optional custom background video URL
}

export interface ProjectCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tech: string;
  features: string;
  isActive: boolean;
}

export interface CertificationCardItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  link: string;
  isActive: boolean;
}

export interface FullPortfolioState {
  personalInfo: {
    name: string;
    role: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
  };
  sectionsConfig: PortfolioSectionConfig[];
  heroData: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    isActive: boolean;
  };
  expertiseData: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    isActive: boolean;
    cards: ExpertiseCardItem[];
  };
  skillCardsData: SkillCardCategory[];
  projectsData: ProjectCardItem[];
  certificationsData: CertificationCardItem[];
  navData: {
    logoFirstName: string;
    logoLastName: string;
    resumeLink: string;
    hireMeButtonText: string;
  };
}

export const INITIAL_PORTFOLIO_STATE: FullPortfolioState = {
  personalInfo: {
    name: "Mamun Wifi",
    role: "ISP & Network Specialist",
    bio: "a premium internet service provider dedicated to delivering high-speed, reliable, and secure wireless broadband internet connection for homes, offices, and institutions.",
    email: "mamunwifi@gmail.com",
    github: "https://github.com/mamunwifi",
    linkedin: "https://linkedin.com/in/mamunwifi",
  },
  sectionsConfig: [
    { id: "home", defaultName: "Home", navLabel: "Home", isActive: true },
    { id: "about", defaultName: "About", navLabel: "About", isActive: true },
    { id: "expertise", defaultName: "Expertise", navLabel: "Expertise", isActive: true },
    { id: "skills", defaultName: "Skills", navLabel: "Skills", isActive: true },
    { id: "projects", defaultName: "Projects", navLabel: "Projects", isActive: true },
    { id: "certifications", defaultName: "Certifications", navLabel: "Certifications", isActive: false },
    { id: "contact", defaultName: "Contact", navLabel: "Contact", isActive: true },
  ],
  heroData: {
    titleLine1: "HI, I'M",
    titleLine2: "MAMUN WIFI ISP",
    subtitle: "WE PROVIDE HIGH-SPEED WI-FI ROUTERS, OPTICAL FIBER INTERNET CONNECTIONS, BANDWIDTH MANAGEMENT SOLUTIONS, AND 24/7 NETWORK SUPPORT TO KEEP YOU CONNECTED TO THE DIGITAL WORLD WITHOUT DOWNTIME.",
    isActive: true,
  },
  expertiseData: {
    sectionBadge: "Our Services",
    sectionTitle: "High-Speed Internet & Professional IT Network Setup",
    sectionSubtitle: "Delivering fast, stable, and highly secure internet connections and enterprise IT network configurations for residential and corporate sectors.",
    isActive: true,
    cards: [
      {
        number: "01",
        title: "সিলভার (10 Mbps)",
        price: "৳৫০০/মাস",
        description: "আনলিমিটেড ব্রাউজিং, বাফারলেস ইউটিউব এবং ২৪/৭ সাপোর্ট।",
        isActive: true,
      },
      {
        number: "02",
        title: "গোল্ড (25 Mbps)",
        price: "৳৮০০/মাস",
        description: "আনলিমিটেড ৪কে স্ট্রিমিং, ফাস্ট গেমিং, আল্ট্রা-লো ল্যাটেন্সি এবং বিডিআইএক্সে ফুল স্পিড।",
        isActive: true,
      },
      {
        number: "03",
        title: "ডায়মন্ড (50 Mbps)",
        price: "৳১২০০/মাস",
        description: "মাল্টি-ডিভাইস হেভি ইউজ, আনলিমিটেড ডাউনলোড, ডেডিকেটেড ব্যান্ডউইথ এবং ২৪/৭ ভিআইপি সাপোর্ট।",
        isActive: true,
      },
    ],
  },
  skillCardsData: [
    {
      id: "frontend",
      category: "NETWORK TOOLS",
      description: "Managing and configuring enterprise wireless networks and hardware.",
      skillsText: "",
      isActive: true,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glowing-fiber-optic-cables-in-motion-41584-large.mp4",
    },
    {
      id: "backend",
      category: "SERVICE AREA",
      description: "আমাদের ফাইবার অপটিক ইন্টারনেট সেবার কভারেজ এলাকাসমূহ:",
      skillsText: "পশ্চিম সরমঙ্গল, টেকেরহাট, ঘোসাল কান্দি, তেঁতুল তলা, মন্দির রোড, মাস্টার কলনি, ঘোসাল কান্দি শেখ বাড়ি, খালিয়া, মাঝি কান্দি, বৌলগ্রাম",
      isActive: true,
    },
    {
      id: "ai",
      category: "Software & Diagnostics",
      description: "Monitoring network uptime and diagnosing data packet speeds.",
      skillsText: "Ping, Traceroute, Wireshark, NetFlow, PRTG Network Monitor, Speedtest CLI, Putty, Winbox",
      isActive: true,
    },
    {
      id: "cloud",
      category: "COMPLAINT BOX",
      description: "আপনার সংযোগ সম্পর্কিত যেকোনো সমস্যা দ্রুত সমাধানে আপনার অভিযোগ বা টিকিট সাবমিট করুন:",
      skillsText: "লাইন স্লো, ডিসকানেক্ট প্রবলেম, বিলিং ইস্যু, রাউটার রিসেট",
      isActive: true,
    },
  ],
  projectsData: [
    {
      id: "royal-timepieces",
      title: "Royal Timepieces",
      subtitle: "Premium Luxury Watch E-Commerce Platform",
      description: "Designed and developed an authentic luxury watch store featuring an exclusive collection of Seiko, Tissot, G-Shock, Fossil, and premium watchmakers. Features a gorgeous minimalist interface, brand curation dropdowns, real-time collection updates, and seamless shopping cart experiences.",
      image: "/royal-timepieces.jpg",
      link: "https://royal-timepieces.vercel.app/",
      tech: "Next.js 15, React, Tailwind CSS, TypeScript, Framer Motion, Turbopack",
      features: "Exclusive Curated Men's & Women's Collections, Smooth Parallax Watch Showcase, Fully Responsive Cart Interface, Interactive Marquee & Promotion Announcements",
      isActive: true,
    },
    {
      id: "libas-nafs",
      title: "Libas & Nafs",
      subtitle: "Premium Luxury Fashion & Perfume Store",
      description: "Designed and developed an exquisite luxury online boutique showcasing premium clothing, signature cotton caps, exclusive wrist bracelets, and sophisticated perfume fragrances. Features elegant product grids, hover image transitions, responsive navigation, and optimized product search.",
      image: "/libas-nafs.jpg",
      link: "https://libas-nafs.vercel.app/",
      tech: "Next.js, TypeScript, React, Tailwind CSS, Framer Motion, Vercel",
      features: "Signature Fragrance & Fashion Showcases, Dynamic Double Image Hover Reveals, Customized Ticker Tapes & Announcements, Fully Responsive Mobile Navigation",
      isActive: true,
    },
    {
      id: "mamun-wifi",
      title: "Mamun Wifi",
      subtitle: "Premium ISP Broadband & Network Portal",
      description: "Designed and developed a premium high-speed ISP (Internet Service Provider) web portal featuring live package listings, optical fiber coverage zones, network diagnostic resources, and 24/7 client support interface. Built with an ultra-fast modern layout, interactive navigation, and full mobile optimization.",
      image: "/mamun-wifi.jpg",
      link: "https://mamun-wifi-isp.vercel.app/",
      tech: "Next.js, TypeScript, React, Tailwind CSS, Framer Motion, Vercel",
      features: "High-Speed Bandwidth Showcase, Fully Responsive Router Settings UI, Interactive Package Customizer, Complete Device Layout Adaptability",
      isActive: true,
    },
  ],
  certificationsData: [],
  navData: {
    logoFirstName: "Mamun",
    logoLastName: "Wifi",
    resumeLink: "#",
    hireMeButtonText: "Contact Us",
  },
};

const STORAGE_KEY = "mamun_wifi_portfolio_state_v1";

export const getStoredPortfolioState = (): FullPortfolioState => {
  if (typeof window === "undefined") {
    return INITIAL_PORTFOLIO_STATE;
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return { ...INITIAL_PORTFOLIO_STATE, ...JSON.parse(data) };
    } catch {
      // fallback
    }
  }

  return INITIAL_PORTFOLIO_STATE;
};

export const savePortfolioState = (state: FullPortfolioState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("portfolioStateUpdated"));
  }
};
