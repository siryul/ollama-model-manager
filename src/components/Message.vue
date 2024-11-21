<script setup lang="ts">
import { ref, onMounted, computed, withDefaults } from 'vue';

export type messageType = 'info' | 'success' | 'warn' | 'error';

const props = withDefaults(
  defineProps<{
    message: string;
    type?: messageType;
    hidden: number;
  }>(),
  {
    type: 'info',
    hidden: 0,
  },
);

const visible = ref(true);

const bgColor = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-white';
    case 'error':
      return 'bg-red-500 text-white';
    case 'success':
      return 'bg-green-500 text-white';
    case 'warn':
      return 'bg-orange-500 text-white';
  }
});

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
  <div v-if="visible" class="fixed right-5 top-5 p-2 rounded-md z-50 border" :class="bgColor">
    {{ props.message }}
  </div>
</template>
