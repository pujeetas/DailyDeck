import Header from "@/components/layout/Header";
import { Plus, Trash2 } from "lucide-react";

export default function SchemaBuilder({
  fields,
  addField,
  updateField,
  removeField,
  addChildField,
}) {
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
  ];

  const renderField = (field) => {
    return (
      <>
        <div
          key={field.id}
          className="grid grid-cols-12 gap-4 bg-slate-800 border border-slate-700 rounded-lg p-4"
        >
          <div className="col-span-5">
            <label className="text-sm text-slate-400">Field Name (Key)</label>
            <input
              value={field.name}
              onChange={(e) => updateField(field.id, "name", e.target.value)}
              placeholder="e.g. firstName"
              className="w-full mt-1 px-3 py-2 bg-[#0F1424] border border-white/10 focus:border-[#6D5BFF] rounded text-slate-100"
            />
          </div>

          <div className="col-span-6">
            <label className="text-sm text-slate-400">Schema Type</label>
            <select
              value={field.format}
              onChange={(e) => updateField(field.id, "format", e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
            >
              {schemaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 flex items-end">
            <button
              onClick={() => removeField(field.id)}
              className="p-2 text-red-400 hover:bg-red-900/30 rounded"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => addChildField(field.id)}
              className="p-2 text-green-400 hover:bg-red-900/30 rounded"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        {field.children && field.children.length > 0 && (
          <div style={{ marginLeft: "2rem" }}>
            {field.children.map((child) => renderField(child))}
          </div>
        )}
      </>
    );
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-200">
          Schema Definition
        </h2>
        <button
          onClick={addField}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-[#1A1F2E] hover:bg-[#6D5BFF]"
        >
          <Plus size={16} />
          Add Field
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => renderField(field))}
      </div>
    </section>
  );
}
