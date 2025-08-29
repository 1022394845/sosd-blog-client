import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { needLogin } from './directives/login'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('need-login', needLogin)

app.mount('#app')
