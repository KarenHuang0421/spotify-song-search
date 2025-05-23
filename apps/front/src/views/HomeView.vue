<template>
  <div class="home">
    <h1>My Saved Songs</h1>
    <button
      v-if="!songs.length"
      @click="handleLogin"
    >
      Login
    </button>
    <div class="songs-list">
      <div
        v-for="song in songs"
        :key="song.id"
        class="song-item"
      >
        <img
          :src="song.imageUrl"
          alt="Album cover"
          class="song-image"
        >
        <div class="song-info">
          <h2 class="song-name">
            {{ song.name }}
          </h2>
          <p class="song-artists">
            {{ song.artists }}
          </p>
          <p class="song-album">
            {{ song.album }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  getHello,
  getSpotifyMeProfile,
  getSpotifySavedTracks,
  login,
} from '../api';

interface songType {
  id: string;
  name: string;
  artists: string[];
  album: string;
  imageUrl: string;
}

const songs = ref<songType[]>([]);

onMounted(() => {
  getHello();

  if (localStorage.getItem('access_token')) {
    getData();
  }
});

const getData = async () => {
  try {
    await getSpotifyMeProfile();
    songs.value = await getSpotifySavedTracks();
  } catch (err) {
    console.error(err);
  }
};

const handleLogin = () => {
  login()
    .then((res) => {
      if (res.redirectUrl) {
        window.open(res.redirectUrl, '_self');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style>
@media (min-width: 768px) {
  .home {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }
}

.song-item {
  display: flex;
  flex-direction: row;
}

.song-image {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
}
</style>
