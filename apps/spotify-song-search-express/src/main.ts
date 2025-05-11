/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as path from 'path';

require('dotenv').config();

import spotifyRoutes from './routers/spotify';

const app = express();

const port = process.env.PORT || 3333;

app.use(cors());

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/spotify', spotifyRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to spotify-song-search-express!' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
