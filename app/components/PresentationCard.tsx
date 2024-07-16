import { Link } from "@remix-run/react";

import { Card, Group, Button, Text } from "@mantine/core";
import { Presentation } from "~/data/presentations.server";
import { SerializeFrom } from "@remix-run/node";
import { DeleteIcon } from "./DeleteIcon";

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
          <DeleteIcon id={presentation.id} />
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
