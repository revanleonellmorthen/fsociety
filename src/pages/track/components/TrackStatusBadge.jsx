// TrackStatusBadge — reusable status/label badge
// variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'

export default function TrackStatusBadge({ children, variant = 'neutral', dot = false }) {
  return (
    <span className={`track-badge track-badge-${variant}`}>
      {dot && (
        <span
          style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'currentColor',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
