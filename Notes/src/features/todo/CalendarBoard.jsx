import React, { useEffect } from "react";
import { Calendar, ConfigProvider, Flex, theme, Tooltip, App } from "antd";
import dayjs from "dayjs";
import useTodoStore from "./store/useTodoStore";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const CalendarBoard = ({
  setIsEditModalOpen,
  setTaskForm,
  setIsAddModalOpen,
}) => {
  const { message } = App.useApp();

  useEffect(() => {
    message.info("Double-click a date to add a new task", 4);
  }, []);

  const { detailsList } = useTodoStore();

  const getTasksForDate = (value) => {
    const currentCellDate = value.format("YYYY-MM-DD");
    return detailsList.filter(
      (task) => dayjs(task.dueDate).format("YYYY-MM-DD") === currentCellDate,
    );
  };

  const handleToolTip = (id) => {
    const taskToEdit = detailsList.find((task) => task._id === id);
    if (taskToEdit) {
      setTaskForm({ ...taskToEdit, subTask: taskToEdit.subTask || [] });
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
        <ul
          className="ml-1 p-0 list-none space-y-0.5"
          onDoubleClick={() => handleDoubleClick(value)}
        >
          {dailyTasks.map((task) => (
            <li key={task._id}>
              <Tooltip title={`${task.title} (${task.status})`}>
                <Flex
                  gap={4}
                  align="center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToolTip(task._id);
                  }}
                  className="cursor-pointer hover:bg-zinc-800/40 px-1 py-0.5 transition-colors"
                >
                  <span
                    className="w-1.5 h-1.5 shrink-0"
                    style={{
                      backgroundColor:
                        task.priority === "high"
                          ? "#ef4444"
                          : task.priority === "medium"
                            ? "#f59e0b"
                            : "#22c55e",
                    }}
                  />
                  <span
                    className="text-[11px] text-zinc-400 truncate"
                    style={mono}
                  >
                    {task.title}
                  </span>
                </Flex>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="mx-6 md:mx-10 mb-6 bg-[#0c0c0a] border border-zinc-800/60 p-4 relative z-10">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#f59e0b",
            borderRadius: 0,
            fontFamily: "'JetBrains Mono', monospace",
          },
          components: {
            Calendar: {
              fullBg: "transparent",
              colorBgContainer: "transparent",
              colorText: "#d4d4d8",
              colorTextDisabled: "#3f3f46",
              colorTextHeading: "#71717a",
              controlItemBgActive: "#1c1c1a",
              colorSplit: "#27272a50",
            },
          },
        }}
      >
        <Calendar
          cellRender={dateCellRender}
          theme="dark"
          className="dark-calendar-override"
        />

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3 pt-3 border-t border-zinc-800/40">
          {[
            { label: "High", color: "#ef4444" },
            { label: "Medium", color: "#f59e0b" },
            { label: "Low", color: "#22c55e" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-zinc-600" style={mono}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </ConfigProvider>
    </div>
  );
};

export default CalendarBoard;
