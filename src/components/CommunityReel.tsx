"use client";

import Image from "next/image";

import { getDailyCommunitySelection } from "@/content/communityImages";
import { useDailyRotationKey } from "@/lib/dailyRotation";

export function CommunityReel() {
  const dayKey = useDailyRotationKey();
  const { reelSlides: slides } = getDailyCommunitySelection(dayKey);
  const reel = [...slides, ...slides];

  return (
    <section
      id="community"
      className="overflow-hidden scroll-mt-16 border-y border-black/5 bg-slate-950 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
            Greater Gaming Society in motion
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Meetups, game jams, talks, and community moments from San Antonio.
          </h2>
          <p className="mt-6 text-lg leading-8 font-medium text-slate-200">
            A look at the people, projects, and gatherings behind the group:
            monthly meetups, Global Game Jam, Startup Week, and the wider local
            game community.
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
                    sizes="(min-width: 640px) 20rem, 18rem"
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
