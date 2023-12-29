import { createPortal } from 'react-dom';
import { AddIcon, MenuIcon, SearchIcon } from '@/icons';
import { MobileMenuProps } from './defs';

export function MobileMenu({ mobileSidebarToggle }: MobileMenuProps) {
  return createPortal(
    <div className="mobile-menu">
      <button type="button" className="mobile-menu__items">
        <SearchIcon width="24" height="24" />
        <p className="mobile-menu__items__title">Search</p>
      </button>
      <button type="button" className="mobile-menu__items mobile-menu__items--create-todo-btn">
        <AddIcon className="create-todo-btn__icon" />
        <p className="mobile-menu__items__title">Create</p>
      </button>
      <button type="button" className="mobile-menu__items" onClick={mobileSidebarToggle}>
        <MenuIcon />
        <p className="mobile-menu__items__title">Menu</p>
      </button>
    </div>,
    document.body,
  );
}