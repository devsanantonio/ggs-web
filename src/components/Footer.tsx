import Image from "next/image";

const footerLinks = [
  { href: "#community", label: "Community" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Connect" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-slate-950 text-slate-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <Image
              src="/reference/ggs-logo-white.png"
              alt="Greater Gaming Society"
              width={280}
              height={128}
              className="h-auto w-28"
              sizes="7rem"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                San Antonio, Texas
              </p>
              <p className="mt-2 text-sm font-semibold tracking-[0.08em] text-white">
                Greater Gaming Society
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 font-medium text-slate-300">
            Support, collaboration, and connection for developers, gamers, and
            enthusiasts based in San Antonio, Texas, with ties to meetups,
            showcases, and local game-community programming.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-semibold text-slate-300 transition hover:text-white focus-visible:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
