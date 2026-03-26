const communityLinks = [
  {
    href: "https://www.instagram.com/greatergamingsociety/",
    label: "Instagram",
    description: "Follow community updates and highlights.",
  },
  {
    href: "https://www.meetup.com/greater-gaming-society-of-san-antonio/",
    label: "Meetup",
    description: "Track local meetups and upcoming gatherings.",
  },
  {
    href: "https://www.facebook.com/greatergamingsociety",
    label: "Facebook",
    description: "Connect with the broader community online.",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Connect with the community
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
            Find the channel that works best for how you like to show up.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Whether you&apos;re looking to attend a meetup, meet local
            developers, or stay connected to the community between events, these
            are the primary places to start.
          </p>
        </div>

        <div className="grid gap-5">
          {communityLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-950"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {link.description}
                  </p>
                </div>
                <span className="text-sm font-semibold text-emerald-700 transition group-hover:text-slate-950">
                  Visit
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
