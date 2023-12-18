import { Fragment } from 'react';
import { useFormik } from 'formik';
import { registerInitialValues, registerSchema } from '@/schemas/auth';
import { useRegisterMutation } from '@/services/auth';
import { PageSwitcher } from '../components/PageSwitcher';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form/Elements/TextInput';

export default function RegisterPage() {
  /* Queries */
  const [register] = useRegisterMutation();
  /*  */

  /* Events & Functions */
  const { handleSubmit, handleChange, errors, isSubmitting } = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ email, firstName, lastName, password }) => {
      register({
        email,
        firstName,
        lastName,
        password,
      });
    },
  });

  return (
    <Fragment>
      <PageSwitcher />
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <TextInput
            label="First Name*"
            name="name"
            placeholder="John"
            errors={errors.firstName}
            onChange={handleChange}
          />
          <TextInput
            label="Last Name:*"
            name="surname"
            placeholder="Doe"
            errors={errors.lastName}
            onChange={handleChange}
          />
        </div>
        <TextInput
          label="Email*"
          name="email"
          placeholder="example@ticklist.com"
          errors={errors.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          label="Password:*"
          name="password"
          placeholder="******"
          errors={errors.password}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          label="Confirm Password:*"
          name="confirmPassword"
          placeholder="******"
          errors={errors.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" kind="primary" size="large" fullWidth disabled={isSubmitting}>
          {!isSubmitting ? 'Register' : 'Loading'}
        </Button>
      </form>
    </Fragment>
  );
}
