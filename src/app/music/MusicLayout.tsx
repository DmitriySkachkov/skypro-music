'use client';

import { ReactNode } from 'react';
import styles from './MusicLayout.module.css';

import Navigation from '@/components/navigation/Navigation';
import Sidebar from '@/components/sidebar/Sidebar';
import Bar from '@/components/bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  const isAuthReady = useInitAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Navigation />

        <div className={styles.page__content}>
          <main className={styles.centerblock}>
            {!isAuthReady ? (
              <div className={styles.loader}>
                <p>Загрузка...</p>
              </div>
            ) : (
              <>
                <FetchingTracks />
                {children}
              </>
            )}
          </main>
          <Sidebar />
        </div>

        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
