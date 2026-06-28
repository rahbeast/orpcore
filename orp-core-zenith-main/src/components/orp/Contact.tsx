import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "./Services";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader eyebrow="Get in touch" title="Tell us what you're building." />

        <div className="mt-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          {/* Left: network visual + info */}
          <div className="space-y-8">
            <div className="relative aspect-square max-w-md glass-strong rounded-3xl overflow-hidden">
              <NetworkNodes />
            </div>
            <div className="space-y-4 text-sm">
              <ContactRow icon="M4 4h16v16H4zM4 4l8 8 8-8" label="hello@orpcore.com" />
              <ContactRow icon="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2z" label="+1 (555) 012-9090" />
              <ContactRow icon="M12 2C7 2 3 6 3 11c0 7 9 11 9 11s9-4 9-11c0-5-4-9-9-9zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" label="Remote · HQ in Lisbon" />
            </div>
            <div className="flex gap-3">
              {["X", "in", "GH", "Be"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-sm hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-[0_0_20px_var(--color-primary)] transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-strong rounded-3xl p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" name="name" placeholder="Ada Lovelace" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Company" name="company" placeholder="Acme Inc." />
              <Field label="Project Type" name="type" placeholder="Web · Mobile · AI · Cloud" />
            </div>
            <Field label="Budget" name="budget" placeholder="$25k – $100k" />
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="A bit about the project, timeline, and what success looks like…"
                className="w-full rounded-xl bg-background/40 border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-[0_0_0_3px_rgba(1,195,141,0.15)] focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold overflow-hidden hover:shadow-[0_0_40px_var(--color-primary)] transition-shadow"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">{sent ? "Sent — talk soon." : "Send Message"}</span>
              {!sent && (
                <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-background/40 border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-[0_0_0_3px_rgba(1,195,141,0.15)] focus:outline-none transition-all"
      />
    </div>
  );
}

function ContactRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
      <span className="w-9 h-9 rounded-lg glass flex items-center justify-center text-primary">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </span>
      <span>{label}</span>
    </div>
  );
}

function NetworkNodes() {
  const nodes = Array.from({ length: 12 }).map((_, i) => ({
    x: 15 + (i % 4) * 25 + (Math.sin(i) * 6),
    y: 15 + Math.floor(i / 4) * 28 + (Math.cos(i) * 6),
    delay: i * 0.15,
  }));
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#01C38D" stopOpacity="1" />
          <stop offset="100%" stopColor="#01C38D" stopOpacity="0" />
        </radialGradient>
      </defs>
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 32) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="#01C38D" strokeWidth="0.2" strokeOpacity={0.4 - d / 100}
            >
              <animate attributeName="stroke-opacity" values="0.1;0.5;0.1" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
            </line>
          );
        })
      )}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="3" fill="url(#nodeGlow)">
            <animate attributeName="r" values="2;4;2" dur="3s" begin={`${n.delay}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="1" fill="#01C38D" />
        </g>
      ))}
    </svg>
  );
}
