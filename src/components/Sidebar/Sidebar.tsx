'use client';

import styles from './sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/store/store';
import { useAppDispatch } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {username || 'Инкогнито'}
        </p>
        <div className={styles.sidebar__icon} onClick={logout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/1">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                // width={250}
                // height={170}
                loading="eager"
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                // width={250}
                // height={170}
                loading="lazy"
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                // width={250}
                // height={170}
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
