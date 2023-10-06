import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/app.slice';

export function ListSearchBar() {
  const dispatch = useAppDispatch();

  /* States */
  const [searchInputVal, setSearchInputVal] = useState('');
  /*  */

  /* Hooks */
  const debouncedSearchQuery = useDebounce(searchInputVal, 500);
  /*  */

  /* Effects & Events */
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(event.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery]);
  /*  */
  return (
    <div className="search-todo-bar">
      <input
        type="text"
        className="search-todo-bar__input"
        placeholder="Search..."
        value={searchInputVal}
        onChange={handleSearch}
      />
    </div>
  );
}
