import { Link, useLocation } from "react-router-dom";
import {
  MenuOutlined,
  HomeOutlined,
  LineChartOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Star } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <MenuOutlined />, path: "/main", label: "Dashboard" },
    { icon: <HomeOutlined />, path: "/to-do", label: "Tasks" },
    { icon: <LineChartOutlined />, path: "/analytics", label: "Analytics" },
    {
      icon: <Star />,
      path: "/to-do/focus",
      label: "Focus List",
    },
  ];

  return (
    <aside
      className="
        h-screen w-20
        flex flex-col items-center
        py-6 gap-8
        bg-[#111113]
        border-r border-white/10
        text-zinc-400
        sticky left-0 top-0
        backdrop-blur-xl
      "
    >
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center gap-1 group"
          >
            {/* Active indicator */}
            {isActive && (
              <span
                className="
                  absolute -left-3
                  h-8 w-1.5 rounded-full
                  bg-indigo-500
                "
              />
            )}

            {/* Icon container */}
            <div
              className={`
                w-11 h-11 flex items-center justify-center 
                rounded-lg text-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#1E1E22] text-indigo-400"
                    : "text-zinc-500 group-hover:text-zinc-200 group-hover:bg-[#1E1E22]"
                }
              `}
            >
              {item.icon}
            </div>

            {/* Label (global friendly) */}
            <span
              className={`
                text-[11px] font-medium transition
                ${
                  isActive
                    ? "text-indigo-400"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }
              `}
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
