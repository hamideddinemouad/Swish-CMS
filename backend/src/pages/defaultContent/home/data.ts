export type HomeData = {
  nav: {
    logo: string;
    links: Array<{
      label: string;
      slug: string;
    }>;
    cta: {
      label: string;
      slug: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  featuredStories: {
    title: string;
    posts: Array<{
      title: string;
      summary: string;
      slug: string;
      category: string;
      readingTime: string;
      image: string;
    }>;
  };
  offerings: {
    title: string;
    description: string;
    tiles: Array<{
      title: string;
      detail: string;
      action: string;
      slug: string;
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
  newsletter: {
    heading: string;
    body: string;
    ctaText: string;
    ctaLink: string;
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
    logo: "Northwind Studio",
    links: [
      { label: "Home", slug: "/" },
      { label: "Articles", slug: "/articles" },
      { label: "Categories", slug: "/categories" },
      { label: "About", slug: "/about" },
    ],
    cta: {
      label: "Talk to us",
      slug: "/contact",
    },
  },
  hero: {
    title: "Design, strategy, and engineering that honor human systems",
    subtitle:
      "We partner with leaders who are solving for resilience, clarity, and public good.",
    ctaPrimary: "View work",
    ctaSecondary: "Schedule a call",
    image: "/images/home-hero.jpg",
  },
  featuredStories: {
    title: "Recent dispatches",
    posts: [
      {
        title: "Healing trust through inclusive data",
        summary:
          "Field interviews across civic tech programs yield three principles for empathetic dashboards.",
        slug: "/articles/healing-trust",
        category: "Insights",
        readingTime: "6 min",
        image: "/images/home/story-trust.jpg",
      },
      {
        title: "Designing offices for restless teams",
        summary:
          "Our workplace experiment mixes remote rituals with tangible touchpoints in shared spaces.",
        slug: "/articles/offices",
        category: "Practice",
        readingTime: "5 min",
        image: "/images/home/story-office.jpg",
      },
    ],
  },
  offerings: {
    title: "How we work",
    description:
      "Each offering blends research, design, and engineering into rhythms that keep teams aligned.",
    tiles: [
      {
        title: "Signal Sprints",
        detail: "Two-week discovery sprints that align stakeholders, risks, and vision.",
        action: "Start a sprint",
        slug: "/services/signal-sprints",
      },
      {
        title: "Systems Product Studio",
        detail: "Full-cycle delivery for multi-disciplinary initiatives.",
        action: "Explore studio",
        slug: "/services/systems-studio",
      },
      {
        title: "Advisory Sessions",
        detail: "Coaching for leadership teams navigating complex launches.",
        action: "Book advisory",
        slug: "/services/advisory",
      },
    ],
  },
  testimonials: {
    title: "Partners say",
    quotes: [
      {
        text: "They translated our mission into a living product that still feels tender.",
        name: "Mara Chen",
        role: "Chief Experience Officer",
        company: "Kindred Labs",
      },
      {
        text: "Their presence made every decision intentional and accountable.",
        name: "Dev Patel",
        role: "VP of Product",
        company: "Nuria Health",
      },
    ],
  },
  newsletter: {
    heading: "Weekly field notes",
    body: "Insights, audio dispatches, and event notices from our studio floor.",
    ctaText: "Subscribe",
    ctaLink: "/newsletter",
  },
  footer: {
    text: "© 2026 Northwind Studio. Built with care.",
    links: [
      { label: "Privacy", slug: "/privacy" },
      { label: "Accessibility", slug: "/accessibility" },
      { label: "Careers", slug: "/careers" },
    ],
  },
} satisfies HomeData;
