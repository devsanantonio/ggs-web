export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,#fff7d7,transparent_38%),linear-gradient(180deg,#f7f0e4_0%,#f4f6f0_60%,#faf9f5_100%)]"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-30">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Community for developers and enthusiasts
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl lg:text-7xl">
            San Antonio&apos;s gathering place for people who care about games.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            The Greater Gaming Society connects local game developers, gamers,
            creatives, students, and supporters through meetups, networking, and
            a shared commitment to growing the regional game community.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
            <a
              href="https://www.meetup.com/greater-gaming-society-of-san-antonio/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-6 py-3 text-white transition hover:bg-slate-800"
            >
              Join on Meetup
            </a>
            <a
              href="#events"
              className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-slate-900 transition hover:border-slate-950"
            >
              See upcoming events
            </a>
          </div>
        </div>

        <div className="grid gap-4 self-end">
          <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Built around people
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              From indie developers and students to players and creatives, the
              group is meant to support connection across the local game scene.
            </p>
          </article>
          <article className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-[0_20px_45px_rgba(16,185,129,0.10)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Ongoing activity
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Monthly meetings, networking, and community support are central to
              how GGS helps people stay involved in San Antonio and across
              Texas.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
