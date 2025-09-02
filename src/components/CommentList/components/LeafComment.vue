<script setup>
import { getCommentListAPI } from '@/apis/article'
import CommonPaging from '@/components/CommonPaging.vue'
import CommentCard from './CommentCard.vue'
import { useCommentStore } from '@/stores/comment'
import { useTemplateRef, inject, ref, nextTick } from 'vue'

const commentStore = useCommentStore()

const props = defineProps({
  parentId: {
    // 父评论id
    type: Number,
    required: true
  },
  level: {
    // 叶评论层级 %6 用于决定border颜色
    type: Number,
    required: true
  }
})
const articleId = inject('articleId')
const leafCommentList = defineModel({ type: Array })

const pagingRef = useTemplateRef('pagingRef')
const loading = ref(true)
/**
 * 获取三级以上评论列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 */
const getLeafCommentList = async (page, pageSize) => {
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
 * 激活加载子级评论
 * @param {Number} id 父评论id
 */
const activeLeaf = (id) => {
  const index = leafCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1) leafCommentList.value[index].children = []
}
/**
 * 重载子级评论
 * @param {Number} id 父评论id
 */
const reloadLeaf = (id) => {
  const index = leafCommentList.value.findIndex((item) => item.id === id)
  if (index !== -1 && leafCommentList.value[index].children) {
    leafCommentList.value[index].children = null
    // // 等待DOM更新
    nextTick(() => {
      leafCommentList.value[index].children = []
    })
  }
}
</script>

<template>
  <common-paging
    v-model="leafCommentList"
    ref="pagingRef"
    :page-size="5"
    small
    @on-load="(page, pageSize) => getLeafCommentList(page, pageSize)"
  >
    <div
      class="comment-list"
      v-loading="loading"
      :class="{ [`level-${level + 1}`]: !loading }"
    >
      <div class="leaf-comment" v-for="leaf in leafCommentList" :key="leaf.id">
        <comment-card
          :detail="leaf"
          @load="(id) => activeLeaf(id)"
          @reload="reloadLeaf(leaf.id)"
        ></comment-card>

        <!-- 递归调用 -->
        <div class="leaf" v-if="leaf.children">
          <leaf-comment
            v-model="leaf.children"
            :parent-id="leaf.id"
            :level="(level + 1) % 6"
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
  }
}

// 6个层级的border
$border-colors: (
  1: $sosd-main-color-1,
  2: $sosd-main-color-2,
  3: $sosd-main-color-3,
  4: $sosd-main-color-4,
  5: $sosd-main-color-5,
  6: $sosd-main-color-6
);

@each $level, $color in $border-colors {
  .level-#{$level} {
    padding: 8px 0;
    border-top: 2px dashed $color;
    border-bottom: 2px dashed $color;
  }
}
</style>
