export function Footer() {
  return (
    <footer className="relative pt-24 pb-10 px-6 overflow-hidden border-t border-white/5">
      {/* Circuit grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="circuit" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#01C38D" stopOpacity="0" />
              <stop offset="50%" stopColor="#01C38D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#01C38D" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[60, 140, 220, 300].map((y, i) => (
            <g key={i}>
              <path d={`M0 ${y} L${200 + i * 30} ${y} L${260 + i * 30} ${y - 40} L800 ${y - 40}`}
                fill="none" stroke="url(#circuit)" strokeWidth="1">
                <animate attributeName="stroke-dasharray" values="0,2000;2000,0" dur={`${6 + i}s`} repeatCount="indefinite" />
              </path>
              <circle cx={200 + i * 30} cy={y} r="3" fill="#01C38D" opacity="0.8">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            </g>
          ))}
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
              animation: `drift ${6 + Math.random() * 5}s ease-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <div className="flex items-center gap-2 group cursor-default">
              <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-md bg-primary/20 border border-primary/40">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)] animate-pulse" />
              </span>
              <span className="font-display font-bold tracking-tight text-lg">
                ORP <span className="text-primary">CORE</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              A premium engineering studio designing and building the systems that move modern businesses forward.
            </p>
          </div>

          <FooterCol title="Company" links={["About", "Process", "Careers", "Press"]} />
          <FooterCol title="Services" links={["Web", "Mobile", "Cloud", "AI", "Automation"]} />

          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">Newsletter</div>
            <p className="text-sm text-muted-foreground mb-4">One thoughtful email a month. No spam.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                placeholder="you@company.com"
                className="flex-1 rounded-lg bg-background/40 border border-white/10 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors"
              />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_20px_var(--color-primary)] transition-shadow">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ORP CORE — Engineered with intent.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
