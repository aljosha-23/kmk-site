export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">
          KMK Structural Solutions
        </h1>

        <h2 className="text-xl text-gray-300 mb-6">
          Razrada projektne dokumentacije i armirački planovi
        </h2>

        <p className="text-gray-400 mb-10">
          Specijalizovani smo za razradu projektne dokumentacije armiranobetonskih konstrukcija, uključujući izradu armiračkih planova, detalja i pratećih specifikacija za potrebe izvođenja.
        </p>

        <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
          Kontaktirajte nas
        </button>
      </div>
    </main>
  );
}