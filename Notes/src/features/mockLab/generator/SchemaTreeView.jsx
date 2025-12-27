export default function SchemaTreeView({ fields }) {
  const renderItem = (field, depth = 0) => (
    <div key={field.id}>
      <div
        className="flex items-center gap-2 py-1 group"
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-indigo-500" />
        <span className="text-xs text-slate-400 truncate group-hover:text-slate-200">
          {field.name || "unnamed"}
        </span>
      </div>
      {field.children?.map((child) => renderItem(child, depth + 1))}
    </div>
  );

  return <div className="space-y-1">{fields.map((f) => renderItem(f))}</div>;
}
