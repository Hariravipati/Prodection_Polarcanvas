const ToggleInput = ({ label }: any) => (
  <div className="flex items-center space-x-3 mt-6">
    <span className="text-sm">{label}</span>

    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />

      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-purple-600 
            rounded-full peer transition-all"></div>
    </label>
  </div>
);
export default ToggleInput;
