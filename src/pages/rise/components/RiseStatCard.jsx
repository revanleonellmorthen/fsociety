// RiseStatCard — Metric display card with top accent bar
// Props:
//   label: uppercase label text
//   value: main stat metric number or text
//   sub: optional secondary caption or explanation
//   icon: Lucide icon component or element
//   accentColor: CSS color string for top accent bar & icon
//   bgColor: CSS color string for icon container background
//   className: optional additional class names

export default function RiseStatCard({
  label,
  value,
  sub,
  icon,
  accentColor,
  bgColor,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`rise-stat-card ${className}`.trim()}
      style={{
        '--rise-stat-accent': accentColor,
        '--rise-stat-bg': bgColor,
        ...style,
      }}
    >
      {icon && (
        <div className="rise-stat-card-icon">
          {icon}
        </div>
      )}
      <div className="rise-stat-label">{label}</div>
      <div className="rise-stat-value">{value}</div>
      {sub && <div className="rise-stat-sub">{sub}</div>}
    </div>
  );
}
