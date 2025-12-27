import { useState } from "react";
import { message } from "antd";
import { generateData } from "./generateData";
import SchemaBuilder from "./SchemaBuilder";
import GenerateControls from "./GenerateControls";
import PreviewSection from "./PreviewSection";
import Header from "@/components/layout/Header";
import { findAndAddChild } from "./findAndAddChild";
import SchemaTreeView from "./SchemaTreeView";

export default function FakeJsonGenerator() {
  const [messageApi, contextHolder] = message.useMessage();

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
    function updateRecursive(fields) {
      return fields.map((f) => {
        if (f.id === id) {
          return { ...f, [key]: value };
        }
        if (f.children && f.children.length > 0) {
          return { ...f, children: updateRecursive(f.children) };
        }
        return f;
      });
    }
    setFields(updateRecursive(fields));
  };

  const removeField = (id) => {
    function removeRecursive(fields) {
      return fields
        .filter((f) => f.id !== id)
        .map((f) => {
          if (f.children && f.children.length > 0) {
            return { ...f, children: removeRecursive(f.children) };
          }
          return f;
        });
    }
    setFields(removeRecursive(fields));
  };

  // Validation function
  function validateFields(fields) {
    function checkRecursive(fields, path = "") {
      for (const field of fields) {
        const fieldPath = path
          ? `${path} > ${field.name || "unnamed"}`
          : field.name || "unnamed";

        // Check if name is empty
        if (!field.name || field.name.trim() === "") {
          return {
            isValid: false,
            message: `Field name cannot be empty at: ${fieldPath}`,
          };
        }

        // Check children recursively
        if (field.children && field.children.length > 0) {
          const childValidation = checkRecursive(field.children, fieldPath);
          if (!childValidation.isValid) {
            return childValidation;
          }
        }
      }
      return { isValid: true };
    }

    if (fields.length === 0) {
      return {
        isValid: false,
        message: "Please add at least one field",
      };
    }

    return checkRecursive(fields);
  }

  const previewSample = () => {
    // Validate before generating
    const validation = validateFields(fields);
    if (!validation.isValid) {
      messageApi.error(validation.message);
      return;
    }
    setPreviewData(generateData(fields));
    messageApi.success("Preview generated successfully!");
  };

  const generateRecords = () => {
    // Validate before generating
    const validation = validateFields(fields);
    if (!validation.isValid) {
      messageApi.error(validation.message);
      return;
    }
    const records = Array.from({ length: count }, () => generateData(fields));
    setPreviewData(records);
    messageApi.success(`${count} records generated successfully!`);
  };

  function addChildField(parentId) {
    const updatedFields = findAndAddChild(fields, parentId);
    setFields(updatedFields);
  }

  return (
    <div className="min-h-screen bg-[#0E1016] ">
      {contextHolder}
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
            setFields={setFields}
          />
          <div className="mb-10">
            <SchemaTreeView fields={fields} />
          </div>
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
