import { StatusFilterBar } from '../StatusFilterBar';
import { TodoList } from '../TodoList';

export function TodosContainer() {
  return (
    <div className="todos-container">
      <StatusFilterBar />
      <TodoList />
    </div>
  );
}
