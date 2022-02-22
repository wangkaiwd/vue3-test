<template>
  <div class="upload">
    <input ref="inputRef" type="file" class="upload-input" @change="onChange">
    <a-button @click="onClick" type="primary">上传</a-button>
    <div class="upload-loading" v-if="fileStatus === 'loading'">上传中</div>
    <div class="upload-success" v-if="fileStatus === 'success'">上传成功</div>
    <div class="upload-error" v-if="fileStatus === 'error'">上传失败</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { Button } from 'ant-design-vue';
import axios from 'axios';

type FILE_STATUS = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  name: 'Upload',
  components: { AButton: Button },
  setup () {
    const inputRef = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<FILE_STATUS>('ready');
    const onClick = (e: Event) => {
      if (inputRef.value) { // trigger click event of input manually
        inputRef.value.click();
      }
    };
    const upload = (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      axios({ method: 'post', url: 'http://localhost:3000/upload', data: formData }).then((res) => {
        console.log('res', res);
        fileStatus.value = 'success';
      }).catch((err) => {
        console.log('err', err);
        fileStatus.value = 'error';
      });
    };

    const onChange = (e: Event) => {
      console.log('change', e);
      const files = (e.target as HTMLInputElement).files;
      console.log('files', files);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          upload(file);
        }
      }
    };
    return {
      onClick,
      inputRef,
      onChange,
      fileStatus
    };
  },
});
</script>

<style lang="less" scoped>
.upload {
  .upload-input {
    display: none;
  }
}
</style>
