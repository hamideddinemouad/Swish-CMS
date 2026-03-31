"use client"
import dynamic from "next/dynamic";
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
  hero: dynamic(() => import("./Hero")),
  contactInfo: dynamic(() => import("./ContactInfo")),
  locations: dynamic(() => import("./Locations")),
  form: dynamic(() => import("./Form")),
  faq: dynamic(() => import("./Faq")),
};
type BlockKey = keyof ContactData;

export default function RenderBlockContact({
  blockKey,
  data,
  preferences,
} : {blockKey : BlockKey; data : ContactData; preferences : ContactPreferences}) {
  switch (blockKey) {
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
    default:
      return null;
  }
}
