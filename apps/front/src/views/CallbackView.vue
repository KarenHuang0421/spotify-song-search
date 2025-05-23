<template>
  <div>
    this is a callback page
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { getToken } from '../api';
import router from '../router';

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');
  if (error) {
    console.error(error);
    return;
  }
  if (code) {
    getToken({ code, state: state ?? ''})
      .then(async (res) => {
        router.push({ name: 'home' });
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.error('No code or state found in the URL');
  }

});

</script>
<style lang="scss" scoped>

</style>
