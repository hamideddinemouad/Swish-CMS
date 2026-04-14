import { redirect } from "next/navigation";

type EditorPageProps = {
  params: Promise<{
    pageName: string;
  }>;
};

export default async function EditorPage({ params }: EditorPageProps) {
  const { pageName } = await params;
  redirect(`/editor/${encodeURIComponent(pageName)}/content`);
}
