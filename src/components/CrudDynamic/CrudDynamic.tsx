import { useState } from "react"
import { Edit2, Trash2, Plus, X } from "lucide-react"

type Column<T> = {
  key: keyof T
  label: string
  type?: "text" | "number" | "date" | "select"
  options?: string[]
  required?: boolean
}

type Props<T extends { id: number }> = {
  rows: T[]
  columns: Column<T>[]
  onSave: (row: T, isEdit: boolean) => void
  onDelete: (id: number) => void
}

export default function CrudDynamic<T extends { id: number }>({
  rows,
  columns,
  onSave,
  onDelete
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<T | null>(null)

  // Open modal for adding new
  const openAdd = () => {
    // @ts-ignore - create empty record with keys from columns
    const emptyRecord: any = { id: 0 }
    columns.forEach(col => {
      if (col.key !== "id") emptyRecord[col.key] = ""
    })
    setForm(emptyRecord)
    setOpen(true)
  }

  // Open modal for editing
  const openEdit = (row: T) => {
    setForm(row)
    setOpen(true)
  }

  // Save handler
  const save = () => {
    if (form) {
      const isEdit = form.id !== 0;
      const record = form.id === 0 ? { ...form, id: Date.now() } : form;
      onSave(record, isEdit);
      setOpen(false);
    }
  };

  // Update form dynamically
  const handleChange = (key: keyof T, value: string) => {
    if (!form) return
    setForm({ ...form, [key]: value } as T)
  }

  return (
    <div className="p-4">
      {/* Header with Add Icon */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dynamic CRUD</h2>
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          onClick={openAdd}
        >
          <Plus />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-xl">
        <table className="w-full text-xs">
          <thead className="border-b bg-gray-100">
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-blue-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`} 
               
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-2 text-gray-800 whitespace-nowrap"
                  >
                    {String(row[col.key] ?? "")}
                  </td>
                ))}
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEdit(row)}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(row.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-6 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && form && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">
                {form.id === 0 ? "Add New Record" : "Edit Record"}
              </h3>
              <X
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-3">
              {columns
                .filter(col => col.key !== "id")
                .map(col => (
                  <div key={String(col.key)}>
                    <label className="block text-gray-600 text-sm mb-1">
                      {col.label}
                      {col.required && <span className="text-red-600 ml-1">*</span>}
                    </label>
                    {col.type === "select" && col.options ? (
                      <select
                        value={String(form[col.key] ?? "")}
                        onChange={e => handleChange(col.key, e.target.value)}
                        className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="">Select...</option>
                        {col.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={String(form[col.key] ?? "")}
                        onChange={e => handleChange(col.key, e.target.value)}
                        className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                      />
                    )}
                  </div>
                ))}
            </div>

            <button
              onClick={save}
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
