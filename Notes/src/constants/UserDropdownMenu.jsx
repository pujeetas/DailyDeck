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

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const UserDropdownMenu = ({ handleLogout }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  function onMenuClick({ key }) {
    if (key === "3") navigate("/profile-setting");
    if (key === "7") handleLogout();
  }

  const userDropdownMenuItems = [
    {
      key: "1",
      label: (
        <span className="font-medium text-zinc-200 text-[13px]" style={mono}>
          {user.firstName}
        </span>
      ),
      disabled: true,
    },
    {
      key: "2",
      label: (
        <span className="text-[11px] text-zinc-600" style={mono}>
          {user.email}
        </span>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "3",
      label: <span style={mono}>Profile Settings</span>,
      icon: <UserPen size={12} />,
    },
    {
      key: "4",
      label: <span style={mono}>Activity Log</span>,
      icon: <Activity size={12} />,
    },
    {
      key: "5",
      label: <span style={mono}>Dark Mode</span>,
      icon: <SunOutlined />,
    },
    {
      key: "6",
      label: <span style={mono}>Help & Feedback</span>,
      icon: <CommentOutlined />,
    },
    {
      key: "7",
      label: <span style={mono}>Log Out</span>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Dropdown
      menu={{ items: userDropdownMenuItems, onClick: onMenuClick }}
      overlayClassName="dailydeck-dropdown"
    >
      <button className="cursor-pointer w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-amber-500 hover:bg-zinc-800/50 transition-all">
        <User className="w-3.5 h-3.5" />
      </button>
    </Dropdown>
  );
};

export default UserDropdownMenu;
