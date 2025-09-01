import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCommentStore = defineStore('comment', () => {
  const replyId = ref(null) // 回复评论的id
  /**
   * 重置评论状态
   */
  function resetReply() {
    replyId.value = null
  }
  /**
   * 检测传入的评论是否为当前正在评论
   * @param {Number} id 回复评论的id
   */
  function isCurrentReply(id) {
    return replyId.value === id
  }
  /**
   * 回复评论
   * @param {Number} id 回复评论的id
   */
  function handleReply(id) {
    // 若新传入的评论为当前评论,则取消评论状态
    if (isCurrentReply(id)) {
      resetReply()
      return
    }
    replyId.value = id
  }

  const onLoadCommentId = ref(null) // 正在获取子评论的id
  const loadedCommentIds = ref([]) // 已获取过子评论的id
  // 正在获取子评论 禁用获取操作
  const disabledCommentLoad = computed(() => onLoadCommentId.value !== null)
  /**
   * 获取子评论回调 隐藏加载数据按钮
   */
  function completeLoadComment() {
    if (onLoadCommentId.value === null) return
    loadedCommentIds.value.push(onLoadCommentId.value)
    onLoadCommentId.value = null
  }
  /**
   * 切换分页后重置子评论状态
   */
  function resetComment() {
    onLoadCommentId.value = null
    loadedCommentIds.value = []
  }

  return {
    replyId,
    resetReply,
    isCurrentReply,
    handleReply,
    onLoadCommentId,
    loadedCommentIds,
    disabledCommentLoad,
    completeLoadComment,
    resetComment
  }
})
