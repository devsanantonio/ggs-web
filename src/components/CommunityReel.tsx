import Image from "next/image";

const slides = [
  {
    src: "/reference/community-pictures/ggs-geekdom-ribbon.jpg",
    alt: "Greater Gaming Society ribbon-cutting photo at Geekdom",
    label: "Gaming Summit Kickoff",
  },
  {
    src: "/reference/community-pictures/ggs-meetup2.jpg",
    alt: "Greater Gaming Society meetup photo",
    label: "Community meetup",
  },
  {
    src: "/reference/community-pictures/ggj25-presentations.jpg",
    alt: "Global Game Jam presentation photo",
    label: "Global Game Jam 2025",
  },
  {
    src: "/reference/community-pictures/ggs-geekdom-panel.jpg",
    alt: "Greater Gaming Society panel at Geekdom",
    label: "Panels and talks",
  },
  {
    src: "/reference/community-pictures/ggs-geekdom-people.jpg",
    alt: "Greater Gaming Society attendees at Geekdom",
    label: "People and projects",
  },
  {
    src: "/reference/community-pictures/ggs-geekdom-crowd.jpg",
    alt: "Greater Gaming Society crowd at an event",
    label: "Community energy",
  },
];

const reel = [...slides, ...slides];

export function CommunityReel() {
  return (
    <section
      id="community"
      className="overflow-hidden border-y border-black/5 bg-slate-950 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
            Community reel
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            The energy should feel like people actually show up here.
          </h2>
          <p className="mt-6 text-lg leading-8 font-medium text-slate-200">
            Use the actual event photography to show the organization as it
            exists: meetups, presentations, Geekdom programming, Global Game Jam
            energy, and people spending time together in the space.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="community-marquee-mask">
          <div className="community-marquee flex gap-6 px-5 sm:px-10 lg:px-12">
            {reel.map((slide, index) => (
              <article
                key={`${slide.src}-${index}`}
                className="group min-w-[18rem] max-w-[18rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:-translate-y-1 sm:min-w-[20rem] sm:max-w-[20rem]"
              >
                <div className="overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={1152}
                    height={768}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="px-2 pb-2 pt-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                  {slide.label}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 px-5 sm:hidden">
          <p className="text-sm leading-7 text-slate-300">
            On mobile this section stays swipe-friendly instead of auto-racing
            past the details.
          </p>
        </div>
      </div>
    </section>
  );
}
