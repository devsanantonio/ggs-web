import { Suspense } from "react";

import { About } from "@/components/About";
import { CommunityReel } from "@/components/CommunityReel";
import { Contact } from "@/components/Contact";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f7f0e4_0%,#f4f6f0_48%,#faf9f5_100%)] text-slate-950">
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
        <Suspense fallback={null}>
          <CommunityReel />
        </Suspense>
        <About />
        <Suspense fallback={null}>
          <Events />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
