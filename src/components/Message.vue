<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
  hidden: {
    type: Number,
    default: 0,
  },
});

const visible = ref(true);

onMounted(() => {
  if (props.hidden <= 0) {
    return;
  }
  setTimeout(() => {
    visible.value = false;
  }, props.hidden);
});
</script>

<template>
  <div v-if="visible" class="fixed right-5 top-5 p-2 rounded-md z-50">
    {{ message }}
  </div>
</template>
