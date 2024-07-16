import { Card } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { useLoaderData } from "@remix-run/react";
import { invariantResponse } from "~/utils";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getPageContents } from "~/data/pages.server";
import { Content, Page } from "@prisma/client";

import "@mantine/carousel/styles.css";
import Editor from "~/components/Editor.client";
import { useEffect, useState } from "react";

interface CustomPage extends Page {
  contents: Content[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariantResponse(params.presentationId, "Missing presentation id");
  const response = await getPageContents(params.presentationId);

  invariantResponse(
    response,
    "There're currently no pages for this presentation",
  );

  const pages = response.pages as unknown as CustomPage[];

  return json({
    version: {
      ...response,
      pages,
    },
  });
};

export default function AppPage() {
  const { version } = useLoaderData<typeof loader>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card h={"100%"}>
      <Carousel withIndicators height="100%">
        {version.pages.map((page) => (
          <Carousel.Slide key={page.id}>
            {isClient && (
              <Editor editable={false} initialContent={page.contents} />
            )}
          </Carousel.Slide>
        ))}
      </Carousel>
    </Card>
  );
}
