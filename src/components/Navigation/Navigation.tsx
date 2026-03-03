'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { access } = useAppSelector((state) => state.auth);
  const isAuth = Boolean(access);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
          // priority
        />
      </div>
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      <div
        className={`${styles.nav__menu} ${
          menuOpen ? styles.nav__menu_show : ''
        }`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главная
            </Link>
          </li>
          {isAuth && (
            <li className={styles.menu__item}>
              <Link href="/music/playlist" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          )}

          <li className={styles.menu__item}>
            <p
              onClick={() => {
                if (isAuth) {
                  logout();
                } else {
                  router.push('/auth/signin');
                }
              }}
              className={styles.menu__link}
            >
              {isAuth ? 'Выйти' : 'Войти'}
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}
