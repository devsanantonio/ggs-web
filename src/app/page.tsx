export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f7f0e4_0%,#f4f6f0_48%,#faf9f5_100%)] text-slate-950">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Phase 1 Scaffold
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Greater Gaming Society of San Antonio
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            The Next.js app, Biome tooling, and MCP-aware workspace are now in
            place. Phase 2 will replace this shell with the full public site for
            the organization.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
            <a
              className="rounded-full bg-slate-950 px-5 py-3 text-white transition hover:bg-slate-800"
              href="#next-steps"
            >
              View next steps
            </a>
            <span className="rounded-full border border-slate-300 px-5 py-3 text-slate-800">
              Build plan lives in `docs/project/implementation-path.md`
            </span>
          </div>
        </div>
      </section>

      <section
        id="next-steps"
        className="border-t border-slate-200/80 bg-white/70 py-16 backdrop-blur"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 sm:px-10 lg:grid-cols-3 lg:px-12">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Context7</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use for current Next.js, Tailwind, and Biome reference questions
              while building the real sections.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Next DevTools</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the `init` tool after the dev server starts to inspect routes,
              metadata, and runtime diagnostics.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Playwright</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use after the first render is stable on localhost:3000 to verify
              the layout as the homepage evolves.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
