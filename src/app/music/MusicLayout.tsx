'use client';

import { ReactNode } from 'react';
import styles from './MusicLayout.module.css';

import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  const isAuthReady = useInitAuth();

  // Ждём инициализацию авторизации
  if (!isAuthReady) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Navigation />

        <div className={styles.page__content}>
          <main className={styles.centerblock}>
            <FetchingTracks />
            {children}
          </main>
          <Sidebar />
        </div>

        <Bar />
        <footer className="footer"></footer>
      </div>
    </div> 
  );
}
