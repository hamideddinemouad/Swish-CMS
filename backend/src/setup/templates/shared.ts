import type {
  DefaultPageData,
  DefaultPagePreferences,
  DefaultPageSeed,
} from '../../pages/defaultContent/types';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};

type SeedTransform = {
  title?: string;
  data?: DefaultPageData;
  preference?: DeepPartial<DefaultPagePreferences>;
  enabledComponents?: string[];
};

function cloneSeed<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function mergePreferences(
  base: DefaultPagePreferences,
  override: DeepPartial<DefaultPagePreferences> | undefined,
): DefaultPagePreferences {
  if (!override) {
    return base;
  }

  return {
    ...base,
    ...override,
    theme: {
      ...base.theme,
      ...override.theme,
      colorScheme: {
        ...base.theme.colorScheme,
        ...override.theme?.colorScheme,
      },
      text: {
        ...base.theme.text,
        ...override.theme?.text,
      },
    },
    typography: {
      ...base.typography,
      ...override.typography,
      headingSizes: {
        ...base.typography.headingSizes,
        ...override.typography?.headingSizes,
      },
    },
    layout: {
      ...base.layout,
      ...override.layout,
    },
    borders: {
      ...base.borders,
      ...override.borders,
      radius: {
        ...base.borders.radius,
        ...override.borders?.radius,
      },
    },
    shadow: {
      ...base.shadow,
      ...override.shadow,
    },
    buttons: {
      ...base.buttons,
      ...override.buttons,
    },
    cards: {
      ...base.cards,
      ...override.cards,
    },
    navigation: {
      ...base.navigation,
      ...override.navigation,
    },
    hero: {
      ...base.hero,
      ...override.hero,
    },
    pageDesign: {
      ...base.pageDesign,
      ...override.pageDesign,
    },
    componentDesign: {
      ...base.componentDesign,
      ...override.componentDesign,
    },
    homeDesign: {
      ...base.homeDesign,
      ...override.homeDesign,
    },
    footer: {
      ...base.footer,
      ...override.footer,
    },
  };
}

export function createTemplateSeeds(
  baseSeeds: readonly DefaultPageSeed[],
  transforms: Partial<Record<string, SeedTransform>>,
): DefaultPageSeed[] {
  return baseSeeds.map((seed) => {
    const transform = transforms[seed.slug];
    const clonedSeed = cloneSeed(seed);

    if (!transform) {
      return clonedSeed;
    }

    if (transform.enabledComponents) {
      clonedSeed.page.components = clonedSeed.page.components.map((component) => ({
        ...component,
        enabled: transform.enabledComponents?.includes(component.type) ?? component.enabled,
      }));
    }

    return {
      ...clonedSeed,
      title: transform.title ?? clonedSeed.title,
      data: transform.data ?? clonedSeed.data,
      preference: mergePreferences(clonedSeed.preference, transform.preference),
    };
  });
}
