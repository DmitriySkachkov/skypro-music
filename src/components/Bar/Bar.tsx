'use client';

import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useRef, useEffect, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { formatTime } from '@/utils/helper';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const isAuthReady = Boolean(access && refresh);

  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const { toggleLike, isLike, isLoading, errorMsg } = useLikeTrack(
    currentTrack ?? null,
    isAuthReady,
  );

  // ---- Воспроизведение и пауза ----
  const playTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
    dispatch(setIsPlay(true));
  };

  const pauseTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    dispatch(setIsPlay(false));
  };

  const loopTrack = () => setIsLoop((prev) => !prev);

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
    setCurrentTime(audioRef.current.currentTime);
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTime = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = inputTime;
    setCurrentTime(inputTime);
  };

  const onNextTrack = () => dispatch(setNextTrack());
  const onPrevTrack = () => dispatch(setPrevTrack());
  const onToggleShuffle = () => dispatch(toggleShuffle());

  const handleEnded = () => {
    if (isLoop) {
      audioRef.current?.play().catch(() => {});
      return;
    }
    dispatch(setNextTrack());
  };

  // ---- Автозапуск нового трека ----
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.load();
    audioRef.current
      .play()
      .then(() => dispatch(setIsPlay(true)))
      .catch(() => dispatch(setIsPlay(false)));
  }, [currentTrack, dispatch]);

  // ---- Управление isPlay ----
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlay) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlay]);

  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        style={{ display: 'none' }}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />

      <div className={styles.bar__content}>
        <div className={styles.timePanel}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <ProgressBar
          max={duration}
          step={0.1}
          readOnly={false}
          value={currentTime}
          onChange={onChangeProgress}
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>

              {isPlay ? (
                <div className={classNames(styles.btn)} onClick={pauseTrack}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
                  </svg>
                </div>
              ) : (
                <div className={classNames(styles.btn)} onClick={playTrack}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play" />
                  </svg>
                </div>
              )}

              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                </svg>
              </div>

              <div
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  { [styles.active]: isLoop },
                )}
                onClick={loopTrack}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>

              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  { [styles.active]: isShuffle },
                )}
                onClick={onToggleShuffle}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlay__info}>
                  <div className={styles.trackPlay__author}>
                    {currentTrack.name}
                  </div>
                  <div className={styles.trackPlay__album}>
                    {currentTrack.author}
                  </div>
                </div>

                <div className={styles.trackPlay__likeDis}>
                  <svg
                    className={classNames(styles.trackPlay__likeSvg, {
                      [styles.active]: isLike,
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
                  {errorMsg && <span className={styles.error}>{errorMsg}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>

              <input
                className={classNames(styles.volume__progressLine, styles.btn)}
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => {
                  const v = Number(e.target.value) / 100;
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
