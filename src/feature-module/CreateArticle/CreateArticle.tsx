import React, { useState } from "react";
import { articleService } from "../../services/articleService";

interface PaperSpec {
  item: string;
  unit: string;
  size: string;
  color: string;
  gsm: string;
  bf: string;
  qty: string;
}

export default function CreateArticle() {
  const [formData, setFormData] = useState({
    customer: "",
    articleName: "",
    hsnCode: "",
    unit: "PCS",
    gst: "12",
    date: "",
    type: "Box",
    noOfPly: "3",
    fluteType: "A",
    ups: "1",
    boxWeight: "0",
    sqMtr: "",
    route: "Gluing",
    dimension: "ID",
    length: "",
    width: "",
    height: "",
    uom: "MM",
    od: "5.0",
    odWidth: "3.0",
    odHeight: "3.0",
    boardMargin: "20",
    reelMargin: "20",
    sheetSize: "29 X 36",
    rotarySize: "3 X 3 X 3 = 9",
    boardCuttingSize: "36",
    reelSize: "",
    boardGsm: "",
    burstingStrength: "",
    rate: "0",
    pcsPerBundle: "1",
    compressionStrength: "",
    moisture: "",
    printing: "",
    color: "",
    artWork: "",
    blockCode: "",
    minStock: "0",
    remarks: "",
    paperSpecs: "Top"
  });

  const [paperSpecsList, setPaperSpecsList] = useState<PaperSpec[]>([]);
  const [currentSpec, setCurrentSpec] = useState<PaperSpec>({
    item: "",
    unit: "",
    size: "",
    color: "",
    gsm: "",
    bf: "",
    qty: ""
  });

  const handleAdd = () => {
    if (currentSpec.item) {
      setPaperSpecsList([...paperSpecsList, currentSpec]);
      setCurrentSpec({ item: "", unit: "", size: "", color: "", gsm: "", bf: "", qty: "" });
    }
  };

  const handleRemove = () => {
    if (paperSpecsList.length > 0) {
      setPaperSpecsList(paperSpecsList.slice(0, -1));
    }
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData, paperSpecsList };
      const response = await articleService.createArticle(payload);
      console.log("Article saved:", response);
      alert("Article created successfully!");
      resetAll();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article: " + error.message);
    }
  };

  const resetAll = () => {
    setFormData({
      customer: "", articleName: "", hsnCode: "", unit: "PCS", gst: "12", date: "",
      type: "Box", noOfPly: "3", fluteType: "A", ups: "1", boxWeight: "0", sqMtr: "",
      route: "Gluing", dimension: "ID", length: "", width: "", height: "", uom: "MM",
      od: "5.0", odWidth: "3.0", odHeight: "3.0", boardMargin: "20", reelMargin: "20",
      sheetSize: "29 X 36", rotarySize: "3 X 3 X 3 = 9", boardCuttingSize: "36",
      reelSize: "", boardGsm: "", burstingStrength: "", rate: "0", pcsPerBundle: "1",
      compressionStrength: "", moisture: "", printing: "", color: "", artWork: "",
      blockCode: "", minStock: "0", remarks: "", paperSpecs: "Top"
    });
    setPaperSpecsList([]);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600">Create Article</h1>
          <button onClick={resetAll} className="px-3 py-1 text-xs sm:text-sm text-red-600 font-semibold rounded hover:bg-red-50" title="Refresh">↻</button>
        </div>

        <form className="grid grid-cols-1 gap-4 sm:gap-6">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Customer</label>
                <select value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option value="customer1">Customer 1</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs text-gray-700">Article Name</label>
                <input type="text" value={formData.articleName} onChange={(e) => setFormData({...formData, articleName: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">HSN Code</label>
                <input type="text" value={formData.hsnCode} onChange={(e) => setFormData({...formData, hsnCode: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Unit</label>
                <select value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="PCS">PCS</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">GST %</label>
                <select value={formData.gst} onChange={(e) => setFormData({...formData, gst: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="12">12</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Type & Configuration</h2>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Type</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="Box">Box</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">No. Of Ply</label>
                <select value={formData.noOfPly} onChange={(e) => setFormData({...formData, noOfPly: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Flute Type</label>
                <select value={formData.fluteType} onChange={(e) => setFormData({...formData, fluteType: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="A">A</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Ups</label>
                <select value={formData.ups} onChange={(e) => setFormData({...formData, ups: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="1">1</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Box Weight</label>
                <input type="text" value={formData.boxWeight} onChange={(e) => setFormData({...formData, boxWeight: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">SqMtr</label>
                <input type="text" value={formData.sqMtr} onChange={(e) => setFormData({...formData, sqMtr: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Route</label>
                <select value={formData.route} onChange={(e) => setFormData({...formData, route: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="Gluing">Gluing</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Dimensions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
              <div className="flex items-center gap-2">
                <input type="radio" checked={formData.dimension === "ID"} onChange={() => setFormData({...formData, dimension: "ID"})} />
                <span className="text-xs">ID</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Length</label>
                <input type="text" placeholder="1" value={formData.length} onChange={(e) => setFormData({...formData, length: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Width</label>
                <input type="text" value={formData.width} onChange={(e) => setFormData({...formData, width: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Height</label>
                <input type="text" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">UoM</label>
                <select value={formData.uom} onChange={(e) => setFormData({...formData, uom: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="MM">MM</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div className="flex items-center gap-2">
                <input type="radio" checked={formData.dimension === "OD"} onChange={() => setFormData({...formData, dimension: "OD"})} />
                <span className="text-xs">OD</span>
              </div>
              <div className="flex flex-col gap-1">
                <input type="text" value={formData.od} onChange={(e) => setFormData({...formData, od: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <input type="text" value={formData.odWidth} onChange={(e) => setFormData({...formData, odWidth: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <input type="text" value={formData.odHeight} onChange={(e) => setFormData({...formData, odHeight: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Margins & Sizes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Board Margin</label><select value={formData.boardMargin} onChange={(e) => setFormData({...formData, boardMargin: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"><option value="20">20</option></select></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Reel Margin</label><select value={formData.reelMargin} onChange={(e) => setFormData({...formData, reelMargin: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"><option value="20">20</option></select></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Sheet Size</label><input type="text" value={formData.sheetSize} onChange={(e) => setFormData({...formData, sheetSize: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Rotary Size</label><input type="text" value={formData.rotarySize} onChange={(e) => setFormData({...formData, rotarySize: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Board Cutting Size</label><input type="text" value={formData.boardCuttingSize} onChange={(e) => setFormData({...formData, boardCuttingSize: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Reel Size</label><input type="text" value={formData.reelSize} onChange={(e) => setFormData({...formData, reelSize: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Board GSM</label><input type="text" value={formData.boardGsm} onChange={(e) => setFormData({...formData, boardGsm: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Bursting Strength</label><input type="text" value={formData.burstingStrength} onChange={(e) => setFormData({...formData, burstingStrength: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Rate</label><input type="text" value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Pcs Per Bundle</label><input type="text" value={formData.pcsPerBundle} onChange={(e) => setFormData({...formData, pcsPerBundle: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Additional Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Compression Strength</label><input type="text" value={formData.compressionStrength} onChange={(e) => setFormData({...formData, compressionStrength: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Moisture</label><input type="text" value={formData.moisture} onChange={(e) => setFormData({...formData, moisture: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Printing</label><input type="text" value={formData.printing} onChange={(e) => setFormData({...formData, printing: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Color</label><input type="text" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Art Work</label><input type="text" value={formData.artWork} onChange={(e) => setFormData({...formData, artWork: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Block Code</label><input type="text" value={formData.blockCode} onChange={(e) => setFormData({...formData, blockCode: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Min. Stock</label><input type="text" value={formData.minStock} onChange={(e) => setFormData({...formData, minStock: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Remarks</label><input type="text" value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Paper Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-8 gap-2 mb-2">
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Paper Specs</label><select value={formData.paperSpecs} onChange={(e) => setFormData({...formData, paperSpecs: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"><option value="Top">Top</option></select></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Item</label><input type="text" value={currentSpec.item} onChange={(e) => setCurrentSpec({...currentSpec, item: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Unit</label><input type="text" value={currentSpec.unit} onChange={(e) => setCurrentSpec({...currentSpec, unit: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Size</label><input type="text" value={currentSpec.size} onChange={(e) => setCurrentSpec({...currentSpec, size: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Color</label><input type="text" value={currentSpec.color} onChange={(e) => setCurrentSpec({...currentSpec, color: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">GSM</label><input type="text" value={currentSpec.gsm} onChange={(e) => setCurrentSpec({...currentSpec, gsm: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">BF</label><input type="text" value={currentSpec.bf} onChange={(e) => setCurrentSpec({...currentSpec, bf: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
              <div className="flex flex-col gap-1"><label className="text-xs text-gray-700">Qty</label><input type="text" value={currentSpec.qty} onChange={(e) => setCurrentSpec({...currentSpec, qty: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
            </div>
            <div className="flex gap-2 mb-3">
              <button type="button" onClick={handleAdd} className="px-4 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
              <button type="button" onClick={handleRemove} className="px-4 py-2 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Remove</button>
            </div>
            <div className="bg-gray-50 border rounded p-2 min-h-[100px]">
              <table className="w-full text-xs">
                <thead><tr className="border-b bg-gray-100"><th className="text-left p-2">Paper Specs</th><th className="text-left p-2">Item</th><th className="text-left p-2">Unit</th><th className="text-left p-2">Size</th><th className="text-left p-2">Color</th><th className="text-left p-2">GSM</th><th className="text-left p-2">BF</th><th className="text-left p-2">Qty</th></tr></thead>
                <tbody>{paperSpecsList.map((spec, idx) => (<tr key={idx} className="border-b hover:bg-gray-50"><td className="p-2">{formData.paperSpecs}</td><td className="p-2">{spec.item}</td><td className="p-2">{spec.unit}</td><td className="p-2">{spec.size}</td><td className="p-2">{spec.color}</td><td className="p-2">{spec.gsm}</td><td className="p-2">{spec.bf}</td><td className="p-2">{spec.qty}</td></tr>))}</tbody>
              </table>
            </div>
          </section>

          <div className="flex justify-center gap-3 pt-2">
            <button type="button" onClick={handleSave} className="px-6 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            <button type="button" onClick={resetAll} className="px-6 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
