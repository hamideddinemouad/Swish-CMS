import Nav from "../components/rendrerNav";
import StructureEditorShell from "../../components/StructureEditorShell";
import { loadEditorPageData } from "../../lib/editor-data";

type EditorStructurePageProps = {
  params: Promise<{
    pageName: string;
  }>;
};

export default async function EditorStructurePage({
  params,
}: EditorStructurePageProps) {
  const { pageName } = await params;
  const { homePage, currentPage, pages } = await loadEditorPageData(pageName);

  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <Nav
        logo={homePage.data.nav.logo}
        cta={homePage.data.nav.cta}
        pages={pages}
        mode="structure"
        currentPage={pageName}
      />
      <StructureEditorShell pageName={pageName} initialConfig={currentPage} />
    </main>
  );
}
