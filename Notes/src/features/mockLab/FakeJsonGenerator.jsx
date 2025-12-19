import React, { useState } from "react";
import { generateData } from "./generateData";
import PreviewSection from "./PreviewSection";
import GenerateControls from "./GenerateControls";
import SchemaBuilder from "./SchemaBuilder";

export default function FakeJsonGenerator() {
  const [fields, setFields] = useState([
    {
      id: Date.now(),
      name: "",
      type: "string",
      min: "",
      max: "",
    },
  ]);

  const [count, setCount] = useState(10);
  const [previewData, setPreviewData] = useState(null);

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now(), name: "", type: "string", min: "", max: "" },
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const previewSample = () => {
    const sample = generateData(fields);
    setPreviewData(sample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              Fake JSON Generator
            </h1>
            <p className="text-slate-400">
              Design your schema and generate realistic mock data
            </p>
          </div>

          <SchemaBuilder
            addField={addField}
            fields={fields}
            setFields={setFields}
            updateField={updateField}
            removeField={removeField}
          />

          <GenerateControls
            previewSample={previewSample}
            count={count}
            setCount={setCount}
            fields={fields}
          />

          {previewData && <PreviewSection previewData={previewData} />}
        </div>
      </div>
    </div>
  );
}
