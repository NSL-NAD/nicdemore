"use client";
import { useRetro } from "@/contexts/RetroContext";

function FloppyDiskIcon({ active }: { active: boolean }) {
  const glow = active ? "drop-shadow(0 0 6px var(--retro-cyan, #00E5FF))" : "none";

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glow, transition: "filter 0.3s ease" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="retro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4631E" />
          <stop offset="50%" stopColor="#C026D3" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
      </defs>
      {/* Floppy disk body */}
      <rect x="1" y="1" width="16" height="16" rx="1" fill={active ? "var(--retro-cyan, #00E5FF)" : "url(#retro-grad)"} opacity="0.9" />
      {/* Label area */}
      <rect x="3" y="1" width="10" height="6" rx="0" fill={active ? "var(--color-surface, #12122A)" : "var(--color-base, #FAF9F6)"} />
      {/* Metal slide */}
      <rect x="6" y="1" width="3" height="6" fill={active ? "#00E5FF" : "#C4A87A"} opacity="0.7" />
      {/* Disk slot */}
      <rect x="3" y="11" width="12" height="4" rx="0.5" fill={active ? "var(--color-surface, #12122A)" : "var(--color-surface, #F2EDE5)"} />
      {/* Center hole */}
      <rect x="7" y="12" width="4" height="2" rx="1" fill={active ? "#00E5FF" : "#6B6460"} opacity="0.6" />
    </svg>
  );
}

export function RetroToggle() {
  const { isRetro, toggleRetro } = useRetro();

  return (
    <button
      onClick={toggleRetro}
      aria-label={isRetro ? "Exit retro mode" : "Enter retro mode"}
      title={isRetro ? "[EXIT RETRO]" : "[RETRO]"}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded transition-all duration-300"
      style={{
        minWidth: "44px",
        minHeight: "44px",
        background: "transparent",
        border: isRetro ? "1px solid var(--retro-cyan, #00E5FF)" : "1px solid transparent",
      }}
    >
      <FloppyDiskIcon active={isRetro} />
      <span
        className={!isRetro ? "retro-toggle-pulse" : ""}
        style={{
          fontFamily: "var(--font-jetbrains, monospace)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          ...(isRetro
            ? { color: "var(--retro-cyan, #00E5FF)" }
            : {
                background: "linear-gradient(135deg, #F4631E 0%, #C026D3 50%, #00E5FF 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }),
        }}
      >
        {isRetro ? "[EXIT]" : "[RETRO]"}
      </span>
    </button>
  );
}
