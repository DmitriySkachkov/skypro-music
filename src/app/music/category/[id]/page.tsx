'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';

import axios from 'axios';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { BASE_URL } from '@/services/constants';
import Centerblock from '@/components/Centerblock/Centerblock';
import MusicLayout from '@/app/music/MusicLayout';
interface PlaylistType {
  _id: number;
  name: string;
  items: number[];
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState<string>('');

  useEffect(() => {
    // Если глобальные треки не загружены или есть ошибка
    if (fetchIsLoading) return; // ждём загрузку
    if (fetchError || allTracks.length === 0) {
      setIsLoading(false); // стоп локальной загрузки
      return;
    }
    setIsLoading(true);

    const load = async () => {
      try {
        const playlistId = Number(params.id) + 1;
        const playlistsRes = await axios.get<{
          success: boolean;
          data: PlaylistType;
        }>(`${BASE_URL}/catalog/selection/${playlistId}/`);

        const playlist = playlistsRes.data.data;
        if (!playlist) {
          setErrorRes('Подборка не найдена');
          return;
        }

        setPlaylistName(playlist.name);

        const filteredTracks = allTracks.filter((track) =>
          playlist.items.includes(track._id),
        );
        setTracks(filteredTracks);
      } catch (err) {
        console.error(err);
        setErrorRes('Ошибка загрузки подборки');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [params.id, allTracks, fetchIsLoading, fetchError]);
  return (
    <MusicLayout>
      <Centerblock
        errorRes={errorRes || fetchError}
        tracks={tracks}
        isLoading={isLoading}
        itemName={playlistName}
      />
    </MusicLayout>
  );
}
