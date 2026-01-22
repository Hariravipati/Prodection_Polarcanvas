import {Column } from "../../types/@types.table"

export default function TableHeader<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2">
          <input type="checkbox" />
        </th>
        {columns.map((c) => (
          <th key={String(c.key)} className="p-2 text-left">
            {c.label}
          </th>
        ))}
        <th className="p-2">Actions</th>
      </tr>
    </thead>
  );
}
