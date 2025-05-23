import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  // timeout: 5000,
} as AxiosRequestConfig);

export async function getHello(): Promise<any> {
  const response = await instance.get('/');
  return response.data;
}

export async function login(): Promise<any> {
  const response = await instance.get('/spotify/login');
  return response.data;
}

export async function getToken(data: {
  code: string;
  state: string;
}): Promise<any> {
  const response = await instance.post('/spotify/get_token', data);
  if (response.status !== 200) {
    throw new Error('Failed to get token');
  }

  if (response.data.access_token) {
    const { access_token, refresh_token, expires_in, token_type } =
      response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem(
      'expires_in',
      (Date.now() + expires_in * 1000).toString()
    );

    instance.defaults.headers.common[
      'Authorization'
    ] = `${token_type} ${access_token}`;
  }

  return response.data;
}

export async function getSpotifyMeProfile(): Promise<any> {
  const response = await instance.get('/spotify/me');
  return response.data;
}

export async function getSpotifySavedTracks(): Promise<any> {
  const response = await instance.get('/spotify/savedTracks');
  return response.data;
}
