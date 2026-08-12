import { useState, useEffect, useCallback, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/* ─── Helper for rounded SVG paths ─── */
const roundedPath = (pts, r = 6) => {
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const dx1 = Math.sign(p1.x - p0.x);
    const dy1 = Math.sign(p1.y - p0.y);
    const dx2 = Math.sign(p2.x - p1.x);
    const dy2 = Math.sign(p2.y - p1.y);
    const cx1 = p1.x - dx1 * r;
    const cy1 = p1.y - dy1 * r;
    const cx2 = p1.x + dx2 * r;
    const cy2 = p1.y + dy2 * r;
    d += ` L${cx1} ${cy1} Q${p1.x} ${p1.y} ${cx2} ${cy2}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last.x} ${last.y}`;
  return d;
};

/* ─── Constants ─── */
const MODULES = [
  { id: 'erp', key: 'module_erp', x: 0, y: 0, w: 120, h: 56 },
  { id: 'webshop', key: 'module_webshop', x: 140, y: 0, w: 120, h: 56 },
  { id: 'crm', key: 'module_crm', x: 0, y: 72, w: 120, h: 56 },
  { id: 'inventory', key: 'module_inventory', x: 140, y: 72, w: 120, h: 56 },
  { id: 'campaigns', key: 'module_campaigns', x: 0, y: 144, w: 120, h: 56 },
];

const DOCK_SLOT = { x: 280, y: 72, w: 120, h: 56 };
const PHASES = ['initial', 'approach', 'align', 'dock', 'activate', 'ready'];

/* ─── Data paths ─── */
const PATH_DATA = {
  'erp-inv': roundedPath([{x:120, y:28}, {x:130, y:28}, {x:130, y:100}, {x:140, y:100}]),
  'inv-mod': roundedPath([{x:260, y:100}, {x:280, y:100}]),
  'camp-web': roundedPath([{x:120, y:172}, {x:130, y:172}, {x:130, y:28}, {x:140, y:28}]),
  'crm-web': roundedPath([{x:120, y:100}, {x:130, y:100}, {x:130, y:28}, {x:140, y:28}]),
  'web-mod': roundedPath([{x:260, y:28}, {x:340, y:28}, {x:340, y:72}])
};

const PATHS_INVENTORY = [
  { id: 'erp-inv', d: PATH_DATA['erp-inv'], active: true },
  { id: 'inv-mod', d: PATH_DATA['inv-mod'], active: true },
  { id: 'camp-web', d: PATH_DATA['camp-web'], active: false },
  { id: 'crm-web', d: PATH_DATA['crm-web'], active: false },
  { id: 'web-mod', d: PATH_DATA['web-mod'], active: false }
];

const PATHS_CONVERSION = [
  { id: 'camp-web', d: PATH_DATA['camp-web'], active: true },
  { id: 'crm-web', d: PATH_DATA['crm-web'], active: true },
  { id: 'web-mod', d: PATH_DATA['web-mod'], active: true },
  { id: 'erp-inv', d: PATH_DATA['erp-inv'], active: false },
  { id: 'inv-mod', d: PATH_DATA['inv-mod'], active: false }
];

/* ─── Module shape (the notch is the brand element) ─── */
const ModuleShape = ({ w, h, fill, strokeColor, notch, glow, className }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-hidden="true">
    {glow && (
      <defs>
        <filter id="moduleGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#5749c2" floodOpacity="0.35" />
          <feComposite in2="blur" operator="in" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    )}
    <rect
      x={1} y={1} width={w - 2} height={h - 2} rx={6}
      fill={fill} stroke={strokeColor} strokeWidth={1.5}
      filter={glow ? 'url(#moduleGlow)' : undefined}
    />
    {/* Alignment notch on the left edge */}
    {notch && (
      <rect x={-1} y={h / 2 - 6} width={4} height={12} rx={1.5} fill={strokeColor} />
    )}
  </svg>
);

/* ─── Single system module ─── */
const SystemModule = ({ mod, t, isActive, phase }) => {
  const active = phase === 'ready' && isActive;
  return (
    <g
      transform={`translate(${mod.x}, ${mod.y})`}
      role="group"
      aria-label={t(`hero.${mod.key}`)}
      className={`transition-all duration-700 ${!isActive ? 'max-sm:opacity-0 max-sm:pointer-events-none' : 'opacity-100'}`}
    >
      <ModuleShape
        w={mod.w} h={mod.h}
        fill={active ? '#f8f7fe' : '#fafafa'}
        strokeColor={active ? '#c6bfff' : '#e3e2e7'}
      />
      <circle
        cx={mod.w - 14} cy={14} r={3}
        fill={active ? '#5749c2' : '#d4d3d9'}
        className={active ? 'animate-pulse' : ''}
      />
      <text
        x={14} y={mod.h / 2 + 1}
        dominantBaseline="middle"
        className="fill-on-surface font-headline"
        style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.01em' }}
      >
        {t(`hero.${mod.key}`)}
      </text>
    </g>
  );
};

/* ─── Docking slot (the empty receptor) ─── */
const DockSlot = ({ phase }) => {
  const isOccupied = PHASES.indexOf(phase) >= PHASES.indexOf('dock');
  if (isOccupied) return null;
  return (
    <g transform={`translate(${DOCK_SLOT.x}, ${DOCK_SLOT.y})`}>
      <rect
        x={1} y={1} width={DOCK_SLOT.w - 2} height={DOCK_SLOT.h - 2}
        rx={6} fill="none"
        stroke="#c6bfff" strokeWidth={1.5}
        strokeDasharray="6 4"
        opacity={0.6}
      />
      <rect x={DOCK_SLOT.w - 3} y={DOCK_SLOT.h / 2 - 6} width={4} height={12} rx={1.5} fill="#c6bfff" opacity={0.5} />
    </g>
  );
};

/* ─── The ModularAI module ─── */
const DockingModule = ({ phase, prefersReduced }) => {
  const { t } = useTranslation();

  const positionMap = {
    initial:  { x: DOCK_SLOT.x + 200, y: DOCK_SLOT.y + 20, rotate: 2, scale: 0.95 },
    approach: { x: DOCK_SLOT.x + 60, y: DOCK_SLOT.y + 8, rotate: 1.5, scale: 0.98 },
    align:    { x: DOCK_SLOT.x + 16, y: DOCK_SLOT.y + 2, rotate: 0.3, scale: 1 },
    dock:     { x: DOCK_SLOT.x, y: DOCK_SLOT.y, rotate: 0, scale: 1 },
    activate: { x: DOCK_SLOT.x, y: DOCK_SLOT.y, rotate: 0, scale: 1 },
    ready:    { x: DOCK_SLOT.x, y: DOCK_SLOT.y, rotate: 0, scale: 1 },
  };

  const pos = positionMap[phase] || positionMap.initial;

  if (prefersReduced) {
    return (
      <g transform={`translate(${DOCK_SLOT.x}, ${DOCK_SLOT.y})`}>
        <ModuleShape w={DOCK_SLOT.w} h={DOCK_SLOT.h} fill="#5749c2" strokeColor="#4130ac" notch glow />
        <text x={16} y={DOCK_SLOT.h / 2 + 1} dominantBaseline="middle"
          className="font-headline" style={{ fontSize: 11, fontWeight: 700, fill: '#fff', letterSpacing: '0.02em' }}>
          {t('hero.module_modularai')}
        </text>
      </g>
    );
  }

  return (
    <motion.g
      animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale }}
      transition={{
        type: 'spring',
        stiffness: phase === 'dock' ? 120 : 60,
        damping: phase === 'dock' ? 20 : 15,
        mass: phase === 'approach' ? 1.2 : 0.8,
      }}
      style={{ originX: '50%', originY: '50%' }}
    >
      <ModuleShape
        w={DOCK_SLOT.w} h={DOCK_SLOT.h}
        fill="#5749c2" strokeColor="#4130ac"
        notch
        glow={PHASES.indexOf(phase) >= PHASES.indexOf('dock')}
      />
      <text x={16} y={DOCK_SLOT.h / 2 + 1} dominantBaseline="middle"
        className="font-headline" style={{ fontSize: 11, fontWeight: 700, fill: '#fff', letterSpacing: '0.02em' }}>
        {t('hero.module_modularai')}
      </text>
    </motion.g>
  );
};

