import React, { useEffect, useState } from 'react';
import BoxDimensions from './BoxDimensions';
import PaperLayers from './PaperLayers';
import RatesAndConversion from './RatesAndConversion';
import {
  ceilToThreeDecimals,
  FLUTE_MULTIPLIERS,
  calculateDeckle,
  calculateWeightPerReem,
  calculateCostPerBox,
  calculateFinalPrice,
} from './utils';

const CardBoxCalculator: React.FC = () => {
  // Dimensions
  const [length, setLength] = useState<number>(0);
  const [breadth, setBreadth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [deckleSize, setDeckleSize] = useState<number>(0);
  const [deckleLength, setDeckleLength] = useState<number>(0);

  // Paper Layers
  const [topGSM, setTopGSM] = useState<number>(120);
  const [topBF, setTopBF] = useState<number>(16);
  const [bFluteGsm, setBFluteGsm] = useState<number>(120);
  const [bFluteBF, setBFluteBF] = useState<number>(16);
  const [bLinerGsm, setBLinerGsm] = useState<number>(120);
  const [bLinerBF, setBLinerBF] = useState<number>(16);
  const [cFluteGsm, setCFluteGsm] = useState<number>(0);
  const [cFluteBF, setCFluteBF] = useState<number>(0);
  const [cLinerGsm, setCLinerGsm] = useState<number>(0);
  const [cLinerBF, setCLinerBF] = useState<number>(0);
  const [aFluteGsm, setAFluteGsm] = useState<number>(0);
  const [aFluteBF, setAFluteBF] = useState<number>(0);
  const [aLinerGsm, setALinerGsm] = useState<number>(0);
  const [aLinerBF, setALinerBF] = useState<number>(0);

  // Conversion
  const [ratePerKg, setRatePerKg] = useState<number>(10);
  const [printingCharges, setPrintingCharges] = useState<number>(0);
  const [transportCharges, setTransportCharges] = useState<number>(0);
  const [margin, setMargin] = useState<number>(5);

  // Results
  const [totalCost, setTotalCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [valueBox, setValueBox] = useState<number>(0);

  // Update deckle size and length when dimensions change
  useEffect(() => {
    const { deckleSize: newSize, deckleLength: newLength } = calculateDeckle(length, breadth, height);
    setDeckleSize(newSize);
    setDeckleLength(newLength);
  }, [length, breadth, height]);

  // Calculate all results whenever relevant values change
  useEffect(() => {
    // Calculate weight per ream for each layer
    const wprTop = calculateWeightPerReem(deckleSize, deckleLength, topGSM);
    const wprBF = calculateWeightPerReem(deckleSize, deckleLength, bFluteGsm, FLUTE_MULTIPLIERS.b);
    const wprBL = calculateWeightPerReem(deckleSize, deckleLength, bLinerGsm);
    const wprCF = calculateWeightPerReem(deckleSize, deckleLength, cFluteGsm, FLUTE_MULTIPLIERS.c);
    const wprCL = calculateWeightPerReem(deckleSize, deckleLength, cLinerGsm);
    const wprAF = calculateWeightPerReem(deckleSize, deckleLength, aFluteGsm, FLUTE_MULTIPLIERS.a);
    const wprAL = calculateWeightPerReem(deckleSize, deckleLength, aLinerGsm);

    // Calculate total board and box weight
    const totalBoard = ceilToThreeDecimals(wprTop + wprBF + wprBL + wprCF + wprCL + wprAF + wprAL);
    const boxWeight = ceilToThreeDecimals(totalBoard / 1);
    const valuePerBox = ceilToThreeDecimals(boxWeight * ratePerKg);
    setValueBox(valuePerBox);

    // Calculate cost per box
    const costPerBox = calculateCostPerBox(
      wprTop, wprBF, wprBL, wprCF, wprCL, wprAF, wprAL,
      topGSM, bFluteGsm, bLinerGsm, cFluteGsm, cLinerGsm, aFluteGsm, aLinerGsm
    );

    // Calculate final price
    const { totalCost: newTotalCost, price: newPrice } = calculateFinalPrice(
      costPerBox,
      valuePerBox,
      printingCharges,
      transportCharges,
      margin
    );

    setTotalCost(newTotalCost);
    setPrice(newPrice);
  }, [
    deckleSize,
    deckleLength,
    topGSM,
    topBF,
    bFluteGsm,
    bFluteBF,
    bLinerGsm,
    bLinerBF,
    cFluteGsm,
    cFluteBF,
    cLinerGsm,
    cLinerBF,
    aFluteGsm,
    aFluteBF,
    aLinerGsm,
    aLinerBF,
    ratePerKg,
    printingCharges,
    transportCharges,
    margin,
  ]);

  const resetAll = () => {
    setLength(0);
    setBreadth(0);
    setHeight(0);
    setTopGSM(120);
    setTopBF(16);
    setBFluteGsm(120);
    setBFluteBF(16);
    setBLinerGsm(120);
    setBLinerBF(16);
    setCFluteGsm(0);
    setCFluteBF(0);
    setCLinerGsm(0);
    setCLinerBF(0);
    setAFluteGsm(0);
    setAFluteBF(0);
    setALinerGsm(0);
    setALinerBF(0);
    setRatePerKg(10);
    setPrintingCharges(0);
    setTransportCharges(0);
    setMargin(5);
  };

  const handleLayerChange = (layer: string, field: 'gsm' | 'bf', value: number) => {
    const setters: Record<string, Record<'gsm' | 'bf', (val: number) => void>> = {
      top: { gsm: setTopGSM, bf: setTopBF },
      bFlute: { gsm: setBFluteGsm, bf: setBFluteBF },
      bLiner: { gsm: setBLinerGsm, bf: setBLinerBF },
      cFlute: { gsm: setCFluteGsm, bf: setCFluteBF },
      cLiner: { gsm: setCLinerGsm, bf: setCLinerBF },
      aFlute: { gsm: setAFluteGsm, bf: setAFluteBF },
      aLiner: { gsm: setALinerGsm, bf: setALinerBF },
    };
    setters[layer][field](value);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600">Card Box Calculator</h1>
          <button 
            onClick={resetAll} 
            className="px-3 py-1 text-xs sm:text-sm text-red-600 font-semibold rounded hover:bg-red-50" 
            title="Refresh"
          >
            ↻
          </button>
        </div>

        <form className="grid grid-cols-1 gap-4 sm:gap-6">
          <BoxDimensions
            length={length}
            breadth={breadth}
            height={height}
            deckleSize={deckleSize}
            deckleLength={deckleLength}
            totalCost={totalCost}
            price={price}
            onLengthChange={setLength}
            onBreadthChange={setBreadth}
            onHeightChange={setHeight}
            onDeckleSizeChange={setDeckleSize}
            onDeckleLengthChange={setDeckleLength}
          />

          <section className="bg-white p-2 sm:p-4 rounded shadow">
            <PaperLayers
              layers={{
                top: { gsm: topGSM, bf: topBF },
                bFlute: { gsm: bFluteGsm, bf: bFluteBF },
                bLiner: { gsm: bLinerGsm, bf: bLinerBF },
                cFlute: { gsm: cFluteGsm, bf: cFluteBF },
                cLiner: { gsm: cLinerGsm, bf: cLinerBF },
                aFlute: { gsm: aFluteGsm, bf: aFluteBF },
                aLiner: { gsm: aLinerGsm, bf: aLinerBF },
              }}
              onLayerChange={handleLayerChange}
            />
          </section>

          <section className="bg-white p-2 sm:p-4 rounded shadow">
            <RatesAndConversion
              ratePerKg={ratePerKg}
              printingCharges={printingCharges}
              transportCharges={transportCharges}
              margin={margin}
              valueBox={valueBox}
              onRatePerKgChange={setRatePerKg}
              onPrintingChargesChange={setPrintingCharges}
              onTransportChargesChange={setTransportCharges}
              onMarginChange={setMargin}
            />
          </section>
        </form>
      </div>
    </div>
  );
};

export default CardBoxCalculator;
