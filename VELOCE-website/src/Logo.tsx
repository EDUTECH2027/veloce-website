export default function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-label="EduTech logo" style={{ flex: 'none' }}>
      <defs>
        <linearGradient id="edutech-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#edutech-g)" />
      <path d="M12 10h17a2 2 0 0 1 0 4H16v4h10a2 2 0 0 1 0 4H16v4h13a2 2 0 0 1 0 4H12a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z" fill="#fff" />
      <circle cx="31" cy="9" r="3.2" fill="#93c5fd" />
    </svg>
  )
}
