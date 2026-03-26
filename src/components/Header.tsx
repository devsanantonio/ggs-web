"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  { href: "#community", label: "Community" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Connect" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/84 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-10 lg:px-12">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-full px-1 py-1 transition"
        >
          <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-white/6 to-white/0 px-2 py-2">
            <Image
              src="/reference/ggs-logo-white.png"
              alt="Greater Gaming Society"
              width={280}
              height={128}
              className="h-auto w-28 transition duration-300 group-hover:scale-[1.03] sm:w-32"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-amber-200">
              San Antonio, TX
            </p>
            <p className="mt-1 text-sm font-semibold tracking-[0.08em] text-white/92">
              Developers, players, and creatives
            </p>
          </div>
        </a>

        <nav
          aria-label="Primary"
          className="hidden shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/6 p-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-slate-100 transition hover:bg-gradient-to-r hover:from-emerald-400 hover:to-amber-300 hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/12 lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-slate-950/96 transition-[max-height,opacity] duration-300 lg:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-4 sm:px-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-2xl px-4 py-4 text-base font-semibold text-slate-100 transition hover:bg-white/8"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
