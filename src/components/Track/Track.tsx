'use client';

import styles from './track.module.css';
import Link from 'next/link';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/useLikeTracks';
import { useCallback } from 'react';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
};

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  const { access, refresh } = useAppSelector((state) => state.auth);
  const isAuthReady = Boolean(access && refresh);

  const isActive = currentTrack?._id === track._id;

  const { toggleLike, isLike, isLoading, errorMsg } = useLikeTrack(
    track,
    isAuthReady,
  );

  const onClickTrack = useCallback(() => {
    if (isActive) {
      dispatch(setIsPlay(!isPlay));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setCurrentPlaylist(playlist));
      dispatch(setIsPlay(true));
    }
  }, [dispatch, track, playlist, isActive, isPlay]);

  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div
            className={styles.track__titleImage}
            onClick={onClickTrack} //логика play/pause
          >
            {isActive ? (
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

        <svg
          className={classNames(styles.track__timeSvg, {
            [styles.likeActive]: isLike,
            [styles.likeLoading]: isLoading,
          })}
          onClick={(e) => {
            e.stopPropagation();
            if (!isLoading) toggleLike();
          }}
        >
          <use
            xlinkHref={`/img/icon/sprite.svg#${
              isLike ? 'icon-like' : 'icon-dislike'
            }`}
          />
        </svg>

        <span className={styles.track__timeText}>
          {formatTime(track.duration_in_seconds)}
        </span>
        {errorMsg && <span className={styles.error}>{errorMsg}</span>}
      </div>
    </div>
  );
}
