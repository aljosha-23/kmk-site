import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Projektovanje konstrukcija",
    description:
      "Analiza i projektovanje konstrukcija zgrada i mostova, kao i geotehničkih konstrukcija.",
  },
  {
    number: "02",
    title: "Armaturni planovi i izvođačka dokumentacija",
    description:
      "Razrada armature, detalji spojeva i specifikacije za izvođenje.",
  },
  {
    number: "03",
    title: "Stručno savetovanje i optimizacija",
    description:
      "Tehnička podrška, poređenje rešenja i optimizacija potrošnje materijala i troškova izvođenja.",
  },
];

function StructuralDrawing() {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full"
    >
      <defs>
        <pattern
          id="drawing-grid"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 30 0 H 0 V 30"
            stroke="#334155"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect width="600" height="500" fill="url(#drawing-grid)" />

      {/* Conceptual structural frame */}
      <g stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M100 360 330 430 510 315 280 245Z" />
        <path d="M100 260 330 330 510 215 280 145Z" />
        <path d="M100 160 330 230 510 115 280 45Z" />

        <path d="M100 160V360" />
        <path d="M215 195V395" />
        <path d="M330 230V430" />
        <path d="M420 172.5V372.5" />
        <path d="M510 115V315" />
        <path d="M280 45V245" />

        <path d="M190 102.5 420 172.5" />
        <path d="M215 195 395 80" />
        <path d="M190 202.5 420 272.5" />
        <path d="M215 295 395 180" />
      </g>

      {/* Highlighted slab */}
      <path
        d="M100 160 330 230 510 115 280 45Z"
        fill="#f59e0b"
        fillOpacity="0.07"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <g stroke="#f59e0b" strokeWidth="1" opacity="0.6">
        <path d="M138 172 318 57" />
        <path d="M177 183 357 68" />
        <path d="M215 195 395 80" />
        <path d="M253 207 433 92" />
        <path d="M292 218 472 103" />

        <path d="M136 137 366 207" />
        <path d="M172 114 402 184" />
        <path d="M208 91 438 161" />
        <path d="M244 68 474 138" />
      </g>

      {/* Drawing guides */}
      <g stroke="#475569" strokeWidth="1" strokeDasharray="4 6">
        <path d="M70 380 300 450" />
        <path d="M70 380V140" />
        <path d="M350 455 540 333" />
      </g>

      <g fill="#f59e0b">
        <circle cx="100" cy="160" r="4" />
        <circle cx="330" cy="230" r="4" />
        <circle cx="510" cy="115" r="4" />
        <circle cx="280" cy="45" r="4" />
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-20 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24 lg:pt-24">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              U pripremi
            </p>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                KMK Structural Solutions
              </p>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
              Preciznost u
              <br />
              svakom
              <br />
              <span className="text-accent">detalju konstrukcije.</span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-8 text-muted md:text-lg">
              Projektovanje armiranobetonskih konstrukcija i razrada
              armaturnih planova. Od proračuna do jasne dokumentacije
              za izvođenje.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-5 rounded-md bg-accent px-6 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
              >
                Razgovarajmo o projektu
                <span aria-hidden="true">↗</span>
              </Link>

              <Link
                href="/usluge"
                className="inline-flex items-center justify-center gap-5 rounded-md border border-slate-700 px-6 py-4 text-sm font-medium transition-colors hover:border-slate-500 hover:bg-white/5"
              >
                Naše usluge
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-surface/40">
              <div className="flex items-center justify-between border-b border-slate-700/60 px-5 py-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted sm:text-xs">
                  Konstrukcija / prostorni prikaz
                </span>
                <span className="h-2 w-2 rounded-full bg-accent" />
              </div>

              <div className="p-3 sm:p-6">
                <StructuralDrawing />
              </div>

              <div className="flex items-center justify-between border-t border-slate-700/60 px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                <span>Konceptualna ilustracija</span>
                <span className="text-accent">KMK / 01</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-heading"
        className="border-t border-slate-800"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">
                Naša ekspertiza
              </p>
              <h2
                id="services-heading"
                className="text-3xl font-semibold tracking-tight"
              >
                Podrška vašem projektu.
              </h2>
            </div>

            <Link
              href="/usluge"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Sve usluge <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.number}
                href="/usluge"
                className="group rounded-lg border border-slate-800 bg-surface/40 p-7 transition-colors hover:border-accent/50 hover:bg-surface"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-accent">
                    / {service.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-muted transition-colors group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-medium">
                  {service.title}
                </h3>
                <p className="text-sm leading-7 text-muted">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
