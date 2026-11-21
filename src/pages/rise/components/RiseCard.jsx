// RiseCard — Reusable content card container for RISE LMS module
// Props: title, icon, action, onAction, children, className, style

export default function RiseCard({
  title,
  icon,
  action,
  onAction,
  children,
  className = '',
  style,
}) {
  const hasHeader = Boolean(title || icon || action);

  return (
    <div className={`rise-card ${className}`.trim()} style={style}>
      {hasHeader && (
        <div className="rise-card-header">
          <div className="rise-card-title">
            {icon && <span className="rise-card-title-icon">{icon}</span>}
            {title && <span>{title}</span>}
          </div>
          {action && (
            <button
              type="button"
              className="rise-card-action"
              onClick={onAction}
            >
              {action}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
