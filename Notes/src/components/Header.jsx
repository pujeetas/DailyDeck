import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useUserStore from "../hooks/useUserStore";
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
        w-full h-14 
        bg-[#0E0E10] 
        border-b border-zinc-800 
        px-6 
        flex items-center justify-between
        text-zinc-200
      "
    >
      {/* Left */}
      <div className="text-sm font-medium text-zinc-300">
        Welcome {newUser?.name || "User"}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="hidden sm:block text-xs text-zinc-500">{today}</div>

        {/* Notification */}
        <button
          className="
            w-9 h-9 flex items-center justify-center 
            rounded-md
            text-zinc-400 hover:text-zinc-200 
            hover:bg-zinc-800 transition
          "
        >
          <BellOutlined />
        </button>

        {/* Profile */}
        <button
          className="
            w-9 h-9 flex items-center justify-center 
            rounded-md
            text-zinc-400 hover:text-zinc-200 
            hover:bg-zinc-800 transition
          "
        >
          <UserOutlined />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            w-9 h-9 flex items-center justify-center 
            rounded-md
            text-zinc-400 hover:text-zinc-200 
            hover:bg-zinc-800 transition
          "
        >
          <LogoutOutlined />
        </button>
      </div>
    </header>
  );
};

export default Header;
