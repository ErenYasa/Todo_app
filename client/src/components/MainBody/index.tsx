import { TodosContainer } from '../TodosContainer';
import { ListSearchBar } from '../SearchBar';

export function MainBody() {
  return (
    <div className="main__body">
      <ListSearchBar />
      <TodosContainer />
    </div>
  );
}
