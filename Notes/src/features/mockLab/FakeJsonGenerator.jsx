import { useState } from "react";
import { generateData } from "./generateData";
import SchemaBuilder from "./SchemaBuilder";
import GenerateControls from "./GenerateControls";
import PreviewSection from "./PreviewSection";
import Header from "@/components/layout/Header";
import { findAndAddChild } from "./findAndAddChild";

export default function FakeJsonGenerator() {
  const [fields, setFields] = useState([
    {
      id: Date.now(),
      name: "firstName",
      format: "firstname",
      children: [],
    },
  ]);

  const [count, setCount] = useState(10);
  const [previewData, setPreviewData] = useState(null);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        format: "randomstring",
        children: [],
      },
    ]);
  };

  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  const removeField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const previewSample = () => {
    setPreviewData(generateData(fields));
  };

  const generateRecords = () => {
    const records = Array.from({ length: count }, () => generateData(fields));
    setPreviewData(records);
  };

  function addChildField(parentId) {
    const updatedFields = findAndAddChild(fields, parentId);
    setFields(updatedFields);
  }

  return (
    <div className="min-h-screen bg-[#0E1016] ">
      <Header />
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-8 shadow-xl">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-slate-100">PayloadLab</h1>
            <p className="text-slate-400 mt-1">
              Build schemas. Generate API-ready mock data.
            </p>
          </header>

          <SchemaBuilder
            fields={fields}
            addField={addField}
            addChildField={addChildField}
            updateField={updateField}
            removeField={removeField}
          />

          <GenerateControls
            count={count}
            setCount={setCount}
            onPreview={previewSample}
            onGenerate={generateRecords}
          />

          {previewData && <PreviewSection data={previewData} />}
        </div>
      </div>
    </div>
  );
}
