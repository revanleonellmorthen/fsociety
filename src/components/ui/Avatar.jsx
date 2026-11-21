import React, { useState } from 'react';
import './ui.css';

/**
 * Cakrawala Shared Avatar Component
 * Handles image fallback to initials automatically.
 * 
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.name='Student']
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {'online'|'busy'|'away'|'offline'} [props.status]
 * @param {string} [props.className]
 */
export const Avatar = ({
  src,
  name = 'Student',
  size = 'md',
  status,
  className = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (text) => {
    if (!text) return 'CW';
    const parts = text.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const classNames = [
    'cw-avatar',
    `cw-avatar--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} title={name} {...rest}>
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          className="cw-avatar__image"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="cw-avatar__fallback">{getInitials(name)}</span>
      )}
      {status && (
        <span
          className={`cw-avatar__status cw-avatar__status--${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
