import {
  PasswordInput,
  TextInput,
  rem,
  Button,
  Card,
  Title,
  Container,
  Stack,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { updateUser } from "~/data/users.server";
import useIsLoading from "~/hooks/useIsLoading";
import useUser from "~/hooks/useUser";
import { userIdFromRequest } from "~/web/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const form = await request.formData();

  return await updateUser(userId, form);
};

export const meta: MetaFunction = () => [
  {
    title: "Profile",
  },
];

export default function Profile() {
  const user = useUser();
  const actionData = useActionData<typeof action>();
  const isLoading = useIsLoading();

  useEffect(() => {
    let id = "";
    if (actionData?.errors) {
      id = notifications.show({
        title: "Profile update!",
        message: "Failed to update profile!",
        color: "red",
      });
    } else if (actionData?.data) {
      id = notifications.show({
        title: "Profile update!",
        message: "Your profile has been updated!",
      });
    }

    return () => {
      notifications.hide(id);
    };
  }, [actionData]);

  return (
    <Container mt="sm">
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Form method="post">
          <Stack>
            <Title order={3}>Edit your profile</Title>

            <TextInput
              leftSectionPointerEvents="none"
              leftSection={
                <IconAt style={{ width: rem(16), height: rem(16) }} />
              }
              label="Email"
              required
              name="email"
              placeholder="hello@email.com"
              defaultValue={user.email}
              error={actionData?.errors?.email}
            />

            <PasswordInput
              required
              label="Current password"
              name="currentPassword"
              error={actionData?.errors?.currentPassword}
            />

            <PasswordInput
              required
              label="New password"
              name="newPassword"
              error={actionData?.errors?.newPassword}
            />

            <PasswordInput
              required
              label="Confirm password"
              name="passwordConfirmation"
              error={actionData?.errors?.passwordConfirmation}
            />

            <Button
              type="submit"
              variant="filled"
              color="indigo"
              loading={isLoading}
              fullWidth
            >
              Update profile
            </Button>
          </Stack>
        </Form>
      </Card>
    </Container>
  );
}
