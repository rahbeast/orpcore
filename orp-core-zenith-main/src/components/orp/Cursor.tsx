import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a,button,[role=button]"));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[90] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="rounded-full transition-all duration-200"
        style={{
          width: hovering ? 44 : 16,
          height: hovering ? 44 : 16,
          border: "1px solid rgba(1,195,141,0.7)",
          background: hovering ? "rgba(1,195,141,0.1)" : "transparent",
          boxShadow: "0 0 24px rgba(1,195,141,0.4)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
