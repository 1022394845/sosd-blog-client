<script setup>
import CommonAvatar from '@/components/CommonAvatar.vue'
import CommentEditor from '@/components/CommentEditor.vue'
import { useCommentStore } from '@/stores/comment'
import { computed, useTemplateRef, watch, nextTick } from 'vue'

const commentStore = useCommentStore()

const props = defineProps({
  detail: {
    type: Object,
    required: true
  },
  rootId: Number // 根评论id 用于确定回复框显示
})
/**
 * reply 回复评论
 * @param {Number} parentId 回复评论的父评论id
 * @param {Number} id 回复评论id
 */
const emits = defineEmits(['reply'])

const handleReply = () => {
  emits('reply', props.detail.fatherId, props.detail.id)
}

// 显示回复框
const showEditor = computed(() => {
  return (
    props.detail.id === commentStore.replyId &&
    props.detail.fatherId === commentStore.replyParentId &&
    props.rootId === commentStore.replyRootId
  )
})

// 显示回复框后自动聚焦
const editorRef = useTemplateRef('editorRef')
watch(
  () => editorRef.value,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      nextTick(() => {
        // 延迟0.3s给过渡动画时间
        setTimeout(() => {
          editorRef.value.focus()
        }, 300)
      })
    }
  }
)
</script>

<template>
  <article class="comment-card">
    <div class="user-avatar">
      <common-avatar :src="detail.image" size="40px"></common-avatar>
    </div>

    <div class="detail">
      <address class="username">{{ detail.username }}</address>
      <h1 class="content">{{ detail.content }}</h1>
      <div
        class="comment-btn"
        v-need-login="handleReply"
        :class="{ active: showEditor }"
      >
        <span class="iconfont icon-comment"></span>
        <span style="margin-left: 2px">评论</span>
      </div>

      <!-- 回复框 -->
      <div class="reply-editor" v-if="showEditor">
        <comment-editor ref="editorRef"></comment-editor>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  gap: 20px;
  width: 100%;

  .detail {
    flex: 1;

    .username {
      color: #515767;
    }

    .comment-btn {
      margin-top: 5px;
      color: #8a919f;
      cursor: pointer;
      user-select: none;

      &:hover,
      &.active {
        color: $sosd-main-color-1;
      }
    }
  }
}
</style>
