const highlights = [
  "Support for game developers and gamers across San Antonio and Texas.",
  "A place to collaborate, stay connected, and hear about opportunities.",
  "Monthly meetings and networking that help grow the local game industry.",
];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            About the organization
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
            Support, collaboration, and connection for the local game community.
          </h2>
        </div>

        <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
          <p className="font-medium text-slate-800">
            We are the Greater Gaming Society of San Antonio. The group brings
            together indie developers, gamers, creatives, students, musicians,
            and enthusiasts from across San Antonio and Texas.
          </p>
          <p className="font-medium text-slate-800">
            The goal is simple: provide support, collaboration, and connection
            through monthly meetings, networking, and anything that helps grow
            the local game industry.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight}
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_42px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-950"
          >
            <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-fuchsia-300 transition duration-300 group-hover:w-24" />
            <p className="text-base leading-7 font-medium text-slate-800">
              {highlight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
