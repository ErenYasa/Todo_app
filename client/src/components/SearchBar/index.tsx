import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useAppDispatch } from '@/store/hooks';
import { setFilterStatus, setSearchQuery } from '@/store/slices/app.slice';
import { FilterStatus } from '@/types/global';
import { TextInput } from '../Form/Elements/TextInput';
import { SearchIcon } from '@/icons';

export function SearchBar() {
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
    dispatch(setFilterStatus(FilterStatus.ALL));
  }, [debouncedSearchQuery]);
  /*  */

  return (
    <div className="search-bar">
      <SearchIcon width="18" height="18" className='search-bar__icon' />
      <TextInput placeholder="Search..." _size="small" value={searchInputVal} onChange={handleSearch} />
    </div>
  );
}
