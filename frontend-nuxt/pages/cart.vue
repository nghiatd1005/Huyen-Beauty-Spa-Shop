<template>
  <div class="container mt-4">
    <h1>Giỏ hàng</h1>
    <ul class="list-group mb-3">
      <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
        {{ item.name }} - {{ item.price }} VNĐ x {{ item.quantity }}
      </li>
    </ul>
    <p class="fw-bold">Tổng tiền: {{ cartTotal }} VNĐ</p>
    <button v-if="isLoggedIn" class="btn btn-success" @click="checkout">Thanh toán</button>
    <p v-else>Vui lòng <nuxt-link class="btn btn-link" to="/login">đăng nhập</nuxt-link> để thanh toán</p>
  </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart';
import { useAuthStore } from '~/store/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();

const cartItems = computed(() => cartStore.cartItems);
const cartTotal = computed(() => cartStore.cartTotal);
const isLoggedIn = computed(() => authStore.isLoggedIn);

const checkout = async () => {
  try {
    await cartStore.checkout();
    alert('Đặt hàng thành công!');
  } catch (err) {
    alert('Lỗi: ' + (err.response?.data?.message || err.message));
  }
};

useHead({
  title: 'Giỏ hàng - Ecommerce Project',
  meta: [
    { name: 'description', content: 'Xem và thanh toán giỏ hàng của bạn' }
  ]
});
</script>