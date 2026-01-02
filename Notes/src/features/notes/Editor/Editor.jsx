import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { codeBlockOptions } from "@blocknote/code-block";
import "@blocknote/react/style.css";
import { Divider } from "antd";
import { useState, useMemo, useEffect, useCallback } from "react";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";
import { QuestionCircleOutlined } from "@ant-design/icons";

const schema = BlockNoteSchema.create().extend({
  blockSpecs: {
    codeBlock: createCodeBlockSpec(codeBlockOptions),
  },
});

const Editor = ({
  value,
  onChange,
  onTitleChange,
  title,
  activeId,
  onAskQuestion,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(title || "");
  const [askAIBtn, setAskAIBtn] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  // Update local title when the active note changes
  useEffect(() => {
    setLocalTitle(title || "");
  }, [title, activeId]);

  // Memoize initial content to prevent recreation
  const initialContent = useMemo(() => {
    return value && value.length > 0
      ? value
      : [{ type: "paragraph", content: "" }];
  }, [activeId]);

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
    if (localTitle !== title) {
      onTitleChange(localTitle);
    }
  };

  const handleQues = (editor) => {
    const cursorPosition = editor.getTextCursorPosition();
    const currentBlock = cursorPosition.block;

    if (!currentBlock.content || !currentBlock.content[0]) {
      setAskAIBtn(false);
      setCurrentQuestion("");
      return;
    }

    const textContent = currentBlock.content[0].text;

    if (!textContent.trim().startsWith("/ask")) {
      setAskAIBtn(false);
      setCurrentQuestion("");
      return;
    }

    const question = textContent.replace(/^\/ask\s*/i, "").trim();

    if (!question) {
      setAskAIBtn(true);
      setCurrentQuestion("");
      return;
    }

    setAskAIBtn(true);
    setCurrentQuestion(question);
  };

  const handleRagQues = useCallback(async () => {
    if (!currentQuestion || !currentQuestion.trim()) {
      console.warn("No question to send");
      return;
    }

    try {
      // Call the question API
      await onAskQuestion(currentQuestion);

      // Reset states
      setAskAIBtn(false);
      setCurrentQuestion("");
    } catch (error) {
      console.error("Error sending question:", error);
      // Optionally show error to user
      alert("Failed to send question. Please try again.");
    }
  }, [currentQuestion, onAskQuestion, editor]);

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
      <div className="relative w-full max-w-3xl bg-[#262626] rounded-xl">
        <BlockNoteView
          editor={editor}
          onChange={() => {
            handleQues(editor);
            onChange({ body: editor.document });
          }}
          theme="dark"
        />

        {/* Floating Ask Button */}
        {askAIBtn && (
          <div className="absolute bottom-4 right-4 z-10">
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#3b82f6] text-white text-sm rounded-md whitespace-nowrap shadow-lg">
                  Ask your notes
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#3b82f6]" />
                </div>
              )}

              {/* Button */}
              <button
                onClick={handleRagQues}
                disabled={!currentQuestion}
                className={`w-10 h-10 ${
                  currentQuestion
                    ? "bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                    : "bg-[#333333] text-gray-500 cursor-not-allowed"
                } rounded-full 
                flex items-center justify-center transition-all duration-200 shadow-lg 
                ${
                  currentQuestion
                    ? "hover:shadow-xl hover:scale-110 active:scale-95"
                    : ""
                } 
                border ${
                  currentQuestion ? "border-[#3b82f6]" : "border-[#404040]"
                }`}
              >
                <QuestionCircleOutlined className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
