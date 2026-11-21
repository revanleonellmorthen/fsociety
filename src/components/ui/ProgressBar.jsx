import React from 'react';
import './ui.css';

/**
 * Cakrawala Shared ProgressBar Component
 * 
 * @param {Object} props
 * @param {number} props.value - Current progress value (e.g. 56)
 * @param {number} [props.max=100] - Maximum value
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {'primary'|'success'|'warning'|'danger'|'info'|'gradient'} [props.variant='primary']
 * @param {boolean} [props.showLabel=false]
 * @param {string} [props.label]
 * @param {string} [props.className]
 */
export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className = '',
  ...rest
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`cw-progress cw-progress--${size} ${className}`} {...rest}>
      {(showLabel || label) && (
        <div className="cw-progress__header">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
      )}
      <div
        className="cw-progress__track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`cw-progress__bar cw-progress__bar--${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
