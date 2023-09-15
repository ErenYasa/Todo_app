import { Todo } from '../Todo';

export function TodoList() {
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
      <ul className="todo-list">
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </ul>
      {/* {scrollPosition! > 50 && <p>scrolll</p>} */}
    </div>
  );
}
