import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  actions: {
    addToCart(product) {
      const item = this.cart.find(i => i.id === product.id);
      if (item) item.quantity++;
      else this.cart.push({ ...product, quantity: 1 });
    },
    async checkout() {
      const authStore = useAuthStore();
      if (!authStore.user) throw new Error('Chưa đăng nhập');
      const orderData = {
        account_id: authStore.user.id,
        total_amount: this.cartTotal,
        payment_status: 'pending'
      };
      const { $api } = useNuxtApp();
      await $api.createOrder(orderData);
      this.clearCart();
    },
    clearCart() {
      this.cart = [];
    }
  },
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
});