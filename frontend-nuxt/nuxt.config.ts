export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-simple-sitemap' // Thay thế @nuxtjs/sitemap
  ],

  app: {
    head: {
      title: 'Ecommerce Project',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Cửa hàng thương mại điện tử' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' }
      ]
    }
  },

  plugins: ['~/plugins/api.ts'],

  nitro: {
    preset: 'node-server',
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api'
    }
  },

  sitemap: {
    // siteUrl: 'http://localhost:3001', // Cập nhật siteUrl đúng
    dynamicUrlsApiEndpoint: '/api/sitemap' // Định nghĩa sitemap động nếu cần
  },

  compatibilityDate: '2025-03-16' // Fix lỗi xuống dòng
});
