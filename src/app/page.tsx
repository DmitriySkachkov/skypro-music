// чистый код
import styles from './page.module.css';
import Navigation from '../components/Navigation/Navigation';
import Centerblock from '../components/Centerblock/Centerblock';
import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

// грязный код
// import Image from 'next/image';
// import Link from 'next/link';
// import classnames from 'classnames';

// import styles from './page.module.css';
// import Navigation from '../components/Navigation/Navigation';
// import Centerblock from '../components/Centerblock/Centerblock';
// import Sidebar from '../components/Sidebar/Sidebar';
// import Bar from '../components/Bar/Bar';

// export default function Home() {
//   return (
//     // <div className={'wrapper'}>
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {/* <nav className={styles.main__nav}>
//             <div className={styles.nav__logo}>
//               <Image
//                 width={250}
//                 height={170}
//                 className={styles.logo__image}
//                 src="/img/logo.png"
//                 alt={'logo'}
//               />
//             </div>
//             <div className={styles.nav__burger}>
//               <span className={styles.burger__line}></span>
//               <span className={styles.burger__line}></span>
//               <span className={styles.burger__line}></span>
//             </div>
//             <div className={styles.nav__menu}>
//               <ul className={styles.menu__list}>
//                 <li className={styles.menu__item}>
//                   <Link href="#" className={styles.menu__link}>
//                     Главное
//                   </Link>
//                 </li>
//                 <li className={styles.menu__item}>
//                   <Link href="#" className={styles.menu__link}>
//                     Мой плейлист
//                   </Link>
//                 </li>
//                 <li className={styles.menu__item}>
//                   <Link href="../signin.html" className={styles.menu__link}>
//                     Войти
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </nav> */}
//           <Navigation />
//           {/* <div className={styles.centerblock}>
//             <div className={styles.centerblock__search}>
//               <svg className={styles.search__svg}>
//                 <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
//               </svg>
//               <input
//                 className={styles.search__tex}
//                 type="search"
//                 placeholder="Поиск"
//                 name="search"
//               />
//             </div>
//             <h2 className={styles.centerblock__h2}>Треки</h2>
//             <div className={styles.centerblock__filter}>
//               <div className={styles.filter__title}>Искать по:</div>
//               <div className={styles.filter__button}>исполнителю</div>
//               <div className={styles.filter__button}>году выпуска</div>
//               <div className={styles.filter__button}>жанру</div>
//             </div>
//             <div className={styles.centerblock__content}>
//               <div className={styles.content__title}>
//                 <div className={classnames(styles.playlistTitle__col, styles.col01)}>Трек</div>
//                 <div className={classnames(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
//                 <div className={classnames(styles.playlistTitle__col, styles.col03)}>Альбом</div>
//                 <div className={classnames(styles.playlistTitle__col, styles.col04)}>
//                   <svg className={styles.playlistTitle__svg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
//                   </svg>
//                 </div>
//               </div>
//               <div className={styles.content__playlist}>
//                 <div className={styles.playlist__item}>
//                   <div className={styles.playlist__track}>
//                     <div className={styles.track__title}>
//                       <div className={styles.track__titleImage}>
//                         <svg className={styles.track__titleSvg}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={styles.track__titleLink} href="">
//                           Guilt <span className={styles.track__titleSpan}></span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={styles.track__author}>
//                       <Link className={styles.track__authorLink} href="">
//                         Nero
//                       </Link>
//                     </div>
//                     <div className={styles.track__album}>
//                       <Link className={styles.track__albumLink} href="">
//                         Welcome Reality
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={styles.track__timeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={styles.track__timeText}>4:44</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.playlist__item}>
//                   <div className={styles.playlist__track}>
//                     <div className={styles.track__title}>
//                       <div className={styles.track__titleImage}>
//                         <svg className={styles.track__titleSvg}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={styles.track__titleLink} href="">
//                           Elektro <span className={styles.track__titleSpan}></span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={styles.track__author}>
//                       <Link className={styles.track__authorLink} href="">
//                         Dynoro, Outwork, Mr. Gee
//                       </Link>
//                     </div>
//                     <div className={styles.track__album}>
//                       <Link className={styles.track__albumLink} href="">
//                         Elektro
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={styles.track__timeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={styles.track__timeText}>2:22</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.playlist__item}>
//                   <div className={styles.playlist__track}>
//                     <div className={styles.track__title}>
//                       <div className={styles.track__titleImage}>
//                         <svg className={styles.track__titleSvg}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={styles.track__titleLink} href="">
//                           I’m Fire <span className={styles.track__titleSpan}></span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={styles.track__author}>
//                       <Link className={styles.track__authorLink} href="">
//                         Ali Bakgor
//                       </Link>
//                     </div>
//                     <div className={styles.track__album}>
//                       <Link className={styles.track__albumLink} href="">
//                         I’m Fire
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={styles.track__timeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={styles.track__timeText}>2:22</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.playlist__item}>
//                   <div className={styles.playlist__track}>
//                     <div className={styles.track__title}>
//                       <div className={styles.track__titleImage}>
//                         <svg className={styles.track__titleSvg}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={styles.track__titleLink} href="">
//                           Non Stop
//                           <span className={styles.track__titleSpan}>(Remix)</span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={styles.track__author}>
//                       <Link className={styles.track__authorLink} href="">
//                         Стоункат, Psychopath
//                       </Link>
//                     </div>
//                     <div className={styles.track__album}>
//                       <Link className={styles.track__albumLink} href="">
//                         Non Stop
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={styles.track__timeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={styles.track__timeText}>4:12</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.playlist__item}>
//                   <div className={styles.playlist__track}>
//                     <div className={styles.track__title}>
//                       <div className={styles.track__titleImage}>
//                         <svg className={styles.track__titleSvg}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div>
//                         <Link className={styles.track__titleLink} href="">
//                           Run Run
//                           <span className={styles.track__titleSpan}>
//                             (feat. AR/CO)
//                           </span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={styles.track__author}>
//                       <Link className={styles.track__authorLink} href="">
//                         Jaded, Will Clarke, AR/CO
//                       </Link>
//                     </div>
//                     <div className={styles.track__album}>
//                       <Link className={styles.track__albumLink} href="">
//                         Run Run
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={styles.track__timeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={styles.track__timeText}>2:54</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//           <Centerblock />
//           {/* <div className={styles.main__sidebar}>
//             <div className={'sidebar__personal'}>
//               <p className={'sidebar__personalName'}>Sergey.Ivanov</p>
//               <div className={'sidebar__icon'}>
//                 <svg>
//                   <use xlinkHref="/img/icon/sprite.svg#logout"></use>
//                 </svg>
//               </div>
//             </div>
//             <div className={'sidebar__block'}>
//               <div className={'sidebar__list'}>
//                 <div className={'sidebar__item'}>
//                   <Link className={'sidebar__link'} href="#">
//                     <Image
//                       className={'sidebar__img'}
//                       src="/img/playlist01.png"
//                       alt="day's playlist"
//                       width={250}
//                       height={170}
//                     />
//                   </Link>
//                 </div>
//                 <div className={'sidebar__item'}>
//                   <Link className={'sidebar__link'} href="#">
//                     <Image
//                       className={'sidebar__img'}
//                       src="/img/playlist02.png"
//                       alt="day's playlist"
//                       width={250}
//                       height={170}
//                     />
//                   </Link>
//                 </div>
//                 <div className={'sidebar__item'}>
//                   <Link className={'sidebar__link'} href="#">
//                     <Image
//                       className={'sidebar__img'}
//                       src="/img/playlist03.png"
//                       alt="day's playlist"
//                       width={250}
//                       height={170}
//                     />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//           <Sidebar />
//         </main>
//         <Bar />
//         {/* <div className={styles.bar}>
//           <div className={styles.bar__content}>
//             <div className={styles.bar__playerProgress}></div>
//             <div className={styles.bar__playerBlock}>
//               <div className={styles.bar__player}>
//                 <div className={styles.player__controls}>
//                   <div className={styles.player__btnPrev}>
//                     <svg className={styles.player__btnPrevSvg}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
//                     </svg>
//                   </div>
//                   <div className={classnames(styles.player__btnPlay, styles.btn)}>
//                     <svg className={styles.player__btnPlaySvg}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
//                     </svg>
//                   </div>
//                   <div className={styles.player__btnNext}>
//                     <svg className={styles.player__btnNextSvg}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
//                     </svg>
//                   </div>
//                   <div className={classnames(styles.player__btnRepeat, styles.btnIcon)}>
//                     <svg className={styles.player__btnRepeatSvg}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
//                     </svg>
//                   </div>
//                   <div className={classnames(styles.player__btnShuffle, styles.btnIcon)}>
//                     <svg className={styles.player__btnShuffleSvg}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
//                     </svg>
//                   </div>
//                 </div>

//                 <div className={styles.player__trackPlay}>
//                   <div className={styles.trackPlay__contain}>
//                     <div className={styles.trackPlay__image}>
//                       <svg className={styles.trackPlay__svg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                       </svg>
//                     </div>
//                     <div className={styles.trackPlay__author}>
//                       <Link className={styles.trackPlay__authorLink} href="">
//                         Ты та...
//                       </Link>
//                     </div>
//                     <div className={styles.trackPlay__album}>
//                       <Link className={styles.trackPlay__albumLink} href="">
//                         Баста
//                       </Link>
//                     </div>
//                   </div>

//                   <div className={styles.trackPlay__dislike}>
//                     <div className={classnames(styles.player__btnShuffle, styles.btnIcon)}>
//                       <svg className={styles.trackPlay__likeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                     </div>
//                     <div className={classnames(styles.trackPlay__dislike, styles.btnIcon)}>
//                       <svg className={styles.trackPlay__dislikeSvg}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className={styles.bar__volumeBlock}>
//                 <div className={styles.volume__content}>
//                   <div className={styles.volume__image}>
//                     <svg className={styles.volume__svg}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
//                     </svg>
//                   </div>
//                   <div className={classnames(styles.volume__progress, styles.btn)}>
//                     <input
//                       className={classnames(styles.volume__progressLine, styles.btn)}
//                       type="range"
//                       name="range"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// import Image from 'next/image';
// import Link from 'next/link';
// import classnames from 'classnames';

// // import './page.css';
// import styles from './page.module.css';
// // import Bar from '@components/Bar';
// import Bar from '../components/Bar/Bar';

// export default function Home() {
//   return (
//     // <div className={'wrapper'}>
//     <div className={styles.wrapper}>
//       <div className={'container'}>
//         <main className={'main'}>
//           <nav className={'main__nav'}>
//             <div className={'nav__logo'}>
//               {/*TODO: img –> Image*/}
//               <Image
//                 width={250}
//                 height={170}
//                 className={'logo__image'}
//                 src="/img/logo.png"
//                 alt={'logo'}
//               />
//             </div>
//             {/* <div className={'nav__burger'}> */}
//             <div className={styles.nav__burger}>
//               <span className={'burger__line'}></span>
//               <span className={'burger__line'}></span>
//               <span className={'burger__line'}></span>
//             </div>
//             <div className={'nav__menu'}>
//               <ul className={'menu__list'}>
//                 <li className={'menu__item'}>
//                   {/*TODO: a -> Link*/}
//                   <Link href="#" className={'menu__link'}>
//                     Главное
//                   </Link>
//                 </li>
//                 <li className={'menu__item'}>
//                   <Link href="#" className={'menu__link'}>
//                     Мой плейлист
//                   </Link>
//                 </li>
//                 <li className={'menu__item'}>
//                   <Link href="../signin.html" className={'menu__link'}>
//                     Войти
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//           <div className={'centerblock'}>
//             <div className={'centerblock__search'}>
//               <svg className={'search__svg'}>
//                 <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
//               </svg>
//               <input
//                 className={'search__text'}
//                 type="search"
//                 placeholder="Поиск"
//                 name="search"
//               />
//             </div>
//             <h2 className={'centerblock__h2'}>Треки</h2>
//             <div className={'centerblock__filter'}>
//               <div className={'filter__title'}>Искать по:</div>
//               <div className={'filter__button'}>исполнителю</div>
//               <div className={'filter__button'}>году выпуска</div>
//               <div className={'filter__button'}>жанру</div>
//             </div>
//             <div className={'centerblock__content'}>
//               <div className={'content__title'}>
//                 <div className={classnames(styles.playlistTitle__col, styles.col01)}>Трек</div>
//                 <div className={'playlistTitle__col col02'}>Исполнитель</div>
//                 <div className={'playlistTitle__col col03'}>Альбом</div>
//                 <div className={'playlistTitle__col col04'}>
//                   <svg className={'playlistTitle__svg'}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
//                   </svg>
//                 </div>
//               </div>
//               <div className={'content__playlist'}>
//                 <div className={'playlist__item'}>
//                   <div className={'playlist__track'}>
//                     <div className={'track__title'}>
//                       <div className={'track__titleImage'}>
//                         <svg className={'track__titleSvg'}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={'track__titleLink'} href="">
//                           Guilt <span className={'track__titleSpan'}></span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={'track__author'}>
//                       <Link className={'track__authorLink'} href="">
//                         Nero
//                       </Link>
//                     </div>
//                     <div className={'track__album'}>
//                       <Link className={'track__albumLink'} href="">
//                         Welcome Reality
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={'track__timeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={'track__timeText'}>4:44</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={'playlist__item'}>
//                   <div className={'playlist__track'}>
//                     <div className={'track__title'}>
//                       <div className={'track__titleImage'}>
//                         <svg className={'track__titleSvg'}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={'track__titleLink'} href="">
//                           Elektro <span className={'track__titleSpan'}></span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={'track__author'}>
//                       <Link className={'track__authorLink'} href="">
//                         Dynoro, Outwork, Mr. Gee
//                       </Link>
//                     </div>
//                     <div className={'track__album'}>
//                       <Link className={'track__albumLink'} href="">
//                         Elektro
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={'track__timeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={'track__timeText'}>2:22</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={'playlist__item'}>
//                   <div className={'playlist__track'}>
//                     <div className={'track__title'}>
//                       <div className={'track__titleImage'}>
//                         <svg className={'track__titleSvg'}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={'track__titleLink'} href="">
//                           I’m Fire <span className={'track__titleSpan'}></span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={'track__author'}>
//                       <Link className={'track__authorLink'} href="">
//                         Ali Bakgor
//                       </Link>
//                     </div>
//                     <div className={'track__album'}>
//                       <Link className={'track__albumLink'} href="">
//                         I’m Fire
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={'track__timeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={'track__timeText'}>2:22</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={'playlist__item'}>
//                   <div className={'playlist__track'}>
//                     <div className={'track__title'}>
//                       <div className={'track__titleImage'}>
//                         <svg className={'track__titleSvg'}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div className="track__title-text">
//                         <Link className={'track__titleLink'} href="">
//                           Non Stop
//                           <span className={'track__titleSpan'}>(Remix)</span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={'track__author'}>
//                       <Link className={'track__authorLink'} href="">
//                         Стоункат, Psychopath
//                       </Link>
//                     </div>
//                     <div className={'track__album'}>
//                       <Link className={'track__albumLink'} href="">
//                         Non Stop
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={'track__timeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={'track__timeText'}>4:12</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={'playlist__item'}>
//                   <div className={'playlist__track'}>
//                     <div className={'track__title'}>
//                       <div className={'track__titleImage'}>
//                         <svg className={'track__titleSvg'}>
//                           <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                         </svg>
//                       </div>
//                       <div>
//                         <Link className={'track__titleLink'} href="">
//                           Run Run
//                           <span className={'track__titleSpan'}>
//                             (feat. AR/CO)
//                           </span>
//                         </Link>
//                       </div>
//                     </div>
//                     <div className={'track__author'}>
//                       <Link className={'track__authorLink'} href="">
//                         Jaded, Will Clarke, AR/CO
//                       </Link>
//                     </div>
//                     <div className={'track__album'}>
//                       <Link className={'track__albumLink'} href="">
//                         Run Run
//                       </Link>
//                     </div>
//                     <div className="track__time">
//                       <svg className={'track__timeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                       <span className={'track__timeText'}>2:54</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={'main__sidebar'}>
//             <div className={'sidebar__personal'}>
//               <p className={'sidebar__personalName'}>Sergey.Ivanov</p>
//               <div className={'sidebar__icon'}>
//                 <svg>
//                   <use xlinkHref="/img/icon/sprite.svg#logout"></use>
//                 </svg>
//               </div>
//             </div>
//             <div className={'sidebar__block'}>
//               <div className={'sidebar__list'}>
//                 <div className={'sidebar__item'}>
//                   <Link className={'sidebar__link'} href="#">
//                     <Image
//                       className={'sidebar__img'}
//                       src="/img/playlist01.png"
//                       alt="day's playlist"
//                       width={250}
//                       height={170}
//                     />
//                   </Link>
//                 </div>
//                 <div className={'sidebar__item'}>
//                   <Link className={'sidebar__link'} href="#">
//                     <Image
//                       className={'sidebar__img'}
//                       src="/img/playlist02.png"
//                       alt="day's playlist"
//                       width={250}
//                       height={170}
//                     />
//                   </Link>
//                 </div>
//                 <div className={'sidebar__item'}>
//                   <Link className={'sidebar__link'} href="#">
//                     <Image
//                       className={'sidebar__img'}
//                       src="/img/playlist03.png"
//                       alt="day's playlist"
//                       width={250}
//                       height={170}
//                     />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         <Bar />
//         {/* <div className={'bar'}>
//           <div className={'bar__content'}>
//             <div className={'bar__playerProgress'}></div>
//             <div className={'bar__playerBlock'}>
//               <div className={'bar__player'}>
//                 <div className={'player__controls'}>
//                   <div className={'player__btnPrev'}>
//                     <svg className={'player__btnPrevSvg'}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
//                     </svg>
//                   </div>
//                   <div className={'player__btnPlay btn'}>
//                     <svg className={'player__btnPlaySvg'}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
//                     </svg>
//                   </div>
//                   <div className={'player__btnNext'}>
//                     <svg className={'player__btnNextSvg'}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
//                     </svg>
//                   </div>
//                   <div className={'player__btnRepeat btnIcon'}>
//                     <svg className={'player__btnRepeatSvg'}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
//                     </svg>
//                   </div>
//                   <div className={'player__btnShuffle btnIcon'}>
//                     <svg className={'player__btnShuffleSvg'}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
//                     </svg>
//                   </div>
//                 </div>

//                 <div className={'player__trackPlay'}>
//                   <div className={'trackPlay__contain'}>
//                     <div className={'trackPlay__image'}>
//                       <svg className={'trackPlay__svg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                       </svg>
//                     </div>
//                     <div className={'trackPlay__author'}>
//                       <Link className={'trackPlay__authorLink'} href="">
//                         Ты та...
//                       </Link>
//                     </div>
//                     <div className={'trackPlay__album'}>
//                       <Link className={'trackPlay__albumLink'} href="">
//                         Баста
//                       </Link>
//                     </div>
//                   </div>

//                   <div className={'trackPlay__dislike'}>
//                     <div className={'player__btnShuffle btnIcon'}>
//                       <svg className={'trackPlay__likeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                       </svg>
//                     </div>
//                     <div className={'trackPlay__dislike btnIcon'}>
//                       <svg className={'trackPlay__dislikeSvg'}>
//                         <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className={'bar__volumeBlock'}>
//                 <div className={'volume__content'}>
//                   <div className={'volume__image'}>
//                     <svg className={'volume__svg'}>
//                       <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
//                     </svg>
//                   </div>
//                   <div className={'volume__progress btn'}>
//                     <input
//                       className={'volume__progressLine btn'}
//                       type="range"
//                       name="range"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// то, что было изначально
// import Image from 'next/image';
// import styles from './page.module.css';

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className={styles.intro}>
//           <h1>To get started, edit the page.tsx file.</h1>
//           <p>
//             Looking for a starting point or more instructions? Head over to{' '}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Templates
//             </a>{' '}
//             or the{' '}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learning
//             </a>{' '}
//             center.
//           </p>
//         </div>
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className={styles.secondary}
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
