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
import { useCallback, useState, useRef, useEffect } from 'react';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
  onLikeClick?: () => void; // Кастомный обработчик для страницы избранного
};

export default function Track({ track, playlist, onLikeClick }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  const { access } = useAppSelector((state) => state.auth);
  const isAuthReady = Boolean(access);

  const isActive = currentTrack?._id === track._id;

  const { toggleLike, isLike, isLoading } = useLikeTrack(track, isAuthReady);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const onClickTrack = useCallback(() => {
    if (isActive) {
      dispatch(setIsPlay(!isPlay));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setCurrentPlaylist(playlist));
      dispatch(setIsPlay(true));
    }
  }, [dispatch, track, playlist, isActive, isPlay]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    if (!isAuthReady) {
      setShowLoginMessage(true);
      messageTimeoutRef.current = setTimeout(() => {
        setShowLoginMessage(false);
      }, 2000);
      return;
    }
    
    setShowLoginMessage(false);
    
    // Если есть кастомный обработчик (для страницы избранного), используем его
    if (onLikeClick) {
      onLikeClick();
    } else {
      if (!isLoading) toggleLike();
    }
  };

  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title} onClick={onClickTrack}>
          <div className={styles.track__titleImage}>
            {isActive ? (
              <svg
                className={classNames(styles.track__titleSvg, {
                  [styles.active]: !isPlay,
                  [styles.pulse]: isPlay,
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

        <div className={styles.track__likeContainer}>
          <svg
            className={classNames(styles.track__timeSvg, {
              [styles.likeActive]: isLike && isAuthReady,
              [styles.likeLoading]: isLoading,
            })}
            onClick={handleLikeClick}
          >
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                isLike && isAuthReady ? 'icon-like' : 'icon-dislike'
              }`}
            />
          </svg>
          {showLoginMessage && (
            <span className={styles.loginMessage}>
              Необходимо войти в аккаунт
            </span>
          )}
        </div>

        <span className={styles.track__timeText}>
          {formatTime(track.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}
