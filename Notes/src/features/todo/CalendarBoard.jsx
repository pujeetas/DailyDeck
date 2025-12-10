import React from "react";
import { Calendar, ConfigProvider, Flex, theme, Tooltip, App } from "antd";
import dayjs from "dayjs";
import useTodoStore from "./store/useTodoStore";
import { message } from "antd";
import { useEffect } from "react";

const CalendarBoard = ({
  setIsEditModalOpen,
  setTaskForm,
  setIsAddModalOpen,
}) => {
  const { message } = App.useApp();
  useEffect(() => {
    message.info("Tip: Double-click a date to add a new task", 4);
  }, []);

  const { detailsList } = useTodoStore();

  const getTasksForDate = (value) => {
    const currentCellDate = value.format("YYYY-MM-DD");

    return detailsList.filter(
      (task) => dayjs(task.dueDate).format("YYYY-MM-DD") === currentCellDate
    );
  };

  const handleToolTip = (id) => {
    const taskToEdit = detailsList.find((task) => task._id === id);

    if (taskToEdit) {
      setTaskForm({
        ...taskToEdit,
        subTask: taskToEdit.subTask || [],
      });
      setIsEditModalOpen(true);
    }
  };

  const handleDoubleClick = (value) => {
    setTaskForm({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      tech: [],
      subTask: [],
      dueDate: value.toISOString(),
    });

    setIsAddModalOpen(true);
  };

  const dateCellRender = (value) => {
    const dailyTasks = getTasksForDate(value);

    if (!dailyTasks || dailyTasks.length === 0) {
      return (
        <div
          className="h-full w-full"
          onDoubleClick={() => handleDoubleClick(value)}
        />
      );
    }

    return (
      <div className="relative mt-1">
        {/* tasks list */}
        <ul
          className="ml-2 p-0 list-none space-y-1"
          onDoubleClick={() => handleDoubleClick(value)}
        >
          {dailyTasks.map((task) => (
            <li key={task._id}>
              <Tooltip title={`${task.title} (${task.status})`}>
                <Flex
                  gap={2}
                  align="center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToolTip(task._id);
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      color:
                        task.priority === "high"
                          ? "#ef4444"
                          : task.priority === "medium"
                          ? "#facc15"
                          : "#22c55e",
                    }}
                  >
                    •
                  </span>

                  {task.title}
                </Flex>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4 bg-[#141414] rounded-xl border border-zinc-800 shadow-sm">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#6366f1",
          },
          components: {
            Calendar: {
              // 1. Transparent Backgrounds
              fullBg: "transparent",
              colorBgContainer: "transparent",

              // 2. Text Colors
              colorText: "#e4e4e7",
              colorTextDisabled: "#52525b",
              colorTextHeading: "#a1a1aa",

              // 3. Selected Day Styling
              controlItemBgActive: "#27272a",

              // 4. Cell Borders
              colorSplit: "#27272a",
            },
          },
        }}
      >
        <Calendar
          cellRender={dateCellRender}
          theme="dark"
          className="dark-calendar-override"
        />

        <div className="flex items-center gap-4 text-xs text-zinc-400 mt-3">
          <div className="flex items-center gap-1">
            <span className="text-red-500 text-base">•</span>
            High
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-base">•</span>
            Medium
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500 text-base">•</span>
            Low
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default CalendarBoard;
