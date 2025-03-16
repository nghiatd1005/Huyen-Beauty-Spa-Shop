import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      const { $api } = useNuxtApp();
      const response = await $api.getProducts();
      this.products = response.data;
    }
  },
  getters: {
    allProducts: (state) => state.products
  }
});