import { Card } from "@mantine/core";

import "@blocknote/core/fonts/inter.css";
import {
  PartialBlock,
  BlockNoteSchema,
  defaultBlockSpecs,
  BlockNoteEditor,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";
import { uploadFile } from "~/utils";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,

    // disable blocks you don't want
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    audio: undefined as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file: undefined as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: undefined as any,
  },
});

export default function Editor({
  initialContent = "loading",
  onChange,
  editable = true,
}: {
  editable?: boolean;
  initialContent?: PartialBlock[] | "loading";
  onChange?: (blocks: string) => void;
}) {
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent: initialContent.length ? initialContent : undefined,
      schema,
      uploadFile,
    });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <Card h="100%" shadow="xs" padding="lg" withBorder>
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => {
          onChange?.(JSON.stringify(editor.document));
        }}
        editable={editable}
      />
    </Card>
  );
}
