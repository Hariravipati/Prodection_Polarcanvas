import React, { useState } from "react";
import { Field } from "../types";

interface Props {
  field: Field;
  value: string[];
  onChange: (value: string[]) => void;
}

const PillsInput: React.FC<Props> = ({ field, value, onChange }) => {
  const [input, setInput] = useState("");

  const addPill = () => {
    if (input.trim() === "") return;
    onChange([...value, input.trim()]);
    setInput("");
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="Press Enter to add"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-700 placeholder-gray-400 hover:border-gray-300"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addPill();
          }
        }}
      />

      <div className="flex gap-2 mt-3 flex-wrap">
        {value.map((pill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-medium flex items-center gap-1"
          >
            {pill}
            <button 
              type="button"
              onClick={() => {
                const newValue = [...value];
                newValue.splice(i, 1);
                onChange(newValue);
              }}
              className="ml-1 hover:text-blue-900 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PillsInput;
