export interface Column<T> {
  key: keyof T | string;
  label: string;
  searchable?: boolean;
  render?: (row: T) => React.ReactNode;
  type?: "text" | "badge" | "checkbox" | "radio" | "download" | "action";
  visible?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export interface TableOptions {
  search?: boolean;
  checkbox?: boolean;
  radio?: boolean;
  download?: boolean;
  toolbarButtons?: {
    upload?: boolean;
    bulkUpload?: boolean;
    download?: boolean;
  };
}
