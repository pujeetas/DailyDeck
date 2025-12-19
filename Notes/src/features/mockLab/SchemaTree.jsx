export function SchemaTree({
  fields,
  setFields,
  selectedFieldId,
  setSelectedFieldId,
}) {
  return (
    <div className="col-span-3 bg-white rounded-lg p-4">
      <h3 className="font-semibold mb-4">Schema Editor</h3>

      {fields.map((field) => (
        <div
          key={field.id}
          onClick={() => setSelectedFieldId(field.id)}
          className={`p-2 rounded cursor-pointer ${
            selectedFieldId === field.id ? "bg-blue-100" : ""
          }`}
        >
          {field.key}
        </div>
      ))}

      <button
        className="mt-4 w-full bg-blue-600 text-white rounded p-2"
        onClick={() =>
          setFields((prev) => [
            ...prev,
            {
              id: Date.now(),
              key: "new_field",
              type: "string",
              format: "randomString",
            },
          ])
        }
      >
        + Add Field
      </button>
    </div>
  );
}
