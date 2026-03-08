import { TrackType } from '@/sharedTypes/sharedTypes';

export const getNextOrPrevTrack = (
  playlist: TrackType[],
  currentTrack: TrackType | null,
  direction: 'next' | 'prev',
): TrackType | null => {
  if (!currentTrack) return null;

  const currIdx = playlist.findIndex((el) => el._id === currentTrack._id);
  if (currIdx === -1) return null;

  const newIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
  if (newIdx < 0 || newIdx >= playlist.length) return null;

  return playlist[newIdx];
};
