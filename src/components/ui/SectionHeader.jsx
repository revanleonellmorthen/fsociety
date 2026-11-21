import React from 'react';
import './ui.css';

/**
 * Cakrawala Shared SectionHeader Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.subtitle]
 * @param {React.ReactNode} [props.badge]
 * @param {string} [props.actionLabel]
 * @param {React.ReactNode} [props.actionIcon]
 * @param {string} [props.actionHref]
 * @param {Function} [props.onActionClick]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export const SectionHeader = ({
  title,
  subtitle,
  badge,
  actionLabel,
  actionIcon,
  actionHref,
  onActionClick,
  children,
  className = '',
  ...rest
}) => {
  return (
    <div className={`cw-section-header ${className}`} {...rest}>
      <div className="cw-section-header__left">
        <div className="cw-section-header__title-row">
          <h2 className="cw-section-header__title">{title}</h2>
          {badge && <div className="cw-section-header__badge">{badge}</div>}
        </div>
        {subtitle && <p className="cw-section-header__subtitle">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {children}
        {actionLabel && (
          actionHref ? (
            <a href={actionHref} className="cw-section-header__action">
              <span>{actionLabel}</span>
              {actionIcon && <span>{actionIcon}</span>}
            </a>
          ) : (
            <button
              type="button"
              className="cw-section-header__action"
              onClick={onActionClick}
            >
              <span>{actionLabel}</span>
              {actionIcon && <span>{actionIcon}</span>}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
