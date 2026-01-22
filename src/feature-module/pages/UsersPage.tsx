import { useMemo, useState } from "react";
import DataTable from "@/components/Table/DataTable";
import SuccessModal from "@/components/Modals/SuccessModal";
import { Plus, Upload, FileDown, Database } from "lucide-react";
import ModelForm from "@/components/Modals/modelform";

interface EobRow {
  id: number;
  slno: number;
  aadharNo: string;
  mobileNo: string;
  eobStatus: "Active" | "Inactive" | "Pending";
  expireDate: string;
  response: string;
  checked: boolean;
  verify: "E" | "F";
  downloadUrl?: string;
}

export default function UsersPage() {
  const [successOpen, setSuccessOpen] = useState(false);

  const initialRows: EobRow[] = [
    { id: 1, slno: 1, aadharNo: "5678 1234 9012", mobileNo: "9876543210", eobStatus: "Active", expireDate: "2025-01-10", response: "", checked: false, verify: "E", downloadUrl: "https://example.com/sample1.csv" },
    { id: 2, slno: 2, aadharNo: "9123 4567 8901", mobileNo: "9876501234", eobStatus: "Inactive", expireDate: "2024-12-31", response: "API pending", checked: true, verify: "F", downloadUrl: "https://example.com/sample2.csv" },
    { id: 3, slno: 3, aadharNo: "1234 5678 9012", mobileNo: "9123456780", eobStatus: "Pending", expireDate: "2025-02-15", response: "", checked: false, verify: "E" },
  ];
  const [rows, setRows] = useState<EobRow[]>(initialRows);
  const [formOpen, setFormOpen] = useState(false);

  const columns = [
    { key: "slno", label: "SlNo", searchable: false, type: "text" },
    { key: "aadharNo", label: "AadharNo", searchable: true, type: "text" },
    { key: "mobileNo", label: "MobileNo", searchable: true, type: "text" },
    { key: "eobStatus", label: "EOB Status", searchable: true, type: "badge" },
    { key: "expireDate", label: "ExpireDate", searchable: false, type: "text" },
    { key: "response", label: "Response", searchable: true, type: "text" },
  ];

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="rounded-2xl bg-white shadow-sm mb-6 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">E-Onboarding</h1>
          <p className="text-sm text-slate-500">Manage employees</p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="rounded-2xl bg-white shadow-sm">
        <DataTable
          data={rows}
          columns={columns}
          options={{ search: true, checkbox: true }}
        />
      </div>

      <ModelForm
        open={formOpen}
        title="Add User"
        fields={columns.filter((c) => c.key !== "slno")}
        onClose={() => setFormOpen(false)}
        onSubmit={(vals) => {
          const nextId = (rows[rows.length - 1]?.id || 0) + 1;
          const nextSl = (rows[rows.length - 1]?.slno || 0) + 1;
          const newRow: EobRow = {
            id: nextId,
            slno: nextSl,
            aadharNo: String(vals.aadharNo ?? ""),
            mobileNo: String(vals.mobileNo ?? ""),
            eobStatus: (vals.eobStatus as EobRow["eobStatus"]) || "Pending",
            expireDate: String(vals.expireDate ?? ""),
            response: String(vals.response ?? ""),
            checked: Boolean(vals.checked ?? false),
            verify: (vals.verify as EobRow["verify"]) || "E",
            downloadUrl: String(vals.downloadUrl ?? ""),
          };
          setRows((prev) => [...prev, newRow]);
        }}
      />
    </div>
  );
}
