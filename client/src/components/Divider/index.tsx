import classNames from 'classnames';
import { DividerProps } from './defs';

export function Divider({ text, horizontal }: DividerProps) {
  const classes = classNames('divider', {
    ['divider--horizontal']: horizontal,
  });
  return <div className={classes}>{text}</div>;
}
