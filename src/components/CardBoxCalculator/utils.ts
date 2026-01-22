export const ceilToThreeDecimals = (num: number): number => 
  Math.ceil(num * 1000) / 1000;

export const FLUTE_MULTIPLIERS = {
  wastage: 1.05,
  b: 1.35,
  c: 1.45,
  a: 1.45,
};

export const DEFAULT_VALUES = {
  dimensions: { length: 0, breadth: 0, height: 0 },
  paperLayers: {
    top: { gsm: 120, bf: 16 },
    bFlute: { gsm: 120, bf: 16 },
    bLiner: { gsm: 120, bf: 16 },
    cFlute: { gsm: 0, bf: 0 },
    cLiner: { gsm: 0, bf: 0 },
    aFlute: { gsm: 0, bf: 0 },
    aLiner: { gsm: 0, bf: 0 },
  },
  prices: {
    topPr: 30,
    bFlutePr: 30,
    bLinerPr: 30,
    cFlutePr: 30,
    cLinerPr: 30,
    aFlutePr: 30,
    aLinerPr: 30,
  },
  conversion: {
    ratePerKg: 10,
    printingCharges: 0,
    transportCharges: 0,
    margin: 5,
  },
};

export const calculateDeckle = (length: number, breadth: number, height: number) => {
  const deckleSize = (breadth + height + 20) / 10;
  const deckleLength = (length + breadth + length + breadth + 50) / 10;
  return { deckleSize, deckleLength };
};

export const calculateWeightPerReem = (
  deckleSize: number,
  deckleLength: number,
  gsm: number,
  multiplier: number = 1
): number => {
  return ceilToThreeDecimals(
    ((deckleSize / 100) * (deckleLength / 100) * (gsm / 1000) * multiplier) * FLUTE_MULTIPLIERS.wastage
  );
};

export const calculateCostPerBox = (
  wprTop: number, wprBF: number, wprBL: number,
  wprCF: number, wprCL: number, wprAF: number, wprAL: number,
  topPr: number, bFlutePr: number, bLinerPr: number,
  cFlutePr: number, cLinerPr: number, aFlutePr: number, aLinerPr: number
): number => {
  return (
    ceilToThreeDecimals(topPr * wprTop) +
    ceilToThreeDecimals(bFlutePr * wprBF) +
    ceilToThreeDecimals(bLinerPr * wprBL) +
    ceilToThreeDecimals(cFlutePr * wprCF) +
    ceilToThreeDecimals(cLinerPr * wprCL) +
    ceilToThreeDecimals(aFlutePr * wprAF) +
    ceilToThreeDecimals(aLinerPr * wprAL)
  );
};

export const calculateFinalPrice = (
  costPerBox: number,
  valueBox: number,
  printingCharges: number,
  transportCharges: number,
  margin: number
): { totalCost: number; price: number } => {
  const totalCalc = ceilToThreeDecimals(
    (costPerBox + valueBox + printingCharges + transportCharges) * (margin / 100)
  );
  const totalCost = costPerBox + valueBox + printingCharges + totalCalc;
  const price = ceilToThreeDecimals(totalCost);
  return { totalCost, price };
};
