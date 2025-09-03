import request from '@/utils/request'

/**
 * 上传文件
 * @param {File} file 文件
 * @param {Function} [getProgress] 获取进度回调
 */
export const uploadFileAPI = async (file, getProgress) => {
  const formData = new FormData()
  formData.append('file', file)

  // 判定超时
  let lastLoaded = 0
  let maxLimit = 10 // 超过10次无变化判定超时
  const abortController = new AbortController() // 中断器

  const requestPromise = request.post('/user/common/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    signal: abortController.signal, // 关联中断信号
    onUploadProgress: (progress) => {
      if (progress.loaded === lastLoaded) {
        maxLimit--
        if (maxLimit === 0) abortController.abort(new Error('上传超时'))
      } else {
        maxLimit = 10 // 重置limit
        const percentage = Math.round((progress.loaded * 100) / progress.total)
        if (typeof getProgress === 'function') getProgress(percentage)
      }
    }
  })

  return requestPromise.catch((error) => {
    if (error.name === 'AbortError') {
      // 主动中断的错误
      throw new Error('上传超时，请检查网络')
    }
    // 其他错误原样抛出
    throw error
  })
}
