// TrackCard — reusable content card container

export default function TrackCard({ title, icon, action, onAction, children, style }) {
  return (
    <div className="track-card" style={style}>
      {(title || icon || action) && (
        <div className="track-card-header">
          <div className="track-card-title">
            {icon && icon}
            {title}
          </div>
          {action && (
            <button className="track-card-action" onClick={onAction}>
              {action}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
