import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

function Typewriter() {
  const sentences = [
    'Motion 让动画充满生命力 ✨',
    '流畅的过渡，自然的弹簧 🌊',
    '每一帧都是艺术 🎨',
  ];
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    const sentence = sentences[sentenceIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (displayed.length < sentence.length) {
        timeout = setTimeout(() => setDisplayed(sentence.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1800);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setSentenceIdx((i) => (i + 1) % sentences.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, sentenceIdx]);

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', minHeight: '80px', display: 'flex', alignItems: 'center' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#e5e7eb', letterSpacing: '0.02em' }}>
        {displayed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ borderLeft: '2px solid #a855f7', marginLeft: '2px', paddingLeft: '1px' }}
        />
      </span>
    </div>
  );
}

function WordReveal() {
  const [key, setKey] = useState(0);
  const words = '探索动画的无限可能性'.split('');
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const child = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 350, damping: 20 } },
  };

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div style={{ perspective: '600px', overflow: 'hidden' }}>
        <motion.div
          key={key}
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={child}
              style={{ fontSize: '22px', fontWeight: 800, color: `hsl(${260 + i * 12}, 75%, 65%)`, display: 'inline-block' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <button onClick={() => setKey((k) => k + 1)} style={{ padding: '5px 14px', borderRadius: '8px', fontSize: '12px', background: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.35)', cursor: 'pointer', fontWeight: 600 }}>
        ↺ 重播
      </button>
    </div>
  );
}

function CharHover() {
  const chars = '悬 停 每 个 字 符 ！'.split(' ');

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            whileHover={{ y: -14, scale: 1.4, color: `hsl(${260 + i * 30}, 80%, 65%)`, textShadow: `0 0 20px hsl(${260 + i * 30}, 80%, 65%)` }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            style={{ fontSize: '26px', fontWeight: 800, cursor: 'default', display: 'inline-block', userSelect: 'none', color: '#e5e7eb' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ScrambleText() {
  const target = 'ANIMATION';
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!';
  const [resolvedCount, setResolvedCount] = useState(target.length);
  const [scrambled, setScrambled] = useState(target);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    clearInterval(intervalRef.current!);
    clearInterval(animRef.current!);
    setResolvedCount(0);

    let resolved = 0;
    // Scramble phase
    const scrambleInterval = setInterval(() => {
      setScrambled(
        target.split('').map((c, i) =>
          i < resolved ? c : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        ).join('')
      );
    }, 40);

    // Resolve phase
    const resolveInterval = setInterval(() => {
      resolved += 1;
      setResolvedCount(resolved);
      if (resolved >= target.length) {
        clearInterval(scrambleInterval);
        clearInterval(resolveInterval);
        setScrambled(target);
      }
    }, 120);

    intervalRef.current = scrambleInterval;
    animRef.current = resolveInterval;
  };

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div style={{ fontFamily: 'monospace', fontSize: '24px', fontWeight: 800, letterSpacing: '0.15em', textShadow: '0 0 20px rgba(16,185,129,0.5)' }}>
        {scrambled.split('').map((c, i) => (
          <span key={i} style={{ color: i < resolvedCount ? '#10b981' : '#f59e0b' }}>{c}</span>
        ))}
      </div>
      <button onClick={start} style={{ padding: '5px 14px', borderRadius: '8px', fontSize: '12px', background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.35)', cursor: 'pointer', fontWeight: 600 }}>
        🔀 扰乱
      </button>
    </div>
  );
}

function CountUp() {
  const [active, setActive] = useState(false);
  const [values, setValues] = useState([0, 0, 0]);
  const targets = [12847, 99.9, 3200];
  const labels = ['用户数', '满意度%', '动画帧/s'];
  const colors = ['#a855f7', '#10b981', '#3b82f6'];

  useEffect(() => {
    if (!active) { setValues([0, 0, 0]); return; }
    const duration = 2000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValues(targets.map((t) => parseFloat((t * eased).toFixed(t < 10 ? 1 : 0))));
      if (elapsed >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', minHeight: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '14px' }}>
        {values.map((v, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: colors[i], fontFamily: 'monospace', textShadow: `0 0 15px ${colors[i]}66` }}>
              {i === 1 ? Number(v).toFixed(1) : Math.floor(v).toLocaleString()}{i === 1 ? '%' : ''}
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>{labels[i]}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setActive((a) => !a)}
        style={{ width: '100%', padding: '7px', borderRadius: '8px', fontSize: '12px', background: active ? 'rgba(239,68,68,0.15)' : 'rgba(168,85,247,0.15)', color: active ? '#ef4444' : '#a855f7', border: `1px solid ${active ? 'rgba(239,68,68,0.35)' : 'rgba(168,85,247,0.35)'}`, cursor: 'pointer', fontWeight: 600 }}
      >
        {active ? '↩ 重置' : '▶ 计数'}
      </button>
    </div>
  );
}

function GlitchText() {
  const [glitching, setGlitching] = useState(false);
  const word = 'GLITCH';

  const triggerGlitch = () => {
    if (glitching) return;
    setGlitching(true);
    setTimeout(() => setGlitching(false), 600);
  };

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={triggerGlitch}>
        <span style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 900, letterSpacing: '0.2em', color: '#ef4444', textShadow: '0 0 15px rgba(239,68,68,0.6)' }}>
          {word}
        </span>
        {glitching && (
          <>
            <motion.span
              style={{ position: 'absolute', top: 0, left: 0, fontFamily: 'monospace', fontSize: '28px', fontWeight: 900, letterSpacing: '0.2em', color: '#06b6d4' }}
              animate={{ x: [-3, 4, -2, 3, 0], opacity: [0.7, 0, 0.8, 0, 0] }}
              transition={{ duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }}
            >
              {word}
            </motion.span>
            <motion.span
              style={{ position: 'absolute', top: 0, left: 0, fontFamily: 'monospace', fontSize: '28px', fontWeight: 900, letterSpacing: '0.2em', color: '#a855f7' }}
              animate={{ x: [3, -4, 2, -3, 0], opacity: [0, 0.7, 0, 0.8, 0] }}
              transition={{ duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }}
            >
              {word}
            </motion.span>
          </>
        )}
      </div>
      <p style={{ fontSize: '11px', color: '#6b7280' }}>点击触发故障效果</p>
    </div>
  );
}

export function TextAnimations() {
  const demos = [
    { title: '打字机效果', code: 'interval + cursor blink', color: '#a855f7', Component: Typewriter },
    { title: '文字逐帧揭示', code: 'stagger + rotateX 3D', color: '#3b82f6', Component: WordReveal },
    { title: '字符弹跳', code: 'whileHover per-char', color: '#10b981', Component: CharHover },
    { title: '文字扰乱', code: 'scramble algorithm', color: '#f59e0b', Component: ScrambleText },
    { title: '数字计数器', code: 'cubic-ease count up', color: '#ec4899', Component: CountUp },
    { title: '故障效果', code: 'RGB split glitch', color: '#ef4444', Component: GlitchText },
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
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '12px' }}>{title}</div>
          <Component />
        </div>
      ))}
    </div>
  );
}
