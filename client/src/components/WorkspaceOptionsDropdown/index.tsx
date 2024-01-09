import { MouseEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from 'usehooks-ts';
import classNames from 'classnames';
import { MoreIcon } from '@/icons';

export function WorkspaceOptionsDropdown() {
  /* States & Variabels */
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  /*  */

  /* Refs */
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const userDropdownRef = useRef(null);
  /*  */

  /* Effects & Events */
  const handleDropdownClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (dropdownTriggerRef.current) {
      const triggerPosition = dropdownTriggerRef.current.getBoundingClientRect();
      setDropdownPosition({ x: triggerPosition.x, y: triggerPosition.y + triggerPosition.height });
    }

    setOpenDropdown(!openDropdown);
  };
  useOnClickOutside(userDropdownRef, () => setOpenDropdown(false));
  /*  */

  /* Utils */
  const classes = classNames('workspace-options-dropdown', {
    ['workspace-options-dropdown--dropdown-open']: openDropdown,
  });
  /*  */

  return (
    <div className={classes} ref={userDropdownRef}>
      <button
        type="button"
        className="workspace-options-dropdown__btn"
        title="Options"
        onClick={handleDropdownClick}
        ref={dropdownTriggerRef}>
        <MoreIcon width="18" height="18" />
      </button>
      {openDropdown &&
        createPortal(
          <div
            className="workspace-options-dropdown__dropdown"
            style={{ top: dropdownPosition.y, left: dropdownPosition.x }}>
            <button type="button" className="user-dropdown__dropdown__btn">
              {/* <LogoutIcon width="15" height="15" /> */}
              <p className="dropdown__btn__text">Logout</p>
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
