import { Outlet } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import LoggedOutLayout from "~/components/layouts/LoggedOutLayout";
import { userFromRequest } from "~/web/auth.server";
import ErrorPage from "~/components/Error500Page";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/");

  return null;
};

export function ErrorBoundary() {
  return <ErrorPage />;
}

export default function UnauthedLayout() {
  return (
    <LoggedOutLayout>
      <Outlet />
    </LoggedOutLayout>
  );
}
