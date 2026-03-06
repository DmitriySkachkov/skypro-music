'use client';

import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import {
  setUsername,
  setAccessToken,
  setRefreshToken,
} from '@/store/features/authSlice';
import { loginUser } from '@/services/auth/authApi';
import Image from 'next/image';

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
      return setErrorMessage('Заполните все поля');
    }

    setIsLoading(true);

    try {
      const { user, tokens } = await loginUser({ email, password });

      dispatch(setUsername(user.username));
      dispatch(setAccessToken(tokens.access));
      dispatch(setRefreshToken(tokens.refresh));

      router.push('/music/main');
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.detail ||
            error.response?.data?.message ||
            'Неверный логин или пароль',
        );
      } else {
        setErrorMessage('Неизвестная ошибка, попробуйте позже');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image
            src="/img/logo_modal.png"
            alt="logo"
            width={140}
            height={21}
            priority
          />
        </div>
      </Link>

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="email"
        placeholder="Почта"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.modal__input}
        type="password"
        placeholder="Пароль"
        value={password}
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
