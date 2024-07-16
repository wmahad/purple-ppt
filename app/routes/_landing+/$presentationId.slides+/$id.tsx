import { useDebouncedCallback } from "@mantine/hooks";
import { ActionFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { addContentToPage } from "~/data/pages.server";
import { invariantResponse } from "~/utils";
import { loader as loadContents, PageContentsLoader } from "./_layout";
import Editor from "~/components/Editor.client";
import { useEffect, useState } from "react";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariantResponse(params.id, "Missing page id");

  const form = await request.formData();
  const payload = form.get("payload") as string;
  invariantResponse(payload, "no information has been sent");

  await addContentToPage(params.id, JSON.parse(payload));

  return null;
};

export const loader = loadContents;

export default function AppPage() {
  // @ts-expect-error, this is a remix specific error
  const fetcher = useFetcher();
  const { id, presentationId } = useParams();
  const { pageContent } = useLoaderData<PageContentsLoader>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function saveData(payload: string) {
    fetcher.submit(
      { payload },
      {
        method: "POST",
        action,
        encType: "multipart/form-data",
      },
    );
  }
  const saveEditorState = useDebouncedCallback(saveData, 10000);
  const action = `/${presentationId}/slides/${id}`;

  return (
    isClient && (
      <form method="POST" style={{ height: "100%" }}>
        <Editor
          initialContent={pageContent?.contents}
          onChange={(payload) => {
            saveEditorState(payload);
          }}
        />
      </form>
    )
  );
}
