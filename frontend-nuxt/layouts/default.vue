<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <nuxt-link class="navbar-brand" to="/">Trang chủ</nuxt-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/cart">Giỏ hàng</nuxt-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <nuxt-link class="nav-link" to="/login">Đăng nhập</nuxt-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <nuxt-link class="nav-link" to="/register">Đăng ký</nuxt-link>
          </li>
        </ul>
        <span class="navbar-text" v-if="isLoggedIn">
          Xin chào, {{ user?.email || 'N/A' }} ({{ user?.role || 'N/A' }})
          <nuxt-link v-if="isAdmin" class="btn btn-outline-primary ms-2" to="/dashboard">Dashboard</nuxt-link>
          <button class="btn btn-outline-danger ms-2" @click="logout">Đăng xuất</button>
        </span>
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
const isLoggedIn = computed(() => authStore.isLoggedIn);
const isAdmin = computed(() => authStore.isAdmin);
const user = computed(() => authStore.user);

const logout = () => {
  authStore.logout();
};
</script>