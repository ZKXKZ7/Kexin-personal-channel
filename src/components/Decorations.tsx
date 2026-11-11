export function WavyArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`text-sky-300/90 ${className}`}
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 32C28 8 52 40 72 24c12-9 24-10 40-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M104 18l8 8-8 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
