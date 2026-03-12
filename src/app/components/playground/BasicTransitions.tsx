import { useState } from 'react';
import { motion } from 'motion/react';

interface DemoConfig {
  name: string;
  code: string;
  color: string;
  on: object;
  off: object;
  transition: object;
}

const DEMOS: DemoConfig[] = [
  {
    name: '淡入淡出',
    code: 'opacity',
    color: '#a855f7',
    on: { opacity: 1 },
    off: { opacity: 0.05 },
    transition: { duration: 0.6 },
  },
  {
    name: '水平滑入',
    code: 'x: -60 → 0',
    color: '#3b82f6',
    on: { x: 0, opacity: 1 },
    off: { x: -60, opacity: 0.1 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  {
    name: '垂直弹入',
    code: 'y + spring',
    color: '#06b6d4',
    on: { y: 0, opacity: 1 },
    off: { y: 50, opacity: 0.1 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  {
    name: '弹性缩放',
    code: 'scale + spring',
    color: '#10b981',
    on: { scale: 1, opacity: 1 },
    off: { scale: 0.05, opacity: 0.1 },
    transition: { type: 'spring', stiffness: 260, damping: 18 },
  },
  {
    name: '旋转进入',
    code: 'rotate: -180 → 0',
    color: '#f59e0b',
    on: { rotate: 0, opacity: 1 },
    off: { rotate: -180, opacity: 0.2 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  {
    name: '倾斜变换',
    code: 'skewX: 30 → 0',
    color: '#ef4444',
    on: { skewX: 0, opacity: 1, x: 0 },
    off: { skewX: 30, opacity: 0.2, x: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  {
    name: '形状变形',
    code: 'borderRadius morph',
    color: '#ec4899',
    on: { borderRadius: '50%', scale: 1, rotate: 45 },
    off: { borderRadius: '4px', scale: 0.8, rotate: 0 },
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
  {
    name: '组合特效',
    code: 'scale + rotate + opacity',
    color: '#8b5cf6',
    on: { scale: 1, rotate: 0, opacity: 1, y: 0 },
    off: { scale: 0.1, rotate: 720, opacity: 0, y: 30 },
    transition: { type: 'spring', stiffness: 180, damping: 14 },
  },
];

export function BasicTransitions() {
  const [states, setStates] = useState<Record<number, boolean>>(
    () => Object.fromEntries(DEMOS.map((_, i) => [i, true]))
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '14px' }}>
      {DEMOS.map((demo, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '16px',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color: demo.color, marginBottom: '4px', opacity: 0.9 }}>
            {demo.code}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#e5e7eb' }}>{demo.name}</div>

          <div
            style={{
              height: '80px',
              background: 'rgba(0,0,0,0.45)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                width: '42px',
                height: '42px',
                background: `linear-gradient(135deg, ${demo.color}, ${demo.color}88)`,
                borderRadius: '10px',
                boxShadow: `0 0 18px ${demo.color}55`,
              }}
              animate={states[i] ? demo.on : demo.off}
              transition={demo.transition}
            />
          </div>

          <button
            onClick={() => setStates(s => ({ ...s, [i]: !s[i] }))}
            style={{
              width: '100%',
              padding: '6px',
              borderRadius: '8px',
              fontSize: '12px',
              background: `${demo.color}15`,
              color: demo.color,
              border: `1px solid ${demo.color}35`,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {states[i] ? '↩ 还原' : '▶ 播放'}
          </button>
        </div>
      ))}
    </div>
  );
}
