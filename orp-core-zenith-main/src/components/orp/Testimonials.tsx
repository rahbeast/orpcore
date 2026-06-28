import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const items = [
  { quote: "ORP CORE shipped in 8 weeks what our previous vendor couldn't in a year. Senior, sharp, accountable.", name: "Maya Okafor", role: "CTO, Helix Finance" },
  { quote: "They don't just write code — they understand the business. Every release moves a real metric.", name: "Daniel Reyes", role: "VP Eng, Aurora Health" },
  { quote: "The most polished engineering partner we've worked with. Calm in a crisis, fast in a sprint.", name: "Sofia Lindqvist", role: "COO, Nimbus Logistics" },
  { quote: "Design and engineering operating as one team. Outcomes you can feel in the product.", name: "Arjun Patel", role: "Founder, Layer Labs" },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader eyebrow="Clients" title="Trusted by teams that ship." />

        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {items.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-7 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(1,195,141,0.15)] transition-all animate-float-slow"
              style={{ animationDelay: `${i * 0.6}s`, animationDuration: "10s" }}
            >
              <svg className="w-7 h-7 text-primary mb-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
              <blockquote className="text-lg leading-relaxed">{q.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-[#132D46] border border-primary/30 flex items-center justify-center font-semibold text-sm"
                >
                  {q.name.split(" ").map(n => n[0]).join("")}
                </span>
                <div>
                  <div className="font-semibold text-sm">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
