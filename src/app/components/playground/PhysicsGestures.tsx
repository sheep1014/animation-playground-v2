import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

function SpringDragDemo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shadow = useTransform(
    [x, y],
    ([lx, ly]: number[]) =>
      `${lx * 0.3}px ${ly * 0.3}px 30px rgba(168,85,247,0.7)`
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>拖拽小球，松开自动归位</p>
      <div
        style={{
          width: '100%',
          height: '160px',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[100, 70, 40].map((size) => (
          <div
            key={size}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: '1px dashed rgba(168,85,247,0.2)',
            }}
          />
        ))}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.5}
          whileDrag={{ scale: 1.4 }}
          style={{
            x,
            y,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #6366f1)',
            cursor: 'grab',
            boxShadow: shadow as any,
            position: 'relative',
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}

function MagneticDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 20 });
  const springY = useSpring(y, { stiffness: 180, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.45);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.45);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>鼠标悬停感受磁力</p>
      <div
        ref={containerRef}
        style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseMove={handleMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
      >
        <motion.button
          style={{
            x: springX,
            y: springY,
            padding: '12px 28px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}
          whileHover={{ scale: 1.08, boxShadow: '0 0 35px rgba(99,102,241,0.7)' }}
          whileTap={{ scale: 0.9 }}
        >
          🧲 磁性按钮
        </motion.button>
      </div>
    </div>
  );
}

function PressDemo() {
  const buttons = [
    { label: '弹性 🎯', colors: ['#10b981', '#06b6d4'], tap: { scale: 0.85, rotate: -5 }, transition: { type: 'spring', stiffness: 500, damping: 25 } },
    { label: '挤压 💥', colors: ['#f59e0b', '#ef4444'], tap: { scaleX: 1.35, scaleY: 0.65 }, transition: { type: 'spring', stiffness: 500, damping: 25 } },
    { label: '摇晃 🎸', colors: ['#ec4899', '#a855f7'], tap: { rotate: -8 }, transition: { type: 'tween', duration: 0.08, repeat: 5, repeatType: 'mirror' as const } },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>按下感受不同形变效果</p>
      <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${btn.colors[0]}66` }}
            whileTap={btn.tap}
            transition={btn.transition}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${btn.colors[0]}, ${btn.colors[1]})`,
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              boxShadow: `0 0 12px ${btn.colors[0]}44`,
            }}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function TiltDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 300, damping: 30 });
  const sRotY = useSpring(rotY, { stiffness: 300, damping: 30 });
  const glare = useTransform(rotY, [-25, 25], ['0deg', '180deg']);

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>悬停感受透视倾斜</p>
      <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '600px' }}>
        <div
          ref={ref}
          style={{ width: '170px' }}
          onMouseMove={(e) => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            rotX.set(-y * 28);
            rotY.set(x * 28);
          }}
          onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
        >
          <motion.div
            style={{
              rotateX: sRotX,
              rotateY: sRotY,
              transformStyle: 'preserve-3d',
              borderRadius: '16px',
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.25))',
              border: '1px solid rgba(168,85,247,0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ transform: 'translateZ(25px)', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem' }}>🎴</div>
              <p style={{ marginTop: '6px', fontWeight: 700, fontSize: '13px', color: '#e5e7eb' }}>悬停我</p>
            </div>
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                background: `conic-gradient(from ${glare}, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 100%)`,
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function PhysicsGestures() {
  const demos = [
    { title: '弹性拖拽', code: 'drag + elastic spring', color: '#a855f7', Component: SpringDragDemo },
    { title: '磁性交互', code: 'useSpring + mouse tracking', color: '#3b82f6', Component: MagneticDemo },
    { title: '按压形变', code: 'whileTap variants', color: '#10b981', Component: PressDemo },
    { title: '透视倾斜', code: 'rotateX/Y + perspective', color: '#f59e0b', Component: TiltDemo },
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
            padding: '16px',
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color, marginBottom: '4px', opacity: 0.9 }}>{code}</div>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#e5e7eb' }}>{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}