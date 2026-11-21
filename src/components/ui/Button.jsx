import React from 'react';
import './ui.css';

/**
 * Cakrawala Shared Button Component
 * 
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'rise'|'accent'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {'button'|'a'} [props.as='button']
 * @param {string} [props.href]
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  as = 'button',
  href,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  const Component = as === 'a' ? 'a' : 'button';
  
  const classNames = [
    'cw-button',
    `cw-button--${variant}`,
    `cw-button--${size}`,
    fullWidth ? 'cw-button--full-width' : '',
    isLoading ? 'cw-button--loading' : '',
    disabled ? 'cw-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={classNames}
      disabled={disabled || isLoading}
      href={as === 'a' ? href : undefined}
      onClick={!disabled && !isLoading ? onClick : undefined}
      {...rest}
    >
      {isLoading && <span className="cw-button__spinner" aria-hidden="true" />}
      {!isLoading && leftIcon && <span className="cw-button__icon-left">{leftIcon}</span>}
      <span className="cw-button__content">{children}</span>
      {!isLoading && rightIcon && <span className="cw-button__icon-right">{rightIcon}</span>}
    </Component>
  );
};

export default Button;
