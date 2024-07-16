import { useFetcher } from "@remix-run/react";
import { IconTrash } from "@tabler/icons-react";

import { ActionIcon, rem } from "@mantine/core";

export function DeleteIcon({ id }: { id: string }) {
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
