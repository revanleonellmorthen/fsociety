import React from 'react';
import './ui.css';

/**
 * Cakrawala Shared Tabs Component
 * 
 * @param {Object} props
 * @param {Array<{ id: string, label: React.ReactNode, icon?: React.ReactNode, count?: number }>} props.items
 * @param {string} props.activeId
 * @param {Function} props.onChange
 * @param {string} [props.className]
 */
export const Tabs = ({
  items = [],
  activeId,
  onChange,
  className = '',
  ...rest
}) => {
  return (
    <div className={`cw-tabs ${className}`} role="tablist" {...rest}>
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`cw-tab-item ${isActive ? 'cw-tab-item--active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <span className="cw-tab-item__icon">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'var(--color-primary-100)' : 'var(--color-neutral-200)',
                  color: isActive ? 'var(--color-primary-700)' : 'var(--color-neutral-600)',
                  fontWeight: 600
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
