<template>
  <div>this is a callback page</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { getSpotifyToken, getGeniusToken } from '../api';
import router from '../router';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');
  if (error) {
    console.error(error);
    return;
  }
  if (code) {
    switch (route.params.type) {
      case 'spotify':
        getSpotifyToken({ code, state: state ?? '' })
          .then(async (res) => {
            router.push({ name: 'home' });
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      case 'genius':
        getGeniusToken({ code, state: state ?? '' })
          .then(async (res) => {
            router.push({ name: 'home' });
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      default:
        console.error('Unknown type:', route.params.type);
    }
  } else {
    console.error('No code or state found in the URL');
  }
});

</script>
<style lang="scss" scoped></style>
