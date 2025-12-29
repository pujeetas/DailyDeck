import { message } from "antd";
import useTodoStore from "../store/useTodoStore";

export async function handleDragEnd(event) {
  const { updateTodo } = useTodoStore.getState();

  const { active, over } = event;
  if (!over) {
    return;
  }
  if (active.id === over.id) {
    return;
  }
  try {
    await updateTodo(active.id, { status: over.id });
  } catch (error) {
    return message.error("Failed to move task");
  }
}
