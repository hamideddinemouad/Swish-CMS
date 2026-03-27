export type ArticlesData = {
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
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  featuredArticles: {
    title: string;
    subtitle: string;
    articles: Array<{
      title: string;
      slug: string;
      summary: string;
      tag: string;
      readingTime: string;
      image: string;
    }>;
  };
  editorialSeries: {
    title: string;
    description: string;
    focuses: Array<{
      name: string;
      detail: string;
    }>;
  };
  categories: {
    title: string;
    items: Array<{
      name: string;
      slug: string;
    }>;
  };
  trending: {
    title: string;
    posts: Array<{
      rank: number;
      title: string;
      slug: string;
      snippet: string;
    }>;
  };
  authors: {
    title: string;
    people: Array<{
      name: string;
      role: string;
      focus: string;
      avatar: string;
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
    logo: "Field Notes",
    links: [
      { label: "Home", slug: "/" },
      { label: "Stories", slug: "/stories" },
      { label: "Insights", slug: "/articles" },
      { label: "Events", slug: "/events" },
    ],
    cta: { label: "Submit a story", slug: "/submit" },
  },
  hero: {
    eyebrow: "Journal",
    title: "Reporting on the forces shaping human-centered technology",
    subtitle:
      "Field Notes publishes deeply sourced articles, interviews, and dispatches from the front lines of design, science, and policy.",
    ctaPrimary: "Read latest",
    ctaSecondary: "Browse categories",
    image: "/images/articles-hero.jpg",
  },
  featuredArticles: {
    title: "Featured essays",
    subtitle: "Edited in-house and guided by independent fact-checkers.",
    articles: [
      {
        title: "Why resilience beats rapid scaling",
        slug: "/articles/resilience-beats-growth",
        summary:
          "Voices from institutions that chose slow, intentional growth to build durable services.",
        tag: "Strategy",
        readingTime: "7 min read",
        image: "/images/articles/resilience.jpg",
      },
      {
        title: "Designing borders for planetary data",
        slug: "/articles/planetary-data-borders",
        summary:
          "A roundtable with scientists and designers establishing shared protocols.",
        tag: "Research",
        readingTime: "9 min read",
        image: "/images/articles/data-borders.jpg",
      },
      {
        title: "The listening practice that democracies need",
        slug: "/articles/listening-practices",
        summary:
          "Documenting how civic tech platforms facilitate nuanced conversation.",
        tag: "Civic",
        readingTime: "5 min read",
        image: "/images/articles/listening.jpg",
      },
    ],
  },
  editorialSeries: {
    title: "Series: The Care Signal",
    description:
      "50,000 feet stories about how organizations protect the moments that matter most: onboarding, stewardship, and recovery.",
    focuses: [
      {
        name: "Stewardship",
        detail: "Profiles of leaders balancing measurable impact with empathy.",
      },
      {
        name: "Recovery",
        detail: "Documentaries on how teams rebuild trust after setbacks.",
      },
      {
        name: "Onboarding",
        detail: "Technique decks for welcoming new audiences to complex work.",
      },
    ],
  },
  categories: {
    title: "Topics",
    items: [
      { name: "Design Systems", slug: "/category/design-systems" },
      { name: "Responsible AI", slug: "/category/responsible-ai" },
      { name: "Policy", slug: "/category/policy" },
      { name: "Field Notes", slug: "/category/field-notes" },
    ],
  },
  trending: {
    title: "Trending now",
    posts: [
      {
        rank: 1,
        title: "The product story we tell ourselves",
        slug: "/articles/product-story",
        snippet: "A meditation on metrics, narratives, and the stories we build for users.",
      },
      {
        rank: 2,
        title: "Building inclusive field research",
        slug: "/articles/inclusive-research",
        snippet: "Practical participation strategies for distributed teams.",
      },
      {
        rank: 3,
        title: "Policy-ready UX shorthand",
        slug: "/articles/policy-ux",
        snippet: "How to translate policy mandates into tangible microcopy.",
      },
    ],
  },
  authors: {
    title: "Contributors",
    people: [
      {
        name: "Amir Saleh",
        role: "Senior Editor",
        focus: "Technology & democracy",
        avatar: "/images/authors/amir.jpg",
      },
      {
        name: "Priya Das",
        role: "Visual Storytelling Lead",
        focus: "Data visualizations & immersive reports",
        avatar: "/images/authors/priya.jpg",
      },
      {
        name: "Hana Reed",
        role: "Field Reporter",
        focus: "Healthcare and climate impact",
        avatar: "/images/authors/hana.jpg",
      },
    ],
  },
  newsletter: {
    heading: "Weekly dispatch",
    body: "Subscribe for a curated digest of new stories, audio notes, and invites to live conversations.",
    ctaText: "Join the dispatch",
    ctaLink: "/newsletter",
  },
  footer: {
    text: "© 2026 Field Notes Collective • Crafted in public.",
    links: [
      { label: "Masthead", slug: "/masthead" },
      { label: "Ethics", slug: "/ethics" },
      { label: "Contact", slug: "/contact" },
    ],
  },
} satisfies ArticlesData;
