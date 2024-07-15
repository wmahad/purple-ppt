import { MetaFunction, unstable_defineAction } from "@remix-run/node";
import { login } from "~/data/users/login.server";
import Login from "~/modules/Login";
import { authenticate } from "~/web/auth.server";

// export const loader: LoaderFunction = async ({ request }) => {
//   const user = await userFromRequest(request);
//   if (user) return redirect("/");
//   return null;
// };

export type LoginActionType = typeof action;

export const action = unstable_defineAction(async ({ request }) => {
  const formData = await request.formData();
  const original = Object.fromEntries(formData) as Record<string, string>;
  const result = await login(formData);

  if (result.errors) return { errors: result.errors, original };

  return authenticate(result.data, {
    redirectUrl: original.redirectUrl as string,
    rememberMe: result.data.rememberMe,
  }) as never;
});

export const meta: MetaFunction = () => [
  {
    title: "Login",
  },
];

export default function LoginPage() {
  return <Login />;
}
