import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent } from "framer-motion";

interface Props {
  onComplete: () => void;
}

type Phase = "idle" | "descend" | "swing" | "settle" | "flicker" | "reveal" | "done";

const warmCore = "#fff8d6";
const warmMid = "#ffd24a";
const warmDeep = "#f59000";

export function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bulbRef = useRef<HTMLDivElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const rotate = useMotionValue(0);
  const wireY = useMotionValue(-220);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  };

  const playTone = (
    freq: number,
    duration: number,
    type: OscillatorType = "sine",
    gain = 0.06,
    delay = 0,
  ) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(gain, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(g).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      /* noop */
    }
  };

  const playCreak = (delay = 0) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.3);
      g.gain.setValueAtTime(0.035, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(g).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      /* noop */
    }
  };

  const playWhoosh = (delay = 0, dur = 0.6) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime + delay;
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(380, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.1, now + 0.1);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      src.connect(filter).connect(g).connect(ctx.destination);
      src.start(now);
      src.stop(now + dur + 0.05);
    } catch {
      /* noop */
    }
  };

  const playClickBuzz = () => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      const click = ctx.createOscillator();
      const cg = ctx.createGain();
      click.type = "square";
      click.frequency.setValueAtTime(900, now);
      click.frequency.exponentialRampToValueAtTime(60, now + 0.05);
      cg.gain.setValueAtTime(0.18, now);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      click.connect(cg).connect(ctx.destination);
      click.start(now);
      click.stop(now + 0.1);
      [60, 120, 180].forEach((f, i) => {
        const o = ctx.createOscillator();
        const og = ctx.createGain();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(f, now + 0.12);
        og.gain.setValueAtTime(0, now + 0.12);
        og.gain.linearRampToValueAtTime(0.045 / (i + 1), now + 0.2);
        og.gain.linearRampToValueAtTime(0.018 / (i + 1), now + 1.0);
        og.gain.linearRampToValueAtTime(0, now + 1.5);
        o.connect(og).connect(ctx.destination);
        o.start(now + 0.12);
        o.stop(now + 1.55);
      });
    } catch {
      /* noop */
    }
  };

  const playSparkle = (delay = 0) => {
    [880, 1320, 1760, 2200].forEach((f, i) =>
      playTone(f, 0.22, "triangle", 0.04, delay + i * 0.08),
    );
  };

  // Track bulb DOM position → spotlight CSS vars on text wrapper
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const bulb = bulbRef.current;
      const wrap = textWrapRef.current;
      if (bulb && wrap) {
        const b = bulb.getBoundingClientRect();
        const w = wrap.getBoundingClientRect();
        const lx = b.left + b.width / 2 - w.left;
        const ly = b.top + b.height / 2 - w.top;
        wrap.style.setProperty("--lx", `${lx}px`);
        wrap.style.setProperty("--ly", `${ly}px`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Audio sync to rotation peaks (creak at extremes)
  const lastSign = useRef(0);
  useMotionValueEvent(rotate, "change", (v) => {
    const s = Math.sign(v);
    if (s !== 0 && s !== lastSign.current && phase === "swing" && Math.abs(v) > 4) {
      lastSign.current = s;
      playCreak(0);
    }
  });

  const startSequence = () => {
    if (phase !== "idle") return;
    getCtx().resume?.();
    playWhoosh(0, 1.2);
    setPhase("descend");
  };

  // Descend → swing → settle → flicker → reveal → done
  useEffect(() => {
    if (phase === "descend") {
      const t = setTimeout(() => setPhase("swing"), 1300);
      return () => clearTimeout(t);
    }
    if (phase === "swing") {
      const t = setTimeout(() => setPhase("settle"), 4200);
      return () => clearTimeout(t);
    }
    if (phase === "settle") {
      const t = setTimeout(() => setPhase("flicker"), 800);
      return () => clearTimeout(t);
    }
    if (phase === "flicker") {
      playClickBuzz();
      const t = setTimeout(() => setPhase("reveal"), 1300);
      return () => clearTimeout(t);
    }
    if (phase === "reveal") {
      playSparkle(0);
      playSparkle(0.4);
      playTone(220, 1.2, "sine", 0.05, 0);
      const t = setTimeout(() => setPhase("done"), 1400);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(() => onComplete(), 700);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  const p: Phase = phase;
  const bulbOn =
    p === "descend" ||
    p === "swing" ||
    p === "settle" ||
    p === "flicker" ||
    p === "reveal" ||
    p === "done";
  const isFullBright = p === "reveal" || p === "done";

  // Mask radius grows over phases; in reveal+ fully bright
  const maskRadius =
    phase === "reveal" || phase === "done"
      ? 2000
      : phase === "flicker"
        ? 380
        : phase === "settle"
          ? 320
          : phase === "swing"
            ? 260
            : phase === "descend"
              ? 200
              : 0;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black overflow-hidden select-none"
          exit={{ opacity: 0, filter: "blur(24px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Bulb assembly */}
          <motion.div
            className="absolute left-1/2 top-0 origin-top"
            style={{ transformOrigin: "50% 0%", x: "-50%", rotate, y: wireY }}
            animate={
              phase === "descend"
                ? { y: 0, rotate: 0 }
                : phase === "swing"
                  ? { y: 0, rotate: [0, 28, -22, 17, -12, 8, -5, 2, 0] }
                  : { y: 0, rotate: 0 }
            }
            transition={
              phase === "descend"
                ? { duration: 1.3, ease: [0.22, 1, 0.36, 1] }
                : phase === "swing"
                  ? {
                      duration: 4.2,
                      ease: [0.4, 0, 0.2, 1],
                      times: [0, 0.12, 0.25, 0.4, 0.55, 0.68, 0.8, 0.9, 1],
                    }
                  : { duration: 0.4 }
            }
          >
            {/* Wire */}
            <div className="w-px h-[38vh] mx-auto bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-500" />
            {/* Bulb */}
            <div className="relative -mt-1 flex flex-col items-center">
              <div className="w-3 h-4 bg-neutral-600 rounded-sm" />
              <motion.div
                ref={bulbRef}
                className="relative w-16 h-20"
                animate={
                  phase === "flicker"
                    ? { opacity: [1, 0.08, 1, 0.25, 1, 0.5, 1] }
                    : { opacity: 1 }
                }
                transition={{ duration: 1.0, times: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 1] }}
              >
                {/* Outer mega-glow */}
                <div
                  className="absolute -inset-16 rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, ${warmCore} 0%, ${warmMid}cc 25%, ${warmDeep}55 55%, transparent 80%)`,
                    opacity: bulbOn ? (isFullBright ? 1 : 0.85) : 0,
                    transition: "opacity 0.4s",
                  }}
                />
                {/* Inner glow */}
                <div
                  className="absolute -inset-4 rounded-full blur-xl"
                  style={{
                    background: `radial-gradient(circle, #ffffff 0%, ${warmCore} 30%, ${warmMid} 60%, transparent 90%)`,
                    opacity: bulbOn ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />
                {/* Glass */}
                <div
                  className="absolute inset-x-2 top-2 bottom-0 rounded-full"
                  style={{
                    background: bulbOn
                      ? `radial-gradient(ellipse at 50% 35%, #ffffff 0%, ${warmCore} 30%, ${warmMid} 65%, ${warmDeep} 100%)`
                      : "radial-gradient(ellipse at 50% 35%, #2a2a2a 0%, #1a1a1a 60%, #0d0d0d 100%)",
                    boxShadow: bulbOn
                      ? `inset 0 -8px 16px rgba(0,0,0,0.3), 0 0 120px ${warmCore}, 0 0 240px ${warmMid}`
                      : "inset 0 -8px 16px rgba(0,0,0,0.6)",
                    transition: "all 0.4s",
                  }}
                />
                {/* Filament */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-3 rounded-full"
                  style={{
                    background: bulbOn
                      ? `radial-gradient(ellipse, #ffffff 0%, ${warmCore} 50%, transparent 100%)`
                      : "transparent",
                    filter: "blur(1px)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Floor light pool */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 50% 45% at 50% 50%, ${warmMid}44 0%, ${warmDeep}1f 35%, transparent 65%)`,
            }}
            animate={{
              opacity:
                p === "idle" ? 0 : isFullBright ? 1 : 0.7,
            }}
            transition={{ duration: 1 }}
          />

          {/* Dust particles */}
          {(phase === "reveal" || phase === "flicker" || phase === "settle") &&
            Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{
                  background: warmCore,
                  boxShadow: `0 0 6px ${warmMid}`,
                  left: `${35 + Math.random() * 30}%`,
                  top: `${35 + Math.random() * 30}%`,
                  animation: `drift ${4 + Math.random() * 3}s ease-out ${Math.random() * 1.5}s infinite`,
                }}
              />
            ))}

          {/* Idle: drag the bulb or press SPACE to start */}
          {phase === "idle" && (
            <IdleStarter onStart={startSequence} />
          )}

          {/* ORP CORE text — revealed ONLY where the light touches */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              ref={textWrapRef}
              className="relative"
              style={{
                WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at var(--lx, 50%) var(--ly, 50%), #000 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)`,
                maskImage: `radial-gradient(circle ${maskRadius}px at var(--lx, 50%) var(--ly, 50%), #000 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.2) 75%, transparent 100%)`,
                transition: "mask-image 0.5s, -webkit-mask-image 0.5s",
                opacity: phase === "idle" ? 0 : 1,
              }}
            >
              <h1
                className="font-display font-bold tracking-tight text-center whitespace-nowrap"
                style={{
                  fontSize: "clamp(3rem, 10vw, 8rem)",
                  color: "#fffbe6",
                  textShadow: bulbOn
                    ? `0 0 30px ${warmCore}, 0 0 60px ${warmMid}, 0 0 120px ${warmDeep}`
                    : "none",
                }}
              >
                ORP{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, #ffffff, ${warmCore}, ${warmMid})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  CORE
                </span>
              </h1>

              {/* Sparks (also masked by light) */}
              {(phase === "reveal" || phase === "flicker") &&
                Array.from({ length: 14 }).map((_, i) => {
                  const left = (i / 14) * 100;
                  const delay = (i % 7) * 0.15;
                  return (
                    <span
                      key={i}
                      className="absolute w-[3px] h-[3px] rounded-full"
                      style={{
                        background: "#fff",
                        boxShadow: `0 0 8px ${warmCore}, 0 0 14px ${warmMid}`,
                        left: `${left}%`,
                        top: `${20 + (i % 3) * 30}%`,
                        animation: `spark 1.4s ease-out ${delay}s infinite`,
                      }}
                    />
                  );
                })}
            </div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          <style>{`
            @keyframes spark {
              0% { transform: translateY(0) scale(0.4); opacity: 0; }
              20% { opacity: 1; transform: translateY(-6px) scale(1); }
              60% { opacity: 0.8; }
              100% { transform: translateY(-36px) scale(0.2); opacity: 0; }
            }
            @keyframes drift {
              0% { transform: translateY(0) translateX(0); opacity: 0; }
              30% { opacity: 0.8; }
              100% { transform: translateY(-80px) translateX(20px); opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IdleStarter({ onStart }: { onStart: () => void }) {
  const start = useRef(onStart);
  start.current = onStart;
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        start.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.hypot(dx, dy) > 18) {
      dragRef.current = null;
      start.current();
    }
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <>
      <div
        aria-label="Drag the bulb to begin"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-32 h-[48vh] cursor-grab active:cursor-grabbing touch-none bg-transparent"
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-16 text-center text-white/55 text-xs tracking-[0.35em] uppercase pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        Drag the bulb · or press <span className="px-2 py-0.5 mx-1 rounded border border-white/30 text-white/80">Space</span>
      </motion.div>
    </>
  );
}
