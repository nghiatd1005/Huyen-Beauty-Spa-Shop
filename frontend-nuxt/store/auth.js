import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: Cookies.get('token') || null
  }),
  actions: {
    async login(credentials) {
      const { $api } = useNuxtApp();
      const response = await $api.login(credentials);
      this.setUser({ user: response.data.user, token: response.data.token });
      return response.data.user;
    },
    async register(accountData) {
      const { $api } = useNuxtApp();
      const response = await $api.register(accountData);
      return response.data;
    },
    async updateRole({ id, role }) {
      const { $api } = useNuxtApp();
      await $api.updateRole(id, role);
      if (this.user?.id === id) {
        this.setUser({ user: { ...this.user, role }, token: this.token });
      }
    },
    async checkAuth() {
      if (this.token && !this.user) {
        try {
          const { $api } = useNuxtApp();
          const response = await $api.getCurrentUser();
          this.setUser({ user: response.data, token: this.token });
        } catch (err) {
          console.error('Token không hợp lệ, đăng xuất:', err);
          this.logout();
        }
      }
    },
    setUser({ user, token }) {
      this.user = user;
      this.token = token;
      if (token) Cookies.set('token', token, { expires: 1 });
    },
    logout() {
      this.user = null;
      this.token = null;
      Cookies.remove('token');
      navigateTo('/login');
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin'
  }
});