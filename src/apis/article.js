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
