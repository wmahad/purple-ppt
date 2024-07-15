import { Link, useFetcher } from "@remix-run/react";
import { IconTrash } from "@tabler/icons-react";

import { Card, Group, Button, Text, ActionIcon, rem } from "@mantine/core";
import { Presentation } from "~/data/presentations.server";
import { SerializeFrom } from "@remix-run/node";

export function PresentationItem({
  presentation,
}: {
  presentation: SerializeFrom<Presentation>;
}) {
  const {
    pages: [firstPage],
  } = presentation;
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>{presentation.title}</Text>
          <PresentationDeleteIcon id={presentation.id} />
        </Group>
      </Card.Section>

      <Text mt="sm" c="dimmed" size="sm">
        {presentation.description}
      </Text>

      <Card.Section inheritPadding mt="sm" pb="md">
        <Button size="compact-xs" variant="transparent" justify="flex-end">
          <Link to={`/${presentation.id}/slides/${firstPage.id}`}>
            View presentation
          </Link>
        </Button>
      </Card.Section>
    </Card>
  );
}

function PresentationDeleteIcon({ id }: { id: string }) {
  const fetcher = useFetcher<never>();
  const isLoading = fetcher.state === "submitting";
  return (
    <>
      <fetcher.Form method="post">
        <input name="id" readOnly value={id} hidden />
        <ActionIcon
          type="submit"
          name="_action"
          value="delete"
          variant="subtle"
          color="red"
          disabled={isLoading}
        >
          <IconTrash style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </fetcher.Form>
    </>
  );
}
