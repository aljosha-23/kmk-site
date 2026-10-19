"use client";

import { useId, useState } from "react";

const fmt = (n: number) => n.toLocaleString("sr-Latn-RS", { maximumFractionDigits: 3 });
const field = "mt-2 w-full rounded-lg border border-slate-700 bg-background px-3 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function RoofLoadCalculator() {
  const id = useId();
  const [angle, setAngle] = useState("30");
  const [load, setLoad] = useState("1.5");
  const [basis, setBasis] = useState("horizontal");
  const [direction, setDirection] = useState("vertical");
  const a = Number(angle), p = Number(load);
  const valid = angle.trim() !== "" && load.trim() !== "" && Number.isFinite(a) && Number.isFinite(p) && a >= 0 && a <= 85 && p >= 0 && p <= 10000;
  const rad = (valid ? a : 30) * Math.PI / 180;
  const c = Math.cos(rad), s = Math.sin(rad);
  const q = valid ? (basis === "horizontal" ? p * c : p) : 0;
  const qh = q / c;
  const normal = direction === "vertical" ? q * c : q;
  const tangent = direction === "vertical" ? q * s : 0;
  // Screen coordinates: t points uphill, n points into the roof.
  const t = { x: c, y: -s }, n = { x: -s, y: -c };
  const v = direction === "vertical" ? { x: 0, y: 1 } : { x: -n.x, y: -n.y };
  const start = { x: 140, y: 330 };
  const end = { x: start.x + 310 * c, y: start.y - 310 * s };
  const center = { x: 340, y: 140 };
  const scale = 95;
  const nn = direction === "vertical" ? c : 1;
  const tt = direction === "vertical" ? s : 0;
  const np = { x: center.x - n.x * scale * nn, y: center.y - n.y * scale * nn };
  const tp = { x: center.x - t.x * scale * tt, y: center.y - t.y * scale * tt };
  const result = { x: center.x + v.x * scale, y: center.y + v.y * scale };
  const arrow = (x1: number, y1: number, x2: number, y2: number, color: string) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" markerEnd={`url(#${id}-${color.replace("#", "")})`} />
  );
  const markers = <defs>{["#f59e0b", "#38bdf8", "#a78bfa"].map(color => <marker key={color} id={`${id}-${color.replace("#", "")}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={color} /></marker>)}</defs>;

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-slate-800 bg-surface/50" aria-labelledby={`${id}-title`}>
      <div className="border-b border-slate-800 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">01 / Opterećenja</p>
        <h2 id={`${id}-title`} className="mt-3 text-2xl font-semibold sm:text-3xl">Opterećenje na kosoj ravni</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">Preračunavanje između horizontalne projekcije i stvarne površine krova, uz razlaganje na komponente normalno i paralelno sa ravni.</p>
      </div>
      <div className="grid lg:grid-cols-[320px_1fr]">
        <div className="space-y-6 border-b border-slate-800 p-6 lg:border-r lg:border-b-0 sm:p-8">
          <div><label htmlFor={`${id}-angle`} className="text-sm font-medium">Nagib krova α [°]</label><input id={`${id}-angle`} type="number" min="0" max="85" step="0.1" value={angle} onChange={e => setAngle(e.target.value)} className={field} /><input aria-label="Nagib krova — klizač" type="range" min="0" max="85" step="0.1" value={Math.min(85, Math.max(0, Number(angle) || 0))} onChange={e => setAngle(e.target.value)} className="mt-4 w-full accent-amber-500" /><div className="flex justify-between text-xs text-muted"><span>0°</span><span>85°</span></div></div>
          <div><label htmlFor={`${id}-load`} className="text-sm font-medium">Intenzitet opterećenja p [kN/m²]</label><input id={`${id}-load`} type="number" min="0" max="10000" step="0.1" value={load} onChange={e => setLoad(e.target.value)} className={field} /></div>
          <div><label htmlFor={`${id}-basis`} className="text-sm font-medium">Opterećenje je zadato po</label><select id={`${id}-basis`} value={basis} onChange={e => setBasis(e.target.value)} className={field}><option value="horizontal">Horizontalnoj projekciji</option><option value="roof">Stvarnoj kosoj površini</option></select></div>
          <div><label htmlFor={`${id}-direction`} className="text-sm font-medium">Smer delovanja</label><select id={`${id}-direction`} value={direction} onChange={e => setDirection(e.target.value)} className={field}><option value="vertical">Vertikalno naniže</option><option value="normal">Normalno ka ravni</option></select></div>
          <p className="text-xs leading-6 text-muted">Površina na koju se odnosi intenzitet i smer sile biraju se nezavisno. Model predstavlja ravnu krovnu površinu sa ravnomernim opterećenjem.</p>
        </div>
        <div className="min-w-0 p-4 sm:p-8">
          {!valid && <p role="alert" className="mb-4 rounded-lg border border-amber-500/40 p-3 text-sm text-accent">Unesite nagib od 0° do 85° i opterećenje od 0 do 10.000 kN/m². Rezultati i grafici čekaju ispravan unos.</p>}
          {valid && <>
            <figure className="rounded-xl border border-slate-800 bg-background/60 p-3">
              <figcaption className="px-2 pt-2 text-sm font-medium">Geometrija i raspodeljeno opterećenje</figcaption>
              <svg viewBox="0 0 640 400" role="img" aria-label={`Krov nagiba ${fmt(a)} stepeni, opterećenje po kosoj površini ${fmt(q)} kilonjutna po kvadratnom metru`} className="w-full">
                {markers}
                <path d={`M ${start.x} ${start.y} H ${end.x} V ${end.y} Z`} fill="#f59e0b" fillOpacity="0.04" stroke="#475569" strokeDasharray="5 5" />
                <line x1="90" y1="330" x2="510" y2="330" stroke="#475569" />
                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
                {Array.from({ length: 7 }, (_, i) => { const f = (i + 0.5) / 7; const x = start.x + 310 * c * f, y = start.y - 310 * s * f; const len = p === 0 ? 0 : 35 + 35 * p / (p + 2); return p === 0 ? null : <g key={i}>{arrow(x - v.x * len, y - v.y * len, x, y, "#f59e0b")}</g>; })}
                <path d={`M 190 330 A 50 50 0 0 0 ${140 + 50 * c} ${330 - 50 * s}`} fill="none" stroke="#38bdf8" strokeWidth="2" />
                <text x="210" y="355" fill="#38bdf8" fontSize="16">α = {fmt(a)}°</text>
                <text x="24" y="32" fill="#f59e0b" fontSize="16">p = {fmt(p)} kN/m² · {basis === "horizontal" ? "horizontalna projekcija" : "kosa površina"}</text>
                <text x="24" y="60" fill="#a8b5c7" fontSize="14">{direction === "vertical" ? "Vertikalno naniže" : "Normalno ka ravni"} · qₛ = {fmt(q)} kN/m²</text>
                <text x="24" y="388" fill="#a8b5c7" fontSize="12">Šematski prikaz; dužina strelica nije apsolutna skala intenziteta.</text>
              </svg>
            </figure>
            <div aria-live="polite" aria-atomic="true" className="mt-5 grid gap-3 sm:grid-cols-2">
              {[["Po horizontalnoj projekciji · qₕ", qh, "text-foreground"], ["Po kosoj površini · qₛ", q, "text-accent"], ["Normalna komponenta · qₙ", normal, "text-sky-400"], ["Tangencijalna komponenta · qₜ", tangent, "text-violet-400"]].map(([label, value, color]) => <div key={String(label)} className="rounded-xl border border-slate-800 bg-background/60 p-4"><p className="text-xs text-muted">{label}</p><p className={`mt-2 text-2xl font-semibold tabular-nums ${color}`}>{fmt(Number(value))} <span className="text-xs font-normal text-muted">kN/m²</span></p></div>)}
            </div>
            <figure className="mt-5 rounded-xl border border-slate-800 bg-background/60 p-4">
              <figcaption className="text-sm font-medium">Razlaganje opterećenja po kosoj površini</figcaption>
              <svg viewBox="0 0 640 300" role="img" aria-label={`Normalna komponenta ${fmt(normal)}, tangencijalna komponenta ${fmt(tangent)} kilonjutna po kvadratnom metru`} className="w-full">
                <line x1={center.x - 120 * t.x} y1={center.y - 120 * t.y} x2={center.x + 120 * t.x} y2={center.y + 120 * t.y} stroke="#475569" strokeWidth="5" />
                {p > 0 && <><path d={`M ${np.x} ${np.y} L ${result.x} ${result.y} L ${tp.x} ${tp.y}`} fill="none" stroke="#475569" strokeDasharray="4 4" />{arrow(center.x, center.y, result.x, result.y, "#f59e0b")}{arrow(center.x, center.y, np.x, np.y, "#38bdf8")}{tt > 0 && arrow(center.x, center.y, tp.x, tp.y, "#a78bfa")}</>}
                <circle cx={center.x} cy={center.y} r="4" fill="#f1f5f9" />
                <text x="20" y="38" fill="#f59e0b" fontSize="15">qₛ = {fmt(q)} kN/m²</text>
                <text x="20" y="65" fill="#38bdf8" fontSize="15">qₙ = {fmt(normal)} kN/m²</text>
                <text x="20" y="92" fill="#a78bfa" fontSize="15">qₜ = {fmt(tangent)} kN/m²</text>
                <text x="20" y="280" fill="#a8b5c7" fontSize="12">Komponente su u međusobnoj razmeri; qₜ deluje niz ravan, qₙ ka ravni.</text>
              </svg>
            </figure>
          </>}
        </div>
      </div>
      <div className="border-t border-slate-800 p-6 sm:p-8">
        <h3 className="font-medium">Postupak proračuna</h3>
        <div className="mt-4 grid gap-5 text-sm leading-7 text-muted md:grid-cols-2">
          <div><p className="font-mono text-foreground">Aₕ = Aₛ · cos α</p><p className="font-mono text-foreground">qₛ = qₕ · cos α</p><p>Ista ukupna sila: qₕAₕ = qₛAₛ. Promena referentne površine ne menja smer delovanja sile.</p></div>
          <div><p className="font-mono text-foreground">{direction === "vertical" ? "qₙ = qₛ · cos α; qₜ = qₛ · sin α" : "qₙ = qₛ; qₜ = 0"}</p><p>Obe lokalne komponente izražene su po m² stvarne kose površine. Prikazani su intenziteti za izabrani smer, bez parcijalnih faktora i kombinacija opterećenja.</p></div>
        </div>
        <a href="https://engineeringstatics.org/distributed-loads.html" target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs text-accent underline underline-offset-4">Osnova postupka: Engineering Statics — Distributed Loads</a>
      </div>
    </section>
  );
}
