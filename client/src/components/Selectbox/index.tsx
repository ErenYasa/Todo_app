import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SelectboxListProps, SelectboxProps, SelectboxItemProps, SelectboxContextProps } from './defs';
import classNames from 'classnames';
import { ChevronDownIcon } from '@/icons';
import { FormControl } from '../Form/utils/FormControl';
import { removeUndefinedProps } from '../Form/helpers';
import { FormControlProps } from '../Form/defs';
import { useOnClickOutside } from 'usehooks-ts';

const SelectboxContext = createContext({});

export function Selectbox({
  children,
  className,
  disabled,
  size,
  kind,
  noBorder,
  variant,
  showItemCount,
  errors,
}: SelectboxProps) {
  /* STATES & VARIABLES */
  const [selectedVal, setSelectedVal] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const formControlProps = {
    ...(removeUndefinedProps({ className, disabled, errors }) as FormControlProps),
  };
  /*  */

  /* REFS */
  const selectboxRef = useRef(null);
  /*  */

  /* HOOKS */
  const value = useMemo(() => ({ selectedVal, setSelectedVal }), [selectedVal]);

  useOnClickOutside(selectboxRef, () => setIsListOpen(false));
  /*  */

  /* EFFECTS & EVENTS */
  useEffect(() => {
    if (value.selectedVal) {
      setIsListOpen(false);
    }
  }, [value.selectedVal]);
  /*  */

  /* MISC */
  const variantHandler = `selectbox--${variant || ''}`;
  const sizeHandler = size ? `selectbox--${size}` : '';
  const kindHandler = kind ? `selectbox--${kind}` : '';

  const classes = classNames('selectbox', className, variantHandler, kindHandler, sizeHandler, {
    'selectbox--open': isListOpen,
    'selectbox--disabled': disabled,
    'selectbox--no-border': noBorder,
  });
  /*  */

  return (
    <SelectboxContext.Provider value={{ className, value, isListOpen, setIsListOpen, showItemCount }}>
      <FormControl {...formControlProps}>
        <div className={classes} ref={selectboxRef}>
          {children}
        </div>
      </FormControl>
    </SelectboxContext.Provider>
  );
}

/**
 * TRIGGER
 */
Selectbox.Trigger = function SelectBoxTrigger() {
  /* HOOKS */
  const { value, isListOpen, setIsListOpen } = useContext(SelectboxContext) as SelectboxContextProps;
  /*  */

  /* EFFECTS & EVENTS */
  const handleTriggerClick = () => {
    setIsListOpen(!isListOpen);
  };
  /*  */

  /* MISC */
  const classes = classNames('selectbox__trigger');
  /*  */

  return (
    <button type="button" className={classes} onClick={handleTriggerClick}>
      <p className="selectbox__trigger__txt">{value.selectedVal || 'Select an option'}</p>
      <ChevronDownIcon width="12" height="12" className="selectbox__trigger__icon" />
    </button>
  );
};
/*  */

/**
 * LIST
 */
Selectbox.List = function SelectBoxList({ children }: SelectboxListProps) {
  /* HOOKS */
  const { isListOpen, showItemCount } = useContext(SelectboxContext) as SelectboxContextProps;
  /*  */

  return isListOpen ? (
    <ul className="selectbox__list" style={{ '--item-count': showItemCount } as React.CSSProperties}>
      {children}
    </ul>
  ) : null;
};
/*  */

/**
 * LIST ITEM
 */
Selectbox.Item = function SelectBoxItem({ children, value: itemValue, disabled }: SelectboxItemProps) {
  /* HOOKS */
  const { value } = useContext(SelectboxContext) as SelectboxContextProps;
  /*  */

  /* EFFECTS & EVENTS */
  const handleSelectClick = () => {
    value.setSelectedVal(itemValue);
  };
  /*  */

  /* MISC */
  const classes = classNames('selectbox__item', {
    'selectbox__item--selected': value.selectedVal === itemValue,
    'selectbox__item--disabled': disabled,
  });
  /*  */

  return (
    <li className={classes} onClick={handleSelectClick}>
      {children}
    </li>
  );
};
/*  */
