import { Suspense, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setMobileView } from '@store/slices/app.slice';
import { Routes } from './routes';
import { DotsLoader } from './components/Loader';

function App() {
  const dispatch = useAppDispatch();
  const { appLoader } = useAppSelector((state) => state.App);

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) dispatch(setMobileView(true));
      else dispatch(setMobileView(false));
    });

    return () => {
      window.addEventListener('resize', () => {
        if (window.innerWidth < 768) dispatch(setMobileView(true));
        else dispatch(setMobileView(false));
      });
    };
  }, []);

  return appLoader ? (
    // <PageLoader className="first-initialize" />
    'Loading'
  ) : (
    <Suspense fallback={<DotsLoader />}>
      <Routes />
    </Suspense>
  );
}

export default App;
