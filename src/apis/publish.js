import request from '@/utils/request'

/**
 * 获取标签列表
 */
export const getTagListAPI = () => request.get('/user/article/tags')

/**
 * 新建文章
 * @param {Number} userId 用户id
 * @param {Object} data 文章信息
 * @param {String} data.title 文章标题
 * @param {Number} data.categoryId 文章分类id
 * @param {Number[]} data.tags 文章标签
 * @param {String} data.content 文章内容
 * @param {String} [data.image] 文章封面
 */
export const createArticleAPI = (userId, data) =>
  request.post('/user/article', { userId, ...data })

/**
 * 删除文章
 * @param {Number} id 文章id
 */
export const deleteArticleAPI = (id) =>
  request.delete('/user/article', { params: { id } })
