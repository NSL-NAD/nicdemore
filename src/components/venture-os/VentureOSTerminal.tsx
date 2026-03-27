"use client";
import { motion } from 'framer-motion';
import { ventures, type VentureStatus } from '@/data/ventures';

const statusLabels: Record<VentureStatus, string> = {
  LIVE:    '[LIVE]   ',
  BUILD:   '[BUILD]  ',
  TEST:    '[TEST]   ',
  QUEUE:   '[QUEUE]  ',
  STEALTH: '[████]   ',
  CONCEPT: '[CONCEPT]',
};

interface Props {
  onClose: () => void;
}

export function VentureOSTerminal({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      style={{
        width: '300px',
        background: '#0A0A14',
        border: '1px solid var(--retro-cyan)',
        boxShadow: '0 0 20px rgba(0,229,255,0.15)',
        fontFamily: 'var(--font-jetbrains), monospace',
      }}
    >
      {/* Terminal title bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: 'rgba(0,229,255,0.2)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF2D78' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#CCFF00' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00E5FF' }} />
        </div>
        <span
          className="flex-1 text-center"
          style={{ fontSize: '10px', color: 'rgba(0,229,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          venture-os v1.0
        </span>
        <button
          onClick={onClose}
          aria-label="Close terminal"
          style={{ color: 'rgba(0,229,255,0.4)', fontSize: '12px', minWidth: '20px', minHeight: '20px' }}
        >
          ×
        </button>
      </div>

      {/* Terminal body */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ color: 'var(--retro-cyan)', fontSize: '11px', marginBottom: '8px' }}
        >
          root@nicdemore:~$ ls -la ~/ventures/
        </motion.div>

        <div className="space-y-1 mb-4">
          {ventures.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.3 }}
              className="flex items-center gap-2"
              style={{ fontSize: '11px' }}
            >
              <span style={{ color: 'rgba(0,229,255,0.4)' }}>drwxr-xr-x </span>
              <span style={{ color: v.status === 'LIVE' ? '#00E5FF' : 'rgba(0,229,255,0.65)', minWidth: '100px' }}>
                {v.shortName.padEnd(12, ' ')}
              </span>
              <span style={{ color: v.status === 'LIVE' ? '#FF2D78' : '#CCFF00', letterSpacing: '0.06em' }}>
                {statusLabels[v.status]}
              </span>
              {v.url && (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(0,229,255,0.4)', textDecoration: 'none' }}
                >
                  →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 + ventures.length * 0.12 }}
          style={{ color: 'rgba(0,229,255,0.5)', fontSize: '10px', marginBottom: '10px' }}
        >
          {ventures.filter(v => v.status === 'LIVE').length} directories, {ventures.filter(v => v.status === 'LIVE').length} live
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + ventures.length * 0.12 }}
          className="flex items-center gap-1"
          style={{ color: 'var(--retro-cyan)', fontSize: '11px' }}
        >
          <span>root@nicdemore:~$</span>
          <span className="blink-cursor">▋</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
