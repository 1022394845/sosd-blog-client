import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', () => {
  const categoryList = [
    {
      id: 1,
      name: '综合',
      label: 'recommended'
    },
    {
      id: 2,
      name: '前端',
      label: 'frontend'
    },
    {
      id: 3,
      name: '后端',
      label: 'backend'
    },
    {
      id: 4,
      name: '安卓',
      label: 'android'
    },
    {
      id: 5,
      name: 'iOS',
      label: 'ios'
    },
    {
      id: 6,
      name: '人工智能',
      label: 'ai'
    }
  ]

  return {
    categoryList
  }
})
