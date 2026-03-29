"use client";

import axios from "axios";
import { useRef, useState } from "react";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";
import { FieldEditor } from "./FieldEditor";
import { HomePreview } from "./HomePreview";
import { PreferenceEditor } from "./PreferenceEditor";
import { SectionCard } from "./SectionCard";
import { sectionForPath, setAtPath, type DraftKind, titleize } from "./home-utils";

type Props = { pageName: string; initialData: HomeData; initialPreference: HomePreferences };

export function HomeEditorShell({ pageName, initialData, initialPreference }: Props) {
  const [data, setData] = useState(initialData);
  const [preference, setPreference] = useState(initialPreference);
  const [status, setStatus] = useState("Edit any field and blur to save.");
  const [activeSection, setActiveSection] = useState("preview");
  const dataRef = useRef(initialData);
  const preferenceRef = useRef(initialPreference);

  async function save(kind: DraftKind) {
    const payload = kind === "content" ? dataRef.current : preferenceRef.current;

    try {
      await axios.patch(
        `/api/editor/pages/${encodeURIComponent(pageName)}/${kind === "content" ? "content" : "preference"}`,
        kind === "content" ? { data: payload } : { preference: payload },
      );
      setStatus(`${titleize(kind)} saved.`);
    } catch {
      setStatus(`Failed to save ${kind}.`);
    }
  }

  function updateContent(path: string, next: unknown) {
    const updated = setAtPath(data, path, next);
    dataRef.current = updated;
    setData(updated);
  }

  function updatePreference(path: string, next: unknown) {
    const updated = setAtPath(preference, path, next);
    preferenceRef.current = updated;
    setPreference(updated);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fafc_0%,#eef4f9_100%)] px-4 py-4">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/90 p-4 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">Draft editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink-900)]">Home page</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-ink-700)]">{status}</p>
          <div className="mt-5 space-y-4 overflow-y-auto pr-1">
            <SectionCard title="Content">
              {Object.entries(data).map(([key, value]) => (
                <FieldEditor
                  key={key}
                  kind="content"
                  label={key}
                  path={key}
                  value={value}
                  onChange={updateContent}
                  onFocus={(path) => setActiveSection(sectionForPath("content", path))}
                  onBlur={save}
                />
              ))}
            </SectionCard>
            <SectionCard title="Preferences">
              <PreferenceEditor
                label="preferences"
                path=""
                value={preference}
                onChange={updatePreference}
                onFocus={(path) => setActiveSection(sectionForPath("preference", path))}
                onBlur={save}
              />
            </SectionCard>
          </div>
        </aside>

        <section className="min-h-[70vh] rounded-[28px] border border-[color:rgb(146_146_146_/_0.16)] bg-white/80 shadow-[0_18px_50px_rgb(54_54_54_/_0.05)]">
          <div className="border-b border-[color:rgb(146_146_146_/_0.16)] px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-wix-blue)]">Live preview</p>
            <p className="mt-1 text-sm text-[var(--color-ink-700)]">The preview uses the same tenant components and updates as you edit.</p>
          </div>
          <div className="h-[calc(100%-73px)] p-2">
            <HomePreview data={data} preference={preference} activeSection={activeSection} />
          </div>
        </section>
      </div>
    </main>
  );
}
