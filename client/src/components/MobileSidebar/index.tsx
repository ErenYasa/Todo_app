import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MobileSidebarProps } from './defs';
import { CloseIcon, LogoutIcon, SettingsIcon } from '@/icons';
import { useLazyLogoutQuery } from '@/services/auth';

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  /* UTILS */
  const classes = classNames('mobile-sidebar', {
    ['mobile-sidebar--open']: open,
  });
  /*  */

  /* Queries */
  const [logout] = useLazyLogoutQuery();
  /*  */

  /* Effects & Events */
  const handleLogout = () => {
    logout('');
  };
  /*  */

  return createPortal(
    <div className={classes}>
      <div className="mobile-sidebar__backdrop" onClick={onClose}></div>
      <aside className="mobile-sidebar__menu">
        <div className="mobile-sidebar__menu__container">
          <div className="menu__container__footer">
            <Link to="/" className="mobile-sidebar__footer__btn">
              <SettingsIcon width="24" height="24" />
              <p className="footer__btn__title">Settings</p>
            </Link>
            <button
              type="button"
              className="mobile-sidebar__footer__btn mobile-sidebar__footer__btn--close-btn"
              onClick={handleLogout}>
              <LogoutIcon width="24" height="24" color="var(--c-danger)" />
              <p className="footer__btn__title">Logout</p>
            </button>
            <button type="button" className="mobile-sidebar__footer__btn" onClick={onClose}>
              <CloseIcon width="24" height="24" />
              <p className="footer__btn__title">Close</p>
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
