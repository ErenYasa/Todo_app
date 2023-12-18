import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export function PageSwitcher() {
  const urlArr = [
    {
      url: '/login',
      text: 'Log in',
    },
    {
      url: '/register',
      text: 'Sign up',
    },
  ];

  return (
    <div className="auth__page-switches">
      {urlArr.map(({ url, text }, index) => {
        return (
          <NavLink
            key={index}
            to={url}
            className={({ isActive }) =>
              classNames('btn btn--default btn--large auth__page-switches__switcher', {
                ['switcher--active']: isActive,
              })
            }>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
