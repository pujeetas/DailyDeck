import { Link, useLocation } from "react-router-dom";
import { LineChartOutlined } from "@ant-design/icons";
import { Book, Star } from "lucide-react";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <Book size={18} />, path: "/to-do", label: "Tasks" },
    {
      icon: <LineChartOutlined style={{ fontSize: 18 }} />,
      path: "/analytics",
      label: "Analytics",
    },
    { icon: <Star size={18} />, path: "/to-do/focus", label: "Focus" },
  ];

  return (
    <aside className="h-screen w-[72px] flex flex-col items-center py-6 gap-6 bg-[#0a0a08] border-r border-zinc-800/50 text-zinc-500 sticky left-0 top-0">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center gap-1 group"
          >
            {isActive && (
              <span className="absolute -left-[14px] top-1 h-7 w-[2px] bg-amber-500" />
            )}

            <div
              className={`w-10 h-10 flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-zinc-800/50 text-amber-500"
                  : "text-zinc-600 group-hover:text-zinc-300 group-hover:bg-zinc-800/30"
              }`}
            >
              {item.icon}
            </div>

            <span
              className={`text-[9px] tracking-wider uppercase transition-colors ${
                isActive
                  ? "text-amber-500"
                  : "text-zinc-700 group-hover:text-zinc-400"
              }`}
              style={mono}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
