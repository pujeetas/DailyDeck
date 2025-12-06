import { useEffect, useState } from "react";
import TaskDrawer from "../components/TaskDrawer/TaskDrawer";
import Header from "../components/BoardHeader";
import { KanbanColumn } from "../components/KanbanColumn";
import { KanbanStatuses } from "../data/kanbanStatuses";
import ColumnTasks from "../components/ColumnTask";
import { message } from "antd";

export default function Dashboard({ detailsList, setDetailsList }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    id: "",
    title: "",
    subtitle: "",
    createdAt: "",
    description: "",
    category: "",
    status: "todo",
    dueDate: "",
    priority: "",
    subTask: [],
    tech: [],
    issueId: "",
  });

  useEffect(() => {
    const json = JSON.stringify(detailsList);
    localStorage.setItem("list", json);
  }, [detailsList]);

  const handleEditClick = (id) => {
    const taskToEdit = detailsList.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskForm({
        ...taskToEdit,
        subTask: taskToEdit.subTask || [],
      });
      setIsEditModalOpen(true);
    }
  };

  function handleCreateBtn() {
    setTaskForm({
      id: "",
      title: "",
      subtitle: "",
      createdAt: "",
      description: "",
      category: "",
      status: "todo",
      dueDate: "",
      priority: "",
      subTask: [],
      tech: [],
      issueId: "",
    });
    setIsAddModalOpen(true);
  }

  function handleCreateTask() {
    const newTask = {
      ...taskForm,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setDetailsList((prev) => [newTask, ...prev]);
    setIsAddModalOpen(false);
  }

  function handleUpdateTask() {
    setDetailsList((prev) =>
      prev.map((task) => (task.id === taskForm.id ? taskForm : task))
    );
    setIsEditModalOpen(false);
  }

  const getCount = (status) =>
    detailsList.filter((t) => t.status === status).length;

  const onToggleFocus = (id) => {
    setDetailsList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isFocus: !task.isFocus } : task
      )
    );
    const isNowFocused = !detailsList.find((t) => t.id === id)?.isFocus;

    if (isNowFocused) {
      message.success("Added to Focus List");
    } else {
      message.info("Removed from Focus List");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] text-neutral-200 selection:bg-neutral-500/30">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))",
        }}
      />

      {/* Header */}
      <div className="relative z-10">
        <Header onCreateTask={handleCreateBtn} />
      </div>

      {/* Drawers */}
      <TaskDrawer
        open={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
        taskForm={taskForm}
        setTaskForm={setTaskForm}
        onSubmit={handleCreateTask}
      />

      <TaskDrawer
        open={isEditModalOpen}
        mode="edit"
        onClose={() => setIsEditModalOpen(false)}
        taskForm={taskForm}
        setTaskForm={setTaskForm}
        onSubmit={handleUpdateTask}
      />

      {/* Main Board */}
      <main className="flex-1 pt-6 px-6 pb-6 overflow-x-hidden">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {KanbanStatuses.map((col) => (
            <KanbanColumn
              key={col.key}
              colorDot={col.color}
              title={col.label}
              count={getCount(col.key)}
            >
              <ColumnTasks
                onToggleFocus={onToggleFocus}
                status={col.key}
                detailsList={detailsList}
                setDetailsList={setDetailsList}
                handleEditClick={handleEditClick}
              />
            </KanbanColumn>
          ))}
        </div>
      </main>
    </div>
  );
}
