import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import ErrorPage from "~/components/Error500Page";
import LoggedInLayout from "~/components/LoggedInLayout";
import Login from "~/modules/Login";
import { userFromRequest } from "~/web/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await userFromRequest(request);
  return json({ user });
};

export function ErrorBoundary() {
  return <ErrorPage />;
}

export default function AppPage() {
  const { user } = useLoaderData<typeof loader>();

  if (!user) return <Login />;

  return (
    <LoggedInLayout user={user}>
      <Outlet />
    </LoggedInLayout>
  );
}
