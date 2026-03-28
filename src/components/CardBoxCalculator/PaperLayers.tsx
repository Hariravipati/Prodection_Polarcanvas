import React from 'react';
import LabelInput from './LabelInput';

interface PaperLayer {
  gsm: number | '';
  bf: number | '';
}

interface PaperLayersProps {
  layers: {
    top: PaperLayer;
    bFlute: PaperLayer;
    bLiner: PaperLayer;
    cFlute: PaperLayer;
    cLiner: PaperLayer;
    aFlute: PaperLayer;
    aLiner: PaperLayer;
  };
  onLayerChange: (layer: string, field: 'gsm' | 'bf', value: string) => void;
}

const LayerInput: React.FC<{
  label: string;
  gsm: number | '';
  bf: number | '';
  onGsmChange: (value: string) => void;
  onBfChange: (value: string) => void;
}> = ({ label, gsm, bf, onGsmChange, onBfChange }) => (
  <div className="grid grid-cols-2 gap-2">
    <LabelInput label={`${label} GSM`} value={gsm} onChange={(e) => onGsmChange(e.target.value)} />
    <LabelInput label={`${label} BF`} value={bf} onChange={(e) => onBfChange(e.target.value)} />
  </div>
);

const PaperLayers: React.FC<PaperLayersProps> = ({ layers, onLayerChange }) => {
  return (
    <div>
      <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-2">Paper Layers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <LayerInput 
          label="Top" 
          gsm={layers.top.gsm} 
          bf={layers.top.bf}
          onGsmChange={(val) => onLayerChange('top', 'gsm', val)}
          onBfChange={(val) => onLayerChange('top', 'bf', val)}
        />
        <LayerInput 
          label="BF" 
          gsm={layers.bFlute.gsm} 
          bf={layers.bFlute.bf}
          onGsmChange={(val) => onLayerChange('bFlute', 'gsm', val)}
          onBfChange={(val) => onLayerChange('bFlute', 'bf', val)}
        />
        <LayerInput 
          label="BL" 
          gsm={layers.bLiner.gsm} 
          bf={layers.bLiner.bf}
          onGsmChange={(val) => onLayerChange('bLiner', 'gsm', val)}
          onBfChange={(val) => onLayerChange('bLiner', 'bf', val)}
        />
        <LayerInput 
          label="CF" 
          gsm={layers.cFlute.gsm} 
          bf={layers.cFlute.bf}
          onGsmChange={(val) => onLayerChange('cFlute', 'gsm', val)}
          onBfChange={(val) => onLayerChange('cFlute', 'bf', val)}
        />
        <LayerInput 
          label="CL" 
          gsm={layers.cLiner.gsm} 
          bf={layers.cLiner.bf}
          onGsmChange={(val) => onLayerChange('cLiner', 'gsm', val)}
          onBfChange={(val) => onLayerChange('cLiner', 'bf', val)}
        />
        <LayerInput 
          label="AF" 
          gsm={layers.aFlute.gsm} 
          bf={layers.aFlute.bf}
          onGsmChange={(val) => onLayerChange('aFlute', 'gsm', val)}
          onBfChange={(val) => onLayerChange('aFlute', 'bf', val)}
        />
        <LayerInput 
          label="AL" 
          gsm={layers.aLiner.gsm} 
          bf={layers.aLiner.bf}
          onGsmChange={(val) => onLayerChange('aLiner', 'gsm', val)}
          onBfChange={(val) => onLayerChange('aLiner', 'bf', val)}
        />
      </div>
    </div>
  );
};

export default PaperLayers;
