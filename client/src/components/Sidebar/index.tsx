import { Fragment } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AddIcon as CreateIcon, CollapseIcon } from '@/icons';
import DropdownList from '../DropdownList';
import { SIDEBAR_ITEMS } from '@/constant/sidebarItems';
import { WorkspaceOptionsDropdown } from '../WorkspaceOptionsDropdown';
import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/slices/modal.slice';
import { ModalNames } from '@/types/global';

export function Sidebar() {
  /* STATES & VARIABLES */
  const dispatch = useAppDispatch();
  const [isCollapseSidebar, setSidebarCollapse] = useLocalStorage('isSidebarCollapse', false);
  /*  */

  /* EFFECT & EVENTS */
  const handleToggleSidebar = (whoIsTrigger: string) => {
    switch (true) {
      case isCollapseSidebar && whoIsTrigger === 'container':
        setSidebarCollapse(false);
        break;
      case whoIsTrigger === 'toggleBtn':
        setSidebarCollapse((prevValue: boolean) => !prevValue);
        break;
    }
  };

  const handleOpenCreateWorkspaceClick = () => {
    dispatch(openModal({ name: ModalNames.CREATE_WORKSPACE }));
  };
  /*  */

  /* MISC */
  const classes = classNames('sidebar', {
    'sidebar--collapse': isCollapseSidebar,
  });
  /*  */

  return (
    <aside className={classes}>
      <div className="sidebar__container" onClick={() => handleToggleSidebar('container')}>
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
      <button type="button" className="sidebar__toggle-btn" onClick={() => handleToggleSidebar('toggleBtn')}>
        <CollapseIcon className="toggle-btn__icon" width="16" height="16" />
      </button>
    </aside>
  );
}
