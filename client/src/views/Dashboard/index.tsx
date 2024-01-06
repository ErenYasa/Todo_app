import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DotsLoader } from '@/components/Loader';
import { Sidebar } from '@/components/Sidebar';
import { useMediaQuery } from 'usehooks-ts';
import { MediaBreakpoints } from '@/types/global';

export default function Dashboard() {
  /* Hooks */
  const isTablet = useMediaQuery(`(min-width: ${MediaBreakpoints.SM})`);
  /*  */

  return (
    <>
      {isTablet && <Sidebar />}
      <main className="main">
        {/* <MainBody /> */}
        <Suspense fallback={<DotsLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
