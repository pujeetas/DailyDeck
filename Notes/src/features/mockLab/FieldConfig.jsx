export function FieldConfig({ field, updateField }) {
  if (!field) {
    return (
      <div className="col-span-4 bg-white rounded-lg p-6 text-gray-500">
        Select a field to configure
      </div>
    );
  }

  return (
    <div className="col-span-4 bg-white rounded-lg p-6">
      <h3 className="font-semibold mb-4">Field Configuration</h3>

      <label className="block mb-2">API Key</label>
      <input
        value={field.key}
        onChange={(e) => updateField(field.id, "key", e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2">Type</label>
      <select
        value={field.type}
        onChange={(e) => updateField(field.id, "type", e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="date">Date</option>
      </select>

      <label className="block mb-2">Generate As</label>
      <select
        value={field.format}
        onChange={(e) => updateField(field.id, "format", e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="randomString">Random String</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
        <option value="username">Username</option>
      </select>
    </div>
  );
}
