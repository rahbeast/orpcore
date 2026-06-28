import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const steps = [
  { n: "01", t: "Discover", d: "Audit, interview, align on outcomes." },
  { n: "02", t: "Plan", d: "Architecture, scope, success metrics." },
  { n: "03", t: "Design", d: "Interfaces and systems users love." },
  { n: "04", t: "Develop", d: "Ship in small, reviewable increments." },
  { n: "05", t: "Deploy", d: "Automated pipelines and rollouts." },
  { n: "06", t: "Support", d: "SLAs, observability, continuous care." },
];

export function Process() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="How we work" title="A process that compounds." subtitle="Predictable delivery without the bureaucracy." />

        <div className="mt-16 relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative mx-auto w-16 h-16 rounded-full glass-strong border-primary/30 flex items-center justify-center font-display font-bold text-primary shadow-[0_0_30px_rgba(1,195,141,0.25)]">
                  {s.n}
                  <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-50" />
                </div>
                <h4 className="mt-5 font-semibold">{s.t}</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
