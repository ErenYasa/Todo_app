import { useLayoutEffect } from 'react';
import { Root } from './layout/Root';
import { useAppDispatch } from '@store/hooks';
import { setMobileView } from '@store/slices/app.slice';

function App() {
  const dispatch = useAppDispatch();

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

  return <Root />;
}

export default App;
