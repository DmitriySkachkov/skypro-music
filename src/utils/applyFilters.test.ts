import { applyFilters } from './applyFilters';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';

describe('applyFilters', () => {
  const tracks: TrackType[] = [
    {
      _id: 1,
      name: 'Song A',
      author: 'Author1',
      genre: ['pop'],
      release_date: '2020-01-01',
      duration_in_seconds: 180,
      album: 'Album1',
      logo: null,
      track_file: '',
      stared_user: [],
    },
    {
      _id: 2,
      name: 'Song B',
      author: 'Author2',
      genre: ['rock'],
      release_date: '2021-01-01',
      duration_in_seconds: 200,
      album: 'Album2',
      logo: null,
      track_file: '',
      stared_user: [],
    },
  ];

  let state: initialStateType;

  beforeEach(() => {
    state = {
      currentTrack: null,
      isPlay: false,
      playlist: [],
      shuffledPlaylist: [],
      allTracks: [],
      favoriteTracks: [],
      isShuffle: false,
      fetchError: null,
      fetchIsLoading: false,
      pagePlaylist: tracks,
      filteredTracks: [],
      filters: {
        authors: [],
        genres: [],
        years: [],
        search: '',
        sort: 'default',
      },
    };
  });

  it('Возвращает все треки, если фильтры не применены', () => {
    expect(applyFilters(state)).toEqual(tracks);
  });

  it('Фильтрует по автору', () => {
    state.filters.authors = ['Author1'];

    expect(applyFilters(state)).toEqual([tracks[0]]);
  });

  it('Фильтрует по жанру', () => {
    state.filters.genres = ['rock'];

    expect(applyFilters(state)).toEqual([tracks[1]]);
  });

  it('Фильтрует по поисковому запросу', () => {
    state.filters.search = 'song b';

    expect(applyFilters(state)).toEqual([tracks[1]]);
  });

  it('Сортирует по году (новые сначала)', () => {
    state.filters.sort = 'year_new';

    expect(applyFilters(state)).toEqual([tracks[1], tracks[0]]);
  });

  it('Сортирует по году (старые сначала)', () => {
    state.filters.sort = 'year_old';

    expect(applyFilters(state)).toEqual([tracks[0], tracks[1]]);
  });

  it('Сортирует по автору', () => {
    state.filters.sort = 'author';

    expect(applyFilters(state)).toEqual([tracks[0], tracks[1]]);
  });
});
