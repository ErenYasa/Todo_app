import * as Button from '../Button';

export function ListSearchBar() {
  return (
    <div className="search-todo-bar">
      <input type="text" name="" className="search-todo-bar__input" placeholder="Search..." />
      <Button.Default type="button" className="search-todo-bar__btn">
        search
      </Button.Default>
    </div>
  );
}
