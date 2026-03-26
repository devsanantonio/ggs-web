const navItems = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Connect" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f0e4]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <a href="#top" className="max-w-[15rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            San Antonio, TX
          </p>
          <p className="mt-1 text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
            Greater Gaming Society
          </p>
        </a>
        <nav aria-label="Primary" className="flex flex-wrap justify-end gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/80 hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
