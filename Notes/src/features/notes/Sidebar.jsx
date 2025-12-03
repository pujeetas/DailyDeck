import NotesList from "./NoteList";

export default function Sidebar({
  isSidebarClose,
  setIsSidebarClose,
  onNew,
  notes,
  activeId,
  onSelect,
  onDelete,
  onPin,
}) {
  return (
    <aside className="w-72 bg-[#262626] h-full border-r border-[#333333] flex flex-col">
      <NotesList
        notes={notes}
        activeId={activeId}
        onSelect={onSelect}
        onDelete={onDelete}
        onPin={onPin}
        onNew={onNew}
        setIsSidebarClose={setIsSidebarClose}
      />
    </aside>
  );
}
