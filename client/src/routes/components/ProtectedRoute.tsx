import { DotsLoader } from '@/components/Loader';
import { PanelLayout } from '@/layout/PanelLayout';
import { useAppSelector } from '@/store/hooks';
import React, { ReactElement, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }): ReactElement => {
  const isLoggedIn = useAppSelector((state) => state.Auth.isLoggedIn);

  return isLoggedIn ? (
    <PanelLayout>
      <Suspense fallback={<DotsLoader />}>{children}</Suspense>
    </PanelLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
