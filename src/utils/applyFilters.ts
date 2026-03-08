import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let result = [...state.pagePlaylist];
  const { authors, genres, search, sort } = state.filters;

  if (authors.length) result = result.filter((t) => authors.includes(t.author));
  if (genres.length)
    result = result.filter((t) => genres.some((g) => t.genre.includes(g)));
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.author.toLowerCase().includes(q),
    );
  }

  switch (sort) {
    case 'year_new':
      result.sort(
        (a, b) =>
          Number(b.release_date?.slice(0, 4)) -
          Number(a.release_date?.slice(0, 4)),
      );
      break;

    case 'year_old':
      result.sort(
        (a, b) =>
          Number(a.release_date?.slice(0, 4)) -
          Number(b.release_date?.slice(0, 4)),
      );
      break;

    case 'author':
      result.sort((a, b) => a.author.localeCompare(b.author));
      break;

    default:
      break;
  }

  return result;
};
