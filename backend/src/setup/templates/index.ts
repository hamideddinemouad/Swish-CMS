import type { DefaultPageSeed } from '../../pages/defaultContent/types';
import {
  DEFAULT_SETUP_TEMPLATE_ID,
  type SetupTemplateId,
} from '../template-catalog';
import { consultingTemplate } from './consulting';
import { magazineTemplate } from './magazine';
import { minimalTemplate } from './minimal';
import { studioTemplate } from './studio';

const templates = {
  studio: studioTemplate,
  magazine: magazineTemplate,
  consulting: consultingTemplate,
  minimal: minimalTemplate,
} satisfies Record<SetupTemplateId, { seeds: readonly DefaultPageSeed[] }>;

export function getTemplateSeeds(templateId: SetupTemplateId): readonly DefaultPageSeed[] {
  return templates[templateId]?.seeds ?? templates[DEFAULT_SETUP_TEMPLATE_ID].seeds;
}
