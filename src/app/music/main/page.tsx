'use client';

import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import Centerblock from '@/components/Centerblock/Centerblock';
import MusicLayout from '@/app/music/MusicLayout';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        // console.log('Загруженные треки:', res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            // console.log(error.request);
            setError('Что-то с интернетом. Ошибка загрузки');
          } else {
            // console.log('Error', error.message);
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MusicLayout> 
      <Centerblock
        tracks={tracks}
        itemName="Треки"
        loading={loading}
        error={error}
      />
    </MusicLayout>
  );
}
