import { Router } from 'express';
import {
  authorizeSpotify,
  getLikedTracks,
  getMe,
} from '../services/spotifyService';
const router = Router();

router.get('/auth', async (req, res) => {
  try {
    const data = await authorizeSpotify();
    res.json(data);
  } catch (err) {
    console.error('Error during Spotify authorization:', err);
    res.status(500).json({ error: 'Failed to authorize with Spotify' });
  }
});

router.get('/liked', async (req, res) => {
  try {
    await authorizeSpotify();
    const tracks = await getLikedTracks();
    res.json(tracks);
  } catch (err) {
    const { error } = err.body;
    res.status(error.status).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    await authorizeSpotify();
    const me = await getMe();
    res.json(me);
  } catch (err) {
    const { error } = err.body;
    console.log(err);
    res.status(error.status).json({ error: error.message });
  }
});

export default router;
