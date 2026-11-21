import React from 'react';
import './ui.css';

/**
 * Cakrawala Shared Card Component
 * Supports Header, Body, Footer compound slots.
 * 
 * @param {Object} props
 * @param {'default'|'elevated'|'bordered'|'subtle'|'interactive'} [props.variant='default']
 * @param {'none'|'sm'|'md'|'lg'} [props.padding='none']
 * @param {Function} [props.onClick]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Card = ({
  variant = 'default',
  padding = 'none',
  onClick,
  className = '',
  children,
  ...rest
}) => {
  const isInteractive = variant === 'interactive' || Boolean(onClick);
  const classNames = [
    'cw-card',
    `cw-card--${variant}`,
    padding !== 'none' ? `cw-card--padding-${padding}` : '',
    isInteractive ? 'cw-card--interactive' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...rest }) => (
  <div className={`cw-card__header ${className}`} {...rest}>
    {children}
  </div>
);

export const CardBody = ({ className = '', children, ...rest }) => (
  <div className={`cw-card__body ${className}`} {...rest}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...rest }) => (
  <div className={`cw-card__footer ${className}`} {...rest}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...rest }) => (
  <h3 className={`cw-card__title ${className}`} {...rest}>
    {children}
  </h3>
);

export const CardSubtitle = ({ className = '', children, ...rest }) => (
  <p className={`cw-card__subtitle ${className}`} {...rest}>
    {children}
  </p>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;

export default Card;
