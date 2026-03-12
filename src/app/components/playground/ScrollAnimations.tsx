import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';

const CARDS = [
  { emoji: '🎨', title: '视差滚动', desc: 'Parallax Effect', color: '#a855f7' },
  { emoji: '🌊', title: '滚动触发', desc: 'Scroll Triggered', color: '#3b82f6' },
  { emoji: '✨', title: '视图动画', desc: 'InView Animation', color: '#10b981' },
  { emoji: '🚀', title: '进度追踪', desc: 'Scroll Progress', color: '#f59e0b' },
  { emoji: '🎭', title: '位移映射', desc: 'Transform Map', color: '#ec4899' },
  { emoji: '⚡', title: '速度感知', desc: 'Velocity Aware', color: '#06b6d4' },
];

function FadeInCard({ card, i }: { card: typeof CARDS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        background: `${card.color}12`,
        border: `1px solid ${card.color}30`,
        borderRadius: '14px',
        padding: '18px',
        cursor: 'default',
      }}
      whileHover={{ scale: 1.04, background: `${card.color}20` }}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{card.emoji}</div>
      <div style={{ fontWeight: 700, color: card.color, fontSize: '14px' }}>{card.title}</div>
      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{card.desc}</div>
    </motion.div>
  );
}

function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '280px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background layers */}
      <motion.div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)',
          y: y1,
        }}
      />

      {/* Floating elements */}
      <motion.div style={{ position: 'absolute', left: '15%', y: y2, opacity }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(168,85,247,0.3)', border: '1px solid rgba(168,85,247,0.5)' }} />
      </motion.div>

      <motion.div style={{ position: 'absolute', right: '20%', y: y3, opacity }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(6,182,212,0.3)', border: '1px solid rgba(6,182,212,0.5)' }} />
      </motion.div>

      {/* Center element */}
      <motion.div style={{ rotate, scale, opacity }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.5), rgba(59,130,246,0.5))',
          border: '2px solid rgba(168,85,247,0.6)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          backdropFilter: 'blur(10px)',
        }}>
          🎯
        </div>
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '12px',
        color: '#4b5563',
      }}>
        滚动页面以查看视差效果
      </div>
    </div>
  );
}

function ScrollProgressBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const width = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const hue = useTransform(smoothProgress, [0, 1], [260, 180]);

  return (
    <div ref={containerRef} style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', position: 'relative' }}>
      <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px', fontWeight: 600 }}>滚动进度条 — 当前区块</div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
        <motion.div
          style={{
            height: '100%',
            width,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #a855f7, #06b6d4)',
            boxShadow: '0 0 10px rgba(168,85,247,0.6)',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        {[
          { label: 'useScroll', desc: '追踪滚动位置' },
          { label: 'useTransform', desc: '映射输入输出' },
          { label: 'useSpring', desc: '平滑弹性' },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#a855f7', fontWeight: 600 }}>{item.label}</div>
            <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollAnimations() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Info */}
      <div style={{ padding: '14px 18px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', fontSize: '13px', color: '#9ca3af' }}>
        💡 滚动页面时观察以下元素的动画效果 — 使用 <code style={{ color: '#a855f7', fontFamily: 'monospace' }}>whileInView</code>、<code style={{ color: '#3b82f6', fontFamily: 'monospace' }}>useScroll</code>、<code style={{ color: '#10b981', fontFamily: 'monospace' }}>useTransform</code>
      </div>

      {/* Fade in cards */}
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a855f7', marginBottom: '4px' }}>whileInView / useInView</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '14px' }}>视图触发动画</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {CARDS.map((card, i) => (
            <FadeInCard key={i} card={card} i={i} />
          ))}
        </div>
      </div>

      {/* Parallax */}
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#3b82f6', marginBottom: '4px' }}>useScroll + useTransform</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '14px' }}>视差效果</div>
        <ParallaxSection />
      </div>

      {/* Progress */}
      <div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#10b981', marginBottom: '4px' }}>scrollYProgress + useSpring</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '14px' }}>滚动进度追踪</div>
        <ScrollProgressBar />
      </div>
    </div>
  );
}