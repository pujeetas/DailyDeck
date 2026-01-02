import useUserStore from "@/hooks/useUserStore";
import {
  CommentOutlined,
  LogoutOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { Activity, User, UserPen } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDropdownMenu = ({ handleLogout }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  function onMenuClick({ key }) {
    if (key === "3") {
      navigate("/profile-setting");
    }
    if (key === "7") handleLogout();
  }

  const userDropdownMenuItems = [
    {
      key: "1",
      label: <span className="font-medium text-black">{user.firstName}</span>,
      disabled: true,
    },
    {
      key: "2",
      label: <span className="text-xs text-zinc-700">{user.email}</span>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Profile Settings",
      icon: <UserPen size={12} />,
    },
    {
      key: "4",
      label: "Activity Log",
      icon: <Activity size={12} />,
    },
    {
      key: "5",
      label: "Dark Mode",
      icon: <SunOutlined />,
    },
    {
      key: "6",
      label: "Help & Feedback",
      icon: <CommentOutlined />,
    },
    {
      key: "7",
      label: "Log Out",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items: userDropdownMenuItems, onClick: onMenuClick }}>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1E1E22] transition">
          <User className="w-4 h-4"></User>
        </button>
      </Dropdown>
    </div>
  );
};

export default UserDropdownMenu;
