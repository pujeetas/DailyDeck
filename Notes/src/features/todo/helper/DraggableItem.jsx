import { useDraggable } from "@dnd-kit/core";
import { useMemo } from "react";

export function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = useMemo(
    () => ({
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      opacity: isDragging ? 0.5 : 1,
    }),
    [transform, isDragging]
  );

  const dragHandleProps = useMemo(
    () => ({ ...listeners, ...attributes }),
    [listeners, attributes]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="overflow-visible select-none touch-none"
    >
      {children({ dragHandleProps })}
    </div>
  );
}
