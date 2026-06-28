import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/orp/LoadingScreen";
import { Navbar } from "@/components/orp/Navbar";
import { Hero } from "@/components/orp/Hero";
import { Services } from "@/components/orp/Services";
import { Technologies } from "@/components/orp/Technologies";
import { Projects } from "@/components/orp/Projects";
import { About } from "@/components/orp/About";
import { Process } from "@/components/orp/Process";
import { Testimonials } from "@/components/orp/Testimonials";
import { CTA } from "@/components/orp/CTA";
import { Contact } from "@/components/orp/Contact";
import { Footer } from "@/components/orp/Footer";
import { SmoothScroll } from "@/components/orp/SmoothScroll";
import { Cursor } from "@/components/orp/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORP CORE — Building Intelligent Digital Solutions" },
      { name: "description", content: "We design and build websites, mobile apps, cloud infrastructure, AI products, automation systems, and custom software for forward-thinking businesses." },
      { property: "og:title", content: "ORP CORE — Building Intelligent Digital Solutions" },
      { property: "og:description", content: "Premium engineering studio for web, mobile, cloud, AI, and automation." },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock scroll while loading screen plays
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (loaded) document.body.style.overflow = "";
  }, [loaded]);

  return (
    <>
      {mounted && !loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && <SmoothScroll />}
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Technologies />
        <About />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
