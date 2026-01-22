export type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  width?: string;
  regex?: string;
  min?: number;
  max?: number;
  options?: { label: string; value: string }[];
};

export type Tab = {
  id: string;
  label: string;
  icon?: string;
  fields: Field[];
};

export type Action = {
  id: string;
  label: string;
  type: "submit" | "reset"; // 
  style?: string;
  icon?: string;
};

export type FormJson = {
  title: string;
  description: string;
  layout: "horizontal" | "vertical";
  tabs: Tab[];
  actions: Action[]; 
};
