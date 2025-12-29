import { Bell, User, LogOut, Home } from "lucide-react";

import useUserStore from "../../hooks/useUserStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";

const Header = ({ color }) => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.CORS_ORIGIN}/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={`w-full h-16 px-6 ${
        color ? color : "bg-[#111113]"
      } border-b border-white/10 flex items-center justify-between backdrop-blur-lg sticky top-0 z-40 text-zinc-200`}
    >
      {/* LEFT */}
      <div className="flex gap-4 ">
        <button className="cursor-pointer" onClick={() => navigate("/main")}>
          <HomeFilled />
        </button>
        <div className="flex flex-col leading-tight min-w-fit">
          <span className="text-sm text-zinc-300 font-medium">
            Welcome {user.firstName}
          </span>
          <span className="text-[11px] text-zinc-500">{today}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1E1E22] transition">
          <Bell className="w-4 h-4" />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1E1E22] transition">
          <User className="w-4 h-4" />
        </button>

        <button
          onClick={handleLogout}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-400 hover:bg-[#1E1E22] transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
