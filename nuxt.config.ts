export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/src/styling/main.css'],
  app: {
    baseURL: '/src/pages',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: `Your Portfolio`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'A portfolio styled like a classic MacOS terminal' },
        { name: 'theme-color', content: '#1e1e1e' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { 
          rel: 'icon',
          type: 'image/png',
          href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1200px-Apple_logo_white.svg.png'
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { 
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap'
        }
      ]
    }
  },
  experimental: {
    viewTransition: true,
    componentIslands: true
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    },
    compressPublicAssets: true,
    minify: true
  },
  routeRules: {
    '/**': { 
      prerender: true
    }
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'terminal-core': [
              './src/components/TerminalPrompt.vue',
              './src/utils/commands.ts'
            ]
          }
        }
      }
    },
    optimizeDeps: {
      include: ['vue']
    }
  }
})