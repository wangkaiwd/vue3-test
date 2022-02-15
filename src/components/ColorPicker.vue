<template>
  <div class="color-picker">
    <!--  entering the color into a text field in #rrggbb hexadecimal format  -->
    <input type="color" :value="value" @change="onChange">
    <div class="color-list">
      <div
        v-for="(color,i) in colors"
        :key="i"
        @click="onClick(color)"
        class="color-list-item"
        :style="{backgroundColor: color}"
      >
      </div>
      <div class="color-list-item transparent" @click="onClick('#ffffff')">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue';

const defaultColors = ['#BFFFF0', '#F0FFC2', '#FFE4C0', '#FFBBBB', '#6A5495', '#6A5495', '#8BDB81'];
export default defineComponent({
  name: 'ColorPicker',
  props: {
    value: {
      type: String,
      required: true
    },
    colors: {
      type: Array as PropType<string[]>,
      default: defaultColors
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const state = reactive({});
    const onChange = (e: InputEvent) => {
      const value = (e.target as HTMLInputElement).value;
      emit('change', value);
    };
    const onClick = (color: string) => {
      emit('change', color);
    };
    return {
      ...toRefs(state),
      onChange,
      onClick
    };
  },
});
</script>

<style lang="less" scoped>
.color-picker {
  .color-list {
    display: flex;
    flex-wrap: wrap;
  }
  .color-list-item {
    &.transparent {
      background-color: transparent;
    }
    width: 60px;
    height: 40px;
    border: 1px solid pink;
  }
}
</style>
