import React from 'react';
import LabelInput from './LabelInput';

interface BoxDimensionsProps {
  length: number;
  breadth: number;
  height: number;
  deckleSize: number;
  deckleLength: number;
  totalCost: number;
  price: number;
  onLengthChange: (value: number) => void;
  onBreadthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onDeckleSizeChange: (value: number) => void;
  onDeckleLengthChange: (value: number) => void;
}

const BoxDimensions: React.FC<BoxDimensionsProps> = ({
  length,
  breadth,
  height,
  deckleSize,
  deckleLength,
  totalCost,
  price,
  onLengthChange,
  onBreadthChange,
  onHeightChange,
  onDeckleSizeChange,
  onDeckleLengthChange,
}) => {
  return (
    <section className="bg-white p-4 sm:p-4 rounded shadow">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        <div className="sm:col-span-2">
          <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-2">Box Dimensions</h2>
          <div className="grid grid-cols-3 gap-2">
            <LabelInput 
              label="Length" 
              value={length} 
              onChange={(e) => onLengthChange(Number((e.target as HTMLInputElement).value))} 
            />
            <LabelInput 
              label="Breadth" 
              value={breadth} 
              onChange={(e) => onBreadthChange(Number((e.target as HTMLInputElement).value))} 
            />
            <LabelInput 
              label="Height" 
              value={height} 
              onChange={(e) => onHeightChange(Number((e.target as HTMLInputElement).value))} 
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 items-start">
            <div className="bg-white p-2 rounded border border-gray-200">
              <p className="text-xs text-gray-600">Total Cost</p>
              <p className="text-lg font-bold text-red-700">{totalCost.toFixed(2)}</p>
            </div>
            <div />
            <div className="bg-white p-2 rounded border border-gray-200">
              <p className="text-xs text-gray-600">Price</p>
              <p className="text-lg font-bold text-green-700">{price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-1">
          <div className="space-y-2">
            <LabelInput 
              label="SIZE" 
              value={deckleSize.toFixed(2)} 
              onChange={(e) => onDeckleSizeChange(Number((e.target as HTMLInputElement).value))} 
              isBold 
            />
            <LabelInput 
              label="DECKLE L" 
              value={deckleLength.toFixed(2)} 
              onChange={(e) => onDeckleLengthChange(Number((e.target as HTMLInputElement).value))} 
              isBold 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxDimensions;
