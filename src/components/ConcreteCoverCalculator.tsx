"use client";

import { useId, useState, type ReactNode } from "react";
import { calculateCover, exposures, serbiaCover, type CoverInput, type Exposure } from "@/lib/concrete-cover";

const field = "mt-2 w-full rounded-lg border border-slate-700 bg-background px-3 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
const panel = "rounded-xl border border-slate-800 bg-background/60 p-5";
const concreteClasses = [[12,15],[16,20],[20,25],[25,30],[30,37],[35,45],[40,50],[45,55],[50,60],[55,67],[60,75],[70,85],[80,95],[90,105]];
const initial: CoverInput = { exposure: "XC3", life: 50, strength: 30, slab: false, quality: false, diameter: 16, aggregate: 32, abrasion: "none", ground: "formwork", irregular: false, control: "normal", deviation: 10 };
const lectureUrl = "http://imksus.grf.bg.ac.rs/nastava/BETON-NOVI%20NASTAVNI%20PLAN_2021/TBK1/VEZBE/1V_TBK1_2026-27_Uvod,%20trajnost,%20kombinacija.pdf";
const num = (value: number) => value.toLocaleString("sr-Latn-RS", { maximumFractionDigits: 3 });
const C = ({ index }: { index: string }) => <span className="whitespace-nowrap"><i>c</i><sub className="ml-0.5 text-[65%]">{index}</sub></span>;
const Delta = ({ index }: { index: string }) => <span className="whitespace-nowrap">Δ<C index={index} /></span>;

function parameterLabel(label: string) {
  const match = /^(Δ?)c_([^ ]+)(.*)$/.exec(label);
  if (!match) return label;
  return <>{match[1] ? <Delta index={match[2]} /> : <C index={match[2]} />}{match[3]}</>;
}

function Equation({ formula, numbers }: { formula: ReactNode; numbers?: ReactNode }) {
  return <div className="mt-3 min-w-0 overflow-x-auto rounded-xl border border-slate-700/60 bg-background/80 p-4 sm:p-5">
    <div className="w-max min-w-full whitespace-nowrap font-serif text-lg leading-loose text-foreground xl:text-xl">{formula}</div>
    {numbers && <div className="mt-3 w-max min-w-full whitespace-nowrap border-t border-slate-800 pt-3 font-serif text-lg leading-loose text-accent xl:text-xl">{numbers}</div>}
  </div>;
}

