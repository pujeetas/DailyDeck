import { Link, useLocation } from "react-router-dom";
import {
  MenuOutlined,
  HomeOutlined,
  LineChartOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <MenuOutlined />, path: "/main" },
    { icon: <HomeOutlined />, path: "/to-do" },
    { icon: <LineChartOutlined />, path: "/analytics" },
    { icon: <TagsOutlined />, path: "/to-do/taskcentral" },
  ];

  return (
    <aside
      className="
        w-16 h-screen
        flex flex-col items-center gap-6
        py-6
        bg-[#0E0E10]
        border-r border-zinc-800
      "
    >
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={idx}
            to={item.path}
            className="relative w-10 h-10 flex items-center justify-center"
          >
            {/* Active Indicator */}
            {isActive && (
              <span
                className="
                  absolute -left-3 top-1/2 -translate-y-1/2
                  h-6 w-1.5
                  bg-zinc-300 rounded-full
                "
              />
            )}

            {/* Icon */}
            <div
              className={`
                w-10 h-10 flex items-center justify-center
                rounded-lg text-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                }
              `}
            >
              {item.icon}
            </div>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
