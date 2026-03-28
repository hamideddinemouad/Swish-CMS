import axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import type { ContactData } from "@/visualizer/demo/contact/data";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: ContactData;
  preference: ContactPreferences;
};

const components = {
  nav: dynamic(() => import("./components/Nav")),
  hero: dynamic(() => import("./components/Hero")),
  contactInfo: dynamic(() => import("./components/ContactInfo")),
  locations: dynamic(() => import("./components/Locations")),
  form: dynamic(() => import("./components/Form")),
  faq: dynamic(() => import("./components/Faq")),
  footer: dynamic(() => import("./components/Footer")),
};

type BlockKey = keyof ContactData;

export default async function Contact() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "contact";

  if (!subdomain) {
    return <div>Missing tenant context</div>;
  }

  const response = await axios.get<PageResponse>(
    `${env.API}/pages/${subdomain}/${pageName}`
  );
  const contentComponents = response.data.components.filter(
    (component) => component.type !== "nav" && component.type !== "footer",
  );

  return (
    <main>
      {contentComponents.map((component) => {
        if (!component.enabled) {
          return null;
        }

        return renderBlock(
          component.type as BlockKey,
          response.data.data,
          response.data.preference,
        );
      })}
    </main>
  );
}

function renderBlock(
  blockKey: BlockKey,
  data: ContactData,
  preferences: ContactPreferences,
) {
  switch (blockKey) {
    case "nav": {
      const NavBlock = components.nav;
      return <NavBlock key={blockKey} {...data.nav} preferences={preferences} />;
    }
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "contactInfo": {
      const ContactInfoBlock = components.contactInfo;
      return <ContactInfoBlock key={blockKey} {...data.contactInfo} />;
    }
    case "locations": {
      const LocationsBlock = components.locations;
      return <LocationsBlock key={blockKey} {...data.locations} />;
    }
    case "form": {
      const FormBlock = components.form;
      return <FormBlock key={blockKey} {...data.form} preferences={preferences} />;
    }
    case "faq": {
      const FaqBlock = components.faq;
      return <FaqBlock key={blockKey} {...data.faq} />;
    }
    case "footer": {
      const FooterBlock = components.footer;
      return <FooterBlock key={blockKey} {...data.footer} preferences={preferences} />;
    }
    default:
      return null;
  }
}