export default function ConcreteCoverCalculator() {
  const id = useId();
  const [input, setInput] = useState<CoverInput>(initial);
  const [diameter, setDiameter] = useState("16");
  const [aggregate, setAggregate] = useState("32");
  const [deviation, setDeviation] = useState("10");
  const patch = (change: Partial<CoverInput>) => setInput(prev => ({ ...prev, ...change }));
  let result: ReturnType<typeof calculateCover> | undefined;
  let error = "";
  try {
    if (!diameter.trim() || !aggregate.trim() || !deviation.trim()) throw new Error("Popunite sve numeričke ulaze.");
    result = calculateCover({ ...input, diameter: Number(diameter), aggregate: Number(aggregate), deviation: Number(deviation) });
  } catch {
    error = "Izaberite paran prečnik šipke od 4 do 32 mm, a agregat veći od 0 i najviše 125 mm. Dodatak za izvođenje mora biti u opsegu izabranog režima kontrole.";
  }
  const minDeviation = input.control === "normal" ? 10 : input.control === "measured" ? 5 : 0;
  const coverPx = result ? Math.min(115, 30 + result.nominal) : 60;
  const barRadius = Math.min(20, Math.max(7, Number(diameter) / 2 || 8));
  const toggle = (key: "slab" | "quality" | "irregular", label: string, detail: string) => <label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={input[key]} onChange={e => patch({ [key]: e.target.checked })} className="mt-1.5 h-4 w-4 shrink-0 accent-amber-500" /><span className="text-base leading-7">{label}<span className="mt-1 block text-sm leading-6 text-muted">{detail}</span></span></label>;

  return <section className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-surface/50" aria-labelledby={`${id}-title`}>
    <div className="border-b border-slate-800 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">02 / Betonske konstrukcije</p>
      <div className="mt-3 flex flex-wrap items-center gap-4"><h1 id={`${id}-title`} className="text-3xl font-semibold">Zaštitni sloj betona</h1><span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent">Srbija · NA 2015</span></div>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted">Minimalni i nominalni zaštitni sloj za običnu armaturu u betonu normalne težine. Proračun za jednu izloženu stranu elementa, prema SRPS EN 1992-1-1:2015 i nacionalnom aneksu (NA).</p>
    </div>
    <div className="grid lg:grid-cols-[380px_1fr]">
      <div className="space-y-6 border-b border-slate-800 p-6 lg:border-r lg:border-b-0 sm:p-8">
        <div><label htmlFor={`${id}-exp`} className="font-medium">Klasa izloženosti — korozija</label><select id={`${id}-exp`} value={input.exposure} onChange={e => patch({ exposure: e.target.value as Exposure })} className={field}>{Object.entries(exposures).map(([value, data]) => <option key={value} value={value}>{value} — {data.label}</option>)}</select><p className="mt-2 text-sm leading-6 text-muted">Za istovremene klase proverite svaku i usvojite najveći zahtev. XF i XA zahtevaju i proveru sastava betona prema EN 206.</p></div>
        <div><label htmlFor={`${id}-life`} className="font-medium">Projektovani eksploatacioni vek</label><select id={`${id}-life`} value={input.life} onChange={e => patch({ life: Number(e.target.value) as 50 | 100 })} className={field}><option value="50">50 godina — početna klasa S4</option><option value="100">100 godina — S4 + 2 klase</option></select></div>
        <div><label htmlFor={`${id}-strength`} className="font-medium">Klasa čvrstoće betona</label><select id={`${id}-strength`} value={input.strength} onChange={e => patch({ strength: Number(e.target.value) })} className={field}>{concreteClasses.map(([c, cube]) => <option key={c} value={c}>C{c}/{cube}</option>)}</select></div>
        <fieldset className="space-y-4"><legend className="mb-3 font-medium">Korekcije klase — tabela 4.3N</legend>
          <p className="rounded-lg border border-slate-700 bg-background/60 p-3 text-sm leading-7 text-muted">Smanjenje zbog čvrstoće primenjuje se automatski: f<sub>ck</sub> ≥ {exposures[input.exposure].strength} MPa za {input.exposure}. <span className="text-accent">{input.strength >= exposures[input.exposure].strength ? "Kriterijum je zadovoljen: −1 klasa." : "Kriterijum nije zadovoljen: bez smanjenja."}</span></p>
          {toggle("slab", "Geometrija pločastog elementa", "(ploča, zid) −1 klasa, ako postupak građenja ne utiče na položaj armature.")}
          {toggle("quality", "Posebna kontrola proizvodnje betona", "−1 klasa. Odvojeno od kontrole i merenja zaštitnog sloja.")}
        </fieldset>
        <div><label htmlFor={`${id}-diameter`} className="font-medium">{input.slab ? "Prečnik šipke uz površinu φ [mm]" : "Prečnik najbliže armature φ [mm]"}</label><select id={`${id}-diameter`} className={field} value={diameter} onChange={e => setDiameter(e.target.value)}>{Array.from({ length: 15 }, (_, i) => 4 + 2 * i).map(d => <option key={d} value={d}>Ø{d}</option>)}</select><p className="mt-2 text-sm leading-6 text-muted">{input.slab ? "Za ploču ili zid izaberite prečnik šipke najbliže proveravanoj površini." : "Za gredu ili stub sa uzengijama izaberite prečnik uzengije ako je ona najbliža površini betona."} Pojedinačne šipke Ø4–Ø32, korak 2 mm. Prianjanje unutrašnjih šipki proverava se i prema njihovom stvarnom rastojanju od površine.</p></div>
        <div><label htmlFor={`${id}-aggregate`} className="font-medium">Najveće nazivno zrno agregata [mm]</label><input id={`${id}-aggregate`} className={field} type="text" inputMode="decimal" value={aggregate} aria-describedby={`${id}-aggregate-help`} aria-invalid={!aggregate.trim() || Number(aggregate) <= 0 || Number(aggregate) > 125} onChange={e => { const value = e.target.value.replace(",", "."); if (value === "" || /^\d+(\.\d*)?$/.test(value)) setAggregate(value); }} /><p id={`${id}-aggregate-help`} className="mt-2 text-sm leading-6 text-muted">Samo broj veći od 0 i najviše 125 mm. Za zrno veće od 32 mm: dodatak 5 mm na <C index="min,b" />.</p></div>
        <div><label htmlFor={`${id}-ground`} className="font-medium">Površina na kojoj se betonira</label><select id={`${id}-ground`} className={field} value={input.ground} onChange={e => patch({ ground: e.target.value as CoverInput["ground"] })}><option value="formwork">Oplata / bez kontakta sa tlom</option><option value="prepared">Pripremljena podloga — minimum 40 mm</option><option value="soil">Direktno na tlo — minimum 75 mm</option></select></div>
        <div><label htmlFor={`${id}-abrasion`} className="font-medium">Abrazija — žrtvovani sloj</label><select id={`${id}-abrasion`} className={field} value={input.abrasion} onChange={e => patch({ abrasion: e.target.value as CoverInput["abrasion"] })}><option value="none">Bez dodatka za abraziju</option><option value="XM1">XM1 — dodatak 5 mm</option><option value="XM2">XM2 — dodatak 10 mm</option><option value="XM3">XM3 — dodatak 15 mm</option></select></div>
        {toggle("irregular", "Neravna završna površina", "Najmanje +5 mm prema 4.4.1.2(11). Ovde je primenjeno 5 mm; veće neravnine zahtevaju dodatnu proveru.")}
        <div><label htmlFor={`${id}-control`} className="font-medium">Kontrola izvođenja zaštitnog sloja</label><select id={`${id}-control`} className={field} value={input.control} onChange={e => { const control = e.target.value as CoverInput["control"]; patch({ control }); setDeviation("10"); }}><option value="normal">Uobičajena — 10 mm</option><option value="measured">Osiguran kvalitet i merenje — 5 do 10 mm</option><option value="precise">Precizno merenje i odbacivanje — 0 do 10 mm</option></select></div>
        <div><label htmlFor={`${id}-dev`} className="font-medium">Dodatak za izvođenje <Delta index="dev" /> [mm]</label><input id={`${id}-dev`} className={`${field} read-only:opacity-70`} type="number" min={minDeviation} max="10" step="1" readOnly={input.control === "normal"} value={deviation} onChange={e => setDeviation(e.target.value)} /><p className="mt-2 text-sm leading-6 text-muted">{input.control === "precise" ? "Smanjenje zahteva veoma precizan uređaj i odbacivanje neusaglašenih elemenata — 4.4.1.3(3), izraz (4.4N)." : input.control === "measured" ? "Smanjenje zahteva sistem osiguranja kvaliteta sa merenjem zaštitnog sloja — izraz (4.3N)." : "Nacionalni aneks, 2.24: usvojeno 10 mm."}</p></div>
      </div>
      <div className="min-w-0 space-y-6 p-6 sm:p-8">
        {error && <p role="alert" className="rounded-xl border border-accent/40 p-5 text-base leading-7 text-accent">{error}</p>}
        {result && <>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Osnovni izrazi · EC2 (4.1) i (4.2)</p>
            <h2 className="mt-2 text-xl font-semibold">Nominalni i minimalni zaštitni sloj</h2>
            <Equation formula={<><C index="nom" /> = <C index="min" /> + <Delta index="dev" /></>} />
            <Equation formula={<><C index="min" /> = max &#123; <C index="min,b" />; <C index="min,dur" />; 10 mm &#125;</>} />
            <p className="mt-3 text-base leading-7 text-muted">Minimalni sloj određuje se iz uslova prianjanja i trajnosti, uz izabrane dodatke. Dodatak za izvođenje dodaje se na kraju.</p>
          </div>
          <figure className={panel}><figcaption className="font-medium">Zaštitni sloj do najbliže armature</figcaption><svg viewBox="0 0 500 260" className="mx-auto mt-3 max-h-[270px] w-full" role="img" aria-label={`Zaštitni sloj do površine najbliže armature: ${result.nominal} mm. Šema nije u razmeri.`}>
            <rect x="75" y="25" width="350" height="180" rx="4" fill="#a8b5c7" fillOpacity="0.12" stroke="#94a3b8" strokeWidth="2" />
            <rect x={75 + coverPx} y="60" width={350 - 2 * coverPx} height="110" rx="18" fill="none" stroke="#f59e0b" strokeWidth="8" />
            {[0,1].map(i => <circle key={i} cx={75 + coverPx + 20 + i * (310 - 2 * coverPx)} cy="150" r={barRadius} fill="#38bdf8" />)}
            <path d={`M75 105v127 M${75 + coverPx - 4} 110v122`} stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.7" />
            <line x1="75" y1="222" x2={75 + coverPx - 4} y2="222" stroke="#f59e0b" strokeWidth="1.5" />
            <path d={`M70 227l10 -10 M${70 + coverPx - 4} 227l10 -10`} stroke="#f59e0b" strokeWidth="2" />
            <text x={75 + (coverPx - 4) / 2} y="249" textAnchor="middle" fill="#f59e0b" fontSize="18" fontStyle="italic">c<tspan baselineShift="sub" fontSize="12">nom</tspan></text>
          </svg><p className="text-base leading-7 text-muted">Sloj se meri do najbliže armature, uključujući uzengije. Šema ilustruje definiciju i nije crtež armiranja u razmeri.</p></figure>
          <div className={panel}><h2 className="text-xl font-semibold">Proračun minimalnog zaštitnog sloja</h2><ol className="mt-5 space-y-8 text-base leading-8">
            <li><h3 className="text-lg font-semibold">1. Klasa konstrukcije</h3><p className="mt-3 rounded-lg bg-surface p-4 text-xl text-accent">S4 {result.lifeDelta ? "+ 2" : "+ 0"} {result.strengthDelta ? "− 1" : ""} {result.slabDelta ? "− 1" : ""} {result.qualityDelta ? "− 1" : ""} → S{result.structuralClass}</p></li>
            <li><h3 className="text-lg font-semibold">2. Uslov prianjanja</h3>
              <Equation formula={<><C index="min,b" /> = φ{Number(aggregate) > 32 && " + 5 mm"}</>} numbers={<><C index="min,b" /> = {num(Number(diameter))}{Number(aggregate) > 32 && " + 5"} = <strong>{num(result.bond)} mm</strong></>} />
              <p className="mt-3 text-muted">Tabela 4.2 — pojedinačne šipke. {Number(aggregate) > 32 ? "Agregat je veći od 32 mm: dodatak 5 mm." : "Agregat nije veći od 32 mm: bez dodatka."}</p>
            </li>
            <li><h3 className="text-lg font-semibold">3. Uslov trajnosti</h3><p className="mt-2 text-muted">Za izloženost <strong className="text-foreground">{input.exposure}</strong> i klasu konstrukcije <strong className="text-foreground">S{result.structuralClass}</strong>, iz tabele 4.4N:</p><p className="mt-3 font-serif text-2xl text-accent"><C index="min,dur" /> = <strong>{result.durability} mm</strong></p></li>
            <li><h3 className="text-lg font-semibold">4. Minimalni zaštitni sloj · izraz (4.2)</h3>
              <Equation formula={<><C index="min" /> = max &#123; <C index="min,b" />; <C index="min,dur" />; 10 mm &#125;</>} numbers={<><C index="min" /> = max &#123; {num(result.bond)}; {result.durability}; 10 &#125; = <strong>{num(result.baseMinimum)} mm</strong></>} />

              {(result.surface > 0 || result.abrasion > 0 || result.ground > 0) && <div className="mt-5 border-t border-slate-800 pt-4"><h4 className="font-medium">Korekcija za izabrane uslove</h4>
                <Equation formula={<><C index="min,korr" /> = max &#123; <C index="min" /> + <span className="whitespace-nowrap">Δc<sub>ner</sub></span> + <span className="whitespace-nowrap">k<sub>XM</sub></span>; <span className="whitespace-nowrap">c<sub>pod</sub></span> &#125;</>} numbers={<><C index="min,korr" /> = max &#123; {num(result.baseMinimum)} + {result.surface} + {result.abrasion}; {result.ground} &#125; = <strong>{num(result.minimum)} mm</strong></>} />
                <p className="mt-3 text-muted">Δc<sub>ner</sub> = {result.surface} mm za neravnu površinu; k<sub>XM</sub> = {result.abrasion} mm za abraziju; c<sub>pod</sub> = {result.ground} mm za podlogu. {result.ground > 0 && "Minimum podloge primenjen je pre dodatka za izvođenje, prema 4.4.1.3(4)."} U osnovni izraz za c<sub>nom</sub> ulazi korigovana vrednost {num(result.minimum)} mm.</p>
              </div>}
            </li>
            <li><h3 className="text-lg font-semibold">5. Nominalni zaštitni sloj · izraz (4.1)</h3>
              <Equation formula={<><C index="nom" /> = <C index="min" /> + <Delta index="dev" /></>} numbers={<><C index="nom" /> = {num(result.minimum)} + {num(result.deviation)} = <strong>{num(result.nominal)} mm</strong></>} />
              <p className="mt-3 text-muted">Δc<sub>dev</sub> = {num(result.deviation)} mm za izabrani režim kontrole izvođenja.</p>
            </li>
          </ol></div>
          <div className={`${panel} border-accent/40`} aria-live="polite" aria-atomic="true"><p className="text-base text-muted">Nominalni zaštitni sloj · c<sub>nom</sub></p><p className="mt-3 text-5xl font-semibold tabular-nums text-accent">{num(result.nominal)} <span className="text-lg font-normal">mm</span></p><p className="mt-3 text-base leading-7 text-muted">Merodavni osnovni zahtev: {result.bond === result.baseMinimum && result.durability === result.baseMinimum ? "prianjanje i trajnost" : result.bond === result.baseMinimum ? "prianjanje" : result.durability === result.baseMinimum ? "trajnost" : "najmanje 10 mm"}.{result.ground > result.baseMinimum + result.surface + result.abrasion && " Minimum zbog podloge određuje konačni minimalni sloj."}</p></div>

        </>}
        <div className={panel}><h2 className="text-xl font-semibold">Obuhvat ove verzije</h2><p className="mt-3 text-base leading-8 text-muted">Proračun obuhvata prianjanje, trajnost i izabrane uslove izvođenja za pojedinačne šipke obične armature. Ne obuhvata prethodno naprezanje, svežnjeve, laki beton, posebno smanjenje u kontaktu sa postojećim betonom ni projektno propisane specijalne zaštitne mere.</p><p className="mt-3 text-base leading-8 text-muted">Požarna otpornost proverava se zasebno prema SRPS EN 1992-1-2. Ovde nije određen zahtevani osni razmak armature za požar. Za svaki položaj šipke proverava se prianjanje u odnosu na njenu stvarnu udaljenost od površine.</p></div>
      </div>
    </div>
    <div className="border-t border-slate-800 p-6 sm:p-8"><h2 className="text-2xl font-semibold">Reference</h2>
      <Equation formula={<><C index="nom" /> = <C index="min" /> + <Delta index="dev" /></>} />
      <Equation formula={<><C index="min" /> = max &#123; <C index="min,b" />; <C index="min,dur" /> + <Delta index="dur,γ" /> − <Delta index="dur,st" /> − <Delta index="dur,add" />; 10 mm &#125;</>} />
      <dl className="mt-6 grid gap-x-8 gap-y-4 text-base leading-7 sm:grid-cols-2">
        {[
          ["nom", "Nominalni zaštitni sloj koji se navodi na planovima armature."],
          ["min", "Minimalni zaštitni sloj iz uslova prianjanja i trajnosti, uz izabrane dodatke."],
          ["min,b", "Minimalni sloj za prianjanje: prečnik pojedinačne šipke; još 5 mm ako je agregat veći od 32 mm (tabela 4.2)."],
          ["min,dur", "Minimalni sloj za trajnost, prema klasi izloženosti i klasi konstrukcije (tabela 4.4N)."],
        ].map(([index, description]) => <div key={index}><dt className="font-serif text-xl text-accent"><C index={index} /></dt><dd className="mt-1 text-muted">{description}</dd></div>)}
        <div><dt className="font-serif text-xl text-accent"><Delta index="dev" /></dt><dd className="mt-1 text-muted">Dodatak za odstupanja u izvođenju: uobičajeno 10 mm; smanjenje zavisi od režima kontrole (4.4.1.3).</dd></div>
        <div><dt className="font-serif text-xl text-accent"><Delta index="dur,γ" /></dt><dd className="mt-1 text-muted">Dodatak za sigurnost u pogledu trajnosti.</dd></div>
        <div><dt className="font-serif text-xl text-accent"><Delta index="dur,st" /></dt><dd className="mt-1 text-muted">Smanjenje zbog nerđajućeg čelika ili drugih specijalnih mera.</dd></div>
        <div><dt className="font-serif text-xl text-accent"><Delta index="dur,add" /></dt><dd className="mt-1 text-muted">Smanjenje zbog dodatne zaštite betona.</dd></div>
      </dl>
      <p className="mt-4 text-base leading-8 text-muted">Prema srpskom nacionalnom aneksu, Δc<sub>dur,γ</sub> = Δc<sub>dur,st</sub> = Δc<sub>dur,add</sub> = 0 mm, bez drugačijih propisanih zahteva za Δc<sub>dur,st</sub>. Zato su ovi članovi izostavljeni iz skraćene formule u proračunu i ne zadaju se kao ulazni podaci.</p>
      <p className="mt-3 text-base leading-7 text-muted">{serbiaCover.annex}, tačke 2.19–2.26. Parametri za Srbiju prikazani su odvojeno od projektantskih ulaza.</p>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[580px] text-left text-base leading-7"><caption className="sr-only">Nacionalno određeni parametri za zaštitni sloj betona</caption><thead><tr className="border-b border-slate-700"><th scope="col" className="p-3">Parametar</th><th scope="col" className="p-3">Usvojeno u Srbiji</th><th scope="col" className="p-3">Referenca NA</th></tr></thead><tbody>{[
        ["Klasa konstrukcije", "S4 za 50 godina; najmanje S1; korekcije po tabeli 4.3N", "2.19"],
        ["c_min,dur", "Tabela 4.4N za običnu armaturu", "2.19"],
        ["Δc_dur,γ", "0 mm", "2.20"], ["Δc_dur,st", "0 mm, bez drugačijih propisanih zahteva", "2.21"], ["Δc_dur,add", "0 mm", "2.22"],
        ["Abrazija XM1 / XM2 / XM3", "5 / 10 / 15 mm", "2.23"],
        ["Δc_dev — uobičajeno", "10 mm", "2.24"], ["Δc_dev — kontrolisana proizvodnja", "5–10 mm ili 0–10 mm, uz uslove iz 4.4.1.3(3)", "2.25"],
        ["Pripremljena podloga / direktno na tlo", "k₁ = 40 mm / k₂ = 75 mm", "2.26"],
      ].map(([name,value,ref]) => <tr key={name} className="border-b border-slate-800"><th scope="row" className="p-3 font-medium">{parameterLabel(name)}</th><td className="p-3 text-muted">{value}</td><td className="p-3 text-accent">{ref}</td></tr>)}</tbody></table></div>
      <p className="mt-6 text-base leading-8 text-muted">Izvori: {serbiaCover.standard}, 4.4.1, tabele 4.2, 4.3N i 4.4N (štampane strane 54–58); {serbiaCover.annex}, 2.19–2.26 (štampane strane 3–4).</p>
      <a href={lectureUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-base leading-7 text-accent underline underline-offset-4">Nastavna referenca: GF Beograd, TBK1 — trajnost i zaštitni slojevi, slajdovi 29–39</a>
    </div>
  </section>;
}
