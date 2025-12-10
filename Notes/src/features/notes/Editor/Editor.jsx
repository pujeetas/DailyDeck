import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { codeBlockOptions } from "@blocknote/code-block";
import "@blocknote/react/style.css";
import { Divider } from "antd";
import { useState, useMemo, useEffect } from "react";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";

const schema = BlockNoteSchema.create().extend({
  blockSpecs: {
    codeBlock: createCodeBlockSpec(codeBlockOptions),
  },
});

const Editor = ({ value, onChange, onTitleChange, title, activeId }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(title || "");

  // Update local title when the active note changes
  useEffect(() => {
    setLocalTitle(title || "");
  }, [title, activeId]);

  // Memoize initial content to prevent recreation
  const initialContent = useMemo(() => {
    return value && value.length > 0
      ? value
      : [{ type: "paragraph", content: "" }];
  }, [activeId]); // Only recreate when activeId changes (new note selected)

  // Initialize editor with memoized content
  const editor = useCreateBlockNote({
    schema,
    initialContent,
  });

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    // Ensure we save the final title value
    if (localTitle !== title) {
      onTitleChange(localTitle);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1f1f1f] py-12 px-6">
      {/* Title */}
      <div className="w-full max-w-3xl mx-auto mb-2">
        {isEditingTitle ? (
          <input
            value={localTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
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
            {localTitle || <span className="text-gray-500">Untitled</span>}
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
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Editor;
