'use client';

import { registerUser } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
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
      await registerUser({ email, password, username: email });
      router.push('/auth/signin'); // После регистрации → на страницу входа
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          setErrorMessage('Отсутствует интернет, попробуйте позже');
        } else {
          setErrorMessage('Неизвестная ошибка, попробуйте позже');
        }
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
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onChangeRepeatPassword}
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

// import { registerUser } from '@/services/auth/authApi';
// import styles from './signup.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { ChangeEvent, useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';

// export default function SignUp() {
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setRepeatPassword(e.target.value);
//   };

//   const onSubmit = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   ) => {
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
//       await registerUser({ email, password, username: email });
//       router.push('/auth/signin'); // После регистрации → на страницу входа
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response) {
//           setErrorMessage(error.response.data.message);
//         } else if (error.request) {
//           setErrorMessage('Отсутствует интернет, попробуйте позже');
//         } else {
//           setErrorMessage('Неизвестная ошибка, попробуйте позже');
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   //   registerUser({ email, password, username: email }) // username: email.split("@")[0]
//   //     .then((res) => {
//   //       // console.log(res);
//   //       router.push("/music/main");
//   //     })
//   //     .catch((error) => {
//   //       if (error instanceof AxiosError) {
//   //         if (error.response) {
//   //           console.log(error.response.data);
//   //           console.log(error.response.status);
//   //           console.log(error.response.headers);
//   //           setErrorMessage(error.response.data.message);
//   //         } else if (error.request) {
//   //           console.log(error.request);
//   //           setErrorMessage('Отсутствует интернет, попробуйте позже');
//   //         } else {
//   //           setErrorMessage('Неизвестная ошибка, попробуйте позже');
//   //         }
//   //       }
//   //     })
//   //     .finally(() => {
//   //       setIsLoading(true);
//   //     });
//   // };

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
