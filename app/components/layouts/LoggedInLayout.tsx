import { Form, NavLink } from "@remix-run/react";
import { ReactNode } from "react";
import { UserProvider } from "~/hooks/useUser";
import { Button } from "../ui/button";
import ThemeChanger from "../ThemeChanger";
import useIsLoading from "~/hooks/useIsLoading";
import { Toaster } from "../ui/toaster";
import { AuthedRouteData } from "~/routes/_public+/_layout";

function InnerLoggedInLayout({
  user,
  children,
}: {
  user: NonNullable<AuthedRouteData["user"]>;
  children: ReactNode;
}) {
  const isLoading = useIsLoading({ action: "/logout" });

  return (
    <div className="flex flex-col h-screen w-full px-12">
      <nav className="max-w-6xl mx-auto flex w-full justify-between shrink-0 py-8">
        <p>Welcome, {user.email}!</p>

        <ul className="flex flex-row space-x-4 items-center">
          <li>
            <NavLink
              to="/"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Notes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <Form method="post" action="/logout">
              <Button type="submit" variant="destructive" disabled={isLoading}>
                Logout
              </Button>
            </Form>
          </li>

          <li>
            <ThemeChanger />
          </li>
        </ul>
      </nav>

      <div className="contents">{children}</div>
    </div>
  );
}

export default function LoggedInLayout({
  user,
  children,
}: {
  user: NonNullable<AuthedRouteData["user"]>;
  children: ReactNode;
}) {
  return (
    <UserProvider user={user}>
      <Toaster />
      <InnerLoggedInLayout user={user}>{children}</InnerLoggedInLayout>
    </UserProvider>
  );
}
