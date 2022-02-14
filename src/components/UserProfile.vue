<template>
  <div class="user-profile">
    user
    <a-button type="primary">按钮</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'UserProfile',
  setup () {
    const state = reactive({});
    return {
      ...toRefs(state)
    };
  },
});
</script>

<style lang="less" scoped>
.user-profile {

}
</style>
