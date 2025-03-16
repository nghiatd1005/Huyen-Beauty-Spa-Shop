<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center">Đăng nhập</h1>
        <form @submit.prevent="login" class="card p-4">
          <div class="mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
          <p class="mt-2 text-center">Chưa có tài khoản? <nuxt-link to="/register">Đăng ký</nuxt-link></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    if (authStore.isAdmin) {
      navigateTo('/dashboard');
    } else {
      navigateTo('/');
    }
  } catch (err) {
    alert('Đăng nhập thất bại: ' + (err.response?.data?.message || 'Lỗi đăng nhập'));
  }
};

useHead({
  title: 'Đăng nhập - Ecommerce Project',
  meta: [
    { name: 'description', content: 'Đăng nhập vào tài khoản của bạn' }
  ]
});
</script>