'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { getTracks } from '@/services/tracks/tracksApi';
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
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const playlistsRes = await axios.get<{
          success: boolean;
          data: PlaylistType[];
        }>(`${BASE_URL}/catalog/selection/all`);
        const playlists = playlistsRes.data.data;

        const playlistId = Number(params.id) + 1;
        const playlist = playlists.find((p) => p._id === playlistId);

        if (!playlist) {
          setError('Подборка не найдена');
          return;
        }

        setPlaylistName(playlist.name);

        const allTracks = await getTracks();

        const filteredTracks = allTracks.filter((track) =>
          playlist.items.includes(track._id),
        );

        setTracks(filteredTracks);
      } catch (err) {
        console.error(err);
        setError('Что-то с интернетом. Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  return (
    <MusicLayout>
      <Centerblock
        tracks={tracks}
        itemName={playlistName}
        loading={loading}
        error={error}
      />
    </MusicLayout>
  );
}
