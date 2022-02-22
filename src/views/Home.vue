<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    <!--        <user-profile></user-profile>-->
    <!--    <color-picker :value="value" @change="value = $event"></color-picker>-->
    <upload></upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue';
import UserProfile from '@/components/UserProfile.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import Upload from '@/components/upload/upload.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Upload,
    ColorPicker,
    UserProfile,
    // HelloWorld,
  },
  setup () {
    const value = ref('#BFFFF0');
    return {
      value
    };
  }
});
</script>
