import { DraggableItem } from "../helper/DraggableItem";
import TaskCard from "./TaskCard";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

export default function ColumnTasks({
  status,
  setTaskForm,
  setIsEditModalOpen,
  filtered,
}) {
  const tasks = filtered.filter((t) => t.status === status);

  return tasks.length === 0 ? (
    <p className="text-[11px] text-zinc-700 px-3 py-2" style={mono}>
      No tasks yet.
    </p>
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
