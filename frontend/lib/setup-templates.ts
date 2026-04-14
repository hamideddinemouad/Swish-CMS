export const SETUP_TEMPLATE_IDS = [
  "studio",
  "magazine",
  "consulting",
  "minimal",
] as const;

export type SetupTemplateId = (typeof SETUP_TEMPLATE_IDS)[number];

export type SetupTemplateOption = {
  id: SetupTemplateId;
  label: string;
  description: string;
  audience: string;
  previewImage: string;
};

export const SETUP_TEMPLATE_OPTIONS: SetupTemplateOption[] = [
  {
    id: "studio",
    label: "Studio",
    description: "Editorial marketing pages for creative teams and modern agencies.",
    audience: "Best for studios and product teams",
    previewImage: "/template-previews/studio.svg",
  },
  {
    id: "magazine",
    label: "Magazine",
    description: "Content-forward pages built for publishing, newsletters, and archives.",
    audience: "Best for publications and media brands",
    previewImage: "/template-previews/magazine.svg",
  },
  {
    id: "consulting",
    label: "Consulting",
    description: "Service-led pages with stronger conversion and credibility sections.",
    audience: "Best for consultancies and expert businesses",
    previewImage: "/template-previews/consulting.svg",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "A quieter baseline with leaner content structure and restrained styling.",
    audience: "Best for lean launches and simple sites",
    previewImage: "/template-previews/minimal.svg",
  },
];

export const DEFAULT_SETUP_TEMPLATE_ID: SetupTemplateId = "studio";
