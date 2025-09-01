<script setup>
// 评论列表入口文件
import { getCommentListAPI } from '@/apis/article'
import { ref, useTemplateRef, nextTick } from 'vue'
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

const rootPagingRef = useTemplateRef('rootPagingRef')
const rootCommentList = ref([])
/**
 * 获取根评论列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 */
const getRootCommentList = async (page, pageSize) => {
  console.log('request-root', page, pageSize)
  try {
    const { records, total } = await getCommentListAPI(props.id, page, pageSize)
    rootPagingRef.value.completeByTotal(records, total)
  } catch {
    rootPagingRef.value.completeByTotal(false)
  }
}

/**
 * 激活加载一级子评论
 * @param {Number} id 根评论id
 */
const activeBranch = (id) => {
  const index = rootCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1) rootCommentList.value[index].children = []
}
const branchPagingRefs = {}
const setBranchPagingRef = (el, id) => {
  if (el && !branchPagingRefs[id]) {
    branchPagingRefs[id] = el
  } else if (!el) {
    delete branchPagingRefs[id]
  }
}
/**
 * 获取一级子评论列表
 * @param {Number} id 根评论id
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 */
const getBranchCommentList = async (id, page, pageSize) => {
  await nextTick() // 等待ref更新
  console.log('request-branch', id, page, pageSize)
  // 控制加载状态
  const index = rootCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1) rootCommentList.value[index].loading = true

  try {
    const { records, total } = await getCommentListAPI(
      props.id,
      page,
      pageSize,
      id
    )
    branchPagingRefs[id].completeByTotal(records, total)
  } catch {
    branchPagingRefs[id].completeByTotal(false)
  } finally {
    commentStore.completeLoadComment()
    if (index !== -1) rootCommentList.value[index].loading = false
  }
}
</script>

<template>
  <common-paging
    v-model="rootCommentList"
    ref="rootPagingRef"
    position="right"
    :page-size="10"
    @on-load="(page, pageSize) => getRootCommentList(page, pageSize)"
  >
    <!-- 一级评论 -->
    <div class="comment-list">
      <div class="root-comment" v-for="root in rootCommentList" :key="root.id">
        <comment-card
          :detail="root"
          @load="(id) => activeBranch(id)"
        ></comment-card>

        <template v-if="root.children">
          <!-- 二级评论 -->
          <common-paging
            v-model="root.children"
            :ref="(el) => setBranchPagingRef(el, root.id)"
            :page-size="5"
            small
            style="margin-top: 20px; padding-left: 60px"
            @on-load="
              (page, pageSize) => getBranchCommentList(root.id, page, pageSize)
            "
          >
            <div class="comment-list" v-loading="root.loading">
              <div
                class="branch-comment"
                v-for="branch in root.children"
                :key="branch.id"
              >
                <comment-card :detail="branch"></comment-card>
              </div>
            </div>
          </common-paging>
        </template>
      </div>
    </div>
  </common-paging>
</template>

<style scoped lang="scss">
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
