<script setup>
// 评论列表入口文件
import { getCommentListAPI } from '@/apis/article'
import { ref, useTemplateRef } from 'vue'
import CommonPaging from '../CommonPaging.vue'
import CommentCard from './components/CommentCard.vue'

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
