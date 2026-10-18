/*
  The pricing math from SPEC.md, in one place.

  These are placeholder numbers. When a real contractor gives you their prices,
  this is the only file that needs to change.
*/

export type MaterialId = "wood" | "vinyl" | "chain-link" | "aluminum";
export type Height = 4 | 6;

// Price per foot of fence, at 6 ft tall.
export const MATERIALS: { id: MaterialId; name: string; low: number; high: number }[] = [
  { id: "wood", name: "Wood", low: 25, high: 45 },
  { id: "vinyl", name: "Vinyl", low: 30, high: 55 },
  { id: "chain-link", name: "Chain link", low: 15, high: 30 },
  { id: "aluminum", name: "Aluminum", low: 40, high: 70 },
];

export const HEIGHTS: Height[] = [4, 6];

const FOUR_FOOT_DISCOUNT = 0.8; // a 4 ft fence costs 80% of a 6 ft one
const GATE_LOW = 350;
const GATE_HIGH = 650;

// Limits that keep the answers sensible.
export const MAX_LENGTH = 5000;
export const MAX_GATES = 20;

export type Answers = {
  length: number; // feet
  material: MaterialId;
  height: Height;
  gates: number;
};

function findMaterial(id: MaterialId) {
  return MATERIALS.find((m) => m.id === id)!;
}

/* Price per foot for a material at a given height, like { low: 20, high: 36 }. */
export function perFootRange(id: MaterialId, height: Height) {
  const m = findMaterial(id);
  const factor = height === 4 ? FOUR_FOOT_DISCOUNT : 1;
  return { low: m.low * factor, high: m.high * factor };
}

function roundToNearest50(amount: number) {
  return Math.round(amount / 50) * 50;
}

/* The estimate itself: fence cost plus gate cost, rounded to the nearest $50. */
export function estimate(a: Answers) {
  const perFoot = perFootRange(a.material, a.height);
  return {
    low: roundToNearest50(a.length * perFoot.low + a.gates * GATE_LOW),
    high: roundToNearest50(a.length * perFoot.high + a.gates * GATE_HIGH),
  };
}

/* 4100 becomes "$4,100". */
export function formatMoney(amount: number) {
  return "$" + amount.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

/* "150 ft of wood, 6 ft tall, 1 gate." */
export function describeAnswers(a: Answers) {
  const material = findMaterial(a.material).name.toLowerCase();
  const gates = a.gates === 1 ? "1 gate" : `${a.gates} gates`;
  return `${a.length.toLocaleString("en-US")} ft of ${material}, ${a.height} ft tall, ${gates}.`;
}

/* The one-line note under the estimate. */
export function whatMovesThePrice(a: Answers) {
  return a.gates > 0 ? "Material moves this most, then gates." : "Material moves this most, then height.";
}

/* A short version for the signup's note, so you know what fence they priced. */
export function noteForSignup(a: Answers) {
  const { low, high } = estimate(a);
  return `${describeAnswers(a)} Estimate ${formatMoney(low)} to ${formatMoney(high)}.`;
}

/*
  The answers travel in the web address, like /result?length=150&material=wood&height=6&gates=1,
  so the back button and refresh both work. These two functions write and read that.
*/
export function answersToSearch(a: Answers) {
  return new URLSearchParams({
    length: String(a.length),
    material: a.material,
    height: String(a.height),
    gates: String(a.gates),
  }).toString();
}

type ReadableParams = { get(name: string): string | null };

/* Returns the answers, or null if any of them are missing or don't make sense. */
export function answersFromSearch(params: ReadableParams): Answers | null {
  const length = Number(params.get("length"));
  const material = params.get("material") as MaterialId;
  const height = Number(params.get("height")) as Height;
  const gates = Number(params.get("gates"));

  const ok =
    Number.isInteger(length) &&
    length > 0 &&
    length <= MAX_LENGTH &&
    MATERIALS.some((m) => m.id === material) &&
    HEIGHTS.includes(height) &&
    params.get("gates") !== null &&
    Number.isInteger(gates) &&
    gates >= 0 &&
    gates <= MAX_GATES;

  return ok ? { length, material, height, gates } : null;
}
