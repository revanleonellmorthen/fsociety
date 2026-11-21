import React from 'react';
import './ui.css';

/**
 * Cakrawala Shared Badge Component
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'success'|'warning'|'danger'|'info'|'neutral'|'accent'} [props.variant='primary']
 * @param {'sm'|'md'} [props.size='sm']
 * @param {boolean} [props.dot=false]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Badge = ({
  variant = 'primary',
  size = 'sm',
  dot = false,
  icon,
  className = '',
  children,
  ...rest
}) => {
  const classNames = [
    'cw-badge',
    `cw-badge--${variant}`,
    `cw-badge--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...rest}>
      {dot && <span className="cw-badge__dot" aria-hidden="true" />}
      {icon && <span className="cw-badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