/* ─── Data path lines with glowing packets ─── */
const DataPaths = ({ scenario, phase }) => {
  const paths = scenario === 'inventory' ? PATHS_INVENTORY : PATHS_CONVERSION;
  const isReady = phase === 'ready';

  return (
    <g>
      <defs>
        <filter id="packetGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="#5749c2" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((p) => {
        const isActive = isReady && p.active;
        return (
          <g key={p.id} className={`transition-opacity duration-700 ${!p.active ? 'max-sm:opacity-0' : ''}`}>
            {/* Base track */}
            <motion.path
              d={p.d}
              fill="none"
              stroke={isActive ? '#5749c2' : '#e3e2e7'}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray={isReady ? 'none' : '4 4'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isReady ? 1 : 0.4, opacity: isReady ? 1 : 0.4 }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Animated data packets (only when ready and active) */}
            {isActive && (
              <>
                <circle r="2.5" fill="#5749c2" filter="url(#packetGlow)">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path={p.d} />
                </circle>
                <circle r="2.5" fill="#5749c2" filter="url(#packetGlow)">
                  <animateMotion dur="2.5s" begin="1.25s" repeatCount="indefinite" path={p.d} />
                </circle>
              </>
            )}
          </g>
        );
      })}
    </g>
  );
};

/* ─── Signal + Action readout ─── */
const SignalReadout = ({ scenario, t }) => (
  <motion.div
    key={scenario}
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Elegant spring-like easing
    className="overflow-hidden"
  >
    <div className="mt-6 space-y-4 pb-2">
      {/* Minimal AI indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex items-center gap-2 text-primary text-[11px] font-bold tracking-widest uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        ModularAI Output
      </motion.div>

      {/* Clean staggered content */}
      <div className="space-y-4 pl-3.5 border-l-2 border-primary/20">
        <motion.div 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-0.5">{t('hero.signal_label')}</p>
          <p className="text-sm font-semibold text-on-surface leading-snug">
            {t(`hero.scenario_${scenario}_signal`)}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-0.5">{t('hero.action_label')}</p>
          <p className="text-sm text-on-surface-variant leading-snug">
            {t(`hero.scenario_${scenario}_action`)}
          </p>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* ─── Main component ─── */
const DockingHero = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState(prefersReduced ? 'ready' : 'initial');
  const [scenario, setScenario] = useState('inventory');
  const [hasPlayed, setHasPlayed] = useState(prefersReduced);
  const animationContainerRef = useRef(null);
  const timeoutsRef = useRef([]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const runSequence = useCallback(() => {
    if (prefersReduced) return;
    clearTimers();
    const delays = [
      ['approach', 400],
      ['align', 1600],
      ['dock', 2600],
      ['activate', 3200],
      ['ready', 3800],
    ];
    setPhase('initial');
    delays.forEach(([p, d]) => {
      const id = setTimeout(() => setPhase(p), d);
      timeoutsRef.current.push(id);
    });
    setHasPlayed(true);
  }, [prefersReduced, clearTimers]);

  useEffect(() => {
    if (hasPlayed || prefersReduced) return;
    const el = animationContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { runSequence(); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed, prefersReduced, runSequence]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleReplay = () => {
    setPhase('initial');
    setTimeout(() => runSequence(), 50);
  };

  const handleScenarioChange = (s) => {
    if (s === scenario) return;
    setScenario(s);
  };

  const isReady = phase === 'ready' || prefersReduced;

  /* Modules active in each scenario */
  const activeModules = scenario === 'inventory'
    ? ['erp', 'inventory']
    : ['campaigns', 'crm', 'webshop'];

  return (
    <section
      id="solution"
      className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-16 md:pb-24 scroll-mt-20"
      aria-label="ModularAI docking demonstration"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Left: copy */}
        <div className="lg:w-[45%] pt-4 lg:pt-12">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary/80 mb-5">
            {t('hero.eyebrow')}
          </p>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-on-surface leading-[1.08] mb-6">
            {t('hero.headline')}<br />
            <span className="text-primary">{t('hero.headline2')}</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-lg">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/audit"
              className="text-center bg-primary text-white px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-primary/90 transition-colors active:scale-[0.97] shadow-lg shadow-primary/15"
            >
              {t('hero.cta_primary')}
            </Link>
            <button
              onClick={handleReplay}
              className="text-center bg-surface-container-low text-on-surface px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-surface-container transition-colors"
              aria-label={t('hero.cta_secondary')}
            >
              {t('hero.cta_secondary')}
            </button>
          </div>
        </div>

        {/* Right: docking scene */}
        <div className="lg:w-[55%] w-full" ref={animationContainerRef}>
          <div className="relative bg-white/60 border border-outline-variant/15 rounded-lg p-5 md:p-7 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`w-2 h-2 rounded-full ${isReady ? 'bg-emerald-500' : 'bg-amber-400'} ${isReady ? '' : 'animate-pulse'}`}
              />
              <span className="text-[11px] font-semibold tracking-wide text-on-surface-variant/70 uppercase">
                {isReady ? t('hero.status_ready') : t('hero.status_waiting')}
              </span>
            </div>

            <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <svg
                viewBox="0 0 440 220"
                className="w-full h-full"
                role="img"
                aria-label="Modular business architecture with ModularAI docking"
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e3e2e7" strokeWidth="0.5" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="440" height="220" fill="url(#grid)" />

                <DataPaths scenario={scenario} phase={phase} />

                {MODULES.map(mod => (
                  <SystemModule
                    key={mod.id}
                    mod={mod}
                    t={t}
                    isActive={activeModules.includes(mod.id)}
                    phase={phase}
                  />
                ))}

                <DockSlot phase={phase} />
                <DockingModule phase={phase} prefersReduced={prefersReduced} />
              </svg>
            </div>

            {isReady && (
              <AnimatePresence mode="wait">
                <SignalReadout key={scenario} scenario={scenario} t={t} />
              </AnimatePresence>
            )}

            {isReady && (
              <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-1 bg-surface-container rounded-full p-0.5" role="tablist" aria-label="Scenario selection">
                  {['inventory', 'conversion'].map(s => (
                    <button
                      key={s}
                      role="tab"
                      aria-selected={scenario === s}
                      onClick={() => handleScenarioChange(s)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        scenario === s
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {t(`hero.scenario_${s}`)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleReplay}
                  className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={t('hero.replay')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>replay</span>
                  {t('hero.replay')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DockingHero;
