import { useReadLocalStorage } from 'usehooks-ts';
import { useLazyLogoutQuery } from '@/services/auth';
import { IUser } from '@/types/global';
import { Link } from 'react-router-dom';
import AppLogo from '../AppLogo';

export function Header() {
  /* STATES & VARIABLES */
  /*  */

  /* HOOKS */
  const userInfo = useReadLocalStorage(`${process.env.APP_NAME}_user`) as IUser;
  /*  */

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
      <div className="header__container">
        <AppLogo textVisible="desktop" />
        {/* <Link to="/">My Todos</Link> - {userInfo.firstName} {userInfo.lastName} */}
        <div>
          {/* {userInfo.workspaces.map((space) => (
          <Link key={space.id} to={`work-space/${space.id}`}>
            {space.name}
          </Link>
        ))} */}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
