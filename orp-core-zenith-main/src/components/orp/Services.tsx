import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const services = [
  { title: "Website Development", desc: "Blazing fast, conversion-focused websites engineered for scale.", icon: "M3 4h18v4H3zM3 10h18v4H3zM3 16h18v4H3z" },
  { title: "Mobile App Development", desc: "Native iOS, Android and cross-platform apps users love to open.", icon: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 18h4" },
  { title: "Cloud Solutions", desc: "Resilient multi-region infrastructure on AWS, Azure and GCP.", icon: "M7 18a5 5 0 1 1 .9-9.92A6 6 0 1 1 19 16h-1" },
  { title: "UI/UX Design", desc: "Interfaces that feel obvious — design that elevates the brand.", icon: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" },
  { title: "AI Solutions", desc: "Production-grade models, RAG pipelines, agents and copilots.", icon: "M12 2a10 10 0 1 0 10 10M12 6v6l4 2" },
  { title: "API Development", desc: "Type-safe, well-documented APIs that scale to millions of calls.", icon: "M4 7h16M4 12h16M4 17h10" },
  { title: "DevOps", desc: "CI/CD, observability and infra-as-code for shipping with confidence.", icon: "M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" },
  { title: "Automation", desc: "Workflows that eliminate busywork and unlock real leverage.", icon: "M6 4l12 8-12 8z" },
  { title: "Custom Software", desc: "Bespoke platforms architected around your operating model.", icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" },
  { title: "Digital Consulting", desc: "Roadmaps, audits and strategy from a senior, hands-on team.", icon: "M12 2l9 4.5v6c0 5-3.8 9.6-9 11-5.2-1.4-9-6-9-11v-6z" },
];

const CARD_W = 360; // px including gap
const GAP = 24;
const STEP = CARD_W + GAP;
const BASE_SPEED = 28; // px/sec continuous drift

export function Services() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackWidth = useRef(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const boostRef = useRef(0); // transient scroll-driven boost

  // Measure full track width (one copy)
  useEffect(() => {
    const measure = () => {
      trackWidth.current = services.length * STEP;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Continuous drift + decaying scroll boost; wraps seamlessly
  useAnimationFrame((_, delta) => {
    const dt = delta / 1000;
    const w = trackWidth.current;
    if (!w) return;
    const speed = (paused ? 0 : BASE_SPEED) + boostRef.current;
    boostRef.current *= Math.pow(0.001, dt); // fast decay
    let next = x.get() - speed * dt;
    // wrap
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  // Wheel inside section nudges marquee speed (continuous, not slide-by-slide)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // gentle nudge — does NOT block page scroll
      boostRef.current += e.deltaY * 0.6;
      if (boostRef.current > 1200) boostRef.current = 1200;
      if (boostRef.current < -1200) boostRef.current = -1200;
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="What we do"
          title="Services engineered for outcomes."
          subtitle="A continuous stream of what we build. Hover to pause, scroll to nudge the flow."
        />
      </div>

      {/* Continuous marquee viewport */}
      <div
        ref={viewportRef}
        className="relative mt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          ref={trackRef}
          className="flex"
          style={{ x, gap: `${GAP}px`, willChange: "transform" }}
        >
          {[...services, ...services].map((s, i) => (
            <ServiceCard key={`${s.title}-${i}`} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <div
      className="group relative glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-primary/60 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(1,195,141,0.25)] shrink-0"
      style={{ width: `${CARD_W}px` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(500px circle at 50% 0%, rgba(1,195,141,0.18), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_40px_var(--color-primary)] transition-all duration-500 group-hover:rotate-6">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
        <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-primary opacity-60 group-hover:opacity-100 transition-opacity">
          Learn more
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary"
      >
        <span className="w-8 h-px bg-primary" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
