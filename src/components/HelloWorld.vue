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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  emits: ['send'],
  setup (props, { emit }) {
    const count = ref(0);
    const todos = ref<string[]>([]);
    const todo = ref('');
    const addTodo = () => {
      todos.value.push(todo.value);
      emit('send', todo.value);
      todo.value = '';
    };
    const setCount = () => {
      count.value++;
    };
    return {
      count,
      setCount,
      todo,
      todos,
      addTodo,
    };
  },
});
</script>
