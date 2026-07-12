import { useEffect, useState } from "react";
import { Link2, ChevronDown, ChevronUp } from "lucide-react";
import { getRelatedNotesRequest } from "./services/notesService";

export default function RelatedNotes({ noteId, updatedAt, onSelect }) {
  const [related, setRelated] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!noteId) {
      setRelated([]);
      return;
    }

    getRelatedNotesRequest(noteId)
      .then((res) => {
        if (!cancelled) setRelated(res.data.notes || []);
      })
      .catch((error) => {
        console.error("Error loading related notes:", error);
        if (!cancelled) setRelated([]);
      });

    return () => {
      cancelled = true;
    };
  }, [noteId, updatedAt]);

  if (related.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-1.5 text-[11px] text-purple-300/80 hover:text-purple-300 tracking-wide uppercase transition-colors"
      >
        <Link2 size={12} />
        Related Notes ({related.length})
        {collapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
      </button>

      {!collapsed && (
        <div className="flex flex-wrap gap-2 mt-2">
          {related.map((n) => (
            <button
              key={n._id}
              onClick={() => onSelect(n._id)}
              className="px-3 py-1.5 text-xs rounded-lg bg-[#1f1f1f] border border-[#2f2f2f] text-gray-300
              hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
            >
              {n.title || "Untitled"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
