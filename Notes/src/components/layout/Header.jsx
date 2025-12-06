import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useUserStore from "../../hooks/useUserStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const newUser = useUserStore((state) => state.newUser);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="
        w-full h-16 px-6
        bg-[#111113] 
        border-b border-white/10
        flex items-center justify-between
        backdrop-blur-lg
        sticky top-0 z-40
        text-zinc-200
      "
    >
      {/* LEFT: Welcome */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-zinc-300 font-medium">
          Welcome, {newUser?.name || "User"}
        </span>
        <span className="text-[11px] text-zinc-500">{today}</span>
      </div>

      {/* CENTER: Search */}
      <div className="hidden sm:flex items-center w-full max-w-md relative">
        <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
        <input
          placeholder="Search…"
          className="
            w-full pl-10 pr-3 py-2
            rounded-lg 
            bg-[#18181C]
            border border-white/10
            text-sm text-zinc-200
            placeholder:text-zinc-500
            outline-none
            focus:border-indigo-500
            transition
          "
        />
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          className="
            w-9 h-9 flex items-center justify-center 
            rounded-lg
            text-zinc-400 hover:text-zinc-200 
            hover:bg-[#1E1E22] transition
          "
        >
          <BellOutlined />
        </button>

        {/* Profile */}
        <button
          className="
            w-9 h-9 flex items-center justify-center 
            rounded-lg
            text-zinc-400 hover:text-zinc-200 
            hover:bg-[#1E1E22] transition
          "
        >
          <UserOutlined />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            w-9 h-9 flex items-center justify-center 
            rounded-lg
            text-zinc-400 hover:text-red-400 
            hover:bg-[#1E1E22] transition
          "
        >
          <LogoutOutlined />
        </button>
      </div>
    </header>
  );
};

export default Header;
