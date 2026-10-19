import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Usluge | KMK Structural Solutions",
  description:
    "Projektovanje konstrukcija zgrada i mostova, armaturni planovi i izvođačka dokumentacija, stručno savetovanje i optimizacija.",
};

const services = [
  {
    id: "projektovanje",
    number: "01",
    title: "Projektovanje konstrukcija",
    description:
      "Statička i dinamička analiza, projektovanje armiranobetonskih, čeličnih i prednapregnutih konstrukcija zgrada i mostova, kao i geotehničkih konstrukcija.",
    outcome:
      "Razvoj pouzdanih i racionalnih konstruktivnih rešenja koja objedinjuju sigurnost, trajnost i ekonomičnost izvođenja.",
    details: ["Statička i dinamička analiza", "Zgrade i mostovi", "Geotehničke konstrukcije"],
    drawing: "M12 48V22L32 12l20 10v26M12 22l20 10 20-10M32 32v26M12 35l20 10 20-10M22 17v26M42 17v26",
  },
  {
    id: "armaturni-planovi",
    number: "02",
    title: "Armaturni planovi i izvođačka dokumentacija",
    description:
      "Izrada detaljnih armaturnih planova, karakterističnih preseka, detalja armiranja i specifikacija armature.",
    outcome:
      "Jasna, precizna i međusobno usklađena dokumentacija za pripremu, obračun i izvođenje radova.",
    details: ["Armaturni planovi", "Preseci i detalji armiranja", "Specifikacije armature"],
    drawing: "M14 12h36v40H14zM22 20h20v24H22zM10 24h44M10 40h44M26 8v48M38 8v48",
  },
  {
    id: "savetovanje",
    number: "03",
    title: "Stručno savetovanje i optimizacija",
    description:
      "Tehnička podrška investitorima, izvođačima i projektantima pri izboru materijala, konstruktivnog sistema i načina izvođenja.",
    outcome:
      "Poređenje varijantnih rešenja i primena proverenih tehničkih detalja radi racionalnije potrošnje materijala i smanjenja troškova izvođenja, uz očuvanje sigurnosti i trajnosti konstrukcije.",
    details: ["Izbor konstruktivnog sistema", "Poređenje varijantnih rešenja", "Optimizacija potrošnje materijala"],
    drawing: "M12 50h42M18 42V30h8v12M30 42V22h8v20M42 42V14h8v28M14 22l14-10 10 4 14-10M44 6h8v8",
  },
];

export default function UslugePage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-10 lg:pb-16 lg:pt-24">
          <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            Naše usluge
          </p>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Od analize do <span className="text-accent">detalja izvođenja.</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted md:text-lg">
              Projektovanje, tehnička razrada i savetovanje. Povezujemo proračun
              konstrukcije sa preciznom dokumentacijom i zahtevima gradilišta.
            </p>
          </div>
          <nav aria-label="Pregled usluga" className="mt-10 flex flex-wrap gap-3 lg:mt-14">
            {services.map((service) => (
              <a key={service.id} href={`#${service.id}`} className="inline-flex items-center gap-3 rounded-md border border-slate-700 px-4 py-3 text-sm transition-colors hover:border-accent/60 hover:bg-surface motion-reduce:transition-none">
                <span className="font-mono text-xs text-accent">{service.number}</span>
                {service.number === "01" ? "Projektovanje" : service.number === "02" ? "Armaturni planovi" : "Savetovanje i optimizacija"}
                <span aria-hidden="true" className="text-muted">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {services.map((service) => (
          <section key={service.id} id={service.id} aria-labelledby={`${service.id}-title`} className="grid gap-8 border-b border-slate-800 py-12 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-20">
            <div>
              <div className="mb-6 flex items-center gap-5">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-16 w-16 text-accent">
                  <path d={service.drawing} />
                </svg>
                <span className="font-mono text-xs tracking-widest text-muted">/ {service.number}</span>
              </div>
              <h2 id={`${service.id}-title`} className="max-w-lg text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                {service.title}
              </h2>
            </div>
            <div className="lg:pt-2">
              <p className="text-base leading-8 text-foreground md:text-lg">{service.description}</p>
              <p className="mt-4 text-base leading-8 text-muted">{service.outcome}</p>
              <ul className="mt-7 grid gap-3 border-t border-slate-800 pt-6">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm leading-6 text-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="service-contact-title" className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 rounded-xl border border-slate-700/60 bg-surface/60 p-6 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">Vaš sledeći projekat</p>
            <h2 id="service-contact-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Razgovarajmo o konstruktivnom rešenju.</h2>
            <p className="mt-4 text-base leading-7 text-muted">Predstavite nam projekat, fazu razrade i potrebnu dokumentaciju kako bismo definisali obim saradnje.</p>
          </div>
          <Link href="/kontakt" className="inline-flex shrink-0 items-center justify-center gap-5 rounded-md bg-accent px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400 motion-reduce:transition-none">
            Kontaktirajte nas <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
