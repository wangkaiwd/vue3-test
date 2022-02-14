<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="setCount">{{ count }}</button>
    <br/>
    <input type="text" v-model="todo"/>
    <button class="add-todo" @click="addTodo">add todo</button>
    <ul>
      <li v-for="(todo, i) in todos" :key="i">{{ todo }}</li>
    </ul>

    <h2>userInfo</h2>
    <button class="user" @click="getUser">get user</button>
    <div class="loading" v-if="user.loading">loading...</div>
    <div class="username" v-if="user.data.username">
      {{ user.data.username }}
    </div>
    <div class="error" v-if="user.error">
      error!
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  emits: ['send'],
  setup (props, { emit }) {
    const count = ref(0);
    const todos = ref<string[]>([]);
    const user = reactive({
      data: {},
      loading: false,
      error: null
    });
    const todo = ref('');
    const addTodo = () => {
      todos.value.push(todo.value);
      emit('send', todo.value);
      todo.value = '';
    };
    const getUser = () => {
      user.loading = true;
      axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then((res) => {
          user.data = res.data;
        })
        .catch((err) => {
          user.error = err.message;
        })
        .finally((() => {
          user.loading = false;
        }))
    };
    const setCount = () => {
      count.value++;
    };
    return {
      count,
      setCount,
      user,
      todo,
      todos,
      addTodo,
      getUser
    };
  },
});
</script>
