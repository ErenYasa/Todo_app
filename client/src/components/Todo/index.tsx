import { useAppDispatch } from '@store/hooks';
import { openModal } from '@store/slices/modal.slice';
import * as Icon from '@components/Icons';
import { ChangeEvent } from 'react';
import { ModalNames } from '@/types/global';
import { ITodoResponse } from '@/services/todo/interfaces/api.interface';
import { formatDate } from '@/helpers';
import { useUpdateTodoMutation } from '@/services/todo';
import classNames from 'classnames';

type Props = {
  data: ITodoResponse;
};

export function Todo({ data }: Props) {
  /* Variables */
  const dispatch = useAppDispatch();
  /*  */

  /* Queries */
  const [updateTodo] = useUpdateTodoMutation({});
  /*  */

  /* Events & Functions */
  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateTodo({ _id: data._id, body: { status: Number(e.target.checked) } });
  };

  const handleEditClick = () => {
    dispatch(openModal({ name: ModalNames.EDIT_TODO, data }));
  };

  const handleDeleteClick = () => {
    dispatch(openModal({ name: ModalNames.CONFIRM, data: data._id }));
  };

  const todoClasses = classNames('todo-list__item', {
    completed: Boolean(data.status),
  });
  /* */

  return (
    <>
      <li className={todoClasses}>
        <label className="todo-list__item__checkbox">
          <input
            type="checkbox"
            className="todo-list__item__input"
            checked={Boolean(data.status)}
            onChange={(e) => handleTodoChange(e)}
            hidden
          />
          <span className="todo-list__item__checkbox__checkmark"></span>
        </label>
        <div className="todo-list__item__body">
          <div className="body__content">
            <p className="body__content__title">{data.title}</p>
            <p className="body__content__time">{formatDate(data.updatedAt)}</p>
          </div>
          <div className="todo__buttons">
            <button type="button" className="todo__buttons__btn todo__buttons__btn--edit" onClick={handleEditClick}>
              <Icon.Edit width="15" height="15" color="#42526e" />
            </button>
            <button type="button" className="todo__buttons__btn todo__buttons__btn--delete" onClick={handleDeleteClick}>
              <Icon.Delete width="15" height="15" color="#ff5a5f" />
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
