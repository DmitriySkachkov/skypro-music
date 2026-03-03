'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeLikedTracks } from '@/store/features/trackSlice';
import { withReAuth } from '@/utils/withReAuth';
import { removeLike } from '@/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';
import MusicLayout from '@/app/music/MusicLayout';
import { useRouter } from 'next/navigation';

export default function MyPlaylistPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);

  const [tracks, setTracks] = useState(favoriteTracks);
  const [isLoading, setIsLoading] = useState(false);
  const [errorRes, setErrorRes] = useState<string | null>(null);

  useEffect(() => {
    setTracks(favoriteTracks);
  }, [favoriteTracks]);

  // ограничение доступа
  useEffect(() => {
    if (!access) {
      router.replace('/music/main');
    }
  }, [access, router]);

  const handleRemoveLike = async (trackId: number) => {
    if (!access || !refresh) {
      setErrorRes('Не авторизован');
      return;
    }

    setIsLoading(true);
    setErrorRes(null);

    try {
      await withReAuth(
        (token) => removeLike(token, trackId),
        refresh,
        dispatch,
        access,
      );
      // удаляем трек из Redux
      dispatch(removeLikedTracks(trackId));
    } catch (err) {
      setErrorRes('Не удалось удалить трек из избранного');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MusicLayout>
      <Centerblock
        tracks={tracks}
        isLoading={isLoading}
        errorRes={errorRes}
        itemName="Мой плейлист"
        onLikeClick={(trackId: number) => handleRemoveLike(trackId)} 
      />
    </MusicLayout>
  );
}
