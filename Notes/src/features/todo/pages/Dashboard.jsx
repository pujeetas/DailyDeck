import { useEffect, useState } from "react";
import TaskDrawer from "../components/TaskDrawer/TaskDrawer";
import Header from "../components/BoardHeader";
import { KanbanColumn } from "../components/KanbanColumn";
import { KanbanStatuses } from "../data/kanbanStatuses";
import ColumnTasks from "../components/ColumnTask";
import useTodoStore from "../store/useTodoStore";

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "backlog",
    priority: "",
    subTask: [],
    tech: [],
    issueId: "",
    focused: false,
  });

  const { detailsList, loading, fetchAllTodo } = useTodoStore((state) => state);

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const getCount = (status) =>
    detailsList.filter((t) => t.status === status).length;

  function handleCreateBtn() {
    setTaskForm({
      title: "",
      description: "",
      status: "backlog",
      priority: "",
      subTask: [],
      tech: [],
      issueId: "",
      focused: false,
    });
    setIsAddModalOpen(true);
  }

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
      />

      <TaskDrawer
        open={isEditModalOpen}
        mode="edit"
        onClose={() => setIsEditModalOpen(false)}
        taskForm={taskForm}
        setTaskForm={setTaskForm}
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
                setTaskForm={setTaskForm}
                status={col.key}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            </KanbanColumn>
          ))}
        </div>
      </main>
    </div>
  );
}
