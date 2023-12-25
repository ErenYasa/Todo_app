import { ButtonProps } from './interfaces/buttons.interface';
import classNames from 'classnames';

export function Button({ children, className, variant, kind, size, fullWidth, loading, ...rest }: ButtonProps) {
  const variantHandler = `btn--${variant || 'default'}`;
  const kindHandler = `btn--${kind || 'primary'}`;
  const sizeHandler = size ? `btn--${size}` : '';
  const fullWidthHandler = fullWidth ? 'btn--full-width' : '';

  const classes = classNames('btn', variantHandler, kindHandler, sizeHandler, fullWidthHandler, className, {
    loading,
  });

  return (
    <button {...rest} className={classes}>
      {loading ? <span>loading</span> : children}
    </button>
  );
}
