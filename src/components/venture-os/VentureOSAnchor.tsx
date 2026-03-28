"use client";
import { type VentureOSState } from './useVentureOS';
import { useRetro } from '@/contexts/RetroContext';

interface Props {
  state: VentureOSState;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function VentureOSAnchor({ state, onMouseEnter, onMouseLeave, onClick }: Props) {
  const { isRetro } = useRetro();
  const isOpen = state === 'open';
  const isHover = state === 'hover';

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label="Open Venture OS"
      aria-expanded={isOpen}
      className="flex items-center gap-2 px-3 py-2 rounded-sm transition-all duration-300 pulse-load"
      style={{
        minWidth: '44px',
        minHeight: '44px',
        opacity: isOpen || isHover ? 1 : 0.4,
        border: isRetro
          ? `1px solid ${isOpen ? 'var(--retro-cyan)' : 'rgba(0,229,255,0.3)'}`
          : `1px solid ${isOpen ? 'var(--color-border)' : 'transparent'}`,
        background: isRetro
          ? (isOpen ? 'var(--color-surface)' : 'transparent')
          : 'transparent',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Pulsing dot */}
      <div
        className="pulse-dot w-2 h-2 rounded-full flex-shrink-0"
        style={{
          background: isRetro ? 'var(--retro-cyan)' : 'var(--color-accent)',
          boxShadow: isRetro ? '0 0 6px var(--retro-cyan)' : 'none',
        }}
      />
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: isRetro ? 'var(--retro-cyan)' : 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {isOpen ? '[OS ×]' : '[OS]'}
      </span>
    </button>
  );
}
