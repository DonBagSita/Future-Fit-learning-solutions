import { motion } from "framer-motion"

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      initial="hidden"
      animate="visible"
    >
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#F7CB5C" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F7CB5C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hillGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C7A45" />
          <stop offset="100%" stopColor="#0F4D2E" />
        </linearGradient>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7DCF5" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#FAF8F3" stopOpacity="0"/>
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* sky wash */}
      <rect width="600" height="400" fill="url(#skyGrad)" />

      {/* ambient glow */}
      <motion.circle
        cx="300" cy="230" r="230" fill="url(#heroGlow)"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      {/* drifting clouds */}
      {[
        { cx: 100, cy: 95, rx: 55, ry: 18, delay: 0, dur: 28 },
        { cx: 480, cy: 70, rx: 42, ry: 14, delay: 2, dur: 32 },
        { cx: 250, cy: 55, rx: 36, ry: 11, delay: 5, dur: 24 },
      ].map((c, i) => (
        <motion.ellipse
          key={i}
          cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
          fill="white" opacity="0.45"
          animate={{ x: [0, 40, 0, -30, 0] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        />
      ))}

      {/* sun with rays */}
      <motion.g filter="url(#softGlow)">
        <motion.circle
          cx="440" cy="135" r="42" fill="#F2A900"
          animate={{ scale: [1, 1.08, 1], opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
      {/* sun rays — rotating slowly */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ originX: "440px", originY: "135px" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="440" y1={135 - 56}
            x2="440" y2={135 - 68}
            stroke="#F2A900" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"
            transform={`rotate(${i * 45} 440 135)`}
          />
        ))}
      </motion.g>

      {/* distant trees on hills */}
      {[
        { x: 70, y: 382 },
        { x: 155, y: 400 },
        { x: 430, y: 365 },
        { x: 530, y: 388 },
        { x: 490, y: 378 },
      ].map((t, i) => (
        <motion.g
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          style={{ originX: `${t.x}px`, originY: `${t.y}px` }}
        >
          <polygon
            points={`${t.x},${t.y - 30} ${t.x - 9},${t.y} ${t.x + 9},${t.y}`}
            fill="#0F4D2E" opacity="0.7"
          />
          <rect x={t.x - 2} y={t.y} width="4" height="8" fill="#082A19" opacity="0.5" />
        </motion.g>
      ))}

      {/* rolling hills */}
      <motion.path
        d="M0 420 C 90 360, 180 460, 280 400 C 380 340, 460 430, 600 380 L 600 600 L 0 600 Z"
        fill="url(#hillGradient)" opacity="0.9"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.path
        d="M0 470 C 110 430, 200 500, 320 450 C 420 410, 500 470, 600 440 L 600 600 L 0 600 Z"
        fill="#0F4D2E"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* winding path — draws itself in */}
      <motion.path
        d="M300 590 C 280 530, 340 490, 310 440 C 270 390, 340 360, 300 310 C 270 270, 320 240, 300 210"
        stroke="#FAF8F3" strokeWidth="12" strokeLinecap="round" fill="none"
        strokeDasharray="4 22"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
      />

      {/* milestone dots — 4 steps echoing the journey, lighting up in sequence */}
      {[
        { cx: 307, cy: 460, fill: "#1C7A45", label: "1" },
        { cx: 295, cy: 380, fill: "#5B2A86", label: "2" },
        { cx: 310, cy: 310, fill: "#0B1387", label: "3" },
        { cx: 300, cy: 240, fill: "#F2A900", label: "4" },
      ].map((dot, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.8 + i * 0.2, type: "spring", stiffness: 300 }}
        >
          <circle cx={dot.cx} cy={dot.cy} r="13" fill={dot.fill} />
          <text
            x={dot.cx} y={dot.cy + 4.5}
            textAnchor="middle" fill="#FAF8F3"
            fontSize="11" fontWeight="bold" fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {dot.label}
          </text>
        </motion.g>
      ))}

      {/* learner figure, gentle idle float */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
        transform="translate(255 480)"
      >
        {/* head */}
        <circle cx="45" cy="14" r="18" fill="#3B2506" />
        {/* body torso */}
        <path d="M22 90 C 20 60, 28 42, 45 40 C 62 42, 70 60, 68 90 Z" fill="#0B1387" />
        {/* left arm */}
        <rect x="12" y="50" width="14" height="38" rx="7" fill="#0B1387" transform="rotate(-15 19 69)" />
        {/* right arm waving */}
        <motion.rect
          x="64" y="36" width="14" height="38" rx="7" fill="#0B1387"
          animate={{ rotate: [15, 30, 15] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ originX: "71px", originY: "36px" }}
        />
        {/* legs */}
        <rect x="28" y="85" width="14" height="32" rx="5" fill="#080F67" />
        <rect x="48" y="85" width="14" height="32" rx="5" fill="#080F67" />
        {/* backpack */}
        <rect x="53" y="48" width="22" height="30" rx="6" fill="#F2A900" />
        <rect x="58" y="54" width="12" height="3" rx="1.5" fill="#D69200" />
        {/* smile */}
        <path d="M38 20 Q 45 27 52 20" stroke="#FAF8F3" strokeWidth="2" fill="none" strokeLinecap="round" />
      </motion.g>

      {/* floating icons — book */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 1 },
          scale: { duration: 0.4, delay: 1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        transform="translate(115 210)"
      >
        <rect x="0" y="0" width="50" height="38" rx="5" fill="#5B2A86" />
        <rect x="0" y="0" width="25" height="38" rx="5" fill="#42206A" />
        <rect x="6" y="8" width="38" height="3" rx="1.5" fill="#FAF8F3" opacity="0.7" />
        <rect x="6" y="15" width="26" height="3" rx="1.5" fill="#FAF8F3" opacity="0.45" />
        <rect x="6" y="22" width="32" height="3" rx="1.5" fill="#FAF8F3" opacity="0.35" />
      </motion.g>

      {/* floating icons — magnifying glass */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 1.2 },
          scale: { duration: 0.4, delay: 1.2 },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
        }}
        transform="translate(440 238)"
      >
        <circle r="22" fill="#0E19AE" />
        <circle r="8" fill="none" stroke="#FAF8F3" strokeWidth="2.5" cx="-2" cy="-2" />
        <line x1="4" y1="4" x2="10" y2="10" stroke="#FAF8F3" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* floating icons — graduation cap */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0], rotate: [0, -3, 0, 3, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 1.4 },
          scale: { duration: 0.4, delay: 1.4 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
        }}
        transform="translate(500 165)"
      >
        <polygon points="0,12 20,0 40,12 20,18" fill="#0F4D2E" />
        <polygon points="8,14 8,24 20,28 32,24 32,14 20,18" fill="#15633A" />
        <line x1="36" y1="12" x2="36" y2="26" stroke="#F2A900" strokeWidth="2" />
        <circle cx="36" cy="27" r="2.5" fill="#F2A900" />
      </motion.g>

      {/* sparkle particles scattered — ambient magic */}
      {[
        { x: 180, y: 150, delay: 0, dur: 3 },
        { x: 350, y: 180, delay: 0.5, dur: 2.5 },
        { x: 520, y: 300, delay: 1, dur: 3.5 },
        { x: 90, y: 330, delay: 1.5, dur: 2.8 },
        { x: 400, y: 120, delay: 0.8, dur: 3.2 },
        { x: 560, y: 220, delay: 1.2, dur: 2.6 },
      ].map((s, i) => (
        <motion.g key={`sparkle-${i}`}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          <line x1={s.x-5} y1={s.y} x2={s.x+5} y2={s.y} stroke="#F2A900" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={s.x} y1={s.y-5} x2={s.x} y2={s.y+5} stroke="#F2A900" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      ))}
    </motion.svg>
  )
}
