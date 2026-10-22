import type { Metadata } from "next";
import Link from "next/link";

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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { href: "/alati/opterecenje-na-kosoj-ravni", category: "Opterećenja", title: "Opterećenje na kosoj ravni", description: "Transformacija linijskog opterećenja i razlaganje na lokalne i globalne komponente, uz interaktivne dijagrame." },
            { href: "/alati/zastitni-sloj", category: "Betonske konstrukcije · Srbija", title: "Zaštitni sloj betona", description: "Proračun nominalnog zaštitnog sloja armature prema SRPS EN 1992-1-1 i srpskom nacionalnom aneksu." },
          ].map(tool => <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-slate-800 bg-surface/50 p-7 transition hover:border-accent/60 hover:bg-surface">
            <svg viewBox="0 0 32 28" fill="none" aria-hidden="true" className="mb-6 h-9 w-10 text-accent"><path d="M2 7V4a2 2 0 0 1 2-2h8l4 5h12a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5" /></svg>
            <p className="text-xs uppercase tracking-widest text-accent">{tool.category}</p><h2 className="mt-3 text-2xl font-semibold">{tool.title}</h2><p className="mt-4 text-base leading-7 text-muted">{tool.description}</p><span className="mt-6 inline-block text-sm font-medium text-accent">Otvori alat →</span>
          </Link>)}
        </div>
      </section>
    </main>
  );
}
