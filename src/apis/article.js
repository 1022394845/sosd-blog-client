import request from '@/utils/request'

/**
 * 获取热点文章
 */
export const getHotListAPI = () => request.get('/user/homepage/hot')
