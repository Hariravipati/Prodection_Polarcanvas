import React from "react";
import { Field } from "../types";

interface Props {
  field: Field;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<Props> = ({ field, value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-700 placeholder-gray-400 hover:border-gray-300"
      placeholder={field.placeholder}
      required={field.required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
