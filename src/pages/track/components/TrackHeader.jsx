// TrackHeader — page-level header with title and subtitle

export default function TrackHeader({ title, subtitle, children }) {
  return (
    <div className="track-page-header">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 className="track-page-title">{title}</h1>
          {subtitle && <p className="track-page-subtitle">{subtitle}</p>}
        </div>
        {children && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{children}</div>}
      </div>
    </div>
  );
}
