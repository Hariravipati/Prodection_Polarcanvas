interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, total, limit, onChange }: Props) {
  const pages = Math.ceil(total / limit);

  return (
    <div className="flex items-center justify-end my-2">
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="h-9 text-sm rounded-lg bg-white disabled:opacity-50 hover:bg-slate-50 text-slate-700"
        >
          Prev
        </button>
        {Array.from({ length: pages || 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`h-7 text-sm px-2 rounded-lg ${
              page === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-slate-50 text-slate-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onChange(Math.min(pages || 1, page + 1))}
          disabled={page >= (pages || 1)}
          className="h-9 text-sm rounded-lg bg-white disabled:opacity-50 hover:bg-slate-50 text-slate-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
