// 'use client';

// import styles from './MusicLayout.module.css';
// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';

// interface MusicLayoutProps {
//   children: React.ReactNode;
// }

// export default function MusicLayout({ children }: MusicLayoutProps) {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <Navigation />
//           {children}
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

'use client';

import styles from './MusicLayout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';

interface MusicLayoutProps {
  children: React.ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Navigation />

        <div className={styles.page__content}>
          <main className={styles.centerblock}>{children}</main>
          <Sidebar />
        </div>

        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
