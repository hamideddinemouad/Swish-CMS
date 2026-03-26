export type FAQData = {
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
    image: string;
  };
  faq: {
    title: string;
    description: string;
    categories: Array<{
      name: string;
      entries: Array<{
        question: string;
        answer: string;
      }>;
    }>;
  };
  supportLinks: {
    title: string;
    items: Array<{
      label: string;
      detail: string;
      slug: string;
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
    logo: "Northwind Studio",
    links: [
      { label: "Home", slug: "/" },
      { label: "Work", slug: "/work" },
      { label: "About", slug: "/about" },
      { label: "Contact", slug: "/contact" },
    ],
  },
  hero: {
    eyebrow: "FAQs",
    title: "Everything you need to know before we collaborate",
    subtitle:
      "Browse common questions about our process, partnerships, and delivery rhythms before reaching out.",
    image: "/images/faq-hero.jpg",
  },
  faq: {
    title: "Frequently asked",
    description:
      "We refresh this list weekly with questions we hear across partnerships, research programs, and sprints.",
    categories: [
      {
        name: "Process",
        entries: [
          {
            question: "How do you kick off new work?",
            answer:
              "We begin with a discovery sprint that maps outcomes, stakeholders, and risks. Every partner receives a transparent brief within the first week.",
          },
          {
            question: "What does your pricing look like?",
            answer:
              "Monthly retainer models start at $35k for multi-week engagements, with bundled discovery, design, and engineering hours. We publish custom estimates once the scope is clear.",
          },
        ],
      },
      {
        name: "Collaboration",
        entries: [
          {
            question: "Which time zones do you cover?",
            answer:
              "Our distributed team covers UTC-8 through UTC+10. We organize working sessions to stay human-friendly for all participants.",
          },
          {
            question: "Can you staff embedded teams?",
            answer:
              "Yes. We can embed 1-3 specialists for up to 6 months, combining facilitation, delivery, and coaching.",
          },
        ],
      },
      {
        name: "Delivery",
        entries: [
          {
            question: "Do you build production code?",
            answer:
              "We deliver experience prototypes, design systems, and occasionally full production builds in partnership with engineering teams.",
          },
          {
            question: "How do you share progress?",
            answer:
              "Every sprint ends with a recorded walkthrough, a decision log, and an annotated artifact shared through our collaboration platform.",
          },
        ],
      },
    ],
  },
  supportLinks: {
    title: "Still need help?",
    items: [
      {
        label: "Contact support",
        detail: "hello@northwind.studio",
        slug: "/contact",
      },
      {
        label: "Client portal",
        detail: "Access onboarding decks and weekly summaries.",
        slug: "/portal",
      },
      {
        label: "Press kit",
        detail: "Download media assets and bios.",
        slug: "/press",
      },
    ],
  },
  footer: {
    text: "© 2026 Northwind Studio. Questions welcome anytime.",
    links: [
      { label: "Privacy", slug: "/privacy" },
      { label: "Accessibility", slug: "/accessibility" },
      { label: "Careers", slug: "/careers" },
    ],
  },
} satisfies FAQData;
