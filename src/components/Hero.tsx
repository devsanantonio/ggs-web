import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,#facc15,transparent_22%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.22),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.18),transparent_22%),linear-gradient(180deg,#f7f0e4_0%,#eef3ec_58%,#faf9f5_100%)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(15,23,42,0.16),transparent)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-28 h-56 w-56 rounded-full bg-amber-300/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] top-24 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-[16%] h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
            Community for developers and enthusiasts
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl lg:text-7xl">
            San Antonio&apos;s gathering place for people who care about games.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 font-medium text-slate-800 sm:text-xl">
            The Greater Gaming Society connects local game developers, gamers,
            creatives, students, and supporters through meetups, networking, and
            a shared commitment to growing the regional game community.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
            <span className="rounded-full border border-slate-300 bg-white/70 px-4 py-2">
              Monthly meetups
            </span>
            <span className="rounded-full border border-slate-300 bg-white/70 px-4 py-2">
              Local creators
            </span>
            <span className="rounded-full border border-slate-300 bg-white/70 px-4 py-2">
              Community energy
            </span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium">
            <a
              href="https://www.meetup.com/greater-gaming-society-of-san-antonio/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-6 py-3 text-white shadow-[0_16px_35px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Join on Meetup
            </a>
            <a
              href="#community"
              className="rounded-full border border-slate-300 bg-white/85 px-6 py-3 text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950"
            >
              Explore the community
            </a>
          </div>
        </div>

        <div className="relative min-h-[24rem] self-end">
          <div className="absolute left-0 top-16 hidden h-32 w-32 rounded-full border border-white/50 bg-white/60 blur-sm lg:block" />
          <div className="absolute right-2 top-0 z-20 w-[84%] overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-4 text-white shadow-[0_30px_80px_rgba(15,23,42,0.20)] md:w-[78%]">
            <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-amber-200">
              Spotlight
            </div>
            <div className="rounded-[1.45rem] border border-white/10 bg-white/4 p-3">
              <Image
                src="/reference/community-pictures/ggs-geekdom-ribbon.jpg"
                alt="Greater Gaming Society ribbon-cutting event at Geekdom"
                width={1152}
                height={768}
                className="h-56 w-full rounded-[1.1rem] object-cover sm:h-64"
                priority
              />
            </div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                  Community-first
                </p>
                <p className="mt-2 text-base leading-7 text-slate-200">
                  Real events, familiar faces, and visible momentum for the game
                  community in San Antonio.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-[66%] rotate-[-5deg] overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/75 p-3 shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
            <Image
              src="/reference/community-pictures/ggs-meetup2.jpg"
              alt="Greater Gaming Society meetup community photo"
              width={768}
              height={768}
              className="h-48 w-full rounded-[1.1rem] object-cover"
            />
          </div>
          <div className="absolute bottom-6 right-0 z-30 hidden rounded-full border border-amber-300/50 bg-amber-200/80 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-900 shadow-[0_12px_30px_rgba(251,191,36,0.28)] sm:block">
            Meet • Share • Build
          </div>
        </div>
      </div>
    </section>
  );
}
