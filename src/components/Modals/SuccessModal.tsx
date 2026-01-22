export default function SuccessModal({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-green-600 font-bold mb-2">Success</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}
