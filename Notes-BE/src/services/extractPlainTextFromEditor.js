function extractPlainTextFromBlockNote(blocks) {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (!Array.isArray(block.content)) return "";

      return block.content
        .map((item) => {
          const text = item.text || "";
          // Remove /ask commands
          if (text.trim().startsWith("/ask")) {
            return "";
          }
          return text;
        })
        .filter(Boolean)
        .join(" ");
    })
    .filter(Boolean)
    .join("\n");
}
module.exports = { extractPlainTextFromBlockNote };
