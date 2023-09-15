import * as Button from "../Button";

export function AddTodoBar() {
  return (
    <label className="add-todo-bar">
      <input type="text" name="" className="add-todo-bar__input" placeholder="Add a todo" />
      <Button.Default type="button" className='add-todo-bar__btn' >
        add
      </Button.Default>
    </label>
  );
}
