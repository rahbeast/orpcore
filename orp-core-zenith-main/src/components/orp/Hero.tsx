import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Animated background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, rgba(1,195,141,0.18), transparent 60%)`,
          transition: "background 0.2s",
        }}
      />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#132D46] blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Engineering the next digital era
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          >
            Building{" "}
            <span className="text-gradient">Intelligent</span>
            <br />
            Digital Solutions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 max-w-xl text-muted-foreground text-lg leading-relaxed"
          >
            We design and build websites, mobile applications, cloud solutions, automation systems,
            AI products, and scalable digital platforms tailored to your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-[0_0_40px_var(--color-primary)]"
            >
              <span className="relative z-10">Explore Projects</span>
              <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-[#aaf5db] to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-foreground font-medium transition-all hover:border-primary/40 hover:shadow-[0_0_24px_rgba(1,195,141,0.2)]"
            >
              Contact Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 flex items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {["#01C38D", "#132D46", "#01C38D"].map((c, i) => (
                <span key={i} className="w-7 h-7 rounded-full border-2 border-background" style={{ background: c }} />
              ))}
            </div>
            <span>Trusted by 120+ teams worldwide · 99.9% uptime</span>
          </motion.div>
        </div>

        {/* 3D visual */}
        <HeroVisual mx={mouse.x} my={mouse.y} />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs">
        <span>Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}

function HeroVisual({ mx, my }: { mx: number; my: number }) {
  // Draggable rotation state
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; bx: number; by: number } | null>(null);

  const onDown = (e: ReactPointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY, bx: drag.x, by: drag.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setDrag({ x: dragStart.current.bx + dx * 0.5, y: dragStart.current.by + dy * 0.5 });
  };
  const onUp = () => {
    dragStart.current = null;
  };

  const rotY = drag.x + mx * 12;
  const rotX = -drag.y - my * 12;

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto cursor-grab active:cursor-grabbing touch-none select-none"
      style={{ perspective: "1200px" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transition: dragStart.current ? "none" : "transform 0.3s ease-out",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Concentric rings */}
        {[0.55, 0.72, 0.9].map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/30"
            style={{ transform: `scale(${s}) rotateX(${65 + i * 5}deg)` }}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 30 + i * 8, repeat: Infinity, ease: "linear" }}
          >
            {/* Node */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_12px_var(--color-primary)]" />
          </motion.div>
        ))}

        {/* Center core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-[#132D46] border border-primary/40 shadow-[0_0_60px_rgba(1,195,141,0.5)] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-background/80 backdrop-blur border border-primary/30 flex items-center justify-center font-display font-bold text-primary text-xl">
              ORP
            </div>
            <span className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
          </div>
        </div>

        {/* Floating data cards */}
        {[
          { top: "8%", left: "6%", label: "AI", val: "98.4%" },
          { top: "12%", right: "4%", label: "Cloud", val: "12 regions" },
          { bottom: "10%", left: "0%", label: "Uptime", val: "99.99%" },
          { bottom: "6%", right: "8%", label: "Edge", val: "<40ms" },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute glass rounded-lg px-3 py-2 text-xs pointer-events-none"
            style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <div className="text-muted-foreground">{c.label}</div>
            <div className="text-primary font-semibold">{c.val}</div>
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground pointer-events-none">
        Drag to rotate
      </div>
    </div>
  );
}
