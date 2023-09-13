<template>
  <HeaderView />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './components/layout/HeaderView.vue';
</script>

