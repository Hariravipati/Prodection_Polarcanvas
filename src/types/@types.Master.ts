export interface EobRow {
  id: number;
  slno: number;
  aadharNo: string;
  mobileNo: string;
  eobStatus: "Active" | "Inactive" | "Pending";
  expireDate: string;
  response: string;

}