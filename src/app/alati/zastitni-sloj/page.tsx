import type { Metadata } from "next";
import Link from "next/link";
import ConcreteCoverCalculator from "@/components/ConcreteCoverCalculator";

export const metadata: Metadata = { title: "Zaštitni sloj betona — SRPS | KMK Alati", description: "Proračun zaštitnog sloja obične armature prema SRPS EN 1992-1-1:2015 i nacionalnom aneksu Srbije iz 2015." };

export default function ConcreteCoverPage() {
  return <main className="flex-1 bg-background text-foreground"><div className="mx-auto max-w-7xl px-6 py-12 md:px-10"><Link href="/alati" className="text-base text-accent hover:underline">← Svi alati</Link><ConcreteCoverCalculator /></div></main>;
}
