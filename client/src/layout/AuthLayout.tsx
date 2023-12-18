import { Header } from '@/components/Header';
import classNames from 'classnames';
import { Fragment, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  customClass?: string;
};

export function AuthLayout({ children, customClass }: Props) {
  const childrenClasses = classNames('auth__container', {
    customClass,
  });
  return (
    <Fragment>
      <Header />
      <div className="auth">
        <div className={childrenClasses}>
          <div className="auth__container__content">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
