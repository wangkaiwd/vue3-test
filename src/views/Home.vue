<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    <user-profile></user-profile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue';
import UserProfile from '@/components/UserProfile.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    UserProfile,
    // HelloWorld,
  },
});
</script>
