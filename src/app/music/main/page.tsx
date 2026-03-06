'use client';

import MusicLayout from '@/app/music/MusicLayout';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <MusicLayout>
      <Centerblock
        tracks={allTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        itemName="Треки"
      />
    </MusicLayout>
  );
}
