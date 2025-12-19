export const mainMenuItems = [
  // 1. Core: Notes
  {
    id: "notes",
    name: "Notes",
    description: "Notion-style block editor with rich text",
    icon: "📝",
    path: "/notes",
    color: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/10 group-hover:border-indigo-500/20",
    bg: "group-hover:bg-indigo-500/5",
  },
  // 2. Core: Tasks
  {
    id: "todo",
    name: "Tasks",
    description: "Kanban board with GitHub Issue integration",
    icon: "📌",
    path: "/to-do",
    color: "text-rose-400",
    glow: "group-hover:shadow-rose-500/10 group-hover:border-rose-500/20",
    bg: "group-hover:bg-rose-500/5",
  },
  // 3. New: Mock Lab
  {
    id: "mocklab",
    name: "Mock Lab",
    description: "Generate fake JSON data for testing",
    icon: "🧪", // or 🎲
    path: "/json-mock",
    color: "text-pink-400", // "Playful" color for fake data
    glow: "group-hover:shadow-pink-500/10 group-hover:border-pink-500/20",
    bg: "group-hover:bg-pink-500/5",
  },
  // 4. New: Icon Vault
  {
    id: "icons",
    name: "Icon Vault",
    description: "Offline searchable library of SVG icons",
    icon: "💎",
    path: "/icons",
    color: "text-blue-400", // "Asset" blue (like VS Code file icons)
    glow: "group-hover:shadow-blue-500/10 group-hover:border-blue-500/20",
    bg: "group-hover:bg-blue-500/5",
  },
  // 5. Tooling: Dev Utils
  {
    id: "utils",
    name: "Dev Utils",
    description: "JSON, Regex, JWT & Timestamp tools",
    icon: "🛠️",
    path: "/utils",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/20",
    bg: "group-hover:bg-cyan-500/5",
  },
  // 6. News: Dev Pulse
  {
    id: "pulse",
    name: "Dev Pulse",
    description: "Live GitHub trends, Hacker News & updates",
    icon: "⚡",
    path: "/dev-pulse",
    color: "text-violet-400",
    glow: "group-hover:shadow-violet-500/10 group-hover:border-violet-500/20",
    bg: "group-hover:bg-violet-500/5",
  },
];
