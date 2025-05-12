<template>
  <button @click="getSongs">
    get liked songs
  </button>
  <button @click="login">
    login
  </button>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { getAuth, getSpotifyMeProfile, test } from '../api';

onMounted(() => {
  test().then((res: any) => {
    console.log('test', res);
  });
});

const getSongs = () => {
  getSpotifyMeProfile().then((res: any) => {
    console.log('getSpotifyMeProfile', res);
  });
  // getSpotifyLiked().then((res: any) => {
  //   console.log('getSpotifyLiked', res);
  // });
};

const login = () => {
  getAuth().then((res: any) => {
    console.log('getAuth', res);
    // window.location.href = res.redirectUrl;
  });
};
</script>
<style lang="scss" scoped>
button {
  margin:20px;
}
</style>
