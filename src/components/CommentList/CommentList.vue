<script setup>
// 评论列表入口文件
import { getCommentListAPI } from '@/apis/article'
import { ref, useTemplateRef } from 'vue'
import CommonPaging from '../CommonPaging.vue'
import CommentCard from './components/CommentCard.vue'
import { useCommentStore } from '@/stores/comment'

const commentStore = useCommentStore()

const props = defineProps({
  id: {
    // 文章id
    type: Number,
    required: true
  }
})

const pagingRef = useTemplateRef('pagingRef')

const rootCommentList = ref([])
const getRootCommentList = async (page, pageSize) => {
  console.log('request-root', page, pageSize)
  try {
    const { records, total } = await getCommentListAPI(props.id, page, pageSize)
    pagingRef.value.completeByTotal(records, total)
  } catch {
    pagingRef.value.completeByTotal(false)
  }
}

/**
 * 回复评论
 * @param {Number} rootId 回复评论的根评论id
 * @param {Number} parentId 回复评论的父评论id
 * @param {Number} id 回复评论的id
 */
const handleReply = (rootId, parentId, id) => {
  commentStore.handleReply(rootId, parentId, id)
}
</script>

<template>
  <common-paging
    v-model="rootCommentList"
    ref="pagingRef"
    position="right"
    :page-size="10"
    @on-load="(page, pageSize) => getRootCommentList(page, pageSize)"
  >
    <div class="comment-list root">
      <comment-card
        v-for="item in rootCommentList"
        :key="item.id"
        :detail="item"
        :root-id="item.fatherId"
        @reply="(parentId, id) => handleReply(item.fatherId, parentId, id)"
      ></comment-card>
    </div>
  </common-paging>
</template>

<style scoped lang="scss">
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
