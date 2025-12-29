import { Code2, Calendar, Database, Zap, Terminal } from "lucide-react";

export const mainMenuItems = [
  {
    id: "smart-notes",
    name: "Smart Notes",
    description:
      "Developer notes powered by RAG for intelligent search and context-aware retrieval",
    icon: <Code2 className="w-full h-full" />,
    path: "/notes",
    color: "text-cyan-400",
    accentColor: "border-cyan-500/20",
    bgGradient: "from-cyan-500/5 to-transparent",
  },
  {
    id: "planner",
    name: "Planner Pro",
    description:
      "Advanced todo management with calendar view and day-wise planning",
    icon: <Calendar className="w-full h-full" />,
    path: "/to-do",
    color: "text-blue-400",
    accentColor: "border-blue-500/20",
    bgGradient: "from-blue-500/5 to-transparent",
  },
  {
    id: "payloadLab",
    name: "Payload Lab",
    description:
      "Generate realistic fake JSON data for API testing and development workflows",
    icon: <Database className="w-full h-full" />,
    path: "/payload-lab",
    color: "text-emerald-400",
    accentColor: "border-emerald-500/20",
    bgGradient: "from-emerald-500/5 to-transparent",
  },

  // -------- Future / Placeholder Modules --------

  {
    id: "automation-hub",
    name: "Automation Hub",
    description:
      "Design and manage automated workflows for repetitive developer tasks",
    icon: <Zap className="w-full h-full" />,
    path: "/automation",
    color: "text-yellow-400",
    accentColor: "border-yellow-500/20",
    bgGradient: "from-yellow-500/5 to-transparent",
  },
  {
    id: "command-center",
    name: "Command Center",
    description: "Centralized access to reusable CLI commands and scripts",
    icon: <Terminal className="w-full h-full" />,
    path: "/commands",
    color: "text-slate-400",
    accentColor: "border-slate-500/20",
    bgGradient: "from-slate-500/5 to-transparent",
  },
];
