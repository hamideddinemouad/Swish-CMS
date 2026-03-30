import axios from "axios";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { env } from "@/lib/env";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";
import Renderer from "@/app/(public)/editor/[pageName]/components/renderer";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: HomeData;
  preference: HomePreferences;
};

const components = {
  hero: dynamic(() => import("./components/Hero")),
  featuredStories: dynamic(() => import("./components/FeaturedStories")),
  offerings: dynamic(() => import("./components/Offerings")),
  testimonials: dynamic(() => import("./components/Testimonials")),
  newsletter: dynamic(() => import("./components/Newsletter")),
};

type BlockKey = keyof HomeData;
type sub  = {subdomain?: string};
export default async function Home() {

  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  if (!subdomain) {
    return <div>Missing tenant context</div>;
  }
  const pageName = "home";
  const response = await axios.get<PageResponse>(
    `${env.API}/pages/${subdomain}/${pageName}`
  );
  // const contentComponents = response.data.components.filter(
  //   (component) => component.type !== "nav" && component.type !== "footer",
  // );

  return (


        <Renderer config={response.data}/>

  );
}