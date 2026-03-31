"use client";

import RenderBlockAbout from "@/app/(tenant)/tenant/about/components/RenderBlockAbout";
import RenderBlockArticles from "@/app/(tenant)/tenant/articles/components/RenderBlockArticles";
import RenderBlockCategories from "@/app/(tenant)/tenant/categories/components/RenderBlockCategories";
import RenderBlockContact from "@/app/(tenant)/tenant/contact/components/RenderBlockContact";
import RenderBlockFaq from "@/app/(tenant)/tenant/faq/components/RenderBlockFaq";
import RenderBlockHome from "@/app/(tenant)/tenant/components/RenderBlockHome";
import type { ReactNode } from "react";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";
import type { ContactData } from "@/visualizer/demo/contact/data";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type PageComponent = {
  type: string;
  enabled: boolean;
  variant?: string;
};

type PageConfig = {
  components: PageComponent[];
  data: unknown;
  preference: unknown;
};

type RendererProps = {
  pageName: string;
  config: PageConfig;
};

function renderEnabledComponents(
  components: PageComponent[],
  render: (component: PageComponent) => ReactNode,
) {
  return components.map((component) => {
    if (!component.enabled || component.type === "nav" || component.type === "footer") {
      return null;
    }

    return (
      <div key={component.type} data-editor-section={component.type} className="scroll-mt-8">
        {render(component)}
      </div>
    );
  });
}

export default function Renderer({ pageName, config }: RendererProps) {
  switch (pageName.toLowerCase()) {
    case "articles":
      return renderEnabledComponents(config.components, (component) => (
        <RenderBlockArticles
          key={component.type}
          blockKey={component.type as keyof ArticlesData}
          data={config.data as ArticlesData}
          preferences={config.preference as ArticlesPreferences}
        />
      ));
    case "about":
      return renderEnabledComponents(config.components, (component) => (
        <RenderBlockAbout
          key={component.type}
          blockKey={component.type as keyof AboutData}
          data={config.data as AboutData}
          preferences={config.preference as AboutPreferences}
        />
      ));
    case "categories":
      return renderEnabledComponents(config.components, (component) => (
        <RenderBlockCategories
          key={component.type}
          blockKey={component.type as keyof CategoriesData}
          data={config.data as CategoriesData}
          preferences={config.preference as CategoriesPreferences}
        />
      ));
    case "contact":
      return renderEnabledComponents(config.components, (component) => (
        <RenderBlockContact
          key={component.type}
          blockKey={component.type as keyof ContactData}
          data={config.data as ContactData}
          preferences={config.preference as ContactPreferences}
        />
      ));
    case "faq":
      return renderEnabledComponents(config.components, (component) => (
        <RenderBlockFaq
          key={component.type}
          blockKey={component.type as keyof FAQData}
          data={config.data as FAQData}
          preferences={config.preference as FAQPreferences}
        />
      ));
    case "home":
      return renderEnabledComponents(config.components, (component) => (
        <RenderBlockHome
          key={component.type}
          blockKey={component.type as keyof HomeData}
          data={config.data as HomeData}
          preferences={config.preference as HomePreferences}
        />
      ));
    default:
      return null;
  }
}
