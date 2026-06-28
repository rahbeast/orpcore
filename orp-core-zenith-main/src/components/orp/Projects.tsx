import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeader } from "./Services";

const projects = [
  {
    title: "Helix Finance",
    tag: "Fintech Platform",
    overview:
      "A real-time trading and portfolio operating system serving thousands of professional traders. We rebuilt the data layer to ingest 2M+ events per second with sub-50ms render latency, then layered a focused, keyboard-first interface on top.",
    features: [
      "Streaming order book with virtualized rendering",
      "Multi-leg strategy builder with backtests",
      "Real-time PnL across 14 exchanges",
      "Role-based access for trading desks",
    ],
    tech: ["Next.js", "Go", "PostgreSQL", "Kubernetes", "ClickHouse", "Redis"],
    process:
      "Discovery → architecture spike → 8-week MVP → progressive rollout to live trading desks with zero-downtime cutovers.",
    stats: [
      { k: "+318%", v: "User retention" },
      { k: "47ms", v: "p95 render latency" },
      { k: "2M/s", v: "Events ingested" },
      { k: "99.99%", v: "Uptime" },
    ],
    accent: "from-emerald-400/30 via-teal-500/15 to-transparent",
    glow: "rgba(16,185,129,0.45)",
  },
  {
    title: "Aurora Health",
    tag: "AI Healthcare",
    overview:
      "An ambient clinical copilot that listens during patient visits and drafts structured visit notes for clinician review. Cuts documentation time by ~12 hours per clinician per week without changing the EMR.",
    features: [
      "On-device ambient capture with redaction",
      "RAG over clinical guidelines and patient history",
      "Editable, citation-backed SOAP notes",
      "FHIR push into Epic, Cerner, athenahealth",
    ],
    tech: ["Python", "RAG", "FastAPI", "AWS", "pgvector", "Whisper"],
    process:
      "Clinician co-design sprints → HIPAA-grade infra → 6 pilot clinics → continuous fine-tuning loop on reviewed notes.",
    stats: [
      { k: "12h", v: "Saved per clinician/week" },
      { k: "98.4%", v: "Note accuracy" },
      { k: "40+", v: "Clinics deployed" },
      { k: "100%", v: "HIPAA-aligned" },
    ],
    accent: "from-cyan-400/30 via-blue-500/15 to-transparent",
    glow: "rgba(59,130,246,0.45)",
  },
  {
    title: "Nimbus Logistics",
    tag: "Cloud Infrastructure",
    overview:
      "A multi-region orchestration platform powering fleet operations across 14 countries. We rebuilt the control plane on a fully declarative IaC foundation and cut infrastructure costs by 60% in the first quarter.",
    features: [
      "Active-active multi-region deployments",
      "Self-healing dispatch workers with circuit breakers",
      "Real-time driver telemetry and geofencing",
      "Centralized observability across 200+ services",
    ],
    tech: ["Terraform", "AWS", "Node.js", "Redis", "Kafka", "Grafana"],
    process:
      "Infrastructure audit → blue-green migration → SRE playbooks → 24/7 incident response handoff to the in-house team.",
    stats: [
      { k: "99.99%", v: "Uptime SLO met" },
      { k: "14", v: "Regions" },
      { k: "-60%", v: "Infra cost" },
      { k: "<3min", v: "Mean recovery" },
    ],
    accent: "from-emerald-500/30 via-green-600/15 to-transparent",
    glow: "rgba(1,195,141,0.5)",
  },
];

type Project = (typeof projects)[number];

export function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each project gets an equal segment of the scroll range
  const n = projects.length;

  return (
    <section id="projects" className="relative">
      <div className="px-6 pt-32 pb-12 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Selected work"
          title="One story at a time."
          subtitle="Each project takes the full stage. Scroll down for the next chapter, up for the previous."
        />
      </div>

      {/* Scroll driver: n * 100vh of scroll, full-screen sticky stage on top */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${n * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {projects.map((p, i) => (
            <ProjectSlide
              key={p.title}
              project={p}
              index={i}
              total={n}
              progress={scrollYProgress}
            />
          ))}

          {/* Chapter indicator */}
          <ChapterIndicator total={n} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function ProjectSlide({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each slide owns the segment [i/n, (i+1)/n]. Fade/morph at boundaries.
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const fadeIn = seg * 0.25;

  // Opacity: dark before its window, full during, dark after
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - fadeIn),
      start + fadeIn * 0.4,
      end - fadeIn * 0.4,
      Math.min(1, end + fadeIn),
    ],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [
      Math.max(0, start - fadeIn),
      start + fadeIn * 0.4,
      end - fadeIn * 0.4,
      Math.min(1, end + fadeIn),
    ],
    [1.08, 1, 1, 0.94],
  );
  const blurPx = useTransform(
    progress,
    [
      Math.max(0, start - fadeIn),
      start + fadeIn * 0.4,
      end - fadeIn * 0.4,
      Math.min(1, end + fadeIn),
    ],
    [16, 0, 0, 18],
  );
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const y = useTransform(
    progress,
    [start, end],
    ["60px", "-60px"],
  );

  const altLayout = index % 2 === 1;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ opacity, zIndex: 10 + index }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[140px]"
          style={{ background: project.glow }}
        />
      </div>

      <motion.div
        style={{ scale, filter, y }}
        className={`relative max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center ${
          altLayout ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Mockup */}
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-strong">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div className="absolute inset-6 rounded-2xl bg-background/70 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="ml-auto text-[10px] text-muted-foreground">
                {project.title.toLowerCase().replace(" ", "")}.app
              </span>
            </div>
            <div className="h-2 w-24 rounded bg-primary/40" />
            <div className="grid grid-cols-4 gap-2 mt-1">
              {project.stats.map((s) => (
                <div key={s.v} className="rounded-lg bg-white/5 p-2.5">
                  <div className="text-sm font-bold text-primary">{s.k}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex-1 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`g-proj-${index}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#01C38D" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#01C38D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,60 L20,50 L40,55 L60,30 L80,40 L100,20 L120,35 L140,15 L160,25 L180,10 L200,18 L200,80 L0,80 Z" fill={`url(#g-proj-${index})`} />
                <path d="M0,60 L20,50 L40,55 L60,30 L80,40 L100,20 L120,35 L140,15 L160,25 L180,10 L200,18" stroke="#01C38D" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-[80px]" />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary">
            <span>Project {String(index + 1).padStart(2, "0")}</span>
            <span className="w-8 h-px bg-primary/50" />
            <span>{project.tag}</span>
          </div>
          <h3 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            {project.title}
          </h3>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
            {project.overview}
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-muted-foreground italic">{project.process}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full glass border-white/10">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-4 gap-4">
            {project.stats.map((s) => (
              <div key={s.v}>
                <div className="text-xl md:text-2xl font-bold text-primary text-glow">{s.k}</div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_var(--color-primary)] transition-shadow"
            >
              Visit Project
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
            >
              Read case study
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChapterIndicator({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const center = index * seg + seg / 2;
  const opacity = useTransform(progress, [center - seg / 2, center, center + seg / 2], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [center - seg / 2, center, center + seg / 2], [0.8, 1.4, 0.8]);
  return (
    <motion.span
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]"
    />
  );
}
