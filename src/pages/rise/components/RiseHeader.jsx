// RiseHeader — Page-level header with title, subtitle, and optional action slots
// Props: title, subtitle, children, className

export default function RiseHeader({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <header className={`rise-page-header ${className}`.trim()}>
      <div className="rise-page-header-row">
        <div>
          <h1 className="rise-page-title">{title}</h1>
          {subtitle && <p className="rise-page-subtitle">{subtitle}</p>}
        </div>
        {children && (
          <div className="rise-page-header-actions">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
