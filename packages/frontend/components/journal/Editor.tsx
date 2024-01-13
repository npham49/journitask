"use client";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  lightDefaultTheme,
  darkDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useState } from "react";
import debounce from "just-debounce-it";
import Image from "next/image";
import { useTheme } from "next-themes";

const darkTheme = {
  ...darkDefaultTheme,
  colors: {
    ...darkDefaultTheme.colors,
    editor: {
      text: "#fafafa",
      background: "#0a0a0b",
    },
  },
};

const theme = {
  dark: darkTheme,
  light: lightDefaultTheme,
};

// Our <Editor> component we can reuse later
export default function Editor({
  initialContent,
}: Readonly<{ initialContent: any[] }>) {
  const [loading, setLoading] = useState(false);
  const { theme: appTheme } = useTheme();

  const saveContent = debounce(
    (editor: BlockNoteEditor) => {
      console.log(editor.topLevelBlocks);
      setLoading(false);
    },
    5000,
    true
  );

  const onEditorContentChange = (editor: BlockNoteEditor) => {
    setLoading(true);
    saveContent(editor);
  };

  // Creates an editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: initialContent,
    onEditorContentChange: onEditorContentChange,
  });

  // Renders the editor instance using a React component.
  return (
    <div className="border rounded-lg p-4">
      <div className="h-[30px]">
        {loading ? (
          <Image
            src="/loading.svg"
            alt="Loading"
            width={30}
            height={30}
            className="dark:invert"
          />
        ) : (
          <strong>Saved</strong>
        )}
      </div>
      <BlockNoteView
        editor={editor}
        theme={appTheme === "light" ? theme.light : theme.dark}
      />
    </div>
  );
}
