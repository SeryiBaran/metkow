import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.mount('#app')
