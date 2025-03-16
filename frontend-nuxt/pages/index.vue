<template>
  <div class="container">
    <h1>Trang chủ</h1>
    <ProductList :products="products" />
  </div>
</template>

<script setup>
import ProductList from '~/components/ProductList.vue';
import { useProductStore } from '~/store/products';

const { $api } = useNuxtApp();
const productStore = useProductStore();

const { data: products } = await useAsyncData('products', async () => {
  const response = await $api.getProducts();
  productStore.products = response.data;
  return response.data;
});

useHead({
  title: 'Trang chủ - Ecommerce Project',
  meta: [
    { name: 'description', content: 'Danh sách sản phẩm mới nhất' }
  ]
});
</script>