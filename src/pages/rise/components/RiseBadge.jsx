// RiseBadge — Reusable status and category badge for RISE LMS module
// Props:
//   variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary' | 'gold'
//   children: badge label or content
//   dot: boolean (show leading status indicator dot)
//   className: optional additional class names

export default function RiseBadge({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
  style,
}) {
  return (
    <span className={`rise-badge rise-badge-${variant} ${className}`.trim()} style={style}>
      {dot && <span className="rise-badge-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
