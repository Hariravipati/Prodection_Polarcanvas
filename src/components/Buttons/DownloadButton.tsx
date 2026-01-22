export default function DownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="border px-3 py-2 rounded">
      Download
    </button>
  );
}
