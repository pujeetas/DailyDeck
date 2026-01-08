import { Trash2, PlusCircle, Info, GripVertical } from "lucide-react";
import { Tooltip } from "antd";

const schemaOptions = [
  { value: "firstname", label: "First Name", icon: "👤" },
  { value: "lastname", label: "Last Name", icon: "👤" },
  { value: "username", label: "Username", icon: "🔤" },
  { value: "email", label: "Email", icon: "📧" },
  { value: "uuid", label: "UUID", icon: "🔑" },
  { value: "url", label: "URL", icon: "🔗" },
  { value: "sentence", label: "Sentence", icon: "📝" },
  { value: "paragraph", label: "Paragraph", icon: "📄" },
  { value: "gender", label: "Gender", icon: "⚧" },
  { value: "randomstring", label: "Random String", icon: "🎲" },
  { value: "randomnumber", label: "Random Number", icon: "🔢" },
  { value: "price", label: "Price", icon: "💰" },
  { value: "age", label: "Age", icon: "🎂" },
  { value: "quantity", label: "Quantity", icon: "📦" },
  { value: "rating", label: "Rating", icon: "⭐" },
  { value: "boolean", label: "Boolean", icon: "✓" },
  { value: "date", label: "Date", icon: "📅" },
  { value: "datetime", label: "Date Time", icon: "🕐" },
  {
    value: "address",
    label: "Address",
    icon: "📍",
    description: "Generates nested object: street, city, state, country, zip",
  },
];

export default function SchemaBuilder({
  fields,
  updateField,
  removeField,
  addChildField,
}) {
  const renderField = (field, isChild = false, depth = 0) => {
    const selectedOption = schemaOptions.find(
      (opt) => opt.value === field.format
    );
    const hasError = !field.name || field.name.trim() === "";

    return (
      <div
        key={field.id}
        className={`${
          isChild
            ? "ml-8 mt-2 relative before:absolute before:left-[-16px] before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-indigo-500/30 before:to-transparent"
            : "mb-3"
        }`}
      >
        <div
          className={`group bg-gradient-to-br from-[#1A1F2E] to-[#16182B] border ${
            hasError ? "border-red-500/50 animate-pulse" : "border-white/5"
          } rounded-xl p-4 shadow-lg hover:border-indigo-500/30 hover:shadow-indigo-500/10 transition-all duration-300`}
        >
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <Tooltip title="Drag to reorder">
              <div className="cursor-grab text-slate-600 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={16} />
              </div>
            </Tooltip>

            {/* Depth Indicator */}
            {isChild && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-500/50"></div>
                <div className="w-4 h-px bg-indigo-500/30"></div>
              </div>
            )}

            {/* Field Name Input */}
            <div className="flex-1 relative">
              <input
                placeholder={isChild ? "child_field_name" : "field_name"}
                value={field.name}
                onChange={(e) => updateField(field.id, "name", e.target.value)}
                className={`w-full bg-[#0E1016] border ${
                  hasError
                    ? "border-red-500/50"
                    : "border-white/10 focus:border-indigo-500"
                } rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600`}
              />
              {hasError && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 text-xs">
                  Required
                </span>
              )}
            </div>

            {/* Field Type Dropdown with Icons */}
            <select
              value={field.format}
              onChange={(e) => updateField(field.id, "format", e.target.value)}
              className="bg-[#0E1016] border border-white/10 hover:border-indigo-500/50 focus:border-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none min-w-[180px] cursor-pointer transition-colors"
            >
              {schemaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {/* Allow unlimited nesting - removed depth check */}
              <Tooltip title="Add nested field">
                <button
                  onClick={() => addChildField(field.id)}
                  className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                >
                  <PlusCircle size={16} />
                </button>
              </Tooltip>

              <Tooltip title="Delete field">
                <button
                  onClick={() => removeField(field.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Field Type Description */}
          {selectedOption?.description && (
            <div className="flex items-start gap-2 mt-3 px-3 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
              <Info
                size={14}
                className="text-indigo-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-slate-400 leading-relaxed">
                {selectedOption.description}
              </p>
            </div>
          )}
        </div>

        {/* Child Fields - Recursive rendering for unlimited nesting */}
        {field.children?.map((child) => renderField(child, true, depth + 1))}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {fields.length === 0 ? (
        <div className="text-center py-12 px-6 border border-dashed border-white/5 rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <PlusCircle className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-slate-400 text-sm mb-2">No fields defined yet</p>
          <p className="text-slate-600 text-xs">
            Click "+ Add Root Field" to start building your schema
          </p>
        </div>
      ) : (
        fields.map((f) => renderField(f))
      )}
    </div>
  );
}
