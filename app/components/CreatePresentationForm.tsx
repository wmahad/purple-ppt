import { useDisclosure } from "@mantine/hooks";

import { useEffect } from "react";
import useIsLoading from "~/hooks/useIsLoading";
import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Form } from "@remix-run/react";

const action = "/?index";

export function CreatePresentationForm() {
  const [opened, { open, close }] = useDisclosure(false);

  const isSubmiting = useIsLoading({ action });

  useEffect(() => {
    if (!isSubmiting) {
      close();
    }
  }, [close, isSubmiting]);

  return (
    <>
      <Button leftSection={<IconPlus stroke={4} size={14} />} onClick={open}>
        Presetation
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Create a new presentation"
        centered
      >
        <Form method="post" action={action}>
          <Stack>
            <TextInput label="Title" required name="title" />
            <Textarea label="Description" required name="description" />
            <Button
              type="submit"
              name="_action"
              value="create"
              variant="filled"
              color="indigo"
              fullWidth
            >
              Create presentation
            </Button>
          </Stack>
        </Form>
      </Modal>
    </>
  );
}
