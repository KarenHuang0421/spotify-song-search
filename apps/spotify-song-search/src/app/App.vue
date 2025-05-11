<template>
  <button @click="login">
    login
  </button>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { getSpotifyLiked, test } from '../api';

onMounted(() => {
  test().then((res: any) => {
    console.log('test', res);
  });
});

const login = () => {
getSpotifyLiked().then((res: any) => {
    console.log('getSpotifyLiked', res);
  });
};
</script>
