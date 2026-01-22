import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({ onView, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={onView}
        title="View"
        className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 text-slate-600 transition"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={onEdit}
        title="Edit"
        className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 text-slate-600 transition"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        title="Delete"
        className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 text-slate-600 transition"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
