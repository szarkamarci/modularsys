import { useReducedMotion } from 'framer-motion';

/* ─── Vertical pipeline paths (hand-crafted for organic feel) ─── */
const PIPELINES = [
  {
    id: 'left',
    // Flows down the left third with gentle curves
    d: 'M 80 0 L 80 200 Q 80 220 100 220 L 140 220 Q 160 220 160 240 L 160 500 Q 160 520 140 520 L 100 520 Q 80 520 80 540 L 80 800 Q 80 820 100 820 L 120 820 Q 140 820 140 840 L 140 1200 Q 140 1220 120 1220 L 80 1220 Q 60 1220 60 1240 L 60 1600',
    dotDur: '18s',
    dotDelay: '0s',
  },
  {
    id: 'right',
    // Flows down the right third with different rhythm
    d: 'M 320 0 L 320 300 Q 320 320 300 320 L 270 320 Q 250 320 250 340 L 250 600 Q 250 620 270 620 L 310 620 Q 330 620 330 640 L 330 950 Q 330 970 310 970 L 280 970 Q 260 970 260 990 L 260 1300 Q 260 1320 280 1320 L 320 1320 Q 340 1320 340 1340 L 340 1600',
    dotDur: '22s',
    dotDelay: '4s',
  },
  {
    id: 'center',
    // A shorter, more subtle center line
    d: 'M 200 100 L 200 400 Q 200 420 180 420 L 160 420 Q 140 420 140 440 L 140 700 Q 140 720 160 720 L 200 720 Q 220 720 220 740 L 220 1100 Q 220 1120 200 1120 L 180 1120 Q 160 1120 160 1140 L 160 1600',
    dotDur: '20s',
    dotDelay: '7s',
  },
];

const PipelineBackground = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 400 1600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="bgPacketGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#5749c2" floodOpacity="0.4" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {PIPELINES.map((pipe) => (
          <g key={pipe.id}>
            {/* The pipeline track */}
            <path
              d={pipe.d}
              fill="none"
              stroke="#c8c4d5"
              strokeWidth="1"
              opacity="0.15"
            />

            {/* Traveling dot */}
            {!prefersReduced && (
              <circle r="2" fill="#5749c2" opacity="0.3" filter="url(#bgPacketGlow)">
                <animateMotion
                  dur={pipe.dotDur}
                  begin={pipe.dotDelay}
                  repeatCount="indefinite"
                  path={pipe.d}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default PipelineBackground;
