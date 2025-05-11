import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// 取得 token
async function authorizeSpotify() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body['access_token']);
}

// 取得喜歡的歌
async function getLikedTracks() {
  await authorizeSpotify();

  const data = await spotifyApi.getMySavedTracks({ limit: 10 });
  return data.body.items.map((item) => ({
    title: item.track.name,
    artist: item.track.artists[0].name,
  }));
}

export { getLikedTracks };
