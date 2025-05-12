import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333',
  // timeout: 5000,
} as AxiosRequestConfig);

export async function test(): Promise<any> {
  const response = await instance.get('/api');
  return response.data;
}

export async function getAuth(): Promise<any> {
  const response = await instance.get('/spotify/auth');
  return response.data;
}

export async function getSpotifyLiked(): Promise<any> {
  const response = await instance.get('/spotify/liked');
  return response.data;
}

export async function getSpotifyMeProfile(): Promise<any> {
  const response = await instance.get('/spotify/me');
  return response.data;
}
