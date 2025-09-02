<script setup>
// 二级评论
import { getCommentListAPI } from '@/apis/article'
import CommonPaging from '@/components/CommonPaging.vue'
import CommentCard from './CommentCard.vue'
import LeafComment from './LeafComment.vue'
import { useCommentStore } from '@/stores/comment'
import { useTemplateRef, inject, ref, nextTick } from 'vue'

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

/**
 * 激活加载三级评论
 * @param {Number} id 父评论id
 */
const activeLeaf = (id) => {
  const index = branchCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1) branchCommentList.value[index].children = []
}
/**
 * 重载三级评论
 * @param {Number} id 父评论id
 */
const reloadLeaf = (id) => {
  const index = branchCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1 && branchCommentList.value[index].children) {
    branchCommentList.value[index].children = null
    // // 等待DOM更新
    nextTick(() => {
      branchCommentList.value[index].children = []
    })
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
    <!-- 二级评论 -->
    <div class="comment-list" v-loading="loading">
      <div
        class="branch-comment"
        v-for="branch in branchCommentList"
        :key="branch.id"
      >
        <comment-card
          :detail="branch"
          @load="(id) => activeLeaf(id)"
          @reload="reloadLeaf(branch.id)"
        ></comment-card>

        <!-- 三级评论 -->
        <div class="leaf" v-if="branch.children">
          <leaf-comment
            v-model="branch.children"
            :parent-id="branch.id"
            :level="0"
          ></leaf-comment>
        </div>
      </div>
    </div>
  </common-paging>
</template>

<style lang="scss" scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .leaf {
    margin-top: 20px;
    padding-left: 60px;
  }
}
</style>
