type MarsPatchProps = {
  size?: number | string;
  className?: string;
  withFrame?: boolean;
};

export function MarsPatch({
  size = 168,
  className,
  withFrame = false,
}: MarsPatchProps = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 168 168"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="mars-patch-planet" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f49256" />
          <stop offset="55%" stopColor="#c0561f" />
          <stop offset="100%" stopColor="#5a2a10" />
        </radialGradient>
      </defs>

      {withFrame && (
        <g>
          {/* Outer ring */}
          <circle
            cx="84"
            cy="84"
            r="80"
            fill="none"
            stroke="rgba(244,228,193,0.22)"
            strokeWidth="1"
          />
          {/* Inner ring */}
          <circle
            cx="84"
            cy="84"
            r="74"
            fill="none"
            stroke="rgba(244,228,193,0.10)"
            strokeWidth="1"
          />
          {/* Tick marks */}
          <g stroke="rgba(244,228,193,0.45)" strokeWidth="1">
            <line x1="84" y1="4" x2="84" y2="14" />
            <line x1="84" y1="154" x2="84" y2="164" />
            <line x1="4" y1="84" x2="14" y2="84" />
            <line x1="154" y1="84" x2="164" y2="84" />
          </g>
        </g>
      )}

      {/* Mars */}
      <circle cx="84" cy="84" r="46" fill="url(#mars-patch-planet)" />

      {/* Orbital line */}
      <ellipse
        cx="84"
        cy="84"
        rx="62"
        ry="22"
        fill="none"
        stroke="rgba(232,122,61,0.55)"
        strokeWidth="1.2"
        transform="rotate(-22 84 84)"
      />

      {/* Phobos */}
      <circle cx="138" cy="62" r="2.4" fill="#f4e4c1" />

      {/* Deimos */}
      <circle cx="30" cy="106" r="1.6" fill="#f4e4c1" />
    </svg>
  );
}
