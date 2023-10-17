import React, { ReactElement, Suspense } from 'react';
import { AuthLayout } from '@/layout/AuthLayout';
import { Navigate } from 'react-router-dom';
import { DotsLoader } from '@/components/Loader';

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }): ReactElement => {
  // const isLoggedIn = useSelector((state: RootState) => state.Auth.isLoggedIn);
  const isLoggedIn = false;
  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <React.Fragment>
      <AuthLayout>{<Suspense fallback={<DotsLoader />}>{children}</Suspense>}</AuthLayout>
    </React.Fragment>
  );
};

export default AuthRoute;
