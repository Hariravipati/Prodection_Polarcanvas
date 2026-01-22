import React from 'react';
import LabelInput from './LabelInput';

interface RatesAndConversionProps {
  ratePerKg: number;
  printingCharges: number;
  transportCharges: number;
  margin: number;
  valueBox: number;
  onRatePerKgChange: (value: number) => void;
  onPrintingChargesChange: (value: number) => void;
  onTransportChargesChange: (value: number) => void;
  onMarginChange: (value: number) => void;
}

const RatesAndConversion: React.FC<RatesAndConversionProps> = ({
  ratePerKg,
  printingCharges,
  transportCharges,
  margin,
  valueBox,
  onRatePerKgChange,
  onPrintingChargesChange,
  onTransportChargesChange,
  onMarginChange,
}) => {
  return (
    <div>
      <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-2">Rates & Conversion</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <LabelInput 
          label="Rate/KG" 
          value={ratePerKg} 
          onChange={(e) => onRatePerKgChange(Number((e.target as HTMLInputElement).value))} 
        />
        <LabelInput 
          label="Val/BOX" 
          value={valueBox.toFixed(3)} 
          onChange={() => {}} 
          readOnly 
          isBold 
        />
        <LabelInput 
          label="Printing" 
          value={printingCharges} 
          onChange={(e) => onPrintingChargesChange(Number((e.target as HTMLInputElement).value))} 
        />
        <LabelInput 
          label="Transport" 
          value={transportCharges} 
          onChange={(e) => onTransportChargesChange(Number((e.target as HTMLInputElement).value))} 
        />
        <LabelInput 
          label="Margin %" 
          value={margin} 
          onChange={(e) => onMarginChange(Number((e.target as HTMLInputElement).value))} 
        />
      </div>
    </div>
  );
};

export default RatesAndConversion;
