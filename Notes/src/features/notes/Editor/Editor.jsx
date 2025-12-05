import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorSelectionChange } from "@blocknote/react";
import { codeBlockOptions } from "@blocknote/code-block";
import "@blocknote/react/style.css";
import { Divider } from "antd";
import { useState } from "react";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";
import { useEffect } from "react";

const Editor = ({ value, onChange, onTitleChange, title, activeId }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const codeSchemaRef = BlockNoteSchema.create().extend({
    blockSpecs: {
      codeBlock: createCodeBlockSpec(codeBlockOptions),
    },
  });

  const editor = useCreateBlockNote({
    initialContent: !value ? [{ type: "paragraph", content: "" }] : value,
    codeSchema: codeSchemaRef,
  });

  useEffect(() => {
    if (!value || !editor) return;

    editor.replaceBlocks(editor.document, value);
  }, [value, activeId]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1f1f1f] py-12 px-6">
      {/* Title */}
      <div className="w-full max-w-3xl mx-auto mb-2">
        {isEditingTitle ? (
          <input
            defaultValue={title}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
            placeholder="Untitled"
            className="w-full bg-transparent text-gray-200 text-4xl font-bold 
            outline-none border-none placeholder:text-gray-500"
          />
        ) : (
          <div
            onClick={() => setIsEditingTitle(true)}
            className="text-gray-200 text-4xl font-bold cursor-text hover:text-white transition"
          >
            {title || <span className="text-gray-500">Untitled</span>}
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl mb-4">
        <Divider style={{ borderColor: "#333333" }} />
      </div>

      {/* BlockNote Editor */}
      <div className="w-full max-w-3xl bg-[#262626] rounded-xl">
        <BlockNoteView
          editor={editor}
          onChange={() => {
            onChange({ body: editor.document });
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
