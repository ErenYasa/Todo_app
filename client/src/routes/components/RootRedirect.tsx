import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const RootRedirect = (): ReactNode => {
  // const isLoggedIn = useSelector((state: RootState) => state.Auth.isLoggedIn);
  const isLoggedIn = true;
  return <Navigate to={isLoggedIn ? '/dashboard' : '/login'} />;
};
export default RootRedirect;
