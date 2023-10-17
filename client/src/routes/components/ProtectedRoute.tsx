import { DotsLoader } from '@/components/Loader';
import { PanelLayout } from '@/layout/PanelLayout';
import React, { ReactElement, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }): ReactElement => {
  // if (!partnerInfoStore.id && isLoggedIn) return <PageLoader />;
  const isLoggedIn = true;
  return isLoggedIn ? (
    <PanelLayout>
      <Suspense fallback={<DotsLoader />}>{children}</Suspense>
    </PanelLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
