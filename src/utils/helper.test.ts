import { getUniqueValuesByKey, formatTime, getTimePanel } from './helper';
import { TrackType } from '@/sharedTypes/sharedTypes';

describe('getUniqueValuesByKey', () => {
  const tracks: TrackType[] = [
    {
      _id: 1,
      name: 'Song1',
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
      name: 'Song2',
      author: 'Author2',
      genre: ['rock', 'pop'],
      release_date: '2021-01-01',
      duration_in_seconds: 200,
      album: 'Album2',
      logo: null,
      track_file: '',
      stared_user: [],
    },
  ];

  it('Возвращает уникальные строковые значения для строкового ключа', () => {
    expect(getUniqueValuesByKey(tracks, 'author')).toEqual([
      'Author1',
      'Author2',
    ]);
  });

  it('Возвращает уникальные значения для ключа массива', () => {
    expect(getUniqueValuesByKey(tracks, 'genre').sort()).toEqual([
      'pop',
      'rock',
    ]);
  });
});

describe('formatTime', () => {
  it('Добавление нуля, если секунд меньше 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматируем время меньше одной минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });
  it('Обрабатываем ноль секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('Возвращает отформатированное текущее и общее время', () => {
    expect(getTimePanel(65, 125)).toBe('1:05 / 2:05');
  });

  it('Возвращает undefined, если totalTime не определено.', () => {
    expect(getTimePanel(65, undefined)).toBeUndefined();
  });
});
