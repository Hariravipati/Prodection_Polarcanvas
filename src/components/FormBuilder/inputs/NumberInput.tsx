import React from "react";
import { Field } from "../types";

interface Props {
  field: Field;
  value: number | "";
  onChange: (value: number | "") => void;
}

const NumberInput: React.FC<Props> = ({ field, value, onChange }) => {
  return (
    <input
      type="number"
      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-700 placeholder-gray-400 hover:border-gray-300"
      placeholder={field.placeholder}
      required={field.required}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val === "" ? "" : Number(val));
      }}
    />
  );
};

export default NumberInput;
