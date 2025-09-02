import request from '@/utils/request'

/**
 * 获取热点文章
 */
export const getHotListAPI = () => request.get('/user/homepage/hot')

/**
 * 首页获取文章列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 * @param {Object} [config] 额外配置项
 * @param {String} config.category 筛选分类
 */
export const getHomeArticleListAPI = (page, pageSize, config = {}) =>
  request.get('/user/homepage/articles', {
    params: { page, pageSize, ...config }
  })

/**
 * 搜索文章
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 * @param {Object} config 搜索配置项
 * @param {String} [config.category] 搜索分类
 * @param {String} [config.tag] 搜索标签
 */
export const getSearchListAPI = (page, pageSize, config = {}) =>
  request.get('/user/homepage/search', {
    params: { page, pageSize, ...config }
  })

/**
 * 获取文章详情
 * @param {Number} id 文章id
 * @param {Number} [userId] 用户id
 */
export const getArticleDetailAPI = (id, userId) =>
  request.get('/users/article/detail', { params: { id, userId } })

/**
 * 获取文章AI总结
 * @param {Number} id 文章id
 */
export const getArticleAbstractAPI = (id) =>
  request.get('/users/article/detail/ai', { params: { id } })

/**
 * 发表/回复评论
 * @param {Number} articleId 文章id
 * @param {Number} userId 发表者id
 * @param {String} content 评论内容
 * @param {Number} [parentCommentId] 父评论id 根评论为-1
 */
export const publishCommentAPI = (
  articleId,
  userId,
  content,
  parentCommentId = -1
) =>
  request.post('/users/article/detail/comments', {
    articleId,
    userId,
    content,
    parentCommentId
  })

/**
 * 分级获取文章评论
 * @param {Number} articleId 文章id
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 * @param {Number} [parentCommentId] 父评论id 根评论为-1
 */
export const getCommentListAPI = (
  articleId,
  page,
  pageSize,
  parentCommentId = -1
) =>
  request.get('/users/article/detail/comments', {
    params: { articleId, page, pageSize, parentCommentId }
  })

/**
 * 点赞文章
 * @param {Number} userId 用户id
 * @param {Number} articleId 文章id
 * @param {Boolean} status 改变后的状态
 */
export const toggleArticleLikeStatusAPI = (userId, articleId, status) => {
  if (status)
    return request.post(
      '/users/article/detail/likes',
      {},
      { params: { userId, articleId } }
    )
  else
    return request.delete('/users/article/detail/likes', {
      params: { userId, articleId }
    })
}

/**
 * 收藏文章
 * @param {Number} userId 用户id
 * @param {Number} articleId 文章id
 * @param {Boolean} status 改变后的状态
 */
export const toggleArticleStarStatusAPI = (userId, articleId, status) => {
  if (status)
    return request.post(
      '/users/article/detail/favorites',
      {},
      { params: { userId, articleId } }
    )
  else
    return request.delete('/users/article/detail/favorites', {
      params: { userId, articleId }
    })
}
