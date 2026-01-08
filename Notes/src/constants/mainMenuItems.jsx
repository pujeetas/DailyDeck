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
      "JSON toolkit for developers: Generate mock data with custom schemas, validate and format JSON instantly",
    icon: <Database className="w-full h-full" />,
    path: "/payload-lab",
    color: "text-emerald-400",
    accentColor: "border-emerald-500/20",
    bgGradient: "from-emerald-500/5 to-transparent",
  },
];
