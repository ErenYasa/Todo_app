import { useAppSelector } from '@store/hooks';
import { MainBody } from '../MainBody';
import { MainHeader } from '../MainHeader';
import { useEffect } from 'react';
import { useLazyGetTodoQuery } from '@store/api/api.slice';

export default function Main() {
  const mobileView = useAppSelector((state) => state.App.mobileView);
  // console.log(mobileView);

  const [getTodo, { data, isLoading }] = useLazyGetTodoQuery({});

  useEffect(() => {
    getTodo('65074524efcf7cdf8fc16f2c');
  }, []);

  // useEffect(() => {
  //   if (data) console.log(data);
  // }, [data]);

  return (
    <main className="main">
      <MainHeader />
      <MainBody />
    </main>
  );
}
