import classNames from 'classnames';
import { DropdownListProps } from './defs';
import { ChevronDownIcon } from '@/icons';

export default function DropdownList({
  children,
  className,
  title,
  alwaysOpen,
  extendDropdownHeader,
}: DropdownListProps) {
  /* STATES */

  /*  */

  /* EFFECTS & EVENTS */

  /*  */

  /* MISC */
  const classes = classNames('dropdown-list', className, {});
  /*  */

  return (
    <details className={classes} open={alwaysOpen}>
      <summary className="dropdown-list__header">
        <div className="dropdown-list__header__content">
          <ChevronDownIcon width="12" height="12" />
          <p className="dropdown-list__title">{title}</p>
        </div>
        {extendDropdownHeader}
      </summary>
      <div className="dropdown-list__body">{children}</div>
    </details>
  );
}
