import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center text-white bg-black">
      <div className="font-bold text-lg">KMK</div>

      <div className="flex gap-6 text-sm">
        <Link href="/">Početna</Link>
        <Link href="/usluge">Usluge</Link>
        <Link href="/projekti">Projekti</Link>
        <Link href="/o-nama">O nama</Link>
        <Link href="/kontakt">Kontakt</Link>
      </div>
    </nav>
  );
}