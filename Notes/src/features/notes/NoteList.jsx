import useUserStore from "@/hooks/useUserStore";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import { PanelRightClose } from "lucide-react";

export default function NotesList({
  notes,
  activeId,
  onSelect,
  onDelete,
  onPin,
  onNew,
  setIsSidebarClose,
}) {
  const { user } = useUserStore();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-72 bg-[#262626] h-full p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-semibold text-gray-400 tracking-wider">
          NOTES
        </h3>

        <PanelRightClose
          size={16}
          className="cursor-pointer text-gray-400 hover:text-gray-200 transition"
          onClick={() => setIsSidebarClose(true)}
        />
      </div>

      <div className="flex flex-col leading-tight mb-6">
        <span className="text-sm text-zinc-300 font-medium">
          Welcome, {user?.firstName || "User"}
        </span>
        <span className="text-[11px] text-zinc-500">{today}</span>
      </div>

      {/* New Note Button */}
      <button
        onClick={onNew}
        className="cursor-pointer w-full bg-[#333333] text-gray-200 py-2 rounded-md text-sm 
        hover:bg-[#3f3f3f] transition-colors mb-4"
      >
        New Note
      </button>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        {notes.map((n, index) => {
          const isActive = activeId === n._id;
          const isPinned = n.pinned;

          return (
            <div
              key={n._id || n.id || index}
              onClick={() => onSelect(n._id)}
              className={`group p-3 rounded-md cursor-pointer transition-colors relative
                ${
                  isActive
                    ? "bg-[#3a3a3a]"
                    : "border border-transparent hover:bg-[#343434]"
                }
              `}
            >
              {/* Pinned indicator */}
              {isPinned && (
                <div className="absolute left-0 top-0 h-full w-1 bg-gray-400 rounded-l-md"></div>
              )}

              <div className="flex justify-between mb-1">
                <div className="font-medium text-gray-200 text-sm line-clamp-1">
                  {n.title || "Untitled"}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPin(n._id);
                  }}
                  className={`text-gray-500 hover:text-gray-300 transition
                    ${
                      isPinned
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }
                  `}
                >
                  <PushpinOutlined />
                </button>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-gray-400">{n.updatedAt}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(n._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 text-xs transition"
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
