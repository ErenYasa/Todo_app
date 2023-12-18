import { Fragment } from 'react';
import { useFormik } from 'formik';
import { loginInitialValues, loginSchema } from '@/schemas/auth';
import { useLoginMutation } from '@/services/auth';
import { PageSwitcher } from '../components/PageSwitcher';
import { TextInput } from '@/components/Form/Elements/TextInput';
import { Button } from '@/components/Button';
import { LinkButton } from '@/components/LinkButton';

export default function LoginPage() {
  /* Queries */
  const [login] = useLoginMutation();
  /*  */

  /* Effects & Events */
  const { handleSubmit, handleChange, errors, isSubmitting } = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ email, password }) => {
      login({ email, password });
    },
  });
  /*  */

  return (
    <Fragment>
      <PageSwitcher />
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextInput
          label="Email*"
          name="email"
          placeholder="example@ticklist.com"
          errors={errors?.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          label="Password*"
          name="password"
          placeholder="******"
          errors={errors?.password}
          onChange={handleChange}
        />
        <LinkButton to="/forgot-password" className="auth-form__forgot-pass-btn">
          Forgot password?
        </LinkButton>
        <Button type="submit" kind="primary" size="large" fullWidth disabled={isSubmitting}>
          {!isSubmitting ? 'Log in' : '...Loading'}
        </Button>
      </form>
    </Fragment>
  );
}
