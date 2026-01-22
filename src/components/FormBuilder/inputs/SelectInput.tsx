import React from "react";
import { Field } from "../types";

interface Props {
  field: Field;
  value: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<Props> = ({ field, value, onChange }) => {
  return (
    <div className="relative">
      <select
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-700 placeholder-gray-400 hover:border-gray-300 appearance-none"
        required={field.required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {field.label}</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
    </div>
  );
};

export default SelectInput;
