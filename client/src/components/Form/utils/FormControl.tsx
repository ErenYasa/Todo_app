import React from 'react';
import classNames from 'classnames';
import { FormControlProps } from '../defs';
import { FormControlError } from './FormControlError';

export const FormControl: React.FC<FormControlProps> = ({ children, className, disabled, errors, name }) => {
  const classes = classNames('form-control', { ['form-control--error']: !!errors, disabled }, className);

  return (
    <div className={classes} key={name}>
      {children}
      {errors && <FormControlError errors={errors} />}
    </div>
  );
};
