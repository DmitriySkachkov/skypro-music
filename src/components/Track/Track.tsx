'use client';
import styles from './track.module.css';

import Link from 'next/link';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';
import classNames from 'classnames';

type TrackProps = {
  track: TrackType;
};

export default function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  const isActive = currentTrack?._id === track._id;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
  };

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isActive ? (
              // Текущий трек — точка
              <svg
                className={classNames(styles.track__titleSvg, {
                  [styles.active]: !isPlay, // фиолетовая точка на паузе
                  [styles.pulse]: isPlay, // пульсация при воспроизведении
                })}
                viewBox="0 0 10 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
            ) : (
              // Остальные треки — иконка нотки
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <Link className={styles.track__titleLink} href="">
            {track.name} <span className={styles.track__titleSpan}></span>
          </Link>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>

        <svg className={styles.track__timeSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span className={styles.track__timeText}>
          {formatTime(track.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}
