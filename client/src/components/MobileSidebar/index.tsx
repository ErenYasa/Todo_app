import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useLazyLogoutQuery } from '@/services/auth';
import { MobileSidebarProps } from './defs';
import { AddIcon as CreateIcon, CloseIcon, LogoutIcon, SettingsIcon } from '@/icons';
import { SIDEBAR_ITEMS } from '@/constant/sidebarItems';
import AppLogo from '../AppLogo';
import DropdownList from '../DropdownList';
import { WorkspaceOptionsDropdown } from '../WorkspaceOptionsDropdown';
import { ModalNames } from '@/types/global';
import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/slices/modal.slice';

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  /* HOOKS */
  const dispatch = useAppDispatch();
  /*  */

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

  const handleOpenCreateWorkspaceClick = () => {
    console.log('first');
    dispatch(openModal({ name: ModalNames.CREATE_WORKSPACE }));
  };
  /*  */

  return createPortal(
    <div className={classes}>
      <div className="mobile-sidebar__backdrop" onClick={onClose}></div>
      <aside className="mobile-sidebar__menu">
        <div className="mobile-sidebar__menu__container">
          <div className="mobile-sidebar__header">
            <AppLogo textVisible="mobile" />
          </div>
          <div className="mobile-sidebar__body">
            {SIDEBAR_ITEMS.map((item) => (
              <Fragment key={item.id}>
                {item.href && (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => classNames('sidebar__btn', { ['sidebar__btn--active']: isActive })}>
                    <i>{item.icon}</i>
                    <p className="sidebar__btn__text">{item.text}</p>
                  </NavLink>
                )}
                {/* {item.children && ()}
              {!item.children && !item.href && ()} */}
              </Fragment>
            ))}
            <DropdownList
              title="Workspaces"
              className="dropdown-list--sidebar"
              alwaysOpen
              extendDropdownHeader={
                <button
                  type="button"
                  className="dropdown-list--sidebar__create-btn"
                  title="Create a workspace"
                  onClick={handleOpenCreateWorkspaceClick}>
                  <CreateIcon width="16" height="16" />
                </button>
              }>
              <div className="dropdown-list--sidebar__frame">
                <NavLink
                  to="#"
                  type="button"
                  className="dropdown-list--sidebar__item"
                  title="Workspace"
                  style={{ '--btn-color': '#000' } as React.CSSProperties}>
                  <div className="sidebar__item__content">
                    <span className="sidebar__item__label"></span>
                    <p className="sidebar__item__text">Workspace 1</p>
                  </div>
                  <WorkspaceOptionsDropdown />
                </NavLink>
                <NavLink
                  to="#"
                  type="button"
                  className="dropdown-list--sidebar__item"
                  title="Workspace"
                  style={{ '--btn-color': '#000' } as React.CSSProperties}>
                  <div className="sidebar__item__content">
                    <span className="sidebar__item__label"></span>
                    <p className="sidebar__item__text">Workspace 1</p>
                  </div>
                  <WorkspaceOptionsDropdown />
                </NavLink>
                <NavLink
                  to="#"
                  type="button"
                  className="dropdown-list--sidebar__item"
                  title="Workspace"
                  style={{ '--btn-color': '#000' } as React.CSSProperties}>
                  <div className="sidebar__item__content">
                    <span className="sidebar__item__label"></span>
                    <p className="sidebar__item__text">Workspace 1</p>
                  </div>
                  <WorkspaceOptionsDropdown />
                </NavLink>
              </div>
            </DropdownList>
          </div>
          <div className="mobile-sidebar__footer">
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
