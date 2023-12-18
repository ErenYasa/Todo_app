import { Fragment } from 'react';
import { FormControlErrorProps } from '../defs';
import { InfoIcon } from '@/icons';

export function FormControlError({ errors }: FormControlErrorProps) {
  if (!errors) return <Fragment></Fragment>;

  return (
    <div className="form-control__error">
      <InfoIcon className='form-control__error__icon' width='1.4rem' height='1.4rem' /> {errors}
    </div>
  );
}
