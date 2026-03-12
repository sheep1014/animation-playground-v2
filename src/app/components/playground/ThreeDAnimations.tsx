import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

function CardFlip() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>rotateY + backfaceVisibility</p>
      <div
        style={{ perspective: '1000px', cursor: 'pointer', display: 'inline-block' }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', width: '160px', height: '200px' }}
        >
          {/* Front */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 0 30px rgba(168,85,247,0.4)',
            }}
          >
            <div style={{ fontSize: '3rem' }}>🃏</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>点击翻转</div>
          </div>

          {/* Back */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transform: 'rotateY(180deg)',
              boxShadow: '0 0 30px rgba(16,185,129,0.4)',
            }}
          >
            <div style={{ fontSize: '3rem' }}>✨</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>背面</div>
          </div>
        </motion.div>
      </div>
      <p style={{ fontSize: '11px', color: '#4b5563', marginTop: '10px' }}>点击卡片翻转</p>
    </div>
  );
}

function PerspectiveTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 400, damping: 35 });
  const sRotY = useSpring(rotY, { stiffness: 400, damping: 35 });

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>CSS perspective + rotateX/Y</p>
      <div style={{ perspective: '800px', display: 'inline-block' }}>
        <div
          ref={ref}
          style={{ padding: '8px', cursor: 'crosshair' }}
          onMouseMove={(e) => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            rotX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 35);
            rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 35);
          }}
          onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
        >
          <motion.div
            style={{
              rotateX: sRotX,
              rotateY: sRotY,
              transformStyle: 'preserve-3d',
              width: '200px',
              height: '220px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3))',
              border: '1px solid rgba(99,102,241,0.5)',
              padding: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Layers at different Z depths */}
            <motion.div style={{ transform: 'translateZ(50px)', marginBottom: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(168,85,247,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 0 15px rgba(168,85,247,0.4)' }}>
                🎯
              </div>
            </motion.div>
            <motion.div style={{ transform: 'translateZ(30px)' }}>
              <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)', marginBottom: '6px' }} />
              <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', width: '70%' }} />
            </motion.div>
            <motion.div style={{ transform: 'translateZ(10px)', position: 'absolute', bottom: '16px', right: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #a855f7, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                ⚡
              </div>
            </motion.div>

            {/* Shine effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)',
              borderRadius: '20px 20px 0 0',
              pointerEvents: 'none',
            }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function RotatingCube() {
  const colors = [
    { face: 'translateZ(50px)', color: '#a855f7', label: 'Front', emoji: '🎨' },
    { face: 'rotateY(90deg) translateZ(50px)', color: '#3b82f6', label: 'Right', emoji: '🌊' },
    { face: 'rotateY(180deg) translateZ(50px)', color: '#10b981', label: 'Back', emoji: '🌿' },
    { face: 'rotateY(-90deg) translateZ(50px)', color: '#f59e0b', label: 'Left', emoji: '⚡' },
    { face: 'rotateX(90deg) translateZ(50px)', color: '#ef4444', label: 'Top', emoji: '🔥' },
    { face: 'rotateX(-90deg) translateZ(50px)', color: '#ec4899', label: 'Bottom', emoji: '💎' },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>6 面 3D 立方体旋转</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', perspective: '500px' }}>
        <motion.div
          style={{
            width: '100px',
            height: '100px',
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
          animate={{
            rotateY: [0, 360],
            rotateX: [15, 25, 15, 5, 15],
          }}
          transition={{
            rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {colors.map(({ face, color, label, emoji }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                transform: face,
                background: `${color}35`,
                border: `2px solid ${color}70`,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '20px' }}>{emoji}</span>
              <span style={{ fontSize: '9px', color, fontWeight: 700 }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function DepthStack() {
  const layers = [
    { z: 0, size: 120, color: '#4b5563', opacity: 0.4, blur: 0 },
    { z: 20, size: 100, color: '#6b7280', opacity: 0.5, blur: 0 },
    { z: 40, size: 80, color: '#a855f7', opacity: 0.7, blur: 0 },
    { z: 60, size: 60, color: '#c084fc', opacity: 0.9, blur: 0 },
    { z: 80, size: 40, color: '#e9d5ff', opacity: 1, blur: 0 },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>translateZ 深度层叠</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', perspective: '400px' }}>
        <motion.div
          style={{ position: 'relative', transformStyle: 'preserve-3d', width: '120px', height: '120px' }}
          animate={{ rotateX: [-15, -25, -15], rotateY: [0, 360] }}
          transition={{
            rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {layers.map((l, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${(120 - l.size) / 2}px`,
                left: `${(120 - l.size) / 2}px`,
                width: l.size,
                height: l.size,
                transform: `translateZ(${l.z}px)`,
                background: `${l.color}${Math.round(l.opacity * 40).toString(16).padStart(2, '0')}`,
                border: `1px solid ${l.color}80`,
                borderRadius: '12px',
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function ThreeDAnimations() {
  const demos = [
    { title: '卡片翻转', code: 'rotateY + backfaceVisibility', color: '#a855f7', Component: CardFlip },
    { title: '透视倾斜卡', code: 'mouse → rotateX/Y', color: '#3b82f6', Component: PerspectiveTilt },
    { title: '旋转 3D 立方体', code: 'transformStyle: preserve-3d', color: '#10b981', Component: RotatingCube },
    { title: 'Z 轴深度层', code: 'translateZ stacking', color: '#f59e0b', Component: DepthStack },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
      {demos.map(({ title, code, color, Component }, i) => (
        <div
          key={i}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color, marginBottom: '4px' }}>{code}</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '4px' }}>{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
