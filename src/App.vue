<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout from '@/components/Layout.vue';
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
</script>

<template>
  <Layout>
    <template v-slot:nav><Navbar /></template>
    <template v-slot:header><Header /></template>
    <template v-slot:main>
      <RouterView />
    </template>
  </Layout>
</template>

<style scoped></style>
