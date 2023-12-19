import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { LinkButtonProps } from './defs';

export function LinkButton({ to, children, className, ...rest }: LinkButtonProps) {
  const classes = classNames('link', className);
  return (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  );
}
