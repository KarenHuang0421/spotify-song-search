<template>
  <div class="home">
    <div class="row space-between">
      <h3>Login</h3>
      <div class="row">
        <button @click="() => handleLogin('spotify')">
          Spotify
        </button>
        <button @click="() => handleLogin('genius')">
          Genius
        </button>
      </div>
    </div>
    <template v-if="showSearch">
      <label for="search">Search</label>
      <input
        id="search"
        v-model="search"
        type="text"
        placeholder="Search for songs or artists"
      >
      <button @click="() => handleSearch()">
        Search
      </button>
    </template>
    <template v-if="songs.length > 0">
      <h1>My Saved Songs</h1>
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
            <a
              v-if="song.lyricsUrl"
              :href="song.lyricsUrl"
              target="_blank"
            >
              View Lyrics
            </a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  getGeniusSearch,
  getHello,
  getSpotifyMeProfile,
  getSpotifySavedTracks,
  login,
  Services,
} from '../api';

interface songType {
  id: string;
  name: string;
  artists: string[];
  album: string;
  imageUrl: string;
  lyricsUrl?: string;
}

const songs = ref<songType[]>([]);

const showSearch = ref(false);
const search = ref<string>('');
const searchResults = ref<songType[]>([]);

onMounted(() => {
  getHello();

  if (localStorage.getItem('spotify_access_token')) {
    getData();
  }
  if (localStorage.getItem('genius_access_token')) {
    showSearch.value = true;
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

const handleLogin = (service: Services) => {
  login(service)
    .then((res) => {
      if (res.redirectUrl) {
        window.open(res.redirectUrl, '_self');
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleSearch = () => {
  if (search.value.trim() === '') {
    return;
  }
  getGeniusSearch(search.value)
    .then((res) => {
      songs.value = [];
      res.hits.map(({ result: song }) => {
        songs.value.push({
          id: song.id,
          name: song.full_title,
          artists: song.artist_names,
          album: '',
          imageUrl: song.header_image_thumbnail_url || '',
          lyricsUrl: 'https://genius.com' + song.path,
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  flex-direction: row;
  gap: 1rem;

  &.space-between {
    justify-content: space-between;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
label,
button {
  margin: 0.5rem;
  padding: 0.5rem;
}

input {
  border: 1px solid #ccc;
}

a {
  color: rgb(136, 136, 136);
  text-decoration: underline;
  font-size: 0.9rem;
}

h3 {
  margin: 0;
}

@media (min-width: 768px) {
  .home {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
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
