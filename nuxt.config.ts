export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'Scribble Cubes Analyst Simulator - Operation Bad Invoice',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'TechNova SOC Analyst Simulator - Operation Bad Invoice' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false
  },
  runtimeConfig: {
    nocodbBaseUrl: process.env.NOCODB_BASE_URL || '',
    nocodbApiToken: process.env.NOCODB_API_TOKEN || process.env.NOCODB_TOKEN || '',
    nocodbApiUrl: process.env.NOCODB_API_URL || ''
  }
})