import { TodoModel } from "../schema/todoSchema.js";
import { NotesModel } from "../schema/notesSchema.js";
import { createTodoValidations } from "../validation/todoValidations.js";
import { searchNotes } from "./mongoVectorService.js";

export const tools = [
  {
    name: "create_task",
    description:
      "Create a task on the user's to-do board. Use when the user wants to add, create, or track a new task.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "The task title" },
        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Task priority. Default to medium if not specified.",
        },
        description: {
          type: "string",
          description: "Optional longer description of the task",
        },
        dueDate: {
          type: "string",
          description: "Optional due date in ISO format (YYYY-MM-DD)",
        },
      },
      required: ["title"],
    },
  },
  {
    name: "search_notes",
    description:
      "Searches the user's notes by keyword or topic. Use when the user wants to find, look up, or search their notes.",
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
      "Generates a daily standup summary from the user's recently updated tasks. Use when the user asks for a standup, daily summary, or progress report.",
    input_schema: {
      type: "object",
      properties: {
        lookbackDays: {
          type: "number",
          description: "How many days back to look. Default to 1 if not specified.",
        },
      },
      required: [],
    },
  },
];

async function createTask(input, userId) {
  const { error, value } = createTodoValidations.validate({
    title: input.title,
    priority: input.priority || "medium",
    description: input.description || "",
    dueDate: input.dueDate || undefined,
    status: "backlog",
  });

  if (error) {
    return `Could not create task: ${error.details[0].message}`;
  }

  const task = await TodoModel.create({ userId, ...value });
  return `Task created: "${task.title}" (${task.priority || "no"} priority, id ${task._id}).`;
}

async function searchUserNotes(input, userId) {
  const query = input.query?.trim();
  if (!query) return "No search query provided.";

  let notes = [];
  try {
    const results = await searchNotes(query, 5, userId);
    if (results.ids.length > 0) {
      notes = await NotesModel.find({ _id: { $in: results.ids }, userId });
    }
  } catch (err) {
    console.error(
      "search_notes: vector search failed, falling back to title match:",
      err.message,
    );
  }

  if (notes.length === 0) {
    notes = await NotesModel.find({
      userId,
      title: { $regex: query, $options: "i" },
    }).limit(5);
  }

  if (notes.length === 0) return "No notes found matching that search.";
  return notes.map((n) => `• ${n.title || "Untitled"} (id ${n._id})`).join("\n");
}

async function generateStandup(input, userId) {
  const lookbackDays = Number(input.lookbackDays) > 0 ? Number(input.lookbackDays) : 1;
  const since = new Date();
  since.setDate(since.getDate() - lookbackDays);

  const tasks = await TodoModel.find({
    userId,
    updatedAt: { $gte: since },
  })
    .sort({ updatedAt: -1 })
    .limit(10);

  if (tasks.length === 0) return "No tasks updated in that time range.";
  return tasks
    .map(
      (t) =>
        `• [${t.status}] ${t.title}${t.priority ? ` (${t.priority} priority)` : ""}`,
    )
    .join("\n");
}

export async function executeTool(name, input, userId) {
  if (name === "create_task") return createTask(input, userId);
  if (name === "search_notes") return searchUserNotes(input, userId);
  if (name === "generate_standup") return generateStandup(input, userId);
  return `Unknown tool: ${name}`;
}
