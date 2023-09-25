import { useAppDispatch } from '@store/hooks';
import { openModal } from '@store/slices/modal.slice';
import * as Icon from '@components/Icons';
import { ChangeEvent } from 'react';

export function Todo() {
  const dispatch = useAppDispatch();

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target?.checked);
  };

  const handleEditClick = () => {
    dispatch(openModal({ name: ModalNames.EDIT_TODO, data: 'TEST' }));
  };

  const handleDeleteClick = () => {
    dispatch(openModal({ name: ModalNames.CONFIRM }));
  };

  return (
    <>
      <li className="todo-list__item">
        <label className="todo-list__item__container">
          <input type="checkbox" className="todo-list__item__checkbox" onChange={(e) => handleTodoChange(e)} hidden />
          <span className="todo-list__item__checkbox__checkmark"></span>
          <span className="todo-list__item__checkbox__background"></span>
          <div className="todo-list__item__body">
            <div className="body__content">
              <p className="body__content__title">Todo item</p>
              <p className="body__content__time">13.12.23 - 15.00</p>
            </div>
            <div className="todo__buttons">
              <button type="button" className="todo__buttons__btn todo__buttons__btn--edit" onClick={handleEditClick}>
                <Icon.Edit width="15" height="15" color="#42526e" />
              </button>
              <button
                type="button"
                className="todo__buttons__btn todo__buttons__btn--delete"
                onClick={handleDeleteClick}>
                <Icon.Delete width="15" height="15" color="#ff5a5f" />
              </button>
            </div>
          </div>
        </label>
      </li>
    </>
  );
}
