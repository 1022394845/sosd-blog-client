import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore('comment', () => {
  // 通过 replyRootId + replyParentId + replyId 来唯一确定需要显示回复框的CommentCard
  const replyRootId = ref(null) // 回复评论的根评论id 根评论传自身
  const replyParentId = ref(null) // 回复评论的父评论id 根评论与父评论传自身
  const replyId = ref(null) // 回复评论的id

  /**
   * 回复评论
   * @param {Number} rootId 回复评论的根评论id
   * @param {Number} parentId 回复评论的父评论id
   * @param {Number} id 回复评论的id
   */
  function handleReply(rootId, parentId, id) {
    replyRootId.value = rootId
    replyParentId.value = parentId
    replyId.value = id
  }

  return {
    replyRootId,
    replyParentId,
    replyId,
    handleReply
  }
})
