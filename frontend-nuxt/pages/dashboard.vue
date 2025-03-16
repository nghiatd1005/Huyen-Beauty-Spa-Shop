<template>
  <div class="container">
    <h2>Dashboard Admin</h2>
    <h3>Cập nhật Role</h3>
    <form @submit.prevent="updateRole" class="mb-4">
      <div class="row">
        <div class="col-md-4">
          <input v-model="accountId" type="number" class="form-control" placeholder="ID tài khoản" required />
        </div>
        <div class="col-md-4">
          <select v-model="newRole" class="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-primary w-100">Cập nhật</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
});

const authStore = useAuthStore();
const accountId = ref('');
const newRole = ref('user');

const updateRole = async () => {
  try {
    await authStore.updateRole({ id: Number(accountId.value), role: newRole.value });
    alert('Cập nhật role thành công!');
  } catch (err) {
    alert('Lỗi: ' + (err.response?.data?.message || 'Không thể cập nhật role'));
  }
};

useHead({
  title: 'Dashboard - Ecommerce Project',
  meta: [
    { name: 'description', content: 'Trang quản trị cho admin' }
  ]
});
</script>