import { IButtonProps } from './interfaces/buttons.interface';
import classNames from 'classnames';

export function Default({ children, loading, ...rest }: IButtonProps) {
  const classes = classNames('btn', rest.className, { loading });

  return (
    <button {...rest} className={classes}>
      {loading ? <span>loading</span> : children}
    </button>
  );
}

export function DefaultOutline({ children, loading, ...rest }: IButtonProps) {
  const classes = classNames('btn btn--outline', rest.className, { loading });

  return (
    <button {...rest} className={classes}>
      {loading ? <span>loading</span> : children}
    </button>
  );
}

export function Soft({ children, loading, ...rest }: IButtonProps) {
  const classes = classNames('btn-soft', rest.className, { loading });

  return (
    <button {...rest} className={classes}>
      {loading ? <span>loading</span> : children}
    </button>
  );
}
