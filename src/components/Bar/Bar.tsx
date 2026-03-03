'use client';
// import Link from 'next/link';

import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRef, useEffect } from 'react';
import { setIsPlay } from '@/store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // console.log(currentTrack);

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

  // загружаем новый src перед автоплеем
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Автоплей при готовности трека
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    const handleCanPlay = () => {
      audio
        .play()
        .then(() => dispatch(setIsPlay(true)))
        .catch(() => {}); // Игнорируем
    };

    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack, dispatch]);

  // Нереализованные кнопки
  const notReady = () => alert('Еще не реализовано');

  if (!currentTrack) return <></>;

  return (
    <div className={styles.bar}>
      {/* <audio controls src={currentTrack?.track_file}></audio> */}
      {/* <audio ref={audioRef} controls src={currentTrack?.track_file}></audio> */}
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        style={{ display: 'none' }}
      />
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={notReady}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              {isPlay ? (
                <div className={classnames(styles.btn)} onClick={pauseTrack}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
                  </svg>
                </div>
              ) : (
                <div className={classnames(styles.btn)} onClick={playTrack}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play" />
                  </svg>
                </div>
              )}

              <div className={styles.player__btnNext} onClick={notReady}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={notReady}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={notReady}
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

              {/* <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div> */}
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
                type="range"
                className={styles.volume__progressLine}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.volume = Number(e.target.value) / 100;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
