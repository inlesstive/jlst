// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      upload: process.env.BACKEND,
    },
  },
  pinia: {
    storesDirs: ['./state/**'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  app: {
    head: {
      title: 'JLST',
      meta: [],
      link: [],
      
    }
  }
}