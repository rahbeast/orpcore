import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const groups = [
  { title: "Frontend", items: ["React", "Next.js", "Vue"] },
  { title: "Backend", items: ["Node.js", "Python", "Java", "Go"] },
  { title: "Cloud", items: ["AWS", "Azure", "Google Cloud"] },
  { title: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { title: "DevOps", items: ["Docker", "Kubernetes", "Terraform"] },
];

export function Technologies() {
  return (
    <section id="tech" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our stack"
          title="A complete arsenal for modern engineering."
          subtitle="We choose the right tool, never the trendiest. Below is what we ship most often."
        />

        <div className="mt-16 grid gap-10">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="grid md:grid-cols-[200px_1fr] gap-6 items-start"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{g.title}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {g.items.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative glass rounded-xl px-5 py-4 flex items-center gap-3 cursor-default hover:border-primary/40 hover:shadow-[0_0_30px_rgba(1,195,141,0.18)] transition-all animate-float-slow"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <span className="w-8 h-8 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                      {name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-medium">{name}</span>
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
