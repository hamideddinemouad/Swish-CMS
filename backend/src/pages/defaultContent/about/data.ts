import { DEFAULT_IMAGE_PLACEHOLDER_URL } from "../config";

export type AboutData = {
  nav: {
    logo: string;
    links: Array<{
      label: string;
      slug: string;
    }>;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image: string;
  };
  mission: {
    heading: string;
    body: string;
    bullets: string[];
  };
  values: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  timeline: {
    title: string;
    milestones: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    members: Array<{
      name: string;
      role: string;
      bio: string;
      avatar: string;
      socials: Array<{
        label: string;
        slug: string;
      }>;
    }>;
  };
  stats: {
    title: string;
    items: Array<{
      label: string;
      value: string;
      description: string;
    }>;
  };
  testimonials: {
    title: string;
    quotes: Array<{
      text: string;
      name: string;
      role: string;
      company: string;
    }>;
  };
  footer: {
    text: string;
    links: Array<{
      label: string;
      slug: string;
    }>;
  };
};

export const data = {
  nav: {
    logo: "Foundry Collective",
    links: [
      { label: "Home", slug: "/" },
      { label: "About", slug: "/about" },
      { label: "Work", slug: "/work" },
      { label: "Contact", slug: "/contact" },
    ],
  },
  hero: {
    eyebrow: "About the studio",
    title: "A modern collaborative studio for resilient products",
    subtitle:
      "We combine strategy, design, and engineering so every touchpoint feels intentional and human.",
    ctaText: "Meet the team",
    ctaLink: "/about#team",
    image: DEFAULT_IMAGE_PLACEHOLDER_URL,
  },
  mission: {
    heading: "Mission",
    body:
      "Foundry Collective exists to help organizations reclaim clarity and momentum through disciplined creative craft.",
    bullets: [
      "We translate complex business goals into tangible, delightful experiences.",
      "Every engagement is grounded in empathy for the people who use the product.",
      "We work transparently so partners see progress, not just deliverables.",
    ],
  },
  values: {
    title: "Core Values",
    items: [
      {
        title: "Radical Collaboration",
        description:
          "We ensure every voice is heard, and every hand is on deck when decisions are made.",
        icon: "collaboration",
      },
      {
        title: "Crafted Precision",
        description:
          "Meticulous thinking makes the difference between good work and work that lasts.",
        icon: "precision",
      },
      {
        title: "Warmth in Detail",
        description:
          "Human-first communication keeps the craft personal—even across time zones.",
        icon: "warmth",
      },
    ],
  },
  timeline: {
    title: "Milestones",
    milestones: [
      {
        year: "2018",
        title: "Studio Launch",
        description:
          "Three partners opened the studio to blend strategy and product design for mission-driven teams.",
      },
      {
        year: "2020",
        title: "Global Collaborations",
        description:
          "We formed ongoing engagements with organizations across four continents, keeping teams aligned through detailed rituals.",
      },
      {
        year: "2024",
        title: "Impact Lab",
        description:
          "Launched a research + experimentation arm that shepherds bold ideas from validation to prototype.",
      },
    ],
  },
  team: {
    title: "Leadership",
    members: [
      {
        name: "Isla Hart",
        role: "Creative Director",
        bio: "Guides every narrative with a storyteller's sense of craft and urgency.",
        avatar: DEFAULT_IMAGE_PLACEHOLDER_URL,
        socials: [
          { label: "LinkedIn", slug: "https://www.linkedin.com/in/islahart/" },
          { label: "Mastodon", slug: "https://fosstodon.org/@islahart" },
        ],
      },
      {
        name: "Noah Rivera",
        role: "Technical Lead",
        bio: "Creates resilient systems that scale alongside the products we ship.",
        avatar: DEFAULT_IMAGE_PLACEHOLDER_URL,
        socials: [
          { label: "GitHub", slug: "https://github.com/noahr" },
          { label: "LinkedIn", slug: "https://www.linkedin.com/in/noahrivera/" },
        ],
      },
      {
        name: "Mina Kapoor",
        role: "Strategy Partner",
        bio: "Keeps stakeholders focused on measurable outcomes and sustainable change.",
        avatar: DEFAULT_IMAGE_PLACEHOLDER_URL,
        socials: [
          { label: "LinkedIn", slug: "https://www.linkedin.com/in/minakapoor/" },
        ],
      },
    ],
  },
  stats: {
    title: "By the numbers",
    items: [
      {
        label: "Partners",
        value: "47",
        description: "Mission-driven organizations served since 2018.",
      },
      {
        label: "Launches",
        value: "112",
        description: "End-to-end experiences shipped with measurable impact.",
      },
      {
        label: "Retention",
        value: "92%",
        description: "Clients continue with us for multiple programs or ventures.",
      },
    ],
  },
  testimonials: {
    title: "What partners say",
    quotes: [
      {
        text:
          "Foundry Collective took our messy roadmap and turned it into a confident strategy that everyone could rally behind.",
        name: "Lena Ortiz",
        role: "Chief Product Officer",
        company: "Northwind Logistics",
      },
      {
        text:
          "They bring rigor, warmth, and a sense of calm. That combination kept our team aligned through every pivot.",
        name: "Andre Delgado",
        role: "VP of Growth",
        company: "Sagewell Health",
      },
    ],
  },
  footer: {
    text: "© 2026 Foundry Collective. Designed for collaboration.",
    links: [
      { label: "Privacy", slug: "/privacy" },
      { label: "Careers", slug: "/careers" },
    ],
  },
} satisfies AboutData;
