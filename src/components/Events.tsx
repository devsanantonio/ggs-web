import type { Event } from "@/content/events";

type EventsProps = {
  events: Event[];
};

const statusStyles: Record<Event["status"], string> = {
  upcoming: "bg-emerald-100 text-emerald-800",
  past: "bg-slate-200 text-slate-700",
  cancelled: "bg-rose-100 text-rose-700",
};

export function Events({ events }: EventsProps) {
  return (
    <section
      id="events"
      className="border-y border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f7faf7_100%)]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Events
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
            Regular opportunities to meet, share work, and stay plugged in.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Event content is structured from day one so the public site can grow
            into a future admin-managed workflow without rewriting the section.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={`${event.title}-${event.date}`}
              className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-[22rem] text-2xl font-semibold tracking-tight text-slate-950">
                  {event.title}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusStyles[event.status]}`}
                >
                  {event.status}
                </span>
              </div>
              <div className="mt-4 space-y-1 text-sm font-medium text-slate-500">
                <p>
                  {event.date} · {event.time}
                </p>
                <p>{event.location}</p>
              </div>
              <p className="mt-5 flex-1 text-base leading-7 text-slate-700">
                {event.description}
              </p>
              <a
                href={event.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-950"
              >
                Event details
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
