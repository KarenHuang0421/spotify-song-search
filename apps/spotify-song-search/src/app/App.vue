<template>
  <NxWelcome title="spotify-song-search" />
  <button @click="login">
    LOGIN
  </button>
  <button @click="search">
    TEST SEARCH
  </button>
</template>
<script setup lang="ts">
import axios from 'axios';
import NxWelcome from './NxWelcome.vue';

const BASE_URL = 'https://api.genius.com';
const instance = ref(null);

const CLIENT_ID = 'CrnA-FwDjQs0h4KeUYe5UJcs5x2nm5xjEBcfKDF0W2bTbVo3KXPRQJX5aJKJgFB5';
const CLIENT_SECRET = '7sVV0c0USCbL-qzgrcQXhLYTzqn0zUDiyB-_VGjv_Hw2ugQs7XfeN22dBrkvjiTkqKfd5yLbFY_dE49jBNheig';
const TEST = '';
const REDIRECT_URL= 'http://localhost:4200/callback';
// const SCOPE = 'me';

onMounted(() => {
  init();
})

const init = async () => {
  instance.value = await axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

const login = () => {
  //browser redirect
  const authUrl = `${BASE_URL}/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  window.location.href = authUrl;
}

const search = async () => {
  const songName = 'hello';
  instance.value.get('/search', {
    params: {
      q: songName,
    }
  }).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.error('Error fetching search results:', error);
  });
}

const setToken = async (code: string) => {
  instance.value.defaults.headers.common['Authorization'] = `Bearer ${code}`;
}

watchEffect(() => {
  console.log('watching for code');
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    init().then(() => {
      setToken(code);
    });
  }
})

// const getAuth = () => {
//   instance.value.get('/oauth/authorize', {
//     params: {
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       redirect_uri: REDIRECT_URL,
//       response_type: 'code',
//       // scope: SCOPE,
//     }
//   }).then((response) => {
//     console.log(response.data);
//   }).catch((error) => {
//     console.error('Error fetching auth token:', error);
//   });
// }
</script>

