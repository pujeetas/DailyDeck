import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { connectDB } from "./src/database/database.js";
import { TodoModel } from "./src/schema/todoSchema.js";
import { NotesModel } from "./src/schema/notesSchema.js";
import mongoose from "mongoose";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

await connectDB();

const tools = [
  {
    name: "create_task",
    description: "Create a task. Use when user wants to add or create a task",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "The task title" },
        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Task priority. Default to medium if not specified",
        },
      },
      required: ["title"],
    },
  },
  {
    name: "search_notes",
    description:
      " Searches the user's notes by keyword. Use when user wants to find, look up or search their notes.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search keyword or phrase" },
      },
      required: ["query"],
    },
  },
  {
    name: "generate_standup",
    description:
      "Generates a daily standup summary from recent tasks and notes. Use when user asks for a standup, daily summary, or progress report.",
    input_schema: {
      type: "object",
      properties: {
        lookbackDays: {
          type: "number",
          description:
            "How many days back to look. Default to 1 if not specified.",
        },
      },
      required: ["lookbackDays"],
    },
  },
];
// ─── Step 3: The function that EXECUTES what Claude requests ──────────────────

async function executeTool(name, input) {
  if (name === "create_task") {
    const task = await TodoModel.create({
      title: input.title,
      priority: input.priority || "medium",
      description: input.description,
      dueDate: input.dueDate ? new Date(input.dueDate) : null,
      status: "backlog",
      userId: "test-user",
    });
    return `Task created: "${task.title}" with ID ${task._id}`;
  }
  if (name === "search_notes") {
    const notes = await NotesModel.find({
      $or: [{ title: { $regex: input.query, $options: "i" } }],
    }).limit(5);
    if (notes.length === 0) return "No notes found.";
    return notes.map((n) => `• ${n.title}`).join("\n");
  }
  if (name === "generate_standup") {
    const since = new Date();
    since.setDate(since.getDate() - input.lookbackDays);

    const tasks = await TodoModel.find({
      updatedAt: { $gte: since },
    }).limit(10);

    if (tasks.length === 0) return "No tasks found in that time range.";
    return tasks
      .map((t) => `• [${t.status}] ${t.title} (${t.priority} priority)`)
      .join("\n");
  }
}

const userMessage = "create a task called Fix login bug, high priority";

const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools: tools,
  messages: [
    {
      role: "user",
      content: userMessage,
    },
  ],
});

const block = response.content[0];

if (block.type === "tool_use") {
  console.log(`\n--- Executing tool: ${block.name} ---`);

  const toolResult = await executeTool(block.name, block.input);

  const finalResponse = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools,
    messages: [
      { role: "user", content: userMessage },
      { role: "assistant", content: response.content },
      {
        role: "user",

        content: [
          {
            type: "tool_result",
            tool_use_id: block.id,
            content: toolResult,
          },
        ],
      },
    ],
  });

  console.log("\n--- Claude's final answer ---");
  console.log(finalResponse.content[0].text);
}

await mongoose.disconnect();
