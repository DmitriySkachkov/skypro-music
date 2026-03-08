'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearch } from '@/store/features/trackSlice';
import styles from './search.module.css';

export default function Search() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.tracks.filters.search);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        value={search}
        onChange={onSearchInput}
      />
    </div>
  );
}
