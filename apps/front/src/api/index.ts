import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  // timeout: 5000,
} as AxiosRequestConfig);

export type Services = 'spotify' | 'genius';

export async function getHello(): Promise<any> {
  const response = await instance.get('/');
  return response.data;
}

export async function login(service: Services): Promise<any> {
  const response = await instance.get(`${service}/login`);
  return response.data;
}

export async function getSpotifyToken(data: {
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
    localStorage.setItem('spotify_access_token', access_token);
    localStorage.setItem('spotify_refresh_token', refresh_token);
    localStorage.setItem(
      'spotify_auth_expires_in',
      (Date.now() + expires_in * 1000).toString()
    );

    instance.defaults.headers.common[
      'Authorization'
    ] = `${token_type} ${access_token}`;
  }
  return response.data;
}

export async function getGeniusToken(data: {
  code: string;
  state: string;
}): Promise<any> {
  const response = await instance.post('/genius/get_token', data);
  if (response.status !== 200) {
    throw new Error('Failed to get Genius token');
  }
  if (response.data) {
    const { access_token, token_type } = response.data;
    localStorage.setItem('genius_access_token', access_token);
    return response.data;
  }
}

export async function getGeniusSearch(query: string): Promise<any> {
  const response = await instance.get('/genius/search', {
    params: { search: query },
  });
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

export async function getOpenAIChatResponse(message: string): Promise<any> {
  const response = await instance.get('/search', {
    params: { message },
  });
  return response.data;
}
