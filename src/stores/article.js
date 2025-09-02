import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  // 文章分类
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

  // 当前查看文章看板数据
  const currentArticleData = ref({})
  /**
   * 初始化当前文章数据
   * @param {Object} data 获取的文章详情数据
   * @param {Number} data.id 文章id
   * @param {Number} data.likeNumber 点赞数
   * @param {Number} data.commentNumber 评论数
   * @param {Number} data.favoriteNumber 收藏数
   * @param {Boolean} data.isLike 点赞状态
   * @param {Boolean} data.isFavorite 收藏状态
   * @param {String} [data.image] 作者头像
   */
  function initCurrentArticle(data = {}) {
    currentArticleData.value = data
  }

  /**
   * 发布评论后更新当前评论数
   * @param {Boolean} add 增加-true 减少-false
   */
  function updateCommentNumber(add) {
    if (typeof currentArticleData.value.commentNumber === 'number') {
      if (add) currentArticleData.value.commentNumber++
      else currentArticleData.value.commentNumber--
    }
  }

  return {
    categoryList,
    currentArticleData,
    initCurrentArticle,
    updateCommentNumber
  }
})
