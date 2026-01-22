// utils/columnMapper.ts
import { Column } from "../types/@types.table";

export const mapColumns = (jsonColumns: any[]): Column<any>[] => {
  return jsonColumns
    .filter((c) => c.visible !== false)
    .map((col) => ({
      key: col.key,
      label: col.label,
      searchable: !!col.searchable,
      type: col.type,
      visible: col.visible !== false,
      options: col.options,
      render:
        col.type === "image"
          ? (row: any) => (
              <img src={row[col.key]} className="w-9 h-9 rounded-full ring-2 ring-blue-500" />
            )
          : undefined,
    }));
};
