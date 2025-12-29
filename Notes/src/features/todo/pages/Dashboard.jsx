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
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { DroppableArea } from "../helper/DroppableArea";
import { handleDragEnd } from "../helper/handleDragEnd";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "backlog",
    priority: "",
    subTask: [],
    tech: [],
    issueId: "",
    focused: false,
    gitURL: "",
  });
  const [activeFilter, setActiveFilter] = useState("All");

  const { detailsList, fetchAllTodo } = useTodoStore((state) => state);
  const [view, setView] = useState("board");

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const filtered = filterLogic(activeFilter, detailsList || []);

  const getCount = (status) => {
    if (!Array.isArray(filtered)) return 0;
    return filtered.filter((t) => t.status === status).length;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = filtered.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  const onDragEnd = (event) => {
    handleDragEnd(event);
    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

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
      gitURL: "",
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

        <BoardHeader
          onCreateTask={handleCreateBtn}
          view={view}
          setView={setView}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

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

        {view === "board" ? (
          <main className="flex-1 pt-6 px-6 pb-6 overflow-x-auto relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full min-w-max">
              <DndContext
                onDragStart={handleDragStart}
                onDragEnd={onDragEnd}
                onDragCancel={handleDragCancel}
              >
                {KanbanStatuses.map((col) => (
                  <DroppableArea id={col.key} key={col.key}>
                    <KanbanColumn
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
                  </DroppableArea>
                ))}

                <DragOverlay dropAnimation={null}>
                  {activeTask ? (
                    <div className=" cursor-grabbing pointer-events-none">
                      <TaskCard
                        task={activeTask}
                        dragHandleProps={{}}
                        setTaskForm={setTaskForm}
                        setIsEditModalOpen={setIsEditModalOpen}
                      />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
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
