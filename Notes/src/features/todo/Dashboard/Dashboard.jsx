import { useEffect, useState } from "react";
import Done from "../Column/Done";
import InProgress from "../Column/InProgress";
import Todo from "../Column/Todo";
import TaskDrawer from "../cards/TaskDrawer";
import Header from "./Header";

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
    status: "",
    dueDate: "",
    priority: "",
    subTask: [],
  });

  useEffect(() => {
    const json = JSON.stringify(detailsList);
    localStorage.setItem("list", json);
  }, [detailsList]);

  const handleEditClick = (id) => {
    const taskToEdit = detailsList.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskForm(taskToEdit);
      setIsEditModalOpen(true);
    }
  };

  function handleCreateBtn() {
    setTaskForm({
      id: "",
      title: "",
      createdAt: "",
      subtitle: "",
      description: "",
      category: "",
      status: "",
      dueDate: "",
      priority: "",
      subTask: [],
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

  return (
    <div className="min-h-screen bg-[#0E0E10] text-zinc-200 flex">
      <div className="flex-1 flex flex-col px-8">
        {/* Header */}
        <Header onCreateTask={handleCreateBtn} />

        {/* Main Board */}
        <main className="flex-1 overflow-auto p-6">
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

          <div className="space-y-6">
            {/* Columns */}
            <div className="flex gap-6 overflow-x-auto pb-6 min-w-full md:min-w-[900px]">
              {/* Column */}
              <section className="-0 w-[280px] md:w-[300px] lg:w-[320px] bg-[#111113] rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    Backlog (
                    {detailsList.filter((t) => t.status === "todo").length})
                  </h3>
                </div>

                {/* backlog */}
                <div className="space-y-3">
                  <Todo
                    detailsList={detailsList}
                    setDetailsList={setDetailsList}
                    handleEditClick={handleEditClick}
                  />
                </div>
              </section>

              {/* In Progress */}
              <section className="flex-shrink-0 w-[320px] bg-[#111113] rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    In Progress (
                    {detailsList.filter((t) => t.status === "progress").length})
                  </h3>
                </div>

                <div className="space-y-3">
                  <InProgress
                    detailsList={detailsList}
                    setDetailsList={setDetailsList}
                    handleEditClick={handleEditClick}
                  />
                </div>
              </section>

              {/* Column: Review */}
              <section className="flex-shrink-0 w-[320px] bg-[#111113] rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    Review (
                    {detailsList.filter((t) => t.status === "review").length})
                  </h3>
                </div>

                <div className="space-y-3">
                  <InProgress
                    detailsList={detailsList}
                    setDetailsList={setDetailsList}
                    handleEditClick={handleEditClick}
                    reviewMode={true} // optional, if you want to adjust styling
                  />
                </div>
              </section>

              {/* Done */}
              <section className="flex-shrink-0 w-[320px] bg-[#111113] rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm flex items-center gap-2 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Done (
                    {detailsList.filter((t) => t.status === "done").length})
                  </h3>
                </div>

                <div className="space-y-3">
                  <Done
                    detailsList={detailsList}
                    setDetailsList={setDetailsList}
                    handleEditClick={handleEditClick}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
