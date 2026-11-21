import React from 'react';
import { Inbox } from 'lucide-react';

export default function RiseEmptyState({
  icon: Icon = Inbox,
  title = 'Tidak Ada Data',
  message = 'Belum ada konten atau data yang tersedia untuk kategori ini.',
  action,
  children,
  className = '',
}) {
  return (
    <div className={`rise-empty-state ${className}`.trim()}>
      <div className="rise-empty-state-icon">
        {React.isValidElement(Icon) ? Icon : <Icon size={40} />}
      </div>
      <h3 className="rise-empty-state-title">{title}</h3>
      <p className="rise-empty-state-message">{message}</p>
      {action && <div className="rise-empty-state-action">{action}</div>}
      {children}
    </div>
  );
}
