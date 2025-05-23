import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const spotifyRoutes = require('./routes/spotify');

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/spotify', spotifyRoutes);

app.get('/', (req, res) => {
  console.log('backend response');
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
