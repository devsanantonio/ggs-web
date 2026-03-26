const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Connect" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-slate-950 text-slate-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
            Greater Gaming Society
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Support, collaboration, and connection for developers, gamers, and
            enthusiasts in San Antonio and across Texas.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
