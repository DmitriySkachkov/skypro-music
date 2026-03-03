'use client';

import styles from './signup.module.css';
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
import { registerAndLogin } from '@/services/auth/authApi';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== repeatPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    setIsLoading(true);

    try {
      const { user, tokens } = await registerAndLogin({ email, password });

      dispatch(setUsername(user.username));
      dispatch(setAccessToken(tokens.access));
      dispatch(setRefreshToken(tokens.refresh));

      router.push('/auth/signin');
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.detail ||
            error.response?.data?.message ||
            'Ошибка регистрации',
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
      <input
        className={styles.modal__input}
        type="password"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />

      <div className={styles.errorContainer}>{errorMessage}</div>

      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}

// 'use client';

// import styles from './signup.module.css';
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

// export default function SignUp() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const createUser = async ({ email, password }: AuthData) => {
//     const data = {
//       email: email.trim(),
//       username: email.trim(),
//       password: password.trim(),
//     };

//     const response = await axios.post(`${BASE_URL}/user/signup/`, data, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     return response.data;
//   };

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

//     if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     if (password !== repeatPassword) {
//       return setErrorMessage('Пароли не совпадают');
//     }

//     setIsLoading(true);

//     try {
//       // 1️⃣ Создаём пользователя
//       await createUser({ email, password });

//       // 2️⃣ Сразу логиним его и получаем токены
//       const { user, tokens } = await loginUser({ email, password });

//       // 3️⃣ Сохраняем в Redux
//       dispatch(setUsername(user.username));
//       dispatch(setAccessToken(tokens.access));
//       dispatch(setRefreshToken(tokens.refresh));

//       router.push('/auth/signin');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         setErrorMessage(
//           error.response?.data?.detail ||
//           error.response?.data?.message ||
//           'Ошибка регистрации'
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
//       <input
//         className={styles.modal__input}
//         type="password"
//         placeholder="Повторите пароль"
//         value={repeatPassword}
//         onChange={(e) => setRepeatPassword(e.target.value)}
//       />

//       <div className={styles.errorContainer}>{errorMessage}</div>

//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnSignupEnt}
//       >
//         Зарегистрироваться
//       </button>

//       <Link href="/auth/signin" className={styles.modal__btnSignup}>
//         Уже есть аккаунт? Войти
//       </Link>
//     </>
//   );
// }

// 'use client';

// import styles from './signup.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { createUser } from '@/services/auth/authApi';

// export default function SignUp() {
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     if (password !== repeatPassword) {
//       return setErrorMessage('Пароли не совпадают');
//     }

//     setIsLoading(true);

//     try {
//       await createUser({ email, password });
//       // После регистрации редирект на SignIn
//       router.push('/auth/signin');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         setErrorMessage(error.response?.data?.message || 'Ошибка регистрации');
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
//       <input
//         className={styles.modal__input}
//         type="password"
//         placeholder="Повторите пароль"
//         value={repeatPassword}
//         onChange={(e) => setRepeatPassword(e.target.value)}
//       />

//       <div className={styles.errorContainer}>{errorMessage}</div>

//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnSignupEnt}
//       >
//         Зарегистрироваться
//       </button>
//     </>
//   );
// }

// 'use client';

// import styles from './signup.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { ChangeEvent, useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { createUser, getTokens } from '@/services/auth/authApi';

// export default function SignUp() {
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
//     setEmail(e.target.value);
//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
//     setPassword(e.target.value);
//   const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) =>
//     setRepeatPassword(e.target.value);

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     if (password !== repeatPassword) {
//       return setErrorMessage('Пароли не совпадают');
//     }

//     setIsLoading(true);

//     try {
//       // Создаем пользователя
//       const res = await createUser({ email, password });

//       if (!res.data.success) {
//         setErrorMessage(res.data.message || 'Ошибка регистрации');
//         return;
//       }

//       // Запрашиваем токены только после успешной регистрации
//       await getTokens({ email, password });

//       // Переходим на страницу входа
//       router.push('/auth/signin');
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response) {
//           setErrorMessage(error.response.data.message || 'Ошибка регистрации');
//         } else if (error.request) {
//           setErrorMessage('Отсутствует интернет, попробуйте позже');
//         } else {
//           setErrorMessage('Неизвестная ошибка, попробуйте позже');
//         }
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
//         name="login"
//         placeholder="Почта"
//         onChange={onChangeEmail}
//       />

//       <input
//         className={styles.modal__input}
//         type="password"
//         name="password"
//         placeholder="Пароль"
//         onChange={onChangePassword}
//       />

//       <input
//         className={styles.modal__input}
//         type="password"
//         name="password"
//         placeholder="Повторите пароль"
//         onChange={onChangeRepeatPassword}
//       />

//       <div className={styles.errorContainer}>{errorMessage}</div>

//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnSignupEnt}
//       >
//         Зарегистрироваться
//       </button>
//     </>
//   );
// }
