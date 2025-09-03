import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home/recommended',
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
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: () => import('@/views/User/views/Profile/index.vue'),
              meta: {
                title: '个人信息'
              }
            },
            {
              path: 'article',
              name: 'article',
              component: () => import('@/views/User/views/Article/index.vue'),
              meta: {
                title: '文章管理'
              }
            },
            {
              path: 'star',
              name: 'star',
              component: () => import('@/views/User/views/Star/index.vue'),
              meta: {
                title: '我的收藏'
              }
            },
            {
              path: 'history',
              name: 'history',
              component: () => import('@/views/User/views/History/index.vue'),
              meta: {
                title: '历史足迹'
              }
            },
            {
              path: 'publish',
              name: 'publish',
              component: () => import('@/views/User/views/Publish/index.vue'),
              meta: {
                title: '发布文章'
              }
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

// 全局前置守卫
router.beforeEach((to) => {
  // 判断路由是否需要登录
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    const userStore = useUserStore()
    if (userStore.token) {
      // 已登录
      return true
    } else {
      // 未登录，重定向到首页
      return { path: '/', replace: true }
    }
  } else {
    // 不需要登录的页面直接放行
    return true
  }
})

export default router
