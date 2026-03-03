import axios from 'axios';
import { BASE_URL } from '../constants';
import { ResCategoryApiType, TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios
    .get<{ success: boolean; data: TrackType[] }>(
      `${BASE_URL}/catalog/track/all/`,
    )
    .then((res) => res.data.data);
};

export const getCategories = (
  categoryId: string,
): Promise<ResCategoryApiType> => {
  return axios(BASE_URL + `/catalog/selection/${Number(categoryId) + 1}`).then(
    (res) => {
      return res.data;
    },
  );
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getFavoriteTracks = (access: string) => {
  return axios
    .get(BASE_URL + '/catalog/track/favorite/all/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => res.data.data);
};
