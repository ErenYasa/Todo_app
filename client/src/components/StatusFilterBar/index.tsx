import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterStatus } from '@/store/slices/app.slice';
import { FilterStatus } from '@/types/global';
import classNames from 'classnames';
import * as Button from '../Button';
import { useGetTodosQuery } from '@/services/todo';

export function StatusFilterBar() {
  /* Hooks */
  const { filterStatus, searchQuery } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  /*  */

  /* Variables */
  const STATUS_BTNS = [
    {
      text: 'all',
      status: FilterStatus.ALL,
    },
    {
      text: 'completed',
      status: FilterStatus.COMPLETED,
    },
    {
      text: 'incomplete',
      status: FilterStatus.INCOMPLETE,
    },
  ];
  /*  */

  /* Queires */
  const { data: allTodo } = useGetTodosQuery({ q: searchQuery, status: filterStatus });
  /*  */

  /* Events & Functions */
  const handleStatusClick = (status: FilterStatus) => {
    if (status === filterStatus) return;
    dispatch(setFilterStatus(status));
  };
  /*  */

  return (
    <div className="todo-list-status">
      <div className="todo-list-status__todos-count">
        {allTodo?.length === 0 ? (
          'There is no todo'
        ) : (
          <div>
            <p>{allTodo?.length} todos</p> <p>{String.fromCodePoint(0x1f60e)}</p>
          </div>
        )}
      </div>
      <div className="todo-list-status__filters">
        {STATUS_BTNS.map((btn, i) => {
          const classes = classNames({
            active: btn.status === filterStatus,
          });

          return (
            <Button.Soft type="button" className={classes} onClick={() => handleStatusClick(btn.status)} key={i}>
              {btn.text}
            </Button.Soft>
          );
        })}
      </div>
    </div>
  );
}
