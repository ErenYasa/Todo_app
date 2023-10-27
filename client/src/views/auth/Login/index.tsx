import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useLoginMutation } from '@/services/auth';

export default function LoginPage() {
  /* States */
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  /*  */

  /* Queries */
  const [login] = useLoginMutation();
  /*  */

  /* Effects & Events */
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email: form.email, password: form.password });
  };
  /*  */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={form.email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={form.password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={'/register'}>go register</Link>
    </div>
  );
}
