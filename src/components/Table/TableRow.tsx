import TableCell from "./TableCell";
import ActionButtons from "./ActionButtons";
import {Column } from "../../types/@types.table"

export default function TableRow<T extends { id: number }>({
  row,
  columns,
}: {
  row: T;
  columns: Column<T>[];
}) {
  return (
    <tr className="border-t">
      <TableCell>
        <input type="checkbox" />
      </TableCell>

      {columns.map((c) => (
        <TableCell key={String(c.key)}>
          {c.render ? c.render(row) : (row as any)[c.key]}
        </TableCell>
      ))}

      <TableCell>
        <ActionButtons />
      </TableCell>
    </tr>
  );
}
