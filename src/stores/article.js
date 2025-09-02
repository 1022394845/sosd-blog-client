import {
  toggleArticleLikeStatusAPI,
  toggleArticleStarStatusAPI
} from '@/apis/article'
import { debounce } from '@/utils/debounce'
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
  let lastLikeStatus = null
  let lastStarStatus = null // 用于避免重复点赞/收藏
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
    lastLikeStatus = data.isLike
    lastStarStatus = data.isFavorite
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

  /**
   * 切换点赞状态API 防抖1s
   * @param {Number} userId 用户id
   * @param {Number} articleId 文章id
   * @param {Boolean} status 更新状态
   */
  const toggleLikeStatusAPI = debounce(async (userId, articleId, status) => {
    if (status === lastLikeStatus) return // 状态改变时才执行API
    await toggleArticleLikeStatusAPI(userId, articleId, status)
    lastLikeStatus = status // 更新状态
  }, 1000)

  /**
   * 切换点赞状态
   * @param {Number} userId 用户id
   * @param {Number} articleId 文章id
   */
  function toggleLikeStatus(userId, articleId) {
    if (typeof currentArticleData.value.likeNumber === 'number') {
      if (currentArticleData.value.isLike) currentArticleData.value.likeNumber--
      else currentArticleData.value.likeNumber++
    }
    currentArticleData.value.isLike = !currentArticleData.value.isLike
    toggleLikeStatusAPI(userId, articleId, currentArticleData.value.isLike)
  }

  /**
   * 切换收藏状态API 防抖1s
   * @param {Number} userId 用户id
   * @param {Number} articleId 文章id
   * @param {Boolean} status 更新状态
   */
  const toggleStarStatusAPI = debounce(async (userId, articleId, status) => {
    if (status === lastStarStatus) return // 状态改变时才执行API
    await toggleArticleStarStatusAPI(userId, articleId, status)
    lastStarStatus = status // 更新状态
  }, 1000)

  /**
   * 切换收藏状态
   * @param {Number} userId 用户id
   * @param {Number} articleId 文章id
   */
  function toggleStarStatus(userId, articleId) {
    if (typeof currentArticleData.value.favoriteNumber === 'number') {
      if (currentArticleData.value.isFavorite)
        currentArticleData.value.favoriteNumber--
      else currentArticleData.value.favoriteNumber++
    }
    currentArticleData.value.isFavorite = !currentArticleData.value.isFavorite
    toggleStarStatusAPI(userId, articleId, currentArticleData.value.isFavorite)
  }

  return {
    categoryList,
    currentArticleData,
    initCurrentArticle,
    updateCommentNumber,
    toggleLikeStatus,
    toggleStarStatus
  }
})
