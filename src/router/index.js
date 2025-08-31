import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home/:category?',
          component: Home
        }
      ]
    }
  ],
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
