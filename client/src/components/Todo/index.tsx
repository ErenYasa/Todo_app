import { useState } from 'react';
import * as Icon from '../Icons';
import { Modal } from '../Modal';
import ConfirmModal from '../Modal/Modals/Confirm.modal';
import { EditModal } from '../Modal/Modals/Edit.modal';

export function Todo() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);

  const toggleEditModal = (): void => setOpenEditModal(!openEditModal);

  const handleEditClick = () => {
    setOpenEditModal(!openEditModal);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  return (
    <>
      <li className="todo-list__item">
        <label className="todo-list__item__container">
          <input type="checkbox" className="todo-list__item__checkbox" />
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
      <Modal type="confirm" isOpen={openDeleteModal} toggle={toggleDeleteModal}>
        <ConfirmModal />
      </Modal>
      <Modal className="modal--edit-todo" isOpen={openEditModal} toggle={toggleEditModal}>
        <EditModal />
      </Modal>
    </>
  );
}
