import { Anthropic } from "@anthropic-ai/sdk";
import { tools, executeTool } from "../services/assistantTools.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT =
  "You are DailyDeck's assistant. You help the user manage tasks and notes by calling tools when appropriate. Be concise. When you take an action (creating a task, searching notes, generating a standup), summarize the result in plain language rather than repeating raw tool output verbatim.";

const MAX_TOOL_ROUNDS = 4;

export const chatWithAssistant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required and cannot be empty",
      });
    }

    const messages = Array.isArray(history)
      ? [...history, { role: "user", content: message }]
      : [{ role: "user", content: message }];

    const toolCalls = [];

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages,
      });

      messages.push({ role: "assistant", content: response.content });

      if (response.stop_reason !== "tool_use") {
        const textBlock = response.content.find((block) => block.type === "text");
        return res.status(200).json({
          reply: textBlock?.text || "",
          toolCalls,
          history: messages,
        });
      }

      const toolUseBlocks = response.content.filter(
        (block) => block.type === "tool_use",
      );
      const toolResults = [];

      for (const block of toolUseBlocks) {
        const result = await executeTool(block.name, block.input, userId);
        toolCalls.push({ name: block.name, input: block.input, result });
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: result,
        });
      }

      messages.push({ role: "user", content: toolResults });
    }

    return res.status(200).json({
      reply:
        "I took a few actions but hit my step limit for this turn — here's what I did so far.",
      toolCalls,
      history: messages,
    });
  } catch (error) {
    console.error("Error in chatWithAssistant:", error);
    res.status(500).json({
      error: "Internal server error: " + error.message,
    });
  }
};
