export type ContactData = {
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
    ctaText: string;
    ctaLink: string;
    image: string;
  };
  contactInfo: {
    title: string;
    methods: Array<{
      label: string;
      detail: string;
      description: string;
      icon: string;
    }>;
  };
  locations: {
    title: string;
    offices: Array<{
      city: string;
      address: string;
      hours: string;
      mapLink: string;
    }>;
  };
  form: {
    heading: string;
    description: string;
    fields: Array<{
      label: string;
      placeholder: string;
      type: string;
      required: boolean;
    }>;
    submitText: string;
  };
  faq: {
    title: string;
    entries: Array<{
      question: string;
      answer: string;
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
    cta: {
      label: "Book a consult",
      slug: "/contact#form",
    },
  },
  hero: {
    title: "Talk with us about your next chapter",
    subtitle:
      "Share your goals, questions, or curiosity—our team responds with thoughtful stories, not scripts.",
    ctaText: "Schedule a call",
    ctaLink: "/contact#form",
    image: "/upload_placeholder.svg",
  },
  contactInfo: {
    title: "Direct lines",
    methods: [
      {
        label: "General inquiries",
        detail: "hello@northwind.studio",
        description: "Expect a reply within one business day.",
        icon: "mail",
      },
      {
        label: "Operations desk",
        detail: "+1 (646) 555-0193",
        description: "Reach us 9am-6pm ET for urgent logistics.",
        icon: "phone",
      },
      {
        label: "Press & partnerships",
        detail: "press@northwind.studio",
        description: "Pitch decks welcome—send us a short note and attachment link.",
        icon: "briefcase",
      },
    ],
  },
  locations: {
    title: "Studios & hubs",
    offices: [
      {
        city: "New York, NY",
        address: "241 Canal Street, Suite 1803",
        hours: "Mon–Fri · 9a–7p ET",
        mapLink: "https://maps.app.goo.gl/nyc",
      },
      {
        city: "Lisbon, PT",
        address: "Rua do Alecrim 50",
        hours: "Mon–Fri · 9a–6p GMT+0",
        mapLink: "https://maps.app.goo.gl/lisbon",
      },
      {
        city: "Melbourne, AU",
        address: "Level 12, 477 Collins St",
        hours: "Tue–Sat · 10a–5p AEST",
        mapLink: "https://maps.app.goo.gl/melbourne",
      },
    ],
  },
  form: {
    heading: "Let’s craft a response",
    description:
      "Tell us the project timeframe, who is involved, and how we can collaborate. We read every submission.",
    fields: [
      { label: "Name", placeholder: "Jordan Lee", type: "text", required: true },
      { label: "Email", placeholder: "you@email.com", type: "email", required: true },
      { label: "Organization", placeholder: "Studio, nonprofit, or venture", type: "text", required: false },
      { label: "Message", placeholder: "What are you building together?", type: "textarea", required: true },
    ],
    submitText: "Send message",
  },
  faq: {
    title: "Frequently asked",
    entries: [
      {
        question: "How long does a typical collaboration take?",
        answer:
          "We adapt to each engagement but budget 6–12 weeks for exploratory work and 3+ months for full launches.",
      },
      {
        question: "Do you work asynchronously?",
        answer:
          "Yes. Every collaboration mixes live working sessions with asynchronous reviews so global partners stay aligned.",
      },
      {
        question: "Where do you travel?",
        answer:
          "Our team regularly visits North America, Europe, and the Pacific; we also embed with remote partners over multi-week sprints.",
      },
    ],
  },
  footer: {
    text: "© 2026 Northwind Studio. Always listening.",
    links: [
      { label: "Privacy", slug: "/privacy" },
      { label: "Accessibility", slug: "/accessibility" },
      { label: "Careers", slug: "/careers" },
    ],
  },
} satisfies ContactData;
