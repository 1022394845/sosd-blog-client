<script setup>
// 一级评论
import { getCommentListAPI } from '@/apis/article'
import { ref, useTemplateRef, provide } from 'vue'
import CommonPaging from '../CommonPaging.vue'
import CommentCard from './components/CommentCard.vue'
import BranchComment from './components/BranchComment.vue'

const props = defineProps({
  id: {
    // 文章id
    type: Number,
    required: true
  }
})
provide('articleId', props.id)

const rootCommentList = ref([])

const pagingRef = useTemplateRef('pagingRef')
const loading = ref(true)

/**
 * 获取根评论列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 */
const getRootCommentList = async (page, pageSize) => {
  console.log('request-root', page, pageSize)
  try {
    loading.value = true
    const { records, total } = await getCommentListAPI(props.id, page, pageSize)
    pagingRef.value.completeByTotal(records, total)
  } catch {
    pagingRef.value.completeByTotal(false)
  } finally {
    loading.value = false
  }
}

/**
 * 激活加载二级评论
 * @param {Number} id 根评论id
 */
const activeBranch = (id) => {
  const index = rootCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1) rootCommentList.value[index].children = []
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
    <!-- 一级评论 -->
    <div class="comment-list" v-loading="loading">
      <div class="root-comment" v-for="root in rootCommentList" :key="root.id">
        <comment-card
          :detail="root"
          @load="(id) => activeBranch(id)"
        ></comment-card>

        <!-- 二级评论 -->
        <div class="branch" v-if="root.children">
          <branch-comment
            v-model="root.children"
            :parent-id="root.id"
          ></branch-comment>
        </div>
      </div>
    </div>
  </common-paging>
</template>

<style scoped lang="scss">
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .branch {
    margin-top: 20px;
    padding-left: 60px;
  }
}
</style>
