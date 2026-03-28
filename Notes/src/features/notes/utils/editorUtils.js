// editorUtils.js
export const handleQues = (editor) => {
  const cursorPosition = editor.getTextCursorPosition();
  const currentBlock = cursorPosition.block;

  if (!currentBlock.content || !currentBlock.content[0]) {
    return { showBtn: false, question: "" };
  }

  const textContent = currentBlock.content[0].text;

  if (!textContent.trim().startsWith("/ask")) {
    return { showBtn: false, question: "" };
  }

  const question = textContent.replace(/^\/ask\s*/i, "").trim();
  return { showBtn: true, question };
};
