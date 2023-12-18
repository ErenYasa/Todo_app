import { object, string, ref } from 'yup';

/**
 * LOGIN SCHEMA
 */
export const loginInitialValues = {
  email: '',
  password: '',
};

export const loginSchema = object({
  email: string().email('Invalid email address').required('Field is required'),
  password: string().required('Field is required'),
});
/*  */

/**
 * REGISTER SCHEMA
 */
export const registerInitialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

export const registerSchema = object({
  email: string().email('Invalid email address').required('Field is required'),
  firstName: string().required('Field is required'),
  lastName: string().required('Field is required'),
  password: string().required('Field is required'),
  confirmPassword: string()
    .oneOf([ref('password'), undefined], 'Passwords must match')
    .required('Field is required'),
});
/*  */
