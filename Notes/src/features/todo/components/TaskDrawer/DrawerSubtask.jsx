import { SubtaskSection } from "./SubtaskSection";

const DrawerSubtask = ({ taskForm, setTaskForm }) => {
  return (
    <div>
      <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
        Subtasks
      </label>
      <SubtaskSection taskForm={taskForm} setTaskForm={setTaskForm} />
    </div>
  );
};

export default DrawerSubtask;
