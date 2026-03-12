import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { BasicTransitions } from './components/playground/BasicTransitions';
import { PhysicsGestures } from './components/playground/PhysicsGestures';
import { StaggerLayout } from './components/playground/StaggerLayout';
import { SVGAnimations } from './components/playground/SVGAnimations';
import { InfiniteLoops } from './components/playground/InfiniteLoops';
import { TextAnimations } from './components/playground/TextAnimations';
import { ScrollAnimations } from './components/playground/ScrollAnimations';
import { ThreeDAnimations } from './components/playground/ThreeDAnimations';
import { Particles } from './components/playground/Particles';

const SECTIONS = [
  {
    id: 'basic',
    label: '基础过渡',
    emoji: '✨',
    subtitle: 'opacity · translate · scale · rotate · skew · spring',
    Component: BasicTransitions,
  },
  {
    id: 'physics',
    label: '物理弹簧',
    emoji: '🌊',
    subtitle: 'drag · elastic · magnetic · press deform · perspective tilt',
    Component: PhysicsGestures,
  },
  {
    id: 'stagger',
    label: '错落布局',
    emoji: '🎭',
    subtitle: 'staggerChildren · layout · AnimatePresence · layoutId shared',
    Component: StaggerLayout,
  },
  {
    id: 'svg',
    label: 'SVG 动画',
    emoji: '✏️',
    subtitle: 'pathLength · stroke-dashoffset · morph · wave',
    Component: SVGAnimations,
  },
  {
    id: 'infinite',
    label: '无限循环',
    emoji: '♾️',
    subtitle: 'orbit · breathing · ticker · loading rings · bouncing ball',
    Component: InfiniteLoops,
  },
  {
    id: 'text',
    label: '文字动画',
    emoji: '📝',
    subtitle: 'typewriter · word reveal · scramble · char bounce · glitch',
    Component: TextAnimations,
  },
  {
    id: 'scroll',
    label: '滚动动画',
    emoji: '📜',
    subtitle: 'whileInView · useScroll · useTransform · parallax · progress',
    Component: ScrollAnimations,
  },
  {
    id: '3d',
    label: '3D 变换',
    emoji: '🎲',
    subtitle: 'card flip · perspective tilt · rotating cube · depth layers',
    Component: ThreeDAnimations,
  },
  {
    id: 'particles',
    label: '粒子系统',
    emoji: '💫',
    subtitle: 'click explosion · floating particles · confetti · ripple',
    Component: Particles,
  },
];

const FLOATING_ORBS = [
  { color: '#a855f7', size: 8, left: '8%', top: '25%', duration: 3.2, delay: 0 },
  { color: '#3b82f6', size: 6, left: '20%', top: '60%', duration: 2.8, delay: 0.5 },
  { color: '#06b6d4', size: 10, left: '35%', top: '20%', duration: 4, delay: 1 },
  { color: '#10b981', size: 7, left: '55%', top: '70%', duration: 3.5, delay: 0.3 },
  { color: '#f59e0b', size: 5, left: '70%', top: '30%', duration: 2.5, delay: 0.8 },
  { color: '#ec4899', size: 9, left: '85%', top: '55%', duration: 3.8, delay: 0.2 },
  { color: '#8b5cf6', size: 6, left: '92%', top: '20%', duration: 3, delay: 1.2 },
  { color: '#ef4444', size: 7, left: '45%', top: '45%', duration: 4.2, delay: 0.6 },
];

export default function App() {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scrollTo = (id: string) => {
    refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div style={{ background: '#06060e', color: '#fff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Global scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4, #10b981)',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />

      {/* ───── HERO ───── */}
      <div style={{ height: '320px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background radial glow */}
        <motion.div
          style={{
            position: 'absolute',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)',
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating orbs */}
        {FLOATING_ORBS.map((orb, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: orb.size,
              height: orb.size,
              borderRadius: '50%',
              background: orb.color,
              left: orb.left,
              top: orb.top,
              boxShadow: `0 0 ${orb.size * 2}px ${orb.color}`,
              opacity: 0.7,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: orb.duration, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }} />

        {/* Title */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, margin: 0 }}>
              动画{' '}
              <span style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 40%, #06b6d4 80%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Playground
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ color: '#6b7280', marginTop: '14px', fontSize: '15px', letterSpacing: '0.01em' }}
          >
            Motion · Spring · Gesture · SVG · 3D · Particles · Scroll
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
            style={{ marginTop: '18px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {['9 个模块', '37+ 动画', '全交互演示'].map((badge, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'rgba(168,85,247,0.12)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  color: '#c084fc',
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ───── NAV ───── */}
      <nav style={{
        position: 'sticky',
        top: '3px',
        zIndex: 100,
        background: 'rgba(6,6,14,0.9)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          gap: '2px',
          padding: '6px 16px',
          minWidth: 'max-content',
          alignItems: 'center',
        }}>
          {SECTIONS.map(({ id, label, emoji }) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              whileHover={{ background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                color: activeSection === id ? '#c084fc' : '#9ca3af',
                background: activeSection === id ? 'rgba(168,85,247,0.1)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: activeSection === id ? 700 : 400,
              }}
            >
              {emoji} {label}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* ───── MAIN CONTENT ───── */}
      <main style={{ maxWidth: '1140px', margin: '0 auto', padding: '48px 20px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {SECTIONS.map(({ id, label, emoji, subtitle, Component }) => (
          <section
            key={id}
            ref={(el) => { refs.current[id] = el; }}
          >
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '22px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.4rem' }}>{emoji}</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: '#f3f4f6' }}>{label}</h2>
              </div>
              <p style={{ fontSize: '12px', color: '#4b5563', fontFamily: 'monospace', marginBottom: '10px' }}>
                {subtitle}
              </p>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, rgba(168,85,247,0.7) 0%, rgba(59,130,246,0.3) 40%, transparent 80%)', borderRadius: '1px' }} />
            </motion.div>

            {/* Section content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                borderRadius: '20px',
                padding: '24px',
                background: 'rgba(255,255,255,0.018)',
                border: '1px solid rgba(255,255,255,0.055)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Component />
            </motion.div>
          </section>
        ))}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', paddingBottom: '20px' }}
        >
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', marginBottom: '24px' }} />
          <div style={{ fontSize: '13px', color: '#374151' }}>
            Built with <span style={{ color: '#a855f7' }}>Motion</span> · <span style={{ color: '#3b82f6' }}>React</span> · <span style={{ color: '#06b6d4' }}>Tailwind CSS</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
