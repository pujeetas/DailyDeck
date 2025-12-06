import TaskCard from "./TaskCard";

export default function ColumnTasks({
  status,
  detailsList,
  setDetailsList,
  onToggleFocus,
  handleEditClick,
}) {
  const tasks = detailsList.filter((t) => t.status === status);

  return tasks.length === 0 ? (
    <p className="text-xs text-neutral-500 px-3 py-2">No tasks here yet.</p>
  ) : (
    tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onEdit={() => handleEditClick(task.id)}
        onToggleFocus={onToggleFocus}
      />
    ))
  );
}
