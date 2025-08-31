import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import vueDompurifyHTMLPlugin from 'vue-dompurify-html'

import { needLogin } from './directives/login'

import '@/styles/common.scss'
import '@/static/iconfont/iconfont.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vueDompurifyHTMLPlugin)

app.directive('need-login', needLogin)

app.mount('#app')
