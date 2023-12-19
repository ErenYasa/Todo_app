import { MainLogo } from '@/icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppLogoProps } from './defs';

export default function AppLogo({ textVisible }: AppLogoProps) {
  const classes = classNames('logo-container__text', {
    [`logo-container__text--${textVisible}-visible`]: textVisible,
  });

  return (
    <Link to="/" className="logo-container">
      <MainLogo />
      <p className={classes}>ticklist</p>
    </Link>
  );
}
