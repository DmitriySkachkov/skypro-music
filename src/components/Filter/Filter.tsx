'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import classNames from 'classnames';
// import FilterItem from '../FilterItem/FilterItem';
import { data } from '@/data';
import { getUniqueValuesByKey } from '@/utils/helper';

type FilterProps = {
  title: string[];
};

export default function Filter({ title }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Уникальные значения для каждого фильтра
  const authors = getUniqueValuesByKey(data, 'author').filter(Boolean);
  const genres = getUniqueValuesByKey(data, 'genre').filter(Boolean);
  const years = getUniqueValuesByKey(data, 'release_date')
    .map((d) => d.split('-')[0])
    .filter(Boolean);

  const handleClick = (filterName: string) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };

  const getListForFilter = (filterName: string) => {
    switch (filterName) {
      case 'исполнителю':
        return authors;
      case 'жанру':
        return genres;
      case 'году выпуска':
        return years;
      default:
        return [];
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filter__buttons}>
        {title.map((filterName) => (
          <div key={filterName} className={styles.filter__wrapper}>
            <button
              onClick={() => handleClick(filterName)}
              className={classNames(styles.filter__button, {
                [styles.active]: activeFilter === filterName,
              })}
            >
              {filterName}
            </button>

            {/* Всплывающий список фильтров */}
            {activeFilter === filterName && (
              <div className={styles.filter__list}>
                {getListForFilter(filterName).map((item, index) => (
                  <div key={index} className={styles.filter__listItem}>
                    {item}
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
