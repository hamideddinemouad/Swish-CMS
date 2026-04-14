import Nav from "../components/rendrerNav";
import DesignEditorShell from "../../components/DesignEditorShell";
import { loadEditorPageData } from "../../lib/editor-data";

type EditorDesignPageProps = {
  params: Promise<{
    pageName: string;
  }>;
};

export default async function EditorDesignPage({
  params,
}: EditorDesignPageProps) {
  const { pageName } = await params;
  const { homePage, currentPage, pages } = await loadEditorPageData(pageName);

  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <Nav
        logo={homePage.data.nav.logo}
        cta={homePage.data.nav.cta}
        pages={pages}
        mode="design"
        currentPage={pageName}
      />
      <DesignEditorShell pageName={pageName} initialConfig={currentPage} />
    </main>
  );
}
