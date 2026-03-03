'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import classNames from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setSort,
  SortType,
} from '@/store/features/trackSlice';

type FilterProps = {
  title: string[];
  tracks: TrackType[];
};

export default function Filter({ title, tracks }: FilterProps) {
  const dispatch = useAppDispatch();
  const { authors, genres, sort } = useAppSelector(
    (state) => state.tracks.filters,
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const authorsList = Array.from(new Set(tracks.map((t) => t.author)));

  const genresList = Array.from(new Set(tracks.flatMap((t) => t.genre)));

  const yearSortOptions: { label: string; value: SortType }[] = [
    { label: 'По умолчанию', value: 'default' },
    { label: 'Сначала новые', value: 'year_new' },
    { label: 'Сначала старые', value: 'year_old' },
  ];

  const counters: Record<string, number> = {
    исполнителю: authors.length,
    жанру: genres.length,
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div className={styles.filter__buttons}>
        {title.map((filterName) => (
          <div key={filterName} className={styles.filter__wrapper}>
            <button
              onClick={() =>
                setActiveFilter((prev) =>
                  prev === filterName ? null : filterName,
                )
              }
              className={classNames(styles.filter__button, {
                [styles.active]: activeFilter === filterName,
                [styles.filter__buttonActive]:
                  (filterName === 'исполнителю' && authors.length > 0) ||
                  (filterName === 'жанру' && genres.length > 0) ||
                  (filterName === 'году выпуска' && sort !== 'default'),
              })}
            >
              {filterName}
              {counters[filterName] > 0 && (
                <span className={styles.counter}>{counters[filterName]}</span>
              )}
            </button> 

            {activeFilter === filterName && (
              <div className={styles.filter__list}>
                {filterName === 'исполнителю' &&
                  authorsList.map((author) => (
                    <div
                      key={author}
                      className={classNames(styles.filter__listItem, {
                        [styles.selected]: authors.includes(author),
                      })}
                      onClick={() => dispatch(setFilterAuthors(author))}
                    >
                      {author}
                    </div>
                  ))}

                {filterName === 'жанру' &&
                  genresList.map((genre) => (
                    <div
                      key={genre}
                      className={classNames(styles.filter__listItem, {
                        [styles.selected]: genres.includes(genre),
                      })}
                      onClick={() => dispatch(setFilterGenres(genre))}
                    >
                      {genre}
                    </div>
                  ))}

                {filterName === 'году выпуска' &&
                  yearSortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={classNames(styles.filter__listItem, {
                        [styles.selected]: sort === option.value,
                      })}
                      onClick={() => dispatch(setSort(option.value))}
                    >
                      {option.label}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
