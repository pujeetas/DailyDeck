import { DraggableItem } from "../helper/DraggableItem";
import TaskCard from "./TaskCard";

export default function ColumnTasks({
  status,
  setTaskForm,
  setIsEditModalOpen,
  filtered,
}) {
  const tasks = filtered.filter((t) => t.status === status);
  return tasks.length === 0 ? (
    <p className="text-xs text-neutral-500 px-3 py-2">No tasks here yet.</p>
  ) : (
    <>
      {tasks.map((task) => (
        <DraggableItem key={task._id} id={task._id}>
          {({ dragHandleProps }) => (
            <TaskCard
              task={task}
              dragHandleProps={dragHandleProps}
              setTaskForm={setTaskForm}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          )}
        </DraggableItem>
      ))}
    </>
  );
}
