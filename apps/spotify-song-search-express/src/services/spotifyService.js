import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUrl: process.env.SPOTIFY_REDIRECT_URL,
});

// 取得 token
async function authorizeSpotify() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body['access_token']);
  console.log(spotifyApi.getAccessToken());
  spotifyApi.authorizationCodeGrant('001', (err, data) => {
    console.log(err, data);
  });
  return spotifyApi.getCredentials();
}

// 取得喜歡的歌
async function getLikedTracks() {
  const data = await spotifyApi.getMySavedTracks({ limit: 10 });
  return data.body.items.map((item) => ({
    title: item.track.name,
    artist: item.track.artists[0].name,
  }));
}

async function getMe() {
  const data = await spotifyApi.getMe();
  return data.body;
}

export { authorizeSpotify, getLikedTracks, getMe };
