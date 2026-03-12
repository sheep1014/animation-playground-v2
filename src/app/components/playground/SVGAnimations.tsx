import { useState } from 'react';
import { motion } from 'motion/react';

function PathDraw() {
  const [key, setKey] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>pathLength 0 → 1 描边动画</p>
      <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
        <svg key={key} width="200" height="140" viewBox="0 0 200 140" style={{ display: 'block', margin: '0 auto' }}>
          <defs>
            <pattern id="svgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="200" height="140" fill="url(#svgGrid)" />

          {/* Infinity symbol */}
          <motion.path
            d="M 40 70 C 40 45, 65 45, 100 70 C 135 95, 160 95, 160 70 C 160 45, 135 45, 100 70 C 65 95, 40 95, 40 70 Z"
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 2, ease: 'easeInOut' }, opacity: { duration: 0.3 } }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.8))' }}
          />

          {/* Star */}
          <motion.path
            d="M 100 20 L 108 42 L 130 42 L 113 56 L 120 78 L 100 65 L 80 78 L 87 56 L 70 42 L 92 42 Z"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.8, delay: 0.5, ease: 'easeInOut' }, opacity: { duration: 0.3, delay: 0.5 } }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(6,182,212,0.7))' }}
          />

          {/* Checkmark */}
          <motion.path
            d="M 55 110 L 80 130 L 145 90"
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 0.8, delay: 1.5, ease: 'easeOut' }, opacity: { duration: 0.2, delay: 1.5 } }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(16,185,129,0.7))' }}
          />
        </svg>
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '12px', background: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.35)', cursor: 'pointer', fontWeight: 600 }}
      >
        ↺ 重播
      </button>
    </div>
  );
}

function CircularProgress() {
  const [progress, setProgress] = useState(75);
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>stroke-dashoffset 进度动画</p>
      <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <motion.circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke="url(#progressGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ rotate: -90, transformOrigin: '65px 65px', filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.6))' }}
          />
          <text x="65" y="65" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="20" fontWeight="bold">{progress}%</text>
        </svg>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#a855f7' }}
      />
    </div>
  );
}

function WaveAnimation() {
  const dots = Array.from({ length: 12 });

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>错落相位正弦波动</p>
      <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '24px 16px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', height: '80px', position: 'relative' }}>
          <svg width="220" height="60" viewBox="0 0 220 60" style={{ position: 'absolute' }}>
            <path
              d="M 0 30 C 18 0, 36 0, 55 30 S 91 60, 110 30 S 164 0, 183 30 S 210 60, 220 30"
              fill="none"
              stroke="rgba(168,85,247,0.12)"
              strokeWidth="2"
            />
          </svg>
          {dots.map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: `hsl(${260 + i * 8}, 80%, 65%)`,
                boxShadow: `0 0 10px hsl(${260 + i * 8}, 80%, 65%)`,
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }}
              animate={{ y: [0, -24, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Audio bar wave */}
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center', height: '60px', marginTop: '16px' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '5px',
                borderRadius: '999px',
                background: `hsl(${180 + i * 10}, 75%, 60%)`,
                boxShadow: `0 0 6px hsl(${180 + i * 10}, 75%, 60%)`,
              }}
              animate={{ height: ['8px', `${28 + Math.sin(i) * 22}px`, '8px'] }}
              transition={{
                duration: 0.8 + i * 0.04,
                repeat: Infinity,
                delay: i * 0.06,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MorphShape() {
  const [idx, setIdx] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>borderRadius 形状变换</p>
      <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }}>
        <motion.div
          animate={{
            borderRadius: idx === 0 ? '8px' : idx === 1 ? '50%' : '40% 60% 70% 30% / 40% 50% 60% 50%',
            background: ['linear-gradient(135deg,#a855f7,#6366f1)', 'linear-gradient(135deg,#3b82f6,#06b6d4)', 'linear-gradient(135deg,#10b981,#f59e0b)'][idx],
            rotate: idx * 45,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ width: '72px', height: '72px', boxShadow: '0 0 25px rgba(168,85,247,0.4)' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {['方形', '圆形', '有机体'].map((label, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              padding: '5px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              background: idx === i ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.05)',
              color: idx === i ? '#a855f7' : '#6b7280',
              border: `1px solid ${idx === i ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.1)'}`,
              cursor: 'pointer',
              fontWeight: idx === i ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SVGAnimations() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
      {[
        { title: 'SVG 路径描边', code: 'pathLength animation', color: '#a855f7', Component: PathDraw },
        { title: '环形进度条', code: 'stroke-dashoffset', color: '#06b6d4', Component: CircularProgress },
        { title: '波形动画', code: 'stagger + sine phase', color: '#10b981', Component: WaveAnimation },
        { title: '形状变形', code: 'borderRadius morph', color: '#f59e0b', Component: MorphShape },
      ].map(({ title, code, color, Component }, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '16px',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color, marginBottom: '4px' }}>{code}</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '14px' }}>{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
