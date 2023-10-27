import { useAppSelector } from '@/store/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const RootRedirect = (): ReactNode => {
  const isLoggedIn = useAppSelector((state) => state.Auth.isLoggedIn);

  return <Navigate to={isLoggedIn ? '/dashboard' : '/login'} />;
};
export default RootRedirect;
