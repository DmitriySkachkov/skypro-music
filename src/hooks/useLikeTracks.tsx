import { useState, useCallback } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReAuth } from '@/utils/withReAuth';
import { addLike, removeLike, getFavoriteTracks } from '@/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/store/features/trackSlice';

type UseLikeTrackReturn = {
  toggleLike: () => Promise<void>;
  isLike: boolean;
  isLoading: boolean;
  errorMsg: string | null;
};

export const useLikeTrack = (
  track: TrackType | null,
  isAuthReady: boolean,
): UseLikeTrackReturn => {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);
  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLike = track
    ? favoriteTracks.some((t) => t._id === track._id)
    : false;

  // Функция для обновления списка избранного с сервера
  const refreshFavoriteTracks = useCallback(async () => {
    if (!access || !refresh) return;
    
    try {
      const favs = await withReAuth(
        (token) => getFavoriteTracks(token),
        refresh,
        dispatch,
        access
      );
      dispatch(setFavoriteTracks(favs));
    } catch (error) {
      console.error('Не удалось обновить список избранного:', error);
    }
  }, [access, refresh, dispatch]);

  const toggleLike = useCallback(async () => {
    if (!track) return;
    if (!isAuthReady || !access || !refresh) {
      setErrorMsg('Необходимо войти в аккаунт');
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await withReAuth(
        (token) =>
          isLike ? removeLike(token, track._id) : addLike(token, track._id),
        refresh,
        dispatch,
        access,
      );

      // После успешного действия перезапрашиваем актуальный список избранного
      await refreshFavoriteTracks();
      
    } catch (error) {
      setErrorMsg('Ошибка при изменении лайка');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthReady, access, refresh, isLike, track, dispatch, isLoading, refreshFavoriteTracks]);

  return {
    toggleLike,
    isLike,
    isLoading,
    errorMsg,
  };
};
