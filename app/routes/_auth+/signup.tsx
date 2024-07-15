import {
  Anchor,
  Checkbox,
  Container,
  Group,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import {
  redirect,
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { createUser } from "~/data/users.server";
import { GenericDataError } from "~/data/utils/types";
import useIsLoading from "~/hooks/useIsLoading";
import { authenticate, userFromRequest } from "~/web/auth.server";

export const loader = unstable_defineLoader(async ({ request }) => {
  const user = await userFromRequest(request);

  if (user) return redirect("/notes");

  return null;
});

export const action = unstable_defineAction(async ({ request }) => {
  const form = await request.formData();
  const result = await createUser(form);

  if (result.errors) return result.errors;

  return authenticate(result.data, { rememberMe: result.data.rememberMe });
});

import classes from "./Signup.module.css";

export const meta: MetaFunction = () => [
  {
    title: "Sign up",
  },
];

export default function SignUp() {
  const errors = useActionData<GenericDataError>();
  const isLoading = useIsLoading();

  return (
    <Container h="100%" size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Please sign up
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="post" action="/signup">
          <TextInput
            name="email"
            label="Email"
            placeholder="you@mantine.dev"
            required
            error={errors?.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            required
            error={errors?.password}
            mt="md"
          />
          <PasswordInput
            label="Confirm Password"
            name="passwordConfirmation"
            placeholder="Your password"
            required
            error={errors?.password}
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" name="rememberMe" />
          </Group>
          <Button type="submit" loading={isLoading} fullWidth mt="xl">
            Sign up
          </Button>
        </Form>

        <Text c="dimmed" size="sm" ta="center" mt={10}>
          Have an account already?{" "}
          <Anchor size="sm" component="button">
            <Link to="/login">Login instead</Link>
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
