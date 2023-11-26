import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DotsLoader } from '@/components/Loader';

export default function Dashboard() {
  return (
    <main className="main">
      {/* <MainHeader />
      <MainBody /> */}
      <Suspense fallback={<DotsLoader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
