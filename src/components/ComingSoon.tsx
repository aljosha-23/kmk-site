export default function ComingSoon({ title }: { title: string }) {
  return (
    <main className="flex-1 bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-24">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          U pripremi
        </p>
      </section>
    </main>
  );
}
