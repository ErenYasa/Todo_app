import { useLazyLogoutQuery } from '@/services/auth';

export function Header() {
  /* Queries */
  const [logout] = useLazyLogoutQuery();
  /*  */

  /* Effects & Events */
  const handleLogout = () => {
    logout('');
  };
  /*  */

  return (
    <header className="header">
      My Todos
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
