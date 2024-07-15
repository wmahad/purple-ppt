import { Form, NavLink, useMatches } from "@remix-run/react";
import useIsLoading from "~/hooks/useIsLoading";
import { Button, rem, Group, Menu, Title, Avatar } from "@mantine/core";
import { IconEye, IconLogout } from "@tabler/icons-react";
import { CreatePresentationForm } from "./CreatePresentationForm";
import useUser from "~/hooks/useUser";

export function AppHeader() {
  const user = useUser();
  const isLoading = useIsLoading({ action: "/logout" });
  const matches = useMatches();

  const showCreatePresentationButton = matches.every(
    (match) => match.pathname === "/",
  );

  return (
    <Group h="100%" px="md">
      <Title order={1}>
        <NavLink to="/" prefetch="intent">
          PPT
        </NavLink>
      </Title>
      <Group justify="end" style={{ flex: 1 }}>
        {showCreatePresentationButton && <CreatePresentationForm />}

        <Menu position="bottom-end" width={200} shadow="md">
          <Menu.Target>
            <Avatar color="cyan" radius="xl">
              {user.email.slice(0, 2)}
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{user.email}</Menu.Label>
            <Menu.Item
              leftSection={
                <IconEye style={{ width: rem(14), height: rem(14) }} />
              }
            >
              <NavLink to="/profile" prefetch="intent">
                Profile
              </NavLink>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              disabled={isLoading}
              color="red"
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
            >
              <Form method="post" action="/logout">
                <Button
                  p={0}
                  type="submit"
                  size="compact-xs"
                  variant="transparent"
                  color="red"
                >
                  Logout
                </Button>
              </Form>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
