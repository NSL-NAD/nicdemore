"use client";
import { useRetro } from "@/contexts/RetroContext";

function FloppyDiskIcon({ active }: { active: boolean }) {
  const color = active ? "var(--retro-cyan, #00E5FF)" : "currentColor";
  const glow = active
    ? "drop-shadow(0 0 6px var(--retro-cyan, #00E5FF))"
    : "none";

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
      {/* Floppy disk body */}
      <rect x="1" y="1" width="16" height="16" rx="1" fill={color} opacity="0.9" />
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
      className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-all duration-300 ${!isRetro ? "retro-toggle-pulse" : ""}`}
      style={{
        minWidth: "44px",
        minHeight: "44px",
        color: isRetro ? "var(--retro-cyan, #00E5FF)" : "#fff",
        opacity: isRetro ? 1 : 1,
        border: isRetro ? "1px solid var(--retro-cyan, #00E5FF)" : "1px solid transparent",
        background: isRetro
          ? "transparent"
          : "linear-gradient(135deg, #F4631E 0%, #C026D3 50%, #00E5FF 100%)",
        backgroundSize: "200% 200%",
        boxShadow: isRetro
          ? undefined
          : "0 0 12px rgba(244,99,30,0.4), 0 0 24px rgba(192,38,211,0.25)",
      }}
    >
      <FloppyDiskIcon active={isRetro} />
      <span
        style={{
          fontFamily: "var(--font-jetbrains, monospace)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {isRetro ? "[EXIT]" : "[RETRO]"}
      </span>
    </button>
  );
}
