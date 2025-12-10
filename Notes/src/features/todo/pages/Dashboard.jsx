import { useEffect, useState } from "react";
import TaskDrawer from "../components/TaskDrawer/TaskDrawer";
import { KanbanColumn } from "../components/KanbanColumn";
import { KanbanStatuses } from "../data/kanbanStatuses";
import ColumnTasks from "../components/ColumnTask";
import useTodoStore from "../store/useTodoStore";
import BoardHeader from "../components/BoardHeader";
import CalendarBoard from "../CalendarBoard";
import { App as AntApp } from "antd";
import { filterLogic } from "../helper/filterLogic";

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
  const [activeFilter, setActiveFilter] = useState(null);

  const { detailsList, loading, fetchAllTodo } = useTodoStore((state) => state);

  const [view, setView] = useState("board");

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const filtered = filterLogic(activeFilter, detailsList);
  console.log(filtered);

  const getCount = (status) =>
    filtered.filter((t) => t.status === status).length;

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
    <AntApp>
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
          <BoardHeader
            onCreateTask={handleCreateBtn}
            view={view}
            setView={setView}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
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

        {/* Board View*/}
        {view === "board" ? (
          <main className="flex-1 pt-6 px-6 pb-6 overflow-x-hidden">
            <div className="grid md:grid-ls-2 lg:grid-cols-4 gap-6 w-full">
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
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    isEditModalOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    filtered={filtered}
                  />
                </KanbanColumn>
              ))}
            </div>
          </main>
        ) : (
          <CalendarBoard
            setIsEditModalOpen={setIsEditModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            isEditModalOpen={isEditModalOpen}
            isAddModalOpen={isAddModalOpen}
            taskForm={taskForm}
            setTaskForm={setTaskForm}
          />
        )}
      </div>
    </AntApp>
  );
}
