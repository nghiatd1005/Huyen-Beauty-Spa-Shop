<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center">Đăng ký</h1>
        <form @submit.prevent="register" class="card p-4">
          <div class="mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
          <p class="mt-2 text-center">Đã có tài khoản? <nuxt-link to="/login">Đăng nhập</nuxt-link></p>
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

const register = async () => {
  try {
    await authStore.register({ email: email.value, password: password.value });
    navigateTo('/login');
  } catch (err) {
    alert('Đăng ký thất bại: ' + (err.response?.data?.message || 'Lỗi đăng ký'));
  }
};

useHead({
  title: 'Đăng ký - Ecommerce Project',
  meta: [
    { name: 'description', content: 'Đăng ký tài khoản mới' }
  ]
});
</script>