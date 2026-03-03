import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios
    .get<{ success: boolean; data: TrackType[] }>(
      `${BASE_URL}/catalog/track/all/`,
    )
    .then((res) => res.data.data);
};
