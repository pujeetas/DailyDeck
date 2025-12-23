import { generateData } from "./generateData";

export function PreviewPanel({
  fields,
  count,
  setCount,
  previewData,
  setPreviewData,
}) {
  const preview = () => {
    setPreviewData(generateData(fields));
  };

  const generate = () => {
    const records = Array.from({ length: count }, () => generateData(fields));
    setPreviewData(records);
  };

  return (
    <div className="col-span-5 bg-white rounded-lg p-6">
      <h3 className="font-semibold mb-4">Data Preview & Generation</h3>

      <pre className="bg-gray-900 text-green-400 p-4 rounded h-64 overflow-auto">
        {previewData ? JSON.stringify(previewData, null, 2) : "{}"}
      </pre>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border rounded p-2 w-32"
        />
        <button
          onClick={preview}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Preview
        </button>
        <button
          onClick={generate}
          className="bg-green-600 text-white p-2 rounded"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
