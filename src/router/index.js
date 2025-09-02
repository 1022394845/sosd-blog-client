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
        },
        {
          path: 'search',
          component: () => import('@/views/Search/index.vue')
        },
        {
          path: 'detail',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: 'user',
          component: () => import('@/views/User/index.vue'),
          redirect: '/user/profile',
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: () => import('@/views/User/views/Profile/index.vue')
            },
            {
              path: 'article',
              name: 'article',
              component: () => import('@/views/User/views/Article/index.vue')
            },
            {
              path: 'star',
              name: 'star',
              component: () => import('@/views/User/views/Star/index.vue')
            },
            {
              path: 'history',
              name: 'history',
              component: () => import('@/views/User/views/History/index.vue')
            }
          ]
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
