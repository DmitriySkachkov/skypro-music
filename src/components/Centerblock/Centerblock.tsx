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
  onLikeClick?: (trackId: number) => void | Promise<void>;
};

export default function Centerblock({
  tracks,
  isLoading,
  errorRes,
  itemName,
  onLikeClick,
}: CenterblockProps) {
  const dispatch = useAppDispatch();
  const { filteredTracks } = useAppSelector((state) => state.tracks);

  // Устанавливаем переданные треки как текущий плейлист страницы
  useEffect(() => {
    if (!isLoading && tracks.length > 0) {
      dispatch(setPagePlaylist(tracks));
      dispatch(resetFilters());
    }
  }, [tracks, isLoading, dispatch]);

  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

  const renderSkeletons = () => {
    return (
      <div className={styles.content__playlist}>
        {[...Array(5)].map((_, index) => (
          <div key={`skeleton-${index}`} className={styles.skeletonItem} />
        ))}
      </div>
    );
  };

  // Определяем, какие треки показывать
  const displayTracks = tracks.length > 0 ? filteredTracks : [];

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{itemName}</h2>

      {!isLoading && tracks.length > 0 && (
        <div className={styles.centerblock__filter}>
          <Filter title={filters} tracks={tracks} />
        </div>
      )}

      <div className={styles.centerblock__content}>
        {!isLoading && tracks.length > 0 && <FilterItem items={items} />}

        {isLoading ? (
          renderSkeletons()
        ) : errorRes ? (
          <div className={styles.error}>
            {errorRes}{' '}
            <span className={styles.errorDots}>
              <span>!</span>
              <span>!</span>
              <span>!</span>
            </span>
          </div>
        ) : displayTracks.length === 0 ? (
          <div className={styles.empty}>
            {itemName === "Мой плейлист" 
              ? "У вас пока нет избранных треков" 
              : "Нет подходящих треков"}
          </div>
        ) : (
          <div className={styles.content__playlist}>
            {displayTracks.map((track) => (
              <Track 
                key={track._id} 
                track={track} 
                playlist={displayTracks}
                onLikeClick={onLikeClick ? () => onLikeClick(track._id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
