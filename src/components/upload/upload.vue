<template>
  <div class="upload">
    <input ref="inputRef" type="file" class="upload-input" @change="onChange">
    <div class="trigger">
      <slot>
        <a-button
          class="upload-button"
          :disabled="isUploading"
          @click="onClick"
          type="primary"
        >
          上传
        </a-button>
      </slot>
    </div>
    <ul class="upload-list">
      <li
        class="upload-item"
        :class="`upload-item-${item.status}`"
        v-for="item in uploadedFiles"
        :key="item.uid"
      >
        <span class="upload-item-filename">{{ item.name }}</span>
        <close-outlined class="upload-item-delete" @click="onDelete(item.uid)"></close-outlined>
        <loading-outlined v-if="item.status === 'loading'"></loading-outlined>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { Button } from 'ant-design-vue';
import axios from 'axios';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

interface UploadFile {
  uid: string;
  status: UploadStatus;
  name: string;
  //response:
  raw: File;
}

export default defineComponent({
  name: 'Upload',
  props: {
    action: {
      type: String,
      default: 'http://localhost:3000/upload'
    }
  },
  components: { AButton: Button, CloseOutlined, LoadingOutlined },
  setup (props) {
    const inputRef = ref<null | HTMLInputElement>(null);
    const uploadedFiles = ref<UploadFile[]>([]);
    const onClick = (e: Event) => {
      if (inputRef.value) { // trigger click event of input manually
        inputRef.value.click();
      }
    };
    const upload = (file: UploadFile) => { // file
      const formData = new FormData();
      formData.append('file', file.raw);
      file.status = 'loading';
      axios.post(props.action!, formData).then((res) => {
        // console.log('res', res);
        file.status = 'success';
      }).catch((err) => {
        // console.log('err', err);
        file.status = 'error';
      });
    };
    const createUploadFile = (raw: File): UploadFile => {
      const uid = Date.now().toString();
      return reactive({
        uid,
        name: raw.name,
        status: 'ready',
        raw
      });
    };
    const onDelete = (uid: string) => {
      uploadedFiles.value = uploadedFiles.value.filter(item => item.uid !== uid);
    };

    const isUploading = computed(() => {
      return uploadedFiles.value.some((item) => item.status === 'loading');
    });

    const onChange = (e: Event) => {
      const files = Array.from((e.target as HTMLInputElement).files ?? []);
      if (inputRef.value) {
        inputRef.value.value = '';
      }
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const rawFile = files[i];
          const file = createUploadFile(rawFile);
          uploadedFiles.value.push(file);
          // must change proxy object
          // change file(origin object) wouldn't trigger update
          // upload(getItemById(file.uid)!);

          // or create reactive object
          upload(file);
        }
      }
    };
    return {
      onClick,
      inputRef,
      onChange,
      uploadedFiles,
      onDelete,
      isUploading
    };
  },
});
</script>

<style lang="less" scoped>
.upload {
  .upload-input {
    display: none;
  }
  .upload-item-success {
    color: green;
  }
  .upload-item-error {
    color: red;
  }
  .upload-list {
    margin: 0;
    padding: 0;
    width: 300px;
  }
  .upload-item {
    display: flex;
    align-items: center;
    .upload-item-delete {
      margin-left: auto;
    }
  }
}
</style>
