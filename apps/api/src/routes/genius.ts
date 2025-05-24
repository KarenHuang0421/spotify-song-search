import axios, { AxiosRequestConfig } from 'axios';
import express from 'express';
import queryString from 'query-string';

const router = express.Router();

const instance = axios.create({
  baseURL: 'https://api.genius.com',
} as AxiosRequestConfig);

router.get('/login', function (req, res) {
  const redirectUrl =
    'https://api.genius.com/oauth/authorize?' +
    queryString.stringify({
      client_id: process.env.GENIUS_CLIENT_ID,
      redirect_uri: process.env.GENIUS_REDIRECT_URI,
      scope: 'me',
      state: 'genius_auth',
      response_type: 'code',
    });
  res.send({ redirectUrl });
});

router.post('/get_token', (req, res) => {
  const code = req.body.code as string;
  const params = {
    code: code,
    client_secret: process.env.GENIUS_CLIENT_SECRET,
    client_id: process.env.GENIUS_CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: process.env.GENIUS_REDIRECT_URI,
  };

  instance
    .post('/oauth/token', null, {
      params,
    })
    .then((response) => {
      if (response.status == 200) {
        const { access_token, token_type } = response.data;
        instance.defaults.headers.common[
          'Authorization'
        ] = `${token_type} ${access_token}`;
      }
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send({ error: error.response.data });
    });
});

router.get('/search', (req, res) => {
  const q = req.query.search as string;
  const params = { q };

  instance.get('/search', { params }).then((response) => {
    if (response.status == 200) {
      res.send(response.data.response);
    } else {
      res.status(response.status).send({ error: 'Failed to fetch data' });
    }
  });
});

module.exports = router;
