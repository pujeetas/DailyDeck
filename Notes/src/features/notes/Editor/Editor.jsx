import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { codeBlockOptions } from "@blocknote/code-block";
import "@blocknote/react/style.css";
import { Divider, Typography } from "antd";
import { useState } from "react";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";

const Editor = ({ value, onChange, onTitleChange, title }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const initialContent = (() => {
    if (!value) return [{ type: "paragraph", content: "" }];
    return value || [{ type: "paragraph", content: "" }];
  })();

  const codeSchema = BlockNoteSchema.create().extend({
    blockSpecs: {
      codeBlock: createCodeBlockSpec(codeBlockOptions),
    },
  });

  const editor = useCreateBlockNote({ initialContent, codeSchema });

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1f1f1f] py-12 px-6">
      <div className="w-full max-w-3xl mx-auto mb-2">
        {isEditingTitle ? (
          <input
            value={title}
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

      <div className="w-full max-w-3xl bg-[#262626] rounded-xl">
        <BlockNoteView
          editor={editor}
          onChange={() => onChange(editor.document)}
        />
      </div>
    </div>
  );
};

export default Editor;
