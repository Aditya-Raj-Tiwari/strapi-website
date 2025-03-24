export default defineNuxtConfig(() => {
  const primaryColor = '#16263D'; // New primary color
  const secondaryColor = 'orange'; // New secondary color

  return {
    app: {
      pageTransition: { name: 'page', mode: 'out-in' },
    },
    colorMode: {
      preference: 'light',   // Force light mode as the preferred color mode
      fallback: 'light',     // If no preference is found, default to light
      detectSystem: false,   // Disable system preference detection
      storageKey: 'color-mode'
    },
    server: {
      host: '0',
      port: '3000' // optional
    },
    css: ["~/assets/css/main.scss"],
    devtools: { enabled: true },
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              $primary-color: ${primaryColor}; 
              $secondary-color: ${secondaryColor}; 
              @import "~/assets/css/variables.scss";
            `,
          },
        },
      },
    },
    components: {
      global: true,
      dirs: ['~/components'],
    },
    vue: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          ['swiper-container', 'swiper-slide'].includes(tag),
      },
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    plugins: ['~/plugins/matomo.client.ts'],
    modules: ["@nuxtjs/strapi", "nuxt-svgo", "@nuxt/image", "@nuxt/ui"],
    strapi: {
      url: "https://strapi.webimpact.io",
      prefix: "/api",
      admin: "/admin",
      version: "v4",
      cookie: {},
      cookieName: "strapi_jwt",
      devtools: true,
    },
    ui: {
      strategy: "override",
    },
    hooks: {
      'pages:extend'(pages) {
        // Create a dynamic route for the slug
        pages.push({
          name: 'dynamic',
          path: '/:slug*',
          file: '~/pages/_slug.vue',
        });
      },
    },
    runtimeConfig: {
      public: {
        primaryColor, // The primary color available in your app
        secondaryColor, // The secondary color available in your app
      },
    },
    proxy: {
      '/api/': {
        target: 'https://strapi.webimpact.io',
        pathRewrite: { '^/api/': '' },
        changeOrigin: true,
        secure: true, // Ensure SSL is used
      },
    },
    };
  });
