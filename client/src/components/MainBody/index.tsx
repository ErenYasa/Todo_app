import { TodosContainer } from '../TodosContainer';
import { ListSearchBar } from '../ListSearchBar';

export function MainBody() {
  return (
    <div className="main__body">
      <ListSearchBar />
      <TodosContainer />
    </div>
  );
}
