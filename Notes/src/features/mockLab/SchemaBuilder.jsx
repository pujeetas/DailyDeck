import { Plus, Trash2 } from "lucide-react";
import React from "react";
import SchemaDropdown from "./SchemaDropdown";

const SchemaBuilder = ({
  addField,
  fields,
  setFields,
  updateField,
  removeField,
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-200">Schema Fields</h2>
        <button
          onClick={addField}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
        >
          <Plus size={18} />
          Add Field
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-4 items-start p-4 bg-slate-800 border border-slate-700 rounded-lg"
          >
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-1">
                Field Type
              </label>
              <SchemaDropdown
                setFields={setFields}
                index={index}
                fields={fields}
              />
            </div>

            {field.type !== "boolean" && (
              <div className="w-28">
                <label className="block text-sm text-slate-400 mb-1">Min</label>
                <input
                  type="number"
                  value={field.min}
                  onChange={(e) => updateField(field.id, "min", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )}

            {field.type !== "boolean" && (
              <div className="w-28">
                <label className="block text-sm text-slate-400 mb-1">Max</label>
                <input
                  type="number"
                  value={field.max}
                  onChange={(e) => updateField(field.id, "max", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )}

            <button
              onClick={() => removeField(field.id)}
              disabled={fields.length === 1}
              className="mt-7 p-2 text-red-400 hover:bg-red-900/30 rounded-md disabled:opacity-40"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemaBuilder;
