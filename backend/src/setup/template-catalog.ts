export const SETUP_TEMPLATE_IDS = [
  'studio',
  'magazine',
  'consulting',
  'minimal',
] as const;

export type SetupTemplateId = (typeof SETUP_TEMPLATE_IDS)[number];

export type SetupTemplateMeta = {
  id: SetupTemplateId;
  label: string;
  description: string;
};

export const SETUP_TEMPLATE_CATALOG: SetupTemplateMeta[] = [
  {
    id: 'studio',
    label: 'Studio',
    description: 'Editorial marketing pages for creative teams and agencies.',
  },
  {
    id: 'magazine',
    label: 'Magazine',
    description: 'Publishing-oriented pages for articles, archives, and newsletters.',
  },
  {
    id: 'consulting',
    label: 'Consulting',
    description: 'Service-led pages focused on trust, offers, and lead generation.',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'A restrained starting point for simple launches and lighter sites.',
  },
];

export const DEFAULT_SETUP_TEMPLATE_ID: SetupTemplateId = 'studio';
