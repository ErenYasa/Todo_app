import classNames from 'classnames';
import { StatusFilterBar } from '../StatusFilterBar';
import { TodoList } from '../TodoList';
import { useAppSelector } from '@/store/hooks';

export function TodosContainer() {
  /* Variables */
  const { localLoader } = useAppSelector((state) => state.App);
  /*  */

  /* Events & Functions */
  const listContainerClasses = classNames('todos-container', {
    shimmerLoader: localLoader,
  });
  /*  */

  return (
    <div className={listContainerClasses}>
      <StatusFilterBar />
      <TodoList />
    </div>
  );
}
