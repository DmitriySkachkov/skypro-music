'use client';

import { useEffect } from 'react';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setPagePlaylist, resetFilters } from '@/store/features/trackSlice';

type CenterblockProps = {
  tracks: TrackType[];
  isLoading: boolean;
  errorRes: string | null;
  itemName: string;
};

export default function Centerblock({
  tracks,
  isLoading,
  errorRes,
  itemName,
}: CenterblockProps) {
  const dispatch = useAppDispatch();
  const { filteredTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (!isLoading && tracks.length) {
      dispatch(setPagePlaylist(tracks));
      dispatch(resetFilters());
    }
  }, [tracks, isLoading, dispatch]);

  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{itemName}</h2>

      <div className={styles.centerblock__filter}>
        <Filter title={filters} tracks={tracks} />
      </div>

      <div className={styles.centerblock__content}>
        <FilterItem items={items} />

        {isLoading ? (
          <div className={styles.loading}>
            Данные загружаются{' '}
            <span className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        ) : errorRes ? (
          <div className={styles.error}>
            {errorRes}{' '}
            <span className={styles.errorDots}>
              <span>!</span>
              <span>!</span>
              <span>!</span>
            </span>
          </div>
        ) : filteredTracks.length === 0 ? (
          <div className={styles.empty}>Нет подходящих треков</div>
        ) : (
          <div className={styles.content__playlist}>
            {filteredTracks.map((track) => (
              <Track key={track._id} track={track} playlist={filteredTracks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
