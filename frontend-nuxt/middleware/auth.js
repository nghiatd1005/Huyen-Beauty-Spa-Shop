export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login');
  }
  if (to.path === '/dashboard' && !authStore.isAdmin) {
    return navigateTo('/');
  }
});