import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Track from '../Track/Track';
import { data } from '@/data';

export default function Centerblock() {
  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>

      <div className={styles.centerblock__filter}>
        <Filter title={filters} />
      </div>

      <div className={styles.centerblock__content}>
        <FilterItem items={items} />
        <div className={styles.content__playlist}>
          {data.map((track) => (
            <Track key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
