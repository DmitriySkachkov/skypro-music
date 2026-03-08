import { TrackType } from '@/sharedTypes/sharedTypes';
import { getNextOrPrevTrack } from '@/utils/getNextOrPrevTrack';

describe('функция для подучения следующего или предыдущего трека', () => {
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
    {
      _id: 3,
      name: 'Song C',
      author: 'Author3',
      genre: ['jazz'],
      release_date: '2022-01-01',
      duration_in_seconds: 240,
      album: 'Album3',
      logo: null,
      track_file: '',
      stared_user: [],
    },
  ];

  it('возвращает следующий трек', () => {
    expect(getNextOrPrevTrack(tracks, tracks[0], 'next')).toEqual(tracks[1]);
    expect(getNextOrPrevTrack(tracks, tracks[2], 'next')).toBeNull();
  });

  it('возвращает предыдущий трек', () => {
    expect(getNextOrPrevTrack(tracks, tracks[2], 'prev')).toEqual(tracks[1]);
    expect(getNextOrPrevTrack(tracks, tracks[0], 'prev')).toBeNull();
  });

  it('Возвращает null, если текущий трек отсутствует в плейлисте.', () => {
    const fakeTrack = { ...tracks[0], _id: 999 };
    expect(getNextOrPrevTrack(tracks, fakeTrack, 'next')).toBeNull();
  });
});
