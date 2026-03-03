'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
import MusicLayout from '@/app/music/MusicLayout';

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
