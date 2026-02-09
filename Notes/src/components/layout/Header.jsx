import { Bell, LogOut } from "lucide-react";
import { HomeFilled } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore";
import UserDropdownMenu from "@/constants/UserDropdownMenu";
import { ConfigProvider, theme } from "antd";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const Header = ({ color, border, margin, padding }) => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const iconBtn =
    "cursor-pointer w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:bg-zinc-800/50 transition-all";

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgElevated: "#0e0e0c",
          colorBgContainer: "#0a0a08",
          colorText: "#e4e4e7",
          colorTextSecondary: "#71717a",
          colorBorder: "#27272a",
          borderRadius: 0,
        },
      }}
    >
      <header
        className={`w-full h-14 ${padding || "px-6 md:px-10"} ${
          color || "bg-[#0a0a08]/90 backdrop-blur-md"
        } ${border || "border-b border-zinc-800/50"} ${
          margin || ""
        } flex items-center justify-between sticky top-0 z-40 text-zinc-200`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <button
            className="cursor-pointer text-zinc-500 hover:text-amber-500 transition-colors"
            onClick={() => navigate("/main")}
          >
            <HomeFilled />
          </button>

          <div className="w-px h-4 bg-zinc-800" />

          <div className="flex items-baseline gap-3">
            <span
              className="text-[13px] font-medium text-zinc-300"
              style={mono}
            >
              {user.firstName}
            </span>
            <span
              className="text-[12px] text-zinc-400 tracking-wide"
              style={mono}
            >
              {today}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1">
          <button className={iconBtn}>
            <Bell className="w-3.5 h-3.5" />
          </button>

          <UserDropdownMenu handleLogout={handleLogout} />

          <button
            onClick={handleLogout}
            className="cursor-pointer w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
