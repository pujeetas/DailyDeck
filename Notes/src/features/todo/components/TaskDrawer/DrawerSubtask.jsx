import { SubtaskSection } from "./SubtaskSection";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const DrawerSubtask = ({ taskForm, setTaskForm }) => {
  return (
    <div>
      <label
        className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] mb-1.5 block"
        style={mono}
      >
        Subtasks
      </label>
      <SubtaskSection taskForm={taskForm} setTaskForm={setTaskForm} />
    </div>
  );
};

export default DrawerSubtask;
