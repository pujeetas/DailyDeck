import { Trash2, PlusCircle, Info } from "lucide-react";

const schemaOptions = [
  { value: "firstname", label: "First Name" },
  { value: "lastname", label: "Last Name" },
  { value: "username", label: "Username" },
  { value: "email", label: "Email" },
  { value: "uuid", label: "UUID" },
  { value: "url", label: "URL" },
  { value: "sentence", label: "Sentence" },
  { value: "paragraph", label: "Paragraph" },
  { value: "gender", label: "Gender" },
  { value: "randomstring", label: "Random String" },
  { value: "randomnumber", label: "Random Number" },
  { value: "price", label: "Price" },
  { value: "age", label: "Age" },
  { value: "quantity", label: "Quantity" },
  { value: "rating", label: "Rating" },
  { value: "boolean", label: "Boolean" },
  { value: "date", label: "Date" },
  { value: "datetime", label: "Date Time" },
  {
    value: "address",
    label: "Address",
    description: "Generates nested object: street, city, state, country, zip",
  },
];

export default function SchemaBuilder({
  fields,
  updateField,
  removeField,
  addChildField,
}) {
  const renderField = (field, isChild = false) => {
    const selectedOption = schemaOptions.find(
      (opt) => opt.value === field.format
    );
    const hasError = !field.name || field.name.trim() === "";

    return (
      <div
        key={field.id}
        className={`${
          isChild ? "ml-6 mt-2 border-l border-white/5 pl-4" : "mb-4"
        }`}
      >
        <div
          className={`bg-[#1A1F2E] border ${
            hasError ? "border-red-500/50" : "border-white/5"
          } rounded-lg p-3 flex flex-col gap-2 shadow-sm hover:border-white/10 transition-colors`}
        >
          <div className="flex items-center gap-3">
            <input
              placeholder="field_name"
              value={field.name}
              onChange={(e) => updateField(field.id, "name", e.target.value)}
              className="bg-transparent border-b border-white/10 focus:border-indigo-500 outline-none text-sm py-1 w-1/3 text-slate-100"
            />
            <select
              value={field.format}
              onChange={(e) => updateField(field.id, "format", e.target.value)}
              className="bg-[#0E1016] border border-white/10 rounded px-2 py-1.5 text-xs text-slate-300 outline-none flex-1"
            >
              {schemaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="flex gap-1">
              <button
                onClick={() => addChildField(field.id)}
                className="p-1.5 text-slate-500 hover:text-indigo-400"
                title="Add Child"
              >
                <PlusCircle size={14} />
              </button>
              <button
                onClick={() => removeField(field.id)}
                className="p-1.5 text-slate-500 hover:text-red-400"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {selectedOption?.description && (
            <div className="flex items-center gap-1.5 px-1">
              <Info size={12} className="text-indigo-400" />
              <p className="text-[10px] text-slate-500 italic">
                {selectedOption.description}
              </p>
            </div>
          )}
        </div>
        {field.children?.map((child) => renderField(child, true))}
      </div>
    );
  };

  return <div className="space-y-2">{fields.map((f) => renderField(f))}</div>;
}
