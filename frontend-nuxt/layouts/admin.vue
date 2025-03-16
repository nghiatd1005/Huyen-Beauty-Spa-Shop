<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <nuxt-link class="navbar-brand" to="/dashboard">Dashboard</nuxt-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto"></ul>
        <button class="btn btn-outline-danger" @click="logout">Đăng xuất</button>
      </div>
    </nav>
    <div class="mt-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
authStore.checkAuth();

const logout = () => {
  authStore.logout();
};
</script>