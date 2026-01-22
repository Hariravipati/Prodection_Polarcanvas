import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Column} from "../../types/@types.table"
import { UserPlus, Calendar } from "lucide-react";

type FieldConfig = Pick<Column<any>, "key" | "label" | "type" | "options" | "visible">;

interface Props {
  open: boolean;
  title?: string;
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
}

export default function ModelForm({
  open,
  title = "Add Record",
  fields,
  initialValues = {},
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<Record<string, any>>({
    defaultValues: initialValues,
  });

  const submit = form.handleSubmit((vals) => {
    onSubmit(vals);
    onClose();
  });

  if (!open) return null;

  const visibleFields = fields.filter((f) => f.visible !== false && f.type !== "download" && f.type !== "action");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-xl p-0 border-0 bg-transparent shadow-none">
        <div className="rounded-3xl shadow-xl">
          <div className="rounded-3xl bg-white overflow-hidden">
            <div className="p-5 bg-slate-50">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  <span className="inline-flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-indigo-600" />
                    {title}
                  </span>
                </DialogTitle>
              </DialogHeader>
            </div>

            <div className="p-6 pb-4">
              <Form {...form}>
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {visibleFields.map((f) => {
                      const key = String(f.key);
                      const type = (f.type || "text") as string;
                      return (
                        <FormField
                          key={key}
                          control={form.control}
                          name={key as any}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{f.label}</FormLabel>
                              <FormControl>
                                {type === "radio" ? (
                                  <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-2 py-1">
                                    {(f.options || []).map((opt) => (
                                      <label key={opt.value} className="inline-flex items-center gap-1 px-2 py-1 rounded-full hover:bg-white">
                                        <input
                                          type="radio"
                                          value={opt.value}
                                          checked={field.value === opt.value}
                                          onChange={() => field.onChange(opt.value)}
                                        />
                                        <span className="text-sm">{opt.label}</span>
                                      </label>
                                    ))}
                                  </div>
                                ) : type === "badge" ? (
                                  <select
                                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none shadow-sm focus:ring-0 focus-visible:ring-0 focus:border-indigo-500"
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                  >
                                    <option value="">Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                  </select>
                                ) : type === "checkbox" ? (
                                  <label className="inline-flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={!!field.value}
                                      onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                    <span className="text-sm">Checked</span>
                                  </label>
                                ) : key.toLowerCase().includes("date") ? (
                                  <Input
                                    className="bg-white rounded-xl border-slate-200 shadow-sm focus:ring-0 focus-visible:ring-0 focus:border-indigo-500 placeholder:text-slate-400 font-normal"
                                    type="date"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                  />
                                ) : (
                                  <Input className="bg-white rounded-xl border-slate-200 shadow-sm focus:ring-0 focus-visible:ring-0 focus:border-indigo-500 placeholder:text-slate-400 font-normal" value={field.value ?? ""} onChange={field.onChange} placeholder={f.label} />
                                )}
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>

                  <DialogFooter className="px-6 py-0">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow hover:opacity-90"
                    >
                      Save
                    </button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
