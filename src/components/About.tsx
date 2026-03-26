const highlights = [
  "Support and collaboration for the local game industry and broader enthusiast community.",
  "A welcoming space for indie developers, gamers, students, musicians, and other creatives.",
  "A consistent San Antonio hub for networking, conversation, and community growth.",
];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            About the organization
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
            A local community built on connection, collaboration, and shared
            curiosity.
          </h2>
        </div>

        <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
          <p>
            The Greater Gaming Society of San Antonio exists to bring together
            the people who make, play, study, and support games in South Texas.
            It is designed to be approachable for newcomers and useful for
            long-time community members.
          </p>
          <p>
            The group&apos;s role is practical: help people meet each other,
            stay connected, share opportunities, and create a healthier local
            environment for game development and game culture.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-base leading-7 text-slate-700">{highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
