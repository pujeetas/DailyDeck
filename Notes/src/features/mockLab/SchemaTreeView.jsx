import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SchemaTreeView({ fields }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (field, depth = 0) => {
    const hasChildren = field.children && field.children.length > 0;
    const isExpanded = expanded[field.id];

    return (
      <div key={field.id}>
        <div
          className="flex items-center gap-2 py-1 px-2 hover:bg-slate-700 rounded cursor-pointer"
          style={{ paddingLeft: `${depth * 1.5}rem` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(field.id)}
              className="text-slate-400"
            >
              {isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          )}
          {!hasChildren && <span className="w-3.5" />}

          <span className="text-sm text-slate-300">
            {field.name || "unnamed"}
          </span>
          <span className="text-xs text-slate-500">{field.format}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {field.children.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 max-h-96 overflow-auto">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Schema Tree</h3>
      {fields.map((field) => renderTree(field))}
    </div>
  );
}
