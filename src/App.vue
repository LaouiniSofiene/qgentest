<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderVue from './components/Header.vue';
import FooterVue from './components/Footer.vue';

</script>

<template>
  <HeaderVue />
  <RouterView />
  <FooterVue />
</template>

<style>
@import '@/assets/base.css';

</style>
