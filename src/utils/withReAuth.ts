import { refreshToken } from '@/services/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

type ApiError = {
  message?: string;
};

export const withReAuth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
  access?: string,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction(access ?? '');
  } catch (error) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data as ApiError | undefined;

    const isUnauthorized =
      axiosError.response?.status === 401 || data?.message?.includes('Токен');

    if (isUnauthorized) {
      const newAccessToken = await refreshToken(refresh);
      dispatch(setAccessToken(newAccessToken.access));
      return await apiFunction(newAccessToken.access);
    }

    throw error;
  }
};
