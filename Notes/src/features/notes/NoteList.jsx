import useUserStore from "@/hooks/useUserStore";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import { ArrowLeft, PanelRightClose, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { ROUTES, UI_TEXT } from "@/config/constants";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { searchNotesRequest } from "./services/notesService";

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
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [],
  );
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [searchResultIds, setSearchResultIds] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const runSearch = useMemo(
    () =>
      debounce(async (q) => {
        try {
          const res = await searchNotesRequest(q);
          setSearchResultIds(res.data.notes.map((n) => n._id));
        } catch (error) {
          console.error("Error searching notes:", error);
          setSearchResultIds([]);
        } finally {
          setIsSearching(false);
        }
      }, 350),
    [],
  );

  useEffect(() => {
    return () => runSearch.cancel();
  }, [runSearch]);

  const handleQueryChange = (value) => {
    setQuery(value);
    if (!value.trim()) {
      setIsSearching(false);
      setSearchResultIds(null);
      runSearch.cancel();
      return;
    }
    setIsSearching(true);
    runSearch(value);
  };

  const notesById = useMemo(
    () => new Map(notes.map((n) => [n._id, n])),
    [notes],
  );

  const displayedNotes = searchResultIds
    ? searchResultIds.map((id) => notesById.get(id)).filter(Boolean)
    : notes;

  return (
    <section className="w-72 bg-[#262626] h-full p-4 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-semibold text-gray-400 tracking-wider">
          {UI_TEXT.NOTES_HEADER}
        </h3>

        <PanelRightClose
          size={16}
          className="cursor-pointer text-gray-400 hover:text-gray-200 transition"
          onClick={() => setIsSidebarClose(true)}
        />
      </div>

      <div className="flex flex-col leading-tight mb-6">
        <span className="text-sm text-zinc-300 font-medium">
          Welcome, {user?.firstName || UI_TEXT.FALLBACK_NAME}
        </span>
        <span className="text-[11px] text-zinc-500">{today}</span>
      </div>

      {/* New Note Button */}
      <button
        onClick={onNew}
        className="cursor-pointer w-full bg-[#333333] text-gray-200 py-2 rounded-md text-sm
        hover:bg-[#3f3f3f] transition-colors mb-4"
      >
        {UI_TEXT.NEW_NOTE}
      </button>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
        <input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search notes…"
          className="w-full bg-[#1e1e1e] border border-[#333333] rounded-md text-sm text-gray-200
          placeholder:text-gray-500 pl-8 pr-8 py-2 focus:outline-none focus:border-gray-500 transition-colors"
        />
        {query && (
          <button
            onClick={() => handleQueryChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2 flex-1">
        {isSearching && (
          <div className="text-[11px] text-gray-500 px-1 pb-1">Searching…</div>
        )}
        {!isSearching && searchResultIds && displayedNotes.length === 0 && (
          <div className="text-[12px] text-gray-500 px-1">
            No notes found for "{query}"
          </div>
        )}
        {displayedNotes.map((n) => {
          const isActive = activeId === n._id;
          const isPinned = n.pinned;

          return (
            <div
              key={n._id}
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
                  {n.title || UI_TEXT.FALLBACK_NOTE_TITLE}
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
                <span className="text-[10px] text-gray-400">
                  {formatDate(n.updatedAt)}
                </span>

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

      {/* Go to Main Menu */}
      <button
        onClick={() => navigate(ROUTES.MAIN)}
        className="cursor-pointer mt-4 flex items-center gap-2 text-[11px] text-gray-500 
             hover:text-gray-300 transition-colors group"
      >
        <ArrowLeft
          size={14}
          className="opacity-60 group-hover:opacity-100 transition"
        />
        <span>{UI_TEXT.GO_TO_MAIN}</span>
      </button>
    </section>
  );
}
