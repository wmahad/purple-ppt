import { Card } from "@mantine/core";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,

    // disable blocks you don't want
    audio: undefined as never,
    file: undefined as never,
    table: undefined as never,
  },
});

export default function AppPage() {
  const editor = useCreateBlockNote({ schema });

  return (
    <Card h="100%" shadow="xs" padding="lg" withBorder>
      <BlockNoteView editor={editor} />
    </Card>
  );
}
