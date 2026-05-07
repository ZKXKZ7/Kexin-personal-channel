/**
 * Monoline SVG in navy — exaggerated “leaping” pose, Humaaans / Open Peeps adjacent.
 */
export function FluidIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="风格化跳跃人物线条插画"
    >
      <g className="text-sky-300" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* motion trail */}
        <path
          opacity="0.35"
          d="M48 210c24-18 52-32 86-28M56 228c20-10 44-16 70-12"
          strokeWidth="1.8"
        />
        {/* back leg — extended */}
        <path d="M165 175c-8 28-22 52-40 68" />
        <path d="M128 238c-10 6-22 10-34 8" />
        {/* front leg — bent leap */}
        <path d="M188 168c18 10 34 28 42 50" />
        <path d="M232 216c6 14 4 30-4 42" />
        {/* torso flow */}
        <path d="M158 178c-6-38 8-72 34-98 18-18 42-26 64-22" />
        {/* arm back */}
        <path d="M168 120c-18 6-34 20-44 40" />
        <path d="M126 158c-8 4-18 4-26 0" />
        {/* arm front — reach */}
        <path d="M232 96c22 2 40 14 52 32" />
        <path d="M284 128c8 10 12 22 12 34" />
        {/* head */}
        <ellipse cx="248" cy="72" rx="22" ry="26" />
        {/* hair swoosh */}
        <path d="M226 58c10-18 28-28 48-26 14 2 26 12 32 26" />
        {/* face minimal */}
        <circle cx="242" cy="72" r="2.2" fill="currentColor" stroke="none" />
        <path d="M258 78c-6 8-14 10-22 6" strokeWidth="2" />
        {/* scarf / ribbon motion */}
        <path
          opacity="0.9"
          d="M210 102c-12 10-26 18-42 20M186 118c-16 8-28 22-34 38"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
