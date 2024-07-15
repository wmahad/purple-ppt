import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

import { Form, Link, useActionData, useLocation } from "@remix-run/react";

import useIsLoading from "~/hooks/useIsLoading";
import { LoginActionType } from "~/routes/_auth+/login";

import classes from "./Login.module.css";

export default function Login() {
  const actionData = useActionData<LoginActionType>();
  const isLoading = useIsLoading();
  const location = useLocation();

  return (
    <Container h="100%" size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="post" action="/login">
          <TextInput
            name="email"
            label="Email"
            placeholder="you@mantine.dev"
            required
            error={actionData?.errors?.email}
            defaultValue={actionData?.original?.email}
          />
          <input
            name="redirectUrl"
            type="hidden"
            defaultValue={location.pathname + location.search}
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            required
            error={actionData?.errors?.password}
            defaultValue={actionData?.original?.password}
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" name="rememberMe" />
          </Group>
          <Button type="submit" loading={isLoading} fullWidth mt="xl">
            Sign in
          </Button>
        </Form>

        <Text c="dimmed" size="sm" ta="center" mt={10}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            <Link to="/signup">Create account</Link>
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
