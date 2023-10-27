import { useRegisterMutation } from '@/services/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  /* States */
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  /*  */

  /* Hooks */
  const [register] = useRegisterMutation();
  /*  */

  /* Events & Functions */
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: event.target.value });
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, firstName: event.target.value });
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, lastName: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, confirmPassword: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    register({ email: form.email, firstName: form.firstName, lastName: form.lastName, password: form.password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={form.email} onChange={handleEmailChange} />
      </label>
      <label>
        First Name:
        <input type="text" value={form.firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last Name:
        <input type="text" value={form.lastName} onChange={handleLastNameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={form.password} onChange={handlePasswordChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={form.confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
