<script setup>
// 二级评论
import { getCommentListAPI } from '@/apis/article'
import CommonPaging from '@/components/CommonPaging.vue'
import CommentCard from './CommentCard.vue'
import { useCommentStore } from '@/stores/comment'
import { useTemplateRef, inject, ref } from 'vue'

const commentStore = useCommentStore()

const props = defineProps({
  parentId: {
    // 父评论id
    type: Number,
    required: true
  }
})
const articleId = inject('articleId')
const branchCommentList = defineModel({ type: Array })

const pagingRef = useTemplateRef('pagingRef')
const loading = ref(true)
/**
 * 获取二级评论列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 */
const getBranchCommentList = async (page, pageSize) => {
  console.log('request-branch', page, pageSize)
  try {
    loading.value = true
    const { records, total } = await getCommentListAPI(
      articleId,
      page,
      pageSize,
      props.parentId
    )
    pagingRef.value.completeByTotal(records, total)
  } catch {
    pagingRef.value.completeByTotal(false)
  } finally {
    commentStore.completeLoadComment()
    loading.value = false
  }
}
</script>

<template>
  <common-paging
    v-model="branchCommentList"
    ref="pagingRef"
    :page-size="5"
    small
    @on-load="(page, pageSize) => getBranchCommentList(page, pageSize)"
  >
    <div class="comment-list" v-loading="loading">
      <div
        class="branch-comment"
        v-for="branch in branchCommentList"
        :key="branch.id"
      >
        <comment-card :detail="branch"></comment-card>
      </div>
    </div>
  </common-paging>
</template>

<style lang="scss" scoped></style>
