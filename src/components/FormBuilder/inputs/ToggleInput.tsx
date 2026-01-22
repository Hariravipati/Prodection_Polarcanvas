import React from "react";
import { Field } from "../types";

interface Props {
  field: Field;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleInput: React.FC<Props> = ({ field, value, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </div>
      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{field.label}</span>
    </label>
  );
};

export default ToggleInput;
