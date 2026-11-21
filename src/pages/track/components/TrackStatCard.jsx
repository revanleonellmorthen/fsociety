// TrackStatCard — metric display card with accent color

export default function TrackStatCard({ label, value, sub, icon, accentColor, bgColor }) {
  return (
    <div
      className="track-stat-card"
      style={{
        '--track-stat-accent': accentColor,
        '--track-stat-bg': bgColor,
      }}
    >
      {icon && (
        <div className="track-stat-card-icon">
          {icon}
        </div>
      )}
      <div className="track-stat-label">{label}</div>
      <div className="track-stat-value">{value}</div>
      {sub && <div className="track-stat-sub">{sub}</div>}
    </div>
  );
}
