import { useDroppable } from "@dnd-kit/core";

export function DroppableArea({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`transition-colors duration-200 rounded-lg ${
        isOver ? "bg-blue-500/5 ring-2 ring-blue-500/30" : ""
      }`}
    >
      {children}
    </div>
  );
}
