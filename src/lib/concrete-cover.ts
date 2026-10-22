// Source: user-supplied SRPS EN 1992-1-1:2015, §4.4.1, tables 4.2–4.4N;
// SRPS EN 1992-1-1/NA:2015, §2.19–2.26. Units: mm.
// Country-specific data is kept separate from the calculation for future annexes.
export const serbiaCover = {
  country: "Srbija", standard: "SRPS EN 1992-1-1:2015", annex: "SRPS EN 1992-1-1/NA:2015",
  baseClass: 4, minClass: 1, deviation: 10,
  durabilitySafety: 0, stainlessReduction: 0, protectionReduction: 0,
  abrasion: { none: 0, XM1: 5, XM2: 10, XM3: 15 },
  ground: { formwork: 0, prepared: 40, soil: 75 },
  // Columns: X0, XC1, XC2/3, XC4, XD1/XS1, XD2/XS2, XD3/XS3.
  durability: [
    [10, 10, 10, 15, 20, 25, 30], [10, 10, 15, 20, 25, 30, 35],
    [10, 10, 20, 25, 30, 35, 40], [10, 15, 25, 30, 35, 40, 45],
    [15, 20, 30, 35, 40, 45, 50], [20, 25, 35, 40, 45, 50, 55],
  ],
} as const;

export const exposures = {
  X0: { column: 0, strength: 30, label: "Bez rizika od korozije" },
  XC1: { column: 1, strength: 30, label: "Suva ili trajno vlažna sredina" },
  XC2: { column: 2, strength: 35, label: "Vlažno, retko suvo" },
  XC3: { column: 2, strength: 35, label: "Umerena vlažnost" },
  XC4: { column: 3, strength: 40, label: "Naizmenično vlažno i suvo" },
  XD1: { column: 4, strength: 40, label: "Hloridi, umerena vlažnost" },
  XD2: { column: 5, strength: 40, label: "Hloridi, vlažno, retko suvo" },
  XD3: { column: 6, strength: 45, label: "Hloridi, naizmenično vlažno i suvo" },
  XS1: { column: 4, strength: 40, label: "Morske soli u vazduhu" },
  XS2: { column: 5, strength: 45, label: "Trajno potopljeno u morsku vodu" },
  XS3: { column: 6, strength: 45, label: "Plima, prskanje i kvašenje morskom vodom" },
} as const;

export type Exposure = keyof typeof exposures;
export type CoverInput = {
  exposure: Exposure; life: 50 | 100; strength: number;
  slab: boolean; quality: boolean;
  diameter: number; aggregate: number;
  abrasion: keyof typeof serbiaCover.abrasion;
  ground: keyof typeof serbiaCover.ground;
  irregular: boolean;
  control: "normal" | "measured" | "precise";
  deviation: number;
};

export function calculateCover(input: CoverInput) {
  const profile = serbiaCover;
  const exp = exposures[input.exposure];
  const minDeviation = input.control === "normal" ? 10 : input.control === "measured" ? 5 : 0;
  if (!exp || ![50, 100].includes(input.life) || ![12,16,20,25,30,35,40,45,50,55,60,70,80,90].includes(input.strength)
    || !Number.isInteger(input.diameter) || input.diameter < 4 || input.diameter > 32 || input.diameter % 2 !== 0
    || !Number.isFinite(input.aggregate) || input.aggregate <= 0 || input.aggregate > 125
    || !Number.isFinite(input.deviation) || input.deviation < minDeviation || input.deviation > 10
    || !(input.abrasion in profile.abrasion) || !(input.ground in profile.ground)) {
    throw new Error("Proverite ulazne vrednosti i dozvoljeni opseg dodatka za izvođenje.");
  }
  const strengthEligible = input.strength >= exp.strength;
  const lifeDelta = input.life === 100 ? 2 : 0;
  const strengthDelta = strengthEligible ? -1 : 0;
  const slabDelta = input.slab ? -1 : 0;
  const qualityDelta = input.quality ? -1 : 0;
  const structuralClass = Math.max(profile.minClass, profile.baseClass + lifeDelta + strengthDelta + slabDelta + qualityDelta);
  const bond = input.diameter + (input.aggregate > 32 ? 5 : 0);
  const durability = profile.durability[structuralClass - 1][exp.column];
  const baseMinimum = Math.max(bond, durability + profile.durabilitySafety - profile.stainlessReduction - profile.protectionReduction, 10);
  const surface = input.irregular ? 5 : 0;
  const abrasion = profile.abrasion[input.abrasion];
  const ground = profile.ground[input.ground];
  // §4.4.1.3(4) states a minimum cover of k1/k2 for uneven substrates.
  // Apply this floor to c_min before adding the execution allowance.
  const minimum = Math.max(baseMinimum + surface + abrasion, ground);
  const nominal = minimum + input.deviation;
  return { structuralClass, strengthEligible, lifeDelta, strengthDelta, slabDelta, qualityDelta,
    bond, durability, baseMinimum, surface, abrasion, ground, minimum, deviation: input.deviation,
    nominal };
}
