import { ChangeEvent, useState } from 'react';
import { useCreateTodoMutation } from '@/services/todo';
import * as Button from '../Button';

export function AddTodoBar() {
  /* States */
  const [inputVal, setInputVal] = useState<string>('');
  const [todoCreated, setTodoCreated] = useState<boolean>();
  /*  */

  /* Queries */
  const [createTodo] = useCreateTodoMutation({});
  /*  */

  /* Events */
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    createTodo({ title: inputVal }).then(() => {
      setInputVal('');
      setTodoCreated(false);
    });
  };
  /*  */

  return (
    <label className="add-todo-bar">
      <input
        type="text"
        className="add-todo-bar__input"
        placeholder="Add a todo"
        value={inputVal}
        onChange={(e) => handleInput(e)}
      />
      <Button.Default
        type="button"
        className="add-todo-bar__btn"
        disabled={!inputVal.trim() || todoCreated}
        onClick={handleClick}>
        add
      </Button.Default>
    </label>
  );
}
