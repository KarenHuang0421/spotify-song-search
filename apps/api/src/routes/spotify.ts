import axios from 'axios';
import express from 'express';
import queryString from 'query-string';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUrl: process.env.SPOTIFY_REDIRECT_URL,
});

const client_id = process.env.SPOTIFY_CLIENT_ID ?? '';
const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? '';
const redirect_uri =
  process.env.SPOTIFY_REDIRECT_URI ?? 'http://localhost:3000/callback';

const router = express.Router();

const generateRandomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', function (req, res) {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-library-read';

  const redirectUrl =
    'https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });
  res.send({ redirectUrl });
});

router.post('/get_token', (req, res) => {
  const code = req.body.code;
  const state = req.body.state;

  axios
    .post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log('Error:', error);
      res.status(500).send({ error: error.response.data });
      // // 處理錯誤
    });
});

router.get('/me', async (req, res) => {
  const access_token = req.headers['authorization']?.split(' ')[1];
  if (!access_token) {
    return res.status(401).send({ error: 'No access token provided' });
  }
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(req.headers['refresh_token'] as string);

  try {
    const data = await spotifyApi.getMe();
    res.send(data.body);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).send({ error: 'Failed to get user profile' });
  }
});

router.get('/savedTracks', async (req, res) => {
  try {
    const data = await spotifyApi.getMySavedTracks({ limit: 20 });
    const tracks = data.body.items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((artist) => artist.name).join(', '),
      album: item.track.album.name,
      imageUrl: item.track.album.images[0]?.url,
    }));
    res.send(tracks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.response.data });
  }
});

module.exports = router;
