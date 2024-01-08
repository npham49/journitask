"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { use, useEffect, useState } from "react";

// Our <Editor> component we can reuse later
export default function Editor({ initialContent }: { initialContent: any[] }) {
  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState<any[] | null>([]);

  // Creates an editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: initialContent,
    onEditorContentChange: (editor) =>
      // Converts the editor's contents to an array of Block objects.
      setBlocks(editor.topLevelBlocks),
  });

  useEffect(() => {
    console.log(blocks);
  }, [blocks]);

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={"dark"} />;
}
