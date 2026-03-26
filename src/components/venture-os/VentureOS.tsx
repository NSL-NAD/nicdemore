"use client";
import { AnimatePresence } from 'framer-motion';
import { useVentureOS } from './useVentureOS';
import { VentureOSAnchor } from './VentureOSAnchor';
import { VentureOSPanel } from './VentureOSPanel';
import { VentureOSTerminal } from './VentureOSTerminal';
import { useRetro } from '@/contexts/RetroContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function VentureOS() {
  const { state, close, setHover, toggle } = useVentureOS();
  const { isRetro } = useRetro();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        bottom: isMobile ? '16px' : '24px',
        right: isMobile ? '16px' : '24px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
      }}
    >
      {/* Panel (expands upward) */}
      <AnimatePresence>
        {state === 'open' && (
          isRetro
            ? <VentureOSTerminal onClose={close} />
            : <VentureOSPanel onClose={close} />
        )}
      </AnimatePresence>

      {/* Anchor trigger */}
      <VentureOSAnchor
        state={state}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={toggle}
      />
    </div>
  );
}
