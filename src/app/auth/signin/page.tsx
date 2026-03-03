'use client';

import { authUser, getTokens } from '@/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
// import { ChangeEvent, useState } from 'react';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import {
  setUsername,
  setAccessToken,
  setRefreshToken,
} from '@/store/features/authSlice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      // логин (проверка пользователя)
      await authUser({ email, password });

      // получение токенов
      const tokens = await getTokens({ email, password });

      // сохраняем в redux
      dispatch(setUsername(email));
      dispatch(setAccessToken(tokens.access));
      dispatch(setRefreshToken(tokens.refresh));

      router.push('/music/main');
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message ?? 'Ошибка авторизации');
      } else {
        setErrorMessage('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        placeholder="Почта"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className={classNames(styles.modal__input)}
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className={styles.errorContainer}>{errorMessage}</div>

      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>

      <Link href="/auth/signup" className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
