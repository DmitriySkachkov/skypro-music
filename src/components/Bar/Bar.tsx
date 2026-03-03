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

export default function Bar() {
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);

  // useEffect(() => {
  //   setIsLoadedTrack(false);
  //   setCurrentTime(0);
  // }, [currentTrack]);

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const loopTrack = () => {
    setIsLoop((prev) => !prev);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setCurrentTime(0);

      audioRef.current.play();
      dispatch(setIsPlay(true));

      setIsLoadedTrack(true);
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTime = Number(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = inputTime;
    }

    setCurrentTime(inputTime);
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    const handleCanPlay = () => {
      audio
        .play()
        .then(() => dispatch(setIsPlay(true)))
        .catch(() => {});
    };

    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack, dispatch]);

  const handleEnded = () => {
    if (isLoop) {
      audioRef.current?.play();
      return;
    }

    dispatch(setNextTrack());
  };

  if (!currentTrack) return <></>;

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
      />

      <div className={styles.bar__content}>
        <div className={styles.timePanel}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <ProgressBar
          max={duration}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
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
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
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
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
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
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>

                <div className={styles.trackPlay__author}>
                  {currentTrack.name}
                </div>

                <div className={styles.trackPlay__album}>
                  {currentTrack.author}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
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
