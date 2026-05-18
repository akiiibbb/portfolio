export type SocialPlatform = "github" | "linkedin" | "twitter" | "instagram";

export interface SocialLink {
  label: string;
  href: string;
  platform: SocialPlatform;
}

export interface Service {
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface ProjectItem {
  name: string;
  category: string;
  summary: string;
  stack: string;
  image: string;
  alt: string;
  link?: string;
  video?: string;
}

export const portfolioData = {
  site: {
    title: "Ishtiak Ahmed | Creative Developer & Designer",
    description:
      "Immersive portfolio template focused on creative development, motion, and interactive 3D storytelling.",
  },
  brand: {
    logo: "IA",
    name: "Ishtiak Ahmed",
    email: "ishtiak@DonXer.dev",
    phone: "+91 99999 99999",
    resumeUrl: "",
  },
  hero: {
    greeting: "Hello! I'm",
    nameLines: ["ISHTIAK", "AHMED"],
    eyebrow: "A Creative",
    primaryRoles: ["Designer", "Developer"],
    secondaryRoles: ["Developer", "Designer"],
  },
  about: {
    title: "About Me",
    description:
      "I build polished digital experiences that blend interface design, motion, and real-time 3D. This portfolio is structured to showcase both visual craft and engineering quality, so each section can grow into a proper case study instead of staying a static template.",
  },
  services: [
    {
      title: "Develop",
      description:
        "Front-end systems, interactive storytelling, and performant web experiences built with a focus on animation, responsiveness, and maintainable code.",
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Three.js",
        "GSAP",
        "Node.js",
        "Next.js",
        "Express.js",
        "CSS",
        "MySQL",
      ],
    },
    {
      title: "Design",
      description:
        "Visual direction, interface composition, motion design, and 3D asset workflows that help products feel distinctive instead of generic.",
      skills: [
        "Blender",
        "ZBrush",
        "UI Design",
        "Motion Design",
        "Rigging",
        "3D Animation",
        "Character Design",
        "Art Direction",
      ],
    },
  ] as Service[],
  experience: [
    {
      role: "Creative Frontend Developer",
      company: "Independent Practice",
      period: "2022",
      summary:
        "Built interactive concepts, motion-heavy UI explorations, and portfolio systems with a strong focus on smooth animation and presentation quality.",
    },
    {
      role: "UI Designer & Developer",
      company: "Freelance Projects",
      period: "2023",
      summary:
        "Worked across design handoff, responsive implementation, and front-end polish for personal brand sites and small business web experiences.",
    },
    {
      role: "Creative Developer",
      company: "Available for New Work",
      period: "NOW",
      summary:
        "Open to building portfolio sites, marketing pages, and visually rich product experiences with thoughtful motion and reliable front-end architecture.",
    },
  ] as ExperienceItem[],
  projects: [
    {
      name: "Immersive Portfolio",
      category: "Personal Brand",
      summary:
        "A cinematic landing experience with animated transitions, custom cursor behavior, and a 3D hero section designed to make a strong first impression.",
      stack: "React, TypeScript, Three.js, GSAP",
      image: "/images/react.webp",
      alt: "Preview tile for the immersive portfolio project",
    },
    {
      name: "Startup Showcase",
      category: "Marketing Site",
      summary:
        "A modular landing page system focused on storytelling, responsive layouts, and reusable sections that can quickly adapt to different campaigns.",
      stack: "React, Vite, CSS, Motion",
      image: "/images/next.webp",
      alt: "Preview tile for the startup showcase project",
    },
    {
      name: "Developer Dashboard",
      category: "Web App UI",
      summary:
        "A concept dashboard exploring data hierarchy, clean interactions, and polished component states for product-style interfaces.",
      stack: "TypeScript, React, Node.js",
      image: "/images/node.webp",
      alt: "Preview tile for the developer dashboard project",
    },
    {
      name: "Commerce Experience",
      category: "Frontend Build",
      summary:
        "A storefront concept centered on clear product presentation, motion cues, and mobile-friendly interaction patterns.",
      stack: "Next.js, CSS, UI Systems",
      image: "/images/next1.webp",
      alt: "Preview tile for the commerce experience project",
    },
    {
      name: "Studio Landing Page",
      category: "Creative Website",
      summary:
        "A brand-forward single-page experience with bold typography, layered backgrounds, and smooth section-to-section pacing.",
      stack: "JavaScript, GSAP, Responsive Design",
      image: "/images/javascript.webp",
      alt: "Preview tile for the studio landing page project",
    },
    {
      name: "3D Web Experiment",
      category: "Interactive Prototype",
      summary:
        "A sandbox for experimenting with lighting, texture treatment, and playful interactions inside the browser using real-time graphics.",
      stack: "Three.js, WebGL, Motion",
      image: "/images/react2.webp",
      alt: "Preview tile for the 3D web experiment project",
    },
  ] as ProjectItem[],
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com",
      platform: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ishtiak-ahmed-akib/",
      platform: "linkedin",
    },
    {
      label: "Twitter",
      href: "https://x.com",
      platform: "twitter",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/donxer__x__akib/",
      platform: "instagram",
    },
  ] as SocialLink[],
};
