import { useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search notes..."
      className="mb-3 w-full rounded-md border border-[#333333] 
        bg-[#2a2a2a] py-2 px-3 text-sm text-gray-200 placeholder:text-gray-500 
        focus:outline-none focus:ring-1 focus:ring-[#444]"
    />
  );
}
