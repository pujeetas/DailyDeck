import { useState } from "react";
import { message } from "antd";
import { generateData } from "../utils/generateData";
import SchemaBuilder from "../generator/SchemaBuilder";
import GenerateControls from "../generator/GenerateControls";
import PreviewSection from "../generator/PreviewSection";
import SchemaTreeView from "../generator/SchemaTreeView";
import ExportOptions from "../ui/ExportOptions";
import { findAndAddChild } from "../utils/findAndAddChild";
import Header from "@/components/layout/Header";

export default function FakeJsonGenerator() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fields, setFields] = useState([
    { id: Date.now(), name: "firstName", format: "firstname", children: [] },
  ]);
  const [count, setCount] = useState(10);
  const [previewData, setPreviewData] = useState(null);

  const addField = () =>
    setFields([
      ...fields,
      { id: Date.now(), name: "", format: "randomstring", children: [] },
    ]);

  const updateField = (id, key, value) => {
    const updateRecursive = (list) =>
      list.map((f) => {
        if (f.id === id) return { ...f, [key]: value };
        if (f.children?.length > 0)
          return { ...f, children: updateRecursive(f.children) };
        return f;
      });
    setFields(updateRecursive(fields));
  };

  const removeField = (id) => {
    const removeRecursive = (list) =>
      list
        .filter((f) => f.id !== id)
        .map((f) => ({
          ...f,
          children: f.children ? removeRecursive(f.children) : [],
        }));
    setFields(removeRecursive(fields));
  };

  const generate = (isSample = false) => {
    const records = isSample
      ? generateData(fields)
      : Array.from({ length: count }, () => generateData(fields));
    setPreviewData(records);
    messageApi.success(
      isSample ? "Preview updated" : `${count} records generated`
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#0E1016] text-slate-100 overflow-hidden">
      {contextHolder}
      <Header color={"bg-[#0E1016]"} />

      {/* Header Bar */}
      <header className="h-14 flex items-center justify-between px-6 bg-[#11141D]">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg tracking-tight">PayloadLab</h1>
        </div>
        <GenerateControls
          count={count}
          setCount={setCount}
          onPreview={() => generate(true)}
          onGenerate={() => generate(false)}
        />
      </header>

      <main className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Panel 1: Tree Navigation (Left) */}
        <aside className="col-span-2 border-r border-white/5 bg-[#11141D] p-4 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
            Schema Tree
          </p>
          <SchemaTreeView fields={fields} />
        </aside>

        {/* Panel 2: Field Editor (Center) */}
        <section className="col-span-5 border-r border-white/5 p-6 overflow-y-auto bg-[#0E1016]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Field Definitions
            </h2>
            <button
              onClick={addField}
              className="text-xs bg-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-500 transition-colors"
            >
              + Add Root Field
            </button>
          </div>
          <SchemaBuilder
            fields={fields}
            updateField={updateField}
            removeField={removeField}
            addChildField={(id) => setFields(findAndAddChild(fields, id))}
          />
        </section>

        {/* Panel 3: Live Output (Right) */}
        <section className="col-span-5 p-6 overflow-y-auto bg-[#0B0D12]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              JSON Output
            </h2>
            {previewData && (
              <ExportOptions
                data={previewData}
                setPreviewData={setPreviewData}
              />
            )}
          </div>
          <PreviewSection data={previewData} />
        </section>
      </main>
    </div>
  );
}
