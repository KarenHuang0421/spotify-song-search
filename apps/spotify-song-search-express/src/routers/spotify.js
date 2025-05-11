import { Router } from 'express';
const router = Router();
import { getLikedTracks } from '../services/spotifyService';

router.get('/liked', async (req, res) => {
  try {
    const tracks = await getLikedTracks();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
