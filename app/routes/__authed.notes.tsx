import {
  MetaFunction,
  redirect,
  SerializeFrom,
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/node";
import {
  createPresentation,
  deleteAllPresentations,
  deletePresentation,
  listPresentations,
} from "~/data/presentations.server";
import NotesDeleteAll from "~/modules/Notes/NotesDeleteAll";
import NotesForm from "~/modules/Notes/NotesForm";
import NotesList from "~/modules/Notes/NotesList";
import { userIdFromRequest } from "~/web/auth.server";

export type NotesRouteData = SerializeFrom<typeof loader>;

export const loader = unstable_defineLoader(async ({ request }) => {
  const userId = await userIdFromRequest(request);
  const notes = await listPresentations(userId);

  return { notes };
});

export const action = unstable_defineAction(async ({ request }) => {
  const userId = await userIdFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  switch (form._action) {
    case "create":
      await createPresentation(userId, {
        title: form.content as string,
      });
      break;

    case "delete":
      await deletePresentation(userId, form.id as string);
      break;

    case "delete-all":
      await deleteAllPresentations(userId);
      break;
  }

  return redirect("/notes");
});

export const meta: MetaFunction = () => [
  {
    title: "Notes",
  },
];

export default function NotesPage() {
  return (
    <>
      <main className="max-w-xl w-full mx-auto flex-grow overflow-hidden">
        <NotesList />
      </main>

      <div className="shrink-0 max-w-xl w-full mx-auto py-8">
        <NotesDeleteAll />

        <NotesForm />
      </div>
    </>
  );
}
