import { useUpdateTodoMutation } from '@/services/todo';
import * as Button from '../../Button/index';
import { useAppSelector } from '@/store/hooks';
import { ChangeEvent, useState } from 'react';
import { formatDate } from '@/helpers';

export function EditModal(props: any) {
  /* Variables */
  const Modal = useAppSelector((state) => state.Modal.modalData.editTodo);
  /*  */

  /* States */
  const [titleVal, setTitleVal] = useState<string>(Modal.title);
  const [descVal, setDescVal] = useState<string>(Modal.desc);
  const [todoUpdated, setTodoUpdated] = useState(false);
  /*  */

  /* Queries */
  const [updateTodo] = useUpdateTodoMutation();
  /*  */

  /* Events & Functions */
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleVal(e.target.value);
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescVal(e.target.value);
  };

  const handleSaveClick = () => {
    updateTodo({
      _id: Modal._id,
      body: {
        title: titleVal,
        desc: descVal,
      },
    }).then(() => {
      setTodoUpdated(false);
      props.toggle();
    });
  };

  const checkSaveBtnDisabled = (): boolean => {
    if (!titleVal.trim() || !descVal.trim()) return true;
    if (todoUpdated) return true;

    return false;
  };
  /*  */

  return (
    <>
      <label className="edit-todo__label">
        <input
          type="text"
          className="edit-todo__label__title"
          placeholder="Title"
          value={titleVal}
          onChange={(e) => handleTitleChange(e)}
        />
      </label>
      <label className="edit-todo__label">
        <textarea
          className="edit-todo__label__desc"
          placeholder="Description"
          value={descVal}
          onChange={(e) => handleDescChange(e)}
        />
      </label>
      <div className="edit-todo__bottom">
        <div className="edit-todo__date-container">
          <span className="edit-todo__date">Created: {formatDate(Modal.createdAt)}</span>
          <span className="edit-todo__date">Updated: {formatDate(Modal.updatedAt)}</span>
        </div>
        <Button.Default
          type="button"
          className="edit-todo__save__btn"
          disabled={checkSaveBtnDisabled()}
          onClick={handleSaveClick}>
          Kaydet
        </Button.Default>
      </div>
    </>
  );
}
