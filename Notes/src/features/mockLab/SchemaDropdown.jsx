import { useState } from "react";
import { SchemaTree } from "./SchemaTree";
import { FieldConfig } from "./FieldConfig";
import { PreviewPanel } from "./PreviewPanel";

export default function FakeJsonGenerator() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [count, setCount] = useState(10);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="grid grid-cols-12 gap-4 h-screen p-6 bg-gray-100">
      <SchemaTree
        fields={fields}
        setFields={setFields}
        selectedFieldId={selectedFieldId}
        setSelectedFieldId={setSelectedFieldId}
      />

      <FieldConfig
        field={selectedField}
        updateField={(id, key, value) =>
          setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
          )
        }
      />

      <PreviewPanel
        fields={fields}
        count={count}
        setCount={setCount}
        previewData={previewData}
        setPreviewData={setPreviewData}
      />
    </div>
  );
}
