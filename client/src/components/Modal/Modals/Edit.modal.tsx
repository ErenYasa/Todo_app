import * as Button from '../../Button/index';

export function EditModal() {
  return (
    <>
      <label className="edit-todo__label">
        <input type="text" className="edit-todo__label__title" placeholder="Title" />
      </label>
      <label className="edit-todo__label">
        <textarea className="edit-todo__label__desc" placeholder="Description"></textarea>
      </label>
      <Button.Default type="button" className="edit-todo__save__btn">
        Kaydet
      </Button.Default>
    </>
  );
}
