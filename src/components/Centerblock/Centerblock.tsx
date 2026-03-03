import { useMemo, useState } from 'react';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';

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
  itemName = 'Трек',
}: CenterblockProps) {
  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

  const [selectedFilter, setSelectedFilter] = useState<{
    type: string;
    value: string;
  } | null>(null);

  const filteredTracks = useMemo(() => {
    if (!selectedFilter) return tracks;

    const { type, value } = selectedFilter;

    switch (type) {
      case 'исполнителю':
        return tracks.filter((t) => t.author === value);

      case 'жанру':
        return tracks.filter(
          (t) => Array.isArray(t.genre) && t.genre.includes(value),
        );

      case 'году выпуска':
        return tracks.filter(
          (t) =>
            typeof t.release_date === 'string' &&
            t.release_date.startsWith(value),
        );

      default:
        return tracks;
    }
  }, [selectedFilter, tracks]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{itemName}</h2>

      <div className={styles.centerblock__filter}>
        <Filter title={filters} tracks={tracks} onSelect={setSelectedFilter} />
      </div>

      <div className={styles.centerblock__content}>
        <FilterItem items={items} />

        {isLoading ? (
          <div className={styles.loading}>
            Данные загружаются
            <span className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        ) : errorRes ? (
          // <div className={styles.error}>{error}</div>
          <div className={styles.error}>
            {errorRes}
            <span className={styles.errorDots}>
              <span>!</span>
              <span>!</span>
              <span>!</span>
            </span>
          </div>
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
