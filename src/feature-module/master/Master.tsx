import React, { useState, useEffect } from "react";
import DataTable from "@/components/Table/DataTable";
import ModelForm from "@/components/Modals/modelform";
import CrudDynamic from "@/components/CrudDynamic/CrudDynamic";
import { getEobData, addOrEditEobData, deleteEobData } from "@/services/masterService";
import { EobRow } from "@/types/@types.Master";


export default function Master() {

  const [activeTab, setActiveTab] = useState("eob");
  const [rows, setRows] = useState<EobRow[]>([]);

  useEffect(() => {
    getEobData().then(data => setRows(data));
  }, []);
  
  const [formOpen, setFormOpen] = useState(false);

  const columns: { key: keyof EobRow; label: string; type?: "text" | "number" | "date" | "select"; options?: string[]; required?: boolean }[] = [
    { key: "slno", label: "SL No", type: "number", required: true },
    { key: "aadharNo", label: "Aadhar", required: true },
    { key: "mobileNo", label: "Mobile", required: true },
    { key: "eobStatus", label: "EOB Status", type: "select", options: ["Active", "Inactive", "Pending"], required: true },
    { key: "expireDate", label: "Expire Date", type: "date", required: true },
    { key: "response", label: "Response" }
  ]

  const validateRow = (row: EobRow): string | null => {
    for (const col of columns) {
      if (col.required && !row[col.key]) {
        return `${col.label} is required`;
      }
    }
    
    // Custom validation for Aadhar number
    if (row.aadharNo) {
      const aadharPattern = /^\d{4}\s\d{4}\s\d{4}$/;
      if (!aadharPattern.test(row.aadharNo)) {
        return "Aadhar must be in format: 1234 5678 9012";
      }
    }
    
    return null;
  };

  const onSave = async (row: EobRow, isEdit: boolean) => {
    const error = validateRow(row);
    if (error) {
      alert(error);
      return;
    }
    const savedRow = await addOrEditEobData(row, isEdit);
    setRows(prev =>
      isEdit
        ? prev.map(r => (r.id === row.id ? savedRow : r))
        : [...prev, savedRow]
    );
  };

  const onDelete = async (id: number) => {
    await deleteEobData(id);
    setRows(prev => prev.filter(r => r.id !== id));
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-4 sm:p-6">
        <div className="w-full h-full flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-bold text-blue-600">
              Master page
            </h1>
            <button
              onClick={() => setFormOpen(true)}
              className="px-3 py-1 text-xs sm:text-sm text-red-600 font-semibold rounded hover:bg-red-50"
            >
              Add New
            </button>
          </div>

          {/* Content */}
          <section className="bg-white mt-4 flex-1 rounded shadow p-2">
            <div className="h-full rounded-2xl bg-white">
              {/* Tabs */}
              <div className="flex gap-2 p-2">
                <button
                  onClick={() => setActiveTab("eob")}
                  className={`px-4 py-2 font-medium rounded ${activeTab === "eob" ? "bg-[#00467F] text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  EOB
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-2 font-medium rounded ${activeTab === "users" ? "bg-[#00467F] text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-4 py-2 font-medium rounded ${activeTab === "settings" ? "bg-[#00467F] text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  Settings
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === "eob" && (
                  <CrudDynamic
                    rows={rows}
                    columns={columns}
                    onSave={onSave}
                    onDelete={onDelete}
                  />
                )}
                {activeTab === "users" && <div>Users Content</div>}
                {activeTab === "settings" && <div>Settings Content</div>}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

  );
}