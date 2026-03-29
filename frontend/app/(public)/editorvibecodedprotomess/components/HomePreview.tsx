"use client";

import { useEffect, useRef } from "react";
import Hero from "@/app/(tenant)/tenant/components/Hero";
import FeaturedStories from "@/app/(tenant)/tenant/components/FeaturedStories";
import Offerings from "@/app/(tenant)/tenant/components/Offerings";
import Testimonials from "@/app/(tenant)/tenant/components/Testimonials";
import Newsletter from "@/app/(tenant)/tenant/components/Newsletter";
import Nav from "@/app/(tenant)/tenant/components/Nav";
import Footer from "@/app/(tenant)/tenant/components/Footer";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type Props = { data: HomeData; preference: HomePreferences; activeSection: string };

export function HomePreview({ data, preference, activeSection }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    previewRef.current?.querySelector<HTMLElement>(`#${activeSection}`)?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [activeSection]);

  return (
    <div ref={previewRef} id="preview" className="h-full overflow-y-auto rounded-[28px] bg-slate-950 text-white">
      <section id="nav">
        <Nav
          logo={data.nav.logo}
          cta={data.nav.cta}
          pages={data.nav.links.map((link) => ({ slug: link.slug, title: link.label }))}
          preferences={preference}
        />
      </section>
      <div className="space-y-6 px-3 py-4">
        <section id="hero"><Hero {...data.hero} preferences={preference} /></section>
        <section id="featuredStories"><FeaturedStories {...data.featuredStories} preferences={preference} /></section>
        <section id="offerings"><Offerings {...data.offerings} /></section>
        <section id="testimonials"><Testimonials {...data.testimonials} preferences={preference} /></section>
        <section id="newsletter"><Newsletter {...data.newsletter} /></section>
      </div>
      <section id="footer"><Footer {...data.footer} preferences={preference} /></section>
    </div>
  );
}
