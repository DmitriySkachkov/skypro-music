import axios from 'axios';
import { BASE_URL } from '@/services/constants';

export type AuthData = {
  email: string;
  password: string;
};

export type TokenType = {
  access: string;
  refresh: string;
};

export type UserType = {
  email: string;
  username: string;
  _id: string | number;
};

export type LoginResponse = {
  user: UserType;
  tokens: TokenType;
};

// Регистрация нового пользователя
export const registerUser = async ({ email, password }: AuthData) => {
  const data = {
    email: email.trim(),
    username: email.trim(), // используем email как username
    password: password.trim(),
  };

  const response = await axios.post(`${BASE_URL}/user/signup/`, data, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};

// Логин пользователя и получение токенов
export const loginUser = async ({
  email,
  password,
}: AuthData): Promise<LoginResponse> => {
  // Получаем данные пользователя
  const loginResponse = await axios.post(
    `${BASE_URL}/user/login/`,
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const user: UserType = loginResponse.data;

  // Получаем токены
  const tokenResponse = await axios.post(
    `${BASE_URL}/user/token/`,
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const tokens: TokenType = tokenResponse.data;

  return { user, tokens };
};

// Регистрация + авто-логин
export const registerAndLogin = async ({
  email,
  password,
}: AuthData): Promise<LoginResponse> => {
  await registerUser({ email, password });
  return loginUser({ email, password });
};

//  Обновление access-токена
export const refreshToken = async (
  refresh: string,
): Promise<{ access: string }> => {
  const response = await axios.post(
    `${BASE_URL}/user/token/refresh/`,
    { refresh },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return response.data;
};
