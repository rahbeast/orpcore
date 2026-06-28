import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Services";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const timeline = [
  { year: "Vision", text: "Technology that genuinely advances how businesses operate." },
  { year: "Mission", text: "Ship resilient digital products that compound value over time." },
  { year: "Values", text: "Craft, candor, ownership, and a relentless bias for shipping." },
  { year: "Philosophy", text: "Innovation lives in the details — and in the team that obsesses over them." },
];

const stats = [
  { v: 240, s: "+", l: "Projects Completed" },
  { v: 120, s: "+", l: "Clients Worldwide" },
  { v: 32, s: "", l: "Countries Served" },
  { v: 9, s: "", l: "Years of Experience" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="About ORP CORE"
          title="A team built to outlast the hype cycle."
          subtitle="We're engineers, designers and strategists who believe great software is invisible until it disappears into how a business runs."
        />

        <div className="mt-16 grid lg:grid-cols-[1fr_1.1fr] gap-16">
          {/* Timeline */}
          <div className="relative pl-8">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
                <h4 className="font-display font-bold text-xl text-primary">{t.year}</h4>
                <p className="mt-2 text-muted-foreground leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5 self-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 lg:p-8 hover:border-primary/40 transition-colors"
              >
                <div className="font-display font-bold text-4xl lg:text-5xl text-gradient">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
