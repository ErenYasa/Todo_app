import { useReadLocalStorage } from 'usehooks-ts';
import classNames from 'classnames';
import { IUser } from '@/types/global';
import AppLogo from '../AppLogo';
import { HeaderProps } from './defs';
import { Fragment } from 'react';
import { SearchBar } from '../SearchBar';
import { AddIcon } from '@/icons';
import { UserDropdown } from '../UserDropdown';
import { Button } from '../Button';

export function Header({ fullWidth }: HeaderProps) {
  /* STATES & VARIABLES */
  /*  */

  /* HOOKS */
  const userInfo = useReadLocalStorage(`${process.env.APP_NAME}_user`) as IUser;
  /*  */

  /* UTILS */
  const classes = classNames('header', {
    ['header--fullWidth']: fullWidth,
  });
  /*  */

  return (
    <header className={classes}>
      <div className="header__container">
        <AppLogo textVisible="desktop" />
        {userInfo && (
          <Fragment>
            <div className="header__container__middle">
              <SearchBar />
              <Button variant="default" kind="primary" size="small" className='header__create-todo-btn'>
                <AddIcon width="14" height="14" />
                create
              </Button>
            </div>
            <UserDropdown />
          </Fragment>
        )}
      </div>
    </header>
  );
}
