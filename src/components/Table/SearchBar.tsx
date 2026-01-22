import { X, Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: Props) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9 py-2 rounded-2xl bg-slate-100 outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent focus:outline-none focus:shadow-sm w-full"
      />
      {value && (
        <button
          aria-label="Clear"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-100"
          onClick={() => onChange("")}
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      )}
    </div>
  );
}
