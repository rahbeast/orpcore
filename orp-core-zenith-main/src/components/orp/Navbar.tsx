import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Technologies", href: "#tech" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 100) setVisible(false);
      else if (y < lastY) setVisible(true);
      else if (y > lastY + 8) setVisible(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1100px)]"
        >
          <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2 group">
              <span className="relative inline-flex w-7 h-7 items-center justify-center rounded-md bg-primary/20 border border-primary/40">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
              </span>
              <span className="font-display font-bold tracking-tight text-base">
                ORP <span className="text-primary">CORE</span>
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-7 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:shadow-[0_0_24px_var(--color-primary)] transition-shadow"
            >
              Start a Project
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 inline-flex flex-col items-center justify-center gap-1"
              aria-label="menu"
            >
              <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="md:hidden glass-strong rounded-2xl mt-2 p-4 flex flex-col gap-3"
              >
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                    {l.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
