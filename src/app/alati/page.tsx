import type { Metadata } from "next";
import RoofLoadCalculator from "@/components/RoofLoadCalculator";

export const metadata: Metadata = {
  title: "Alati | KMK Structural Solutions",
  description:
    "Online alati za proračune u građevinarstvu i projektovanju konstrukcija.",
};

export default function AlatiPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-24">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          KMK Structural Solutions / Alati
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Alati za proračune
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg">
          Online alati za podršku svakodnevnom radu u projektovanju konstrukcija.
          Na jednom mestu, uz jasan unos podataka i pregledne rezultate proračuna.
        </p>

        <RoofLoadCalculator />
      </section>
    </main>
  );
}
