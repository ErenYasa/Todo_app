import { useLazyLogoutQuery } from '@/services/auth';
import { useAppSelector } from '@/store/hooks';
import { IUser } from '@/types/global';

export function Header() {
  /* STATES & VARIABLES */
  const { firstName, lastName } = useAppSelector((state) => state.Auth.user as IUser);
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
      My Todos - {firstName} {lastName}
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
