export type AboutPreferences = {
  theme: {
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
    };
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;
    headingSizes: {
      h1: string;
      h2: string;
      h3: string;
    };
    bodySize: string;
    smallSize: string;
  };
  layout: {
    container: string;
    sectionSpacing: string;
    gap: string;
  };
  borders: {
    radius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    style: string;
  };
  shadow: {
    card: string;
    modal: string;
    none: string;
  };
  buttons: {
    primary: string;
    secondary: string;
    outline: string;
  };
  cards: {
    base: string;
    compact: string;
  };
  navigation: {
    wrapper: string;
    inner: string;
    link: string;
    linkActive: string;
  };
  hero: {
    wrapper: string;
    title: string;
    subtitle: string;
    ctaGroup: string;
  };
  footer: {
    wrapper: string;
    text: string;
    link: string;
  };
};

export const preferences = {
  theme: {
    colorScheme: {
      primary: "bg-amber-600 text-white hover:bg-amber-700",
      secondary: "bg-rose-500 text-white hover:bg-rose-600",
      accent: "text-amber-500",
    },
    background: "bg-gradient-to-br from-amber-50 via-white to-rose-50",
    surface: "bg-white/80 backdrop-blur",
    text: {
      primary: "text-amber-900",
      secondary: "text-amber-600",
    },
  },
  typography: {
    headingFont: "font-serif",
    bodyFont: "font-sans",
    headingWeight: "font-semibold",
    bodyWeight: "font-normal",
    headingSizes: {
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
    },
    bodySize: "text-base",
    smallSize: "text-sm",
  },
  layout: {
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    sectionSpacing: "py-16 md:py-24",
    gap: "gap-6",
  },
  borders: {
    radius: {
      sm: "rounded-md",
      md: "rounded-xl",
      lg: "rounded-3xl",
      full: "rounded-full",
    },
    style: "border border-amber-100",
  },
  shadow: {
    card: "shadow-xl",
    modal: "shadow-2xl",
    none: "shadow-none",
  },
  buttons: {
    primary:
      "inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-white font-semibold hover:bg-amber-700 transition",
    secondary:
      "inline-flex items-center justify-center rounded-full bg-white border border-amber-200 px-6 py-3 text-amber-800 font-semibold hover:bg-amber-50 transition",
    outline:
      "inline-flex items-center justify-center rounded-full border border-rose-200 px-5 py-2 text-rose-700 hover:bg-rose-50 transition",
  },
  cards: {
    base: "rounded-3xl bg-white/70 border border-amber-100 shadow-xl p-8",
    compact: "rounded-2xl bg-white/60 border border-rose-100 shadow-md p-6",
  },
  navigation: {
    wrapper: "w-full border-b border-amber-200 bg-white/80 shadow-sm",
    inner:
      "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20",
    link: "text-sm font-medium text-amber-800 hover:text-amber-600 transition",
    linkActive: "text-sm font-medium text-rose-500",
  },
  hero: {
    wrapper: "py-20 md:py-28 bg-gradient-to-b from-amber-50 to-white",
    title: "text-4xl md:text-6xl font-semibold tracking-tight text-amber-900",
    subtitle: "mt-4 text-lg md:text-xl text-amber-600 max-w-2xl",
    ctaGroup: "mt-8 flex flex-wrap gap-4",
  },
  footer: {
    wrapper: "border-t border-amber-200 bg-white py-10",
    text: "text-sm text-amber-600",
    link: "text-sm text-amber-800 hover:text-rose-500 transition",
  },
} satisfies AboutPreferences;
