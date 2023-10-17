import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  customClass?: string;
};

export function AuthLayout({ children, customClass }: Props) {
  const childrenClasses = classNames({
    customClass,
  });
  return <div className={childrenClasses}>{children}</div>;
}
