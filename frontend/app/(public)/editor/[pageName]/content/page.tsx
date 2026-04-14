import Nav from "../components/rendrerNav";
import ContentEditorShell from "../../components/ContentEditorShell";
import { loadEditorPageData } from "../../lib/editor-data";

type EditorContentPageProps = {
  params: Promise<{
    pageName: string;
  }>;
};

export default async function EditorContentPage({
  params,
}: EditorContentPageProps) {
  const { pageName } = await params;
  const { homePage, currentPage, pages } = await loadEditorPageData(pageName);

  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <Nav
        logo={homePage.data.nav.logo}
        cta={homePage.data.nav.cta}
        pages={pages}
        mode="content"
        currentPage={pageName}
      />
      <ContentEditorShell pageName={pageName} initialConfig={currentPage} />
    </main>
  );
}
