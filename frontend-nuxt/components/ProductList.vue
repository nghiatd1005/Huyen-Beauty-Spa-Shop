<template>
  <div>
    <h2>Danh sách sản phẩm</h2>
    <ul class="list-group">
      <li v-for="product in products" :key="product.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <nuxt-img v-if="product.image" :src="product.image" width="50" height="50" alt="Product Image" />
          {{ product.name }} - {{ product.price }} VNĐ
        </div>
        <button @click="addToCart(product)" class="btn btn-primary">Thêm vào giỏ</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart';

defineProps(['products']);
const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>