import { withReAuth } from '@/utils/withReAuth';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import {
  clearUser,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { refreshToken } from '@/services/auth/authApi';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const username = localStorage.getItem('username');
    const accessFromLS = localStorage.getItem('access');
    const refreshFromLS = localStorage.getItem('refresh');

    if (username) dispatch(setUsername(username));
    if (accessFromLS) dispatch(setAccessToken(accessFromLS));
    if (refreshFromLS) dispatch(setRefreshToken(refreshFromLS));

    const initAuth = async () => {
      let access: string | null = accessFromLS;
      const refresh: string | null = refreshFromLS;

      try {
        if (!access && typeof refresh === 'string') {
          const res = await refreshToken(refresh);
          const newAccess = res.access;
          access = newAccess;
          dispatch(setAccessToken(newAccess));
        }

        if (typeof access === 'string' && typeof refresh === 'string') {
          // Загружаем избранные треки только для авторизованных пользователей
          const favs = await withReAuth(
            (token) => getFavoriteTracks(token),
            refresh,
            dispatch,
            access,
          );
          dispatch(setFavoriteTracks(favs || []));
        } else {
          // Для неавторизованных - пустой массив
          dispatch(setFavoriteTracks([]));
        }
      } catch (error) {
        console.error('Ошибка инициализации:', error);
        dispatch(clearUser());
        dispatch(setFavoriteTracks([]));
      } finally {
        setIsAuthReady(true);
      }
    };

    initAuth();
  }, [dispatch]);

  return isAuthReady;
};
