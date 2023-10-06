import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterStatus } from '@/store/slices/app.slice';
import { FilterStatus } from '@/types/global';
import classNames from 'classnames';
import * as Button from '../Button';

export function StatusFilterBar() {
  /* Hooks */
  const { todoCount, filterStatus } = useAppSelector((state) => state.App);
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

  /* Events & Functions */
  const handleStatusClick = (status: FilterStatus) => {
    if (status === filterStatus) return;
    dispatch(setFilterStatus(status));
  };

  const displayTodosCount = (): string => {
    if (todoCount === 0) return 'There is no todo';

    return `<p>${todoCount} todos</p> <p>${String.fromCodePoint(0x1f60e)}</p>`;
  };
  /*  */

  return (
    <div className="todo-list-status">
      <div className="todo-list-status__todos-count" dangerouslySetInnerHTML={{ __html: displayTodosCount() }}></div>
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
