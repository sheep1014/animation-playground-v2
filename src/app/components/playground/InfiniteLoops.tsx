import { motion } from 'motion/react';

function SolarSystem() {
  const planets = [
    { radius: 36, size: 10, color: '#3b82f6', speed: 3, label: '🌍' },
    { radius: 60, size: 8, color: '#f59e0b', speed: 6, label: '🔴' },
    { radius: 88, size: 12, color: '#10b981', speed: 10, label: '🪐' },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>轨道旋转动画</p>
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          {/* Sun */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(251,191,36,0.7), 0 0 40px rgba(251,191,36,0.3)',
              zIndex: 10,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {planets.map((p, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: `calc(50% - ${p.radius}px)`,
                left: `calc(50% - ${p.radius}px)`,
                width: p.radius * 2,
                height: p.radius * 2,
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.1)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: p.speed, repeat: Infinity, ease: 'linear' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -p.size / 2,
                  left: '50%',
                  marginLeft: -p.size / 2,
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: p.size * 0.9,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BreathingOrb() {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>呼吸 / Pulse 动画</p>
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {[3, 2, 1].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${i * 50}px`,
              height: `${i * 50}px`,
              borderRadius: '50%',
              background: `rgba(168,85,247,${0.05 * (4 - i)})`,
              border: `1px solid rgba(168,85,247,${0.15 * (4 - i)})`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}
        <motion.div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #c084fc, #a855f7)',
            boxShadow: '0 0 30px rgba(168,85,247,0.7)',
            position: 'relative',
            zIndex: 5,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

function TickerTape() {
  const items = ['Motion', 'React', 'Spring', 'Gesture', 'Layout', 'SVG', '3D', 'Scroll', 'Stagger', 'Physics'];
  const tripled = [...items, ...items, ...items];

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>无限滚动 Ticker</p>
      <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', overflow: 'hidden' }}>
        {/* Left to right */}
        <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div
            style={{ display: 'flex', gap: '24px', width: 'max-content' }}
            animate={{ x: ['0%', '-33.33%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {tripled.map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: '13px',
                  color: '#9ca3af',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}
              >
                ✦ {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right to left */}
        <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div
            style={{ display: 'flex', gap: '24px', width: 'max-content' }}
            animate={{ x: ['-33.33%', '0%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {tripled.map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: '13px',
                  color: '#6366f1',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}
              >
                ◆ {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LoadingRings() {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>多层旋转加载环</p>
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {[
          { size: 110, color: '#a855f7', duration: 2, cw: true },
          { size: 82, color: '#3b82f6', duration: 1.5, cw: false },
          { size: 56, color: '#10b981', duration: 1.2, cw: true },
          { size: 30, color: '#f59e0b', duration: 0.8, cw: false },
        ].map((ring, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: ring.size,
              height: ring.size,
              borderRadius: '50%',
              border: '3px solid transparent',
              borderTopColor: ring.color,
              borderRightColor: `${ring.color}44`,
              filter: `drop-shadow(0 0 4px ${ring.color}88)`,
            }}
            animate={{ rotate: ring.cw ? 360 : -360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
      </div>
    </div>
  );
}

function BouncingBall() {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>物理弹跳 + 挤压变形</p>
      <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '30px', paddingBottom: '20px', position: 'relative' }}>
        {/* Floor line */}
        <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        {/* Shadow */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <motion.div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: [`linear-gradient(135deg, #a855f7, #6366f1)`, `linear-gradient(135deg, #06b6d4, #3b82f6)`, `linear-gradient(135deg, #f59e0b, #ef4444)`][i],
                boxShadow: [`0 0 15px rgba(168,85,247,0.6)`, `0 0 15px rgba(6,182,212,0.6)`, `0 0 15px rgba(245,158,11,0.6)`][i],
              }}
              animate={{
                y: [-120, 0, -120],
                scaleX: [1, 1.4, 1],
                scaleY: [1, 0.6, 1],
              }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                ease: [0.215, 0.61, 0.355, 1],
                delay: i * 0.3,
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              style={{
                width: '28px',
                height: '5px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                marginTop: '2px',
              }}
              animate={{ scaleX: [0.5, 1.2, 0.5], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteLoops() {
  const demos = [
    { title: '太阳系轨道', code: 'rotate: 0 → 360 (linear)', color: '#f59e0b', Component: SolarSystem },
    { title: '呼吸光晕', code: 'scale + opacity loop', color: '#a855f7', Component: BreathingOrb },
    { title: '无限滚动条', code: 'x translate (linear)', color: '#6366f1', Component: TickerTape },
    { title: '多层加载环', code: 'counter-rotate rings', color: '#10b981', Component: LoadingRings },
    { title: '物理弹跳球', code: 'y + squash deform', color: '#06b6d4', Component: BouncingBall },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
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
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '4px' }}>{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
