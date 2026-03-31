import { EobRow } from "@/types/@types.Master";

export const getEobData = async (): Promise<EobRow[]> => {
  return [
    {
      id: 1,
      slno: 1,
      aadharNo: "222 222 2222",
      mobileNo: "9876543210",
      eobStatus: "Active",
      expireDate: "2025-01-10",
      response: ""
    },
    {
      id: 2,
      slno: 2,
      aadharNo: "9123 4567 8901",
      mobileNo: "9876501234",
      eobStatus: "Inactive",
      expireDate: "2024-12-31",
      response: "AP pending"
    },
    {
      id: 3,
      slno: 3,
      aadharNo: "1234 5678 9012",
      mobileNo: "9123456780",
      eobStatus: "Pending",
      expireDate: "2025-02-15",
      response: ""
    }
  ];
};

export const addOrEditEobData = async (row: EobRow, isEdit: boolean): Promise<EobRow> => {
  
  return row.id ? row : { ...row, id: Date.now() };
};

export const deleteEobData = async (id: number): Promise<number> => {
  return id;
};
