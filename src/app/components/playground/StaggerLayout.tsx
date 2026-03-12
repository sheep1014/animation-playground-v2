import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const GRID_ITEMS = [
  { emoji: '🎨', label: 'Design', color: '#a855f7' },
  { emoji: '⚡', label: 'Speed', color: '#f59e0b' },
  { emoji: '🌊', label: 'Fluid', color: '#06b6d4' },
  { emoji: '🔥', label: 'Hot', color: '#ef4444' },
  { emoji: '🌟', label: 'Star', color: '#eab308' },
  { emoji: '🎭', label: 'Drama', color: '#ec4899' },
  { emoji: '🚀', label: 'Launch', color: '#3b82f6' },
  { emoji: '💎', label: 'Gem', color: '#10b981' },
];

function StaggerGrid() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>点击按钮触发错落动画</p>
        <button
          onClick={() => setVisible((v) => !v)}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            background: visible ? 'rgba(239,68,68,0.15)' : 'rgba(168,85,247,0.15)',
            color: visible ? '#ef4444' : '#a855f7',
            border: `1px solid ${visible ? 'rgba(239,68,68,0.35)' : 'rgba(168,85,247,0.35)'}`,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {visible ? '↩ 收起' : '▶ 展示'}
        </button>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
            }}
          >
            {GRID_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}40`,
                  borderRadius: '12px',
                  padding: '14px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.08, background: `${item.color}25` }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{ fontSize: '1.5rem' }}>{item.emoji}</div>
                <div style={{ fontSize: '11px', color: item.color, marginTop: '4px', fontWeight: 600 }}>{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LayoutExpand() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const cards = [
    { title: '弹簧动画', icon: '🌊', desc: '使用物理弹簧模型，实现自然流畅的过渡效果。可调节刚度、阻尼、质量等参数。', color: '#3b82f6' },
    { title: '惯性滚动', icon: '🎯', desc: '模拟真实的惯性物理效果，给拖拽和滚动增加自然感。', color: '#10b981' },
    { title: '关键帧', icon: '🎬', desc: '定义多个关键状态，让动画在不同阶段以不同的时间曲线过渡。', color: '#ec4899' },
  ];

  return (
    <div>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>点击卡片展开，使用 layout 动画</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: `${card.color}12`,
              border: `1px solid ${card.color}35`,
              borderRadius: '14px',
              padding: '14px 16px',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
            whileHover={{ background: `${card.color}20` }}
          >
            <motion.div layout style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '14px', color: card.color }}>{card.title}</span>
              <motion.span
                style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}
                animate={{ rotate: expanded === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▾
              </motion.span>
            </motion.div>
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p style={{ marginTop: '12px', fontSize: '13px', color: '#9ca3af', lineHeight: 1.6 }}>{card.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SharedLayoutTabs() {
  const [selected, setSelected] = useState(0);
  const tabs = ['基础', '弹簧', '关键帧', '手势', '布局'];
  const contents = [
    '基础动画通过 animate 属性定义目标状态，Motion 自动插值计算中间帧。',
    '弹簧动画模拟真实物理弹簧，比 ease 曲线更自然流畅。',
    '关键帧通过数组定义多个状态，可控制每帧的时间节奏。',
    '手势动画响应 hover、tap、drag 等用户输入，实现交互反馈。',
    '布局动画自动追踪 DOM 变化，当元素大小/位置改变时平滑过渡。',
  ];

  return (
    <div>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>layoutId 实现共享布局动画</p>
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            style={{ position: 'relative', padding: '8px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', color: selected === i ? '#fff' : '#6b7280', fontWeight: selected === i ? 700 : 400, zIndex: 1, userSelect: 'none' }}
          >
            {selected === i && (
              <motion.div
                layoutId="tab-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  zIndex: -1,
                  boxShadow: '0 0 15px rgba(168,85,247,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {tab}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '12px',
            padding: '14px 16px',
            fontSize: '13px',
            color: '#d1d5db',
            lineHeight: 1.7,
          }}
        >
          {contents[selected]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function StaggerLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a855f7', marginBottom: '4px' }}>staggerChildren + AnimatePresence</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '16px' }}>错落出现动画</div>
        <StaggerGrid />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#3b82f6', marginBottom: '4px' }}>layout + AnimatePresence</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '16px' }}>布局展开动画</div>
          <LayoutExpand />
        </div>
        <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ec4899', marginBottom: '4px' }}>layoutId shared element</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '16px' }}>共享布局标签</div>
          <SharedLayoutTabs />
        </div>
      </div>
    </div>
  );
}
