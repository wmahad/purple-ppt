import { SimpleGrid } from "@mantine/core";
import { json, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PresentationItem } from "~/components/PresentationCard";
import {
  listPresentations,
  createPresentation,
  deletePresentation,
} from "~/data/presentations.server";
import { userIdFromRequest } from "~/web/auth.server";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { EmptyState } from "~/components/EmptyState";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const presentations = await listPresentations(userId);
  return json({ presentations });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  if (form._action === "delete") {
    await deletePresentation(userId, form.id as string);
    return redirect("/");
  } else if (form._action === "create") {
    const {
      pages: [firstPage],
      id,
    } = await createPresentation(userId, {
      title: form.title as string,
      description: form.description as string,
    });
    return redirect(`/${id}/slides/${firstPage.id}`);
  }

  return redirect("/");
};

export type IndexAction = typeof action;

export const meta: MetaFunction = () => [
  {
    title: "Presentations",
  },
];

export default function PresentationsPage() {
  const { presentations } = useLoaderData<typeof loader>();
  return presentations.length ? (
    <SimpleGrid cols={4}>
      {presentations.map((presentation) => (
        <PresentationItem key={presentation.id} presentation={presentation} />
      ))}
    </SimpleGrid>
  ) : (
    <EmptyState />
  );
}
