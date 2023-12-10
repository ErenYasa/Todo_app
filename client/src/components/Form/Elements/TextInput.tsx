import React from 'react';
import { TextInputProps } from '../defs';
import classNames from 'classnames';
import { FormControl } from '../utils/FormControl';

export const TextInput: React.FC<TextInputProps> = ({ label, name, kind, _size, noBorder, value, ...rest }) => {
  const { onBlur, onFocus, onInput, onChange, disabled, className, id, defaultValue, type } = rest;

  const classes = classNames('form-control__input', {
    [`input--${kind}`]: kind,
    [`input--${_size}`]: _size,
    ["input--no-border"]: noBorder
  });

  return (
    <FormControl className={className} name={name} disabled={disabled}>
      {label && <span className="form-control__label">{label}</span>}
      <input
        type={type || 'text'}
        className={classes}
        name={name}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </FormControl>
  );
};
