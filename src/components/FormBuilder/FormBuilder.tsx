import React, { useState } from "react";
import { FormJson, Field } from "../../types/@types.formbuilder";
import { 
  User, FileText, Phone, BookOpen, Briefcase, Wallet, Settings, 
  Send, Trash2, ChevronRight, ChevronLeft, CheckCircle2 
} from "lucide-react";

// Input Components
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";
import DateInput from "./inputs/DateInput";
import SelectInput from "./inputs/SelectInput";
import ToggleInput from "./inputs/ToggleInput";
import PillsInput from "./inputs/PillsInput";

interface Props {
  json: FormJson;
}

const iconMap: Record<string, React.ElementType> = {
  User, FileText, Phone, BookOpen, Briefcase, Wallet, Settings, Send, Trash2
};

const FormBuilder: React.FC<Props> = ({ json }) => {
  const [activeTab, setActiveTab] = useState(json.tabs[0].id);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  const handleUpdate = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getFieldComponent = (field: Field) => {
    const value = formData[field.name] ?? (field.type === "pills" ? [] : "");
    const props = { field, value, onChange: (v: any) => handleUpdate(field.name, v) };

    switch (field.type) {
      case "text": return <TextInput {...props} />;
      case "number": return <NumberInput {...props} />;
      case "date": return <DateInput {...props} />;
      case "select": return <SelectInput {...props} />;
      case "toggle": return <ToggleInput {...props} value={!!value} />;
      case "pills": return <PillsInput {...props} value={value || []} />;
      default: return <p className="text-red-500">Unknown field: {field.type}</p>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const currentTabIndex = json.tabs.findIndex((t) => t.id === activeTab);
  const currentTab = json.tabs[currentTabIndex];
  const isLastTab = currentTabIndex === json.tabs.length - 1;
  const isFirstTab = currentTabIndex === 0;

  const handleNext = () => {
    if (!isLastTab) {
      if (!completedTabs.includes(activeTab)) {
        setCompletedTabs([...completedTabs, activeTab]);
      }
      setActiveTab(json.tabs[currentTabIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (!isFirstTab) {
      setActiveTab(json.tabs[currentTabIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 bg-gray-50/50 min-h-[calc(100vh-64px)] p-6">

      {/* LEFT SIDEBAR NAVIGATION */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
          <div className="mb-6 px-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {json.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Complete all steps below</p>
          </div>

          <div className="flex flex-col gap-2">
            {json.tabs.map((tab, index) => {
              const Icon = iconMap[tab.icon || "User"] || User;
              const isActive = activeTab === tab.id;
              const isCompleted = completedTabs.includes(tab.id);

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full text-left px-4 py-3.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 group outline-none focus:ring-2 focus:ring-blue-100
                    ${isActive 
                      ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors
                    ${isActive ? "bg-blue-100 text-blue-600" : isCompleted ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}>
                    {isCompleted && !isActive ? <CheckCircle2 size={16} /> : <Icon size={18} />}
                  </div>
                  
                  <span className="flex-1">{tab.label}</span>
                  
                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
          <div className="mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
                Step {currentTabIndex + 1} of {json.tabs.length}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentTab?.label}
            </h3>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Please fill in the details for {currentTab?.label.toLowerCase()}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              {currentTab?.fields.map((field) => (
                <div key={field.name} className={`flex flex-col ${field.type === 'pills' || field.width === 'full' ? 'lg:col-span-2' : ''}`}>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <div className="relative group">{getFieldComponent(field)}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isFirstTab}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200
                  ${isFirstTab 
                    ? "text-gray-300 cursor-not-allowed" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200"
                  }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              {isLastTab ? (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-95 transition-all duration-200"
                >
                  <Send size={18} />
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white rounded-xl font-semibold shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-gray-900/30 active:scale-95 transition-all duration-200"
                >
                  Next Step
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;