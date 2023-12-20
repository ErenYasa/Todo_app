import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyLogoutQuery } from '@/services/auth';
import { useOnClickOutside, useReadLocalStorage } from 'usehooks-ts';
import { IUser } from '@/types/global';

export function UserDropdown() {
  /* States & Variabels */
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = useReadLocalStorage(`${process.env.APP_NAME}_user`) as IUser;
  /*  */

  /* Refs */
  const userDropdownRef = useRef(null);
  /*  */

  /* Queries */
  const [logout] = useLazyLogoutQuery();
  /*  */

  /* Effects & Events */
  const handleDropdownClick = () => {
    setOpenDropdown(!openDropdown);
  };
  useOnClickOutside(userDropdownRef, () => setOpenDropdown(false));

  const handleLogout = () => {
    logout('');
  };
  /*  */

  return (
    <div className="user-dropdown" ref={userDropdownRef}>
      <button type="button" className="user-dropdown__btn" onClick={handleDropdownClick}>
        {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
      </button>
      {openDropdown && (
        <div className="user-dropdown__dropdown">
          <Link to="/" className="user-dropdown__dropdown__btn">
            Settings
          </Link>
          <button type="button" className="user-dropdown__dropdown__btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
