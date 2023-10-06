import { useGetTodosQuery } from '@/services/todo';
import { Todo } from '../Todo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { setLocalLoader } from '@/store/slices/app.slice';

export function TodoList() {
  /* Hooks */
  const { filterStatus, searchQuery } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  /*  */

  /* Queires */
  const { data: allTodo, isFetching } = useGetTodosQuery({ q: searchQuery, status: filterStatus });
  /*  */

  /* useEffects */
  useEffect(() => {
    dispatch(setLocalLoader(isFetching));
  }, [isFetching]);
  /*  */

  /* const [scrollPosition, setScrollPosition] = useState<number>();
  const todoListContainerRef = useRef<HTMLDivElement>(null);
  const todoListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    todoListContainerRef.current?.addEventListener('scroll', (e: Event) => {
      const listHeight = todoListRef.current?.clientHeight;
      const scrollPosition = e.target as HTMLElement;

      setScrollPosition(Math.floor((scrollPosition.scrollTop / (listHeight! - scrollPosition.clientHeight)) * 100));
    });
  }, []); */

  return (
    <div className="todo-list-container">
      <ul className="todo-list">{allTodo?.map((todo, i) => <Todo data={todo} key={i} />).reverse()}</ul>
      {/* {scrollPosition! > 50 && <p>scrolll</p>} */}
    </div>
  );
}
