import type { Metadata } from "next";
import Link from "next/link";
import RoofLoadCalculator from "@/components/RoofLoadCalculator";

export const metadata: Metadata = { title: "Opterećenje na kosoj ravni | KMK Alati" };

export default function RoofLoadPage() {
  return <main className="flex-1 bg-background text-foreground"><div className="mx-auto max-w-7xl px-6 py-12 md:px-10"><Link href="/alati" className="text-base text-accent hover:underline">← Svi alati</Link><RoofLoadCalculator /></div></main>;
}
