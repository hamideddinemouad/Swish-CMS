export type CategoriesData = {
  nav: {
    logo: string;
    links: Array<{
      label: string;
      slug: string;
    }>;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image: string;
  };
  categoryGrid: {
    title: string;
    description: string;
    categories: Array<{
      name: string;
      slug: string;
      excerpt: string;
      accent: string;
      image: string;
    }>;
  };
  featuredCollections: {
    title: string;
    collections: Array<{
      title: string;
      highlight: string;
      curator: string;
      slug: string;
    }>;
  };
  resourceLinks: {
    title: string;
    items: Array<{
      label: string;
      detail: string;
      slug: string;
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
    logo: "Layered Focus",
    links: [
      { label: "Home", slug: "/" },
      { label: "Categories", slug: "/categories" },
      { label: "Series", slug: "/series" },
      { label: "Register", slug: "/register" },
    ],
  },
  hero: {
    title: "Choose a lens for every insight",
    subtitle:
      "Our categories help editorial teams, researchers, and strategists find the workstreams that matter most.",
    ctaText: "View category guide",
    ctaLink: "/categories#guide",
    image: "/images/categories-hero.jpg",
  },
  categoryGrid: {
    title: "Curated tracks",
    description: "Every collection is maintained by an expert curator with fresh dispatches weekly.",
    categories: [
      {
        name: "Systems Practice",
        slug: "/categories/systems-practice",
        excerpt: "Essays on how systems thinking shapes resilient products.",
        accent: "from-emerald-500 to-teal-500",
        image: "/images/categories/systems.jpg",
      },
      {
        name: "Policy & Trust",
        slug: "/categories/policy-trust",
        excerpt: "Guidelines for translating complex policy into humane interfaces.",
        accent: "from-slate-700 to-slate-500",
        image: "/images/categories/policy.jpg",
      },
      {
        name: "Field Methodologies",
        slug: "/categories/methods",
        excerpt: "Field notes, toolkits, and prompts for research teams in motion.",
        accent: "from-amber-500 to-orange-500",
        image: "/images/categories/methods.jpg",
      },
      {
        name: "Creative Practice",
        slug: "/categories/creative-practice",
        excerpt: "Studio rituals and creative prompts for thoughtful teams.",
        accent: "from-indigo-500 to-purple-500",
        image: "/images/categories/creative.jpg",
      },
    ],
  },
  featuredCollections: {
    title: "Featured collections",
    collections: [
      {
        title: "Signal: Communities",
        highlight: "Deep dives into collective accountability.",
        curator: "Mireille Sato",
        slug: "/collections/signal-communities",
      },
      {
        title: "Blueprint: Digital public goods",
        highlight: "Design patterns that keep civic services open and resilient.",
        curator: "Elias Moore",
        slug: "/collections/blueprint-pubgoods",
      },
    ],
  },
  resourceLinks: {
    title: "Support",
    items: [
      {
        label: "Category briefs",
        detail: "Download a printable catalog of each editorial track.",
        slug: "/resources/category-briefs",
      },
      {
        label: "Curator directory",
        detail: "Connect with the leads who shepherd each collection.",
        slug: "/resources/curators",
      },
      {
        label: "Submission guidelines",
        detail: "Pitch a story or case study for the next release cycle.",
        slug: "/resources/submissions",
      },
    ],
  },
  newsletter: {
    heading: "Weekly selection",
    body: "Get a category spotlight and behind-the-curtain essays in your inbox every Monday.",
    ctaText: "Claim the spotlight",
    ctaLink: "/newsletter",
  },
  footer: {
    text: "© 2026 Layered Focus. Curated for teams with a lens on systems.",
    links: [
      { label: "Privacy", slug: "/privacy" },
      { label: "Accessibility", slug: "/accessibility" },
      { label: "Contact", slug: "/contact" },
    ],
  },
} satisfies CategoriesData;
