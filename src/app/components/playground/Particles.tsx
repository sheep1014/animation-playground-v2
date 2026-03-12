import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'star';
}

function ClickExplosion() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const explode = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#8b5cf6'];
    const count = 24;

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const speed = 60 + Math.random() * 80;
      const shapes: Particle['shape'][] = ['circle', 'square', 'star'];
      return {
        id: ++idRef.current,
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        color: colors[i % colors.length],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    });

    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles((p) => p.filter((pp) => !newParticles.some((np) => np.id === pp.id)));
    }, 900);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>点击任意位置爆炸 💥</p>
      <div
        ref={containerRef}
        onClick={explode}
        style={{
          position: 'relative',
          height: '220px',
          background: 'rgba(0,0,0,0.45)',
          borderRadius: '14px',
          cursor: 'crosshair',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💥</div>
          <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>点击爆炸</div>
        </div>

        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, scale: 1, opacity: 1, rotate: p.rotation }}
              animate={{
                x: p.x + p.dx,
                y: p.y + p.dy,
                scale: 0,
                opacity: 0,
                rotate: p.rotation + 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: p.size,
                height: p.size,
                background: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
                boxShadow: `0 0 8px ${p.color}`,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                clipPath: p.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined,
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
}

function FloatingParticles() {
  const [particles] = useState<FloatingParticle[]>(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 6,
      color: ['#a855f7', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 6)],
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      driftX: (Math.random() - 0.5) * 30,
    }))
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>浮动粒子背景</p>
      <div
        style={{
          position: 'relative',
          height: '220px',
          background: 'rgba(0,0,0,0.45)',
          borderRadius: '14px',
          overflow: 'hidden',
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              bottom: '-20px',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
            animate={{
              y: [0, -(220 + 40)],
              x: [0, p.driftX],
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.5, 1, 1, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeOut',
              times: [0, 0.1, 0.9, 1],
            }}
          />
        ))}

        {/* Center text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          pointerEvents: 'none',
        }}>
          <motion.div
            style={{ fontSize: '2rem' }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨
          </motion.div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>粒子系统</div>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const [active, setActive] = useState(false);
  const [pieces, setPieces] = useState<Array<{
    id: number; x: number; color: string; delay: number; duration: number; size: number; spin: number;
  }>>([]);
  const idRef = useRef(0);

  const launch = () => {
    if (active) return;
    setActive(true);
    const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#fbbf24'];
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: ++idRef.current,
      x: 20 + Math.random() * 60,
      color: colors[i % colors.length],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1,
      size: 6 + Math.random() * 8,
      spin: (Math.random() - 0.5) * 720,
    }));
    setPieces(newPieces);
    setTimeout(() => {
      setActive(false);
      setPieces([]);
    }, 2500);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>彩纸庆祝效果 🎉</p>
      <div style={{ position: 'relative', height: '220px', background: 'rgba(0,0,0,0.45)', borderRadius: '14px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}%`, y: '-20px', rotate: 0, opacity: 1, scale: 1 }}
            animate={{ y: '230px', rotate: p.spin, opacity: [1, 1, 0], scale: [1, 0.8, 0.5] }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: p.size,
              height: p.size * 0.6,
              background: p.color,
              borderRadius: '2px',
              boxShadow: `0 0 4px ${p.color}88`,
              pointerEvents: 'none',
            }}
          />
        ))}
        <motion.button
          onClick={launch}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{
            padding: '12px 28px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            cursor: active ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            boxShadow: '0 0 20px rgba(245,158,11,0.4)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          🎉 发射彩纸
        </motion.button>
      </div>
    </div>
  );
}

function RippleEffect() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  const addRipple = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newRipple = {
      id: ++idRef.current,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      color: colors[idRef.current % colors.length],
    };
    setRipples((r) => [...r, newRipple]);
    setTimeout(() => setRipples((r) => r.filter((rr) => rr.id !== newRipple.id)), 1200);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>点击水波扩散效果</p>
      <div
        ref={containerRef}
        onClick={addRipple}
        style={{
          position: 'relative',
          height: '220px',
          background: 'rgba(0,0,0,0.45)',
          borderRadius: '14px',
          overflow: 'hidden',
          cursor: 'crosshair',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ pointerEvents: 'none', color: '#4b5563', fontSize: '13px' }}>点击产生波纹</div>

        <AnimatePresence>
          {ripples.map((r) => (
            <motion.div
              key={r.id}
              initial={{ width: 0, height: 0, x: r.x, y: r.y, opacity: 0.8 }}
              animate={{ width: 300, height: 300, x: r.x - 150, y: r.y - 150, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '50%',
                border: `2px solid ${r.color}`,
                boxShadow: `0 0 10px ${r.color}66`,
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Particles() {
  const demos = [
    { title: '点击粒子爆炸', code: 'AnimatePresence + radial dispatch', color: '#ef4444', Component: ClickExplosion },
    { title: '浮动粒子场', code: 'infinite y translate + drift', color: '#a855f7', Component: FloatingParticles },
    { title: '彩纸庆祝', code: 'stagger + gravity fall', color: '#f59e0b', Component: Confetti },
    { title: '水波涟漪', code: 'scale + opacity fade out', color: '#06b6d4', Component: RippleEffect },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
      {demos.map(({ title, code, color, Component }, i) => (
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
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '10px' }}>{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
