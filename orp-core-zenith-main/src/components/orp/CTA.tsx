import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/30 blur-[140px]" />

        <div className="relative px-8 py-20 md:py-28 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
          >
            Let's build something
            <br />
            <span className="text-gradient text-glow">extraordinary.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-xl mx-auto text-muted-foreground text-lg"
          >
            Tell us about your project. We'll respond within one business day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-10"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg overflow-hidden hover:scale-[1.04] hover:shadow-[0_0_60px_var(--color-primary)] transition-all"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">Start Your Project</span>
              <svg className="relative w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
