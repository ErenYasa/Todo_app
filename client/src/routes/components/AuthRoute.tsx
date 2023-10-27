import React, { ReactElement, Suspense } from 'react';
import { AuthLayout } from '@/layout/AuthLayout';
import { Navigate } from 'react-router-dom';
import { DotsLoader } from '@/components/Loader';
import { useAppSelector } from '@/store/hooks';

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }): ReactElement => {
  const isLoggedIn = useAppSelector((state) => state.Auth.isLoggedIn);

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <React.Fragment>
      <AuthLayout>{<Suspense fallback={<DotsLoader />}>{children}</Suspense>}</AuthLayout>
    </React.Fragment>
  );
};

export default AuthRoute;
