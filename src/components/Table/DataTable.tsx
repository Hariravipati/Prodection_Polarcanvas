import { useEffect, useMemo, useState } from "react";
import { Column, TableOptions } from "../../types/@types.table";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { ArrowUpDown, Download, Upload, UploadCloud } from "lucide-react";
import ActionButtons from "./ActionButtons";

export default function DataTable<T extends { id: number }>({
    data,
    columns,
    options,
    searchValue,
    onSearchChange,
}: {
    data: T[];
    columns: Column<T>[];
    options?: TableOptions;
    searchValue?: string;
    onSearchChange?: (v: string) => void;
}) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [selected, setSelected] = useState<number[]>([]);
    const [tableData, setTableData] = useState<T[]>(data);
    const [mode, setMode] = useState<"E" | "F" | undefined>(undefined);

    useEffect(() => setTableData(data), [data]);

    const limit = 5;

    const effectiveSearch = searchValue ?? search;
    const showSearch = options?.search ?? false;
    const showCheckbox = options?.checkbox ?? false;
    const showRadio = options?.radio ?? false;
    const showDownload = options?.download ?? false;

    const filtered = useMemo(() => {
        return tableData.filter((row) =>
            columns.some(
                (c) =>
                    c.searchable &&
                    String((row as any)[c.key])
                        .toLowerCase()
                        .includes(effectiveSearch.toLowerCase())
            )
        );
    }, [tableData, columns, effectiveSearch]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        const arr = [...filtered];
        arr.sort((a, b) => {
            const av = String((a as any)[sortKey] ?? "").toLowerCase();
            const bv = String((b as any)[sortKey] ?? "").toLowerCase();
            if (av < bv) return sortAsc ? -1 : 1;
            if (av > bv) return sortAsc ? 1 : -1;
            return 0;
        });
        return arr;
    }, [filtered, sortKey, sortAsc]);

    const paginated = sorted.slice((page - 1) * limit, page * limit);

    return (
        <div className="pt-3 pb-0 px-4">
            <div className="flex items-center justify-between mb-3 gap-3">
              {showSearch ? (
                <SearchBar value={effectiveSearch} onChange={onSearchChange ?? setSearch} />
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border hover:bg-slate-50 cursor-pointer text-slate-700 shadow-sm">
                  <Upload className="w-4 h-4" />
                  <input type="file" className="hidden" />
                  <span className="text-sm">Upload</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm">
                  <UploadCloud className="w-4 h-4" />
                  <input type="file" multiple className="hidden" />
                  <span className="text-sm">Bulk Upload</span>
                </label>
                <button
                  onClick={() => {
                    const cols = columns.filter(c => c.visible !== false).map(c => String(c.key));
                    const headers = columns.filter(c => c.visible !== false).map(c => c.label);
                    const rows = sorted.map(r => cols.map(k => {
                      const v = (r as any)[k];
                      return typeof v === "string" ? `"${v.replace(/"/g,'""')}"` : v;
                    }).join(","));
                    const csv = [headers.join(","), ...rows].join("\n");
                    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "table.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border hover:bg-slate-50 text-slate-700 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto overflow-y-auto max-h-[65vh] rounded-xl bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-white sticky top-0 z-10">
                        <tr className="text-slate-700 border-b border-slate-100">
                            {showCheckbox && (
                                <th className="p-2 sm:p-3 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={selected.length === filtered.length && filtered.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelected(filtered.map((r) => r.id));
                                            } else {
                                                setSelected([]);
                                            }
                                        }}
                                    />
                                </th>
                            )}
                            {columns.filter((c) => c.visible !== false).map((c) => {
                                const key = String(c.key);
                                const active = sortKey === key;
                                return (
                                    <th key={key} className="p-2 sm:p-3 text-left font-semibold">
                                        <button
                                            className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-600"
                                            onClick={() => {
                                                if (sortKey === key) {
                                                    setSortAsc(!sortAsc);
                                                } else {
                                                    setSortKey(key);
                                                    setSortAsc(true);
                                                }
                                                setPage(1);
                                            }}
                                        >
                                            {c.label}
                                            <ArrowUpDown
                                                className={`w-4 h-4 ${active ? "text-blue-600" : "text-slate-300"}`}
                                            />
                                        </button>
                                    </th>
                                );
                            })}
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-slate-50 transition"
                            >
                                {showCheckbox && (
                                    <td className="p-2 sm:p-3">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={selected.includes(row.id)}
                                            onChange={(e) => {
                                                setSelected((prev) => {
                                                    const set = new Set(prev);
                                                    if (e.target.checked) set.add(row.id);
                                                    else set.delete(row.id);
                                                    return Array.from(set);
                                                });
                                            }}
                                        />
                                    </td>
                                )}

                                {columns
                                  .filter((c) => c.visible !== false)
                                  .map((c) => {
                                    const key = String(c.key);
                                    const val = (row as any)[key];
                                    let content = c.render ? c.render(row) : val;

                                    if (!c.render && c.type) {
                                      switch (c.type) {
                                        case "badge":
                                          {
                                            const status = String(val || "").toLowerCase().trim();
                                            const cls =
                                              status === "inactive"
                                                ? "bg-rose-100 text-rose-700"
                                                : status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : status === "pending"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-slate-100 text-slate-700";
                                            content = (
                                              <span className={`px-2 py-1 text-xs rounded-full ${cls}`}>
                                                {val}
                                              </span>
                                            );
                                          }
                                          break;
                                        case "checkbox":
                                          content = (
                                            <input
                                              type="checkbox"
                                              checked={!!val}
                                              onChange={(e) => {
                                                setTableData((rows) =>
                                                  rows.map((r) =>
                                                    r.id === row.id ? ({ ...r, [key]: e.target.checked } as T) : r
                                                  )
                                                );
                                              }}
                                            />
                                          );
                                          break;
                                        case "radio":
                                          content = (
                                            <div className="flex gap-2">
                                              {(c.options || []).map((opt) => (
                                                <label key={opt.value} className="inline-flex items-center gap-1">
                                                  <input
                                                    type="radio"
                                                    name={`${key}-${row.id}`}
                                                    value={opt.value}
                                                    checked={String(val) === opt.value}
                                                    onChange={() =>
                                                      setTableData((rows) =>
                                                        rows.map((r) =>
                                                          r.id === row.id ? ({ ...r, [key]: opt.value } as T) : r
                                                        )
                                                      )
                                                    }
                                                  />
                                                  <span className="text-xs text-slate-600">{opt.label}</span>
                                                </label>
                                              ))}
                                            </div>
                                          );
                                          break;
                                        case "download":
                                          content = (
                                            <button
                                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
                                              onClick={() => {
                                                if (typeof val === "string") window.open(val, "_blank");
                                              }}
                                            >
                                              <Download className="w-4 h-4" />
                                              <span className="text-xs">Download</span>
                                            </button>
                                          );
                                          break;
                                        case "action":
                                          content = <ActionButtons />;
                                          break;
                                      }
                                    }

                                    return (
                                      <td key={key} className="p-2 sm:p-3 text-slate-700">
                                        {content}
                                      </td>
                                    );
                                  })}

                                <td className="p-2 sm:p-3">
                                    <div className="flex justify-center">
                                        <ActionButtons />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + (showCheckbox ? 2 : 1)} className="p-6 text-center text-slate-500">
                                    No results
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mb-0">
              <div className="text-sm text-slate-500">
                Showing <span className="font-medium">{paginated.length}</span> entries of{" "}
                <span className="font-medium">{filtered.length}</span>
              </div>
              <Pagination
                page={page}
                total={filtered.length}
                limit={limit}
                onChange={setPage}
              />
            </div>
        </div>
    );
}
