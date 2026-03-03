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
          <img src="/img/logo_modal.png" alt="logo" />
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

// 'use client';

// import styles from './signin.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/store/store';
// import { setUsername, setAccessToken, setRefreshToken } from '@/store/features/authSlice';
// import axios from 'axios';
// import { BASE_URL } from '@/services/constants';

// export type AuthData = {
//   email: string;
//   password: string;
// };

// export type TokenType = {
//   access: string;
//   refresh: string;
// };

// export default function Signin() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const loginUser = async ({ email, password }: AuthData) => {
//     // 1️⃣ Получаем данные пользователя
//     const loginResponse = await axios.post(`${BASE_URL}/user/login/`, { email, password }, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const user = loginResponse.data;

//     // 2️⃣ Получаем токены
//     const tokenResponse = await axios.post(`${BASE_URL}/user/token/`, { email, password }, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const tokens: TokenType = tokenResponse.data;

//     return { user, tokens };
//   };

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       setErrorMessage('Заполните все поля');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { user, tokens } = await loginUser({ email, password });

//       // Сохраняем в Redux
//       dispatch(setUsername(user.username));
//       dispatch(setAccessToken(tokens.access));
//       dispatch(setRefreshToken(tokens.refresh));

//       // Редирект на главную
//       router.push('/music/main');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         // Разные форматы ошибок от сервера
//         setErrorMessage(
//           error.response?.data?.detail ||
//           error.response?.data?.message ||
//           'Неверный логин или пароль'
//         );
//       } else {
//         setErrorMessage('Неизвестная ошибка, попробуйте позже');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Link href="/music/main">
//         <div className={styles.modal__logo}>
//           <img src="/img/logo_modal.png" alt="logo" />
//         </div>
//       </Link>

//       <input
//         className={classNames(styles.modal__input, styles.login)}
//         type="email"
//         placeholder="Почта"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         className={styles.modal__input}
//         type="password"
//         placeholder="Пароль"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className={styles.errorContainer}>{errorMessage}</div>

//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnEnter}
//       >
//         Войти
//       </button>

//       <Link href="/auth/signup" className={styles.modal__btnSignup}>
//         Зарегистрироваться
//       </Link>
//     </>
//   );
// }

// 'use client';

// import styles from './signin.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/store/store';
// import { setUsername, setAccessToken, setRefreshToken } from '@/store/features/authSlice';
// import { getTokens } from '@/services/auth/authApi';

// export default function Signin() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       setErrorMessage('Заполните все поля');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const tokens = await getTokens({ email, password });

//       // Сохраняем в Redux
//       dispatch(setUsername(email));
//       dispatch(setAccessToken(tokens.access));
//       dispatch(setRefreshToken(tokens.refresh));

//       // Редирект на главную
//       router.push('/music/main');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         setErrorMessage(error.response?.data?.detail || 'Неверный логин или пароль');
//       } else {
//         setErrorMessage('Неизвестная ошибка');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Link href="/music/main">
//         <div className={styles.modal__logo}>
//           <img src="/img/logo_modal.png" alt="logo" />
//         </div>
//       </Link>

//       <input
//         className={classNames(styles.modal__input, styles.login)}
//         type="email"
//         placeholder="Почта"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         className={classNames(styles.modal__input)}
//         type="password"
//         placeholder="Пароль"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className={styles.errorContainer}>{errorMessage}</div>

//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnEnter}
//       >
//         Войти
//       </button>

//       <Link href="/auth/signup" className={styles.modal__btnSignup}>
//         Зарегистрироваться
//       </Link>
//     </>
//   );
// }

// 'use client';

// import { authUser, getTokens } from '@/services/auth/authApi';
// import styles from './signin.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// // import { ChangeEvent, useState } from 'react';
// import { useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/store/store';
// import {
//   setUsername,
//   setAccessToken,
//   setRefreshToken,
// } from '@/store/features/authSlice';

// export default function Signin() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       setErrorMessage('Заполните все поля');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // логин (проверка пользователя)
//       await authUser({ email, password });

//       // получение токенов
//       const tokens = await getTokens({ email, password });

//       // сохраняем в redux
//       dispatch(setUsername(email));
//       dispatch(setAccessToken(tokens.access));
//       dispatch(setRefreshToken(tokens.refresh));

//       router.push('/music/main');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         setErrorMessage(error.response?.data?.message ?? 'Ошибка авторизации');
//       } else {
//         setErrorMessage('Неизвестная ошибка');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Link href="/music/main">
//         <div className={styles.modal__logo}>
//           <img src="/img/logo_modal.png" alt="logo" />
//         </div>
//       </Link>

//       <input
//         className={classNames(styles.modal__input, styles.login)}
//         type="text"
//         placeholder="Почта"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         className={classNames(styles.modal__input)}
//         type="password"
//         placeholder="Пароль"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className={styles.errorContainer}>{errorMessage}</div>

//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnEnter}
//       >
//         Войти
//       </button>

//       <Link href="/auth/signup" className={styles.modal__btnSignup}>
//         Зарегистрироваться
//       </Link>
//     </>
//   );
// }
