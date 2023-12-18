import React from 'react';
import { FormControlProps, PartialTextInputProps } from '../defs';
import classNames from 'classnames';
import { FormControl } from '../utils/FormControl';
import { removeUndefinedProps } from '../helpers';

export const TextInput: React.FC<PartialTextInputProps> = ({ label, name, kind, _size, noBorder, value, ...rest }) => {
  const {
    onBlur,
    onFocus,
    onInput,
    onChange,
    disabled,
    className,
    id,
    defaultValue,
    type = 'text',
    placeholder,
    errors,
  } = rest;

  const inputProps = {
    ...removeUndefinedProps({ type, name, defaultValue, placeholder, disabled, onBlur, onFocus, onInput, onChange }),
  };
  const formControlProps = {
    ...(removeUndefinedProps({ name, value, className, id, disabled, errors }) as FormControlProps),
  };

  const inputClasses = classNames('form-control__input', {
    [`input--${kind}`]: kind,
    [`input--${_size}`]: _size,
    ['input--no-border']: noBorder,
  });

  return (
    <FormControl {...formControlProps}>
      {label && <span className="form-control__label">{label}</span>}
      <input className={inputClasses} {...inputProps} />
    </FormControl>
  );
};

/* 
    <TextInput
        label="Email"
        name="email"
        _size="large"
        kind="success"
        value={form.email}
        onChange={handleEmailChange}
    />
*/
