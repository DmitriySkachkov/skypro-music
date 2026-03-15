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

  const { favoriteTracks, fetchIsLoading } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [errorRes, setErrorRes] = useState<string | null>(null);

  // Редирект если не авторизован
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
      // Удаляем трек из Redux
      dispatch(removeLikedTracks(trackId));
    } catch (err) {
      setErrorRes('Не удалось удалить трек из избранного');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Показываем загрузку, пока треки не загружены
  if (fetchIsLoading) {
    return (
      <MusicLayout>
        <Centerblock
          tracks={[]}
          isLoading={true}
          errorRes={null}
          itemName="Мой плейлист"
        />
      </MusicLayout>
    );
  }

  // Если избранное пустое - показываем пустой список
  if (!favoriteTracks || favoriteTracks.length === 0) {
    return (
      <MusicLayout>
        <Centerblock
          tracks={[]}
          isLoading={false}
          errorRes={null}
          itemName="Мой плейлист"
        />
      </MusicLayout>
    );
  }

  // Отображаем только избранные треки
  return (
    <MusicLayout>
      <Centerblock
        tracks={favoriteTracks}
        isLoading={isLoading}
        errorRes={errorRes}
        itemName="Мой плейлист"
        onLikeClick={(trackId: number) => handleRemoveLike(trackId)}
      />
    </MusicLayout>
  );
}
