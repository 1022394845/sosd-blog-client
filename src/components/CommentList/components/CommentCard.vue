<script setup>
import CommonAvatar from '@/components/CommonAvatar.vue'
import CommentEditor from '@/components/CommentEditor.vue'
import DotLoading from '@/components/DotLoading.vue'
import { useCommentStore } from '@/stores/comment'
import { computed, useTemplateRef, watch, nextTick } from 'vue'

const commentStore = useCommentStore()

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['load'])

const handleReply = () => {
  commentStore.handleReply(props.detail.id)
}

/**
 * load 加载子评论
 * @param {Number} id 评论id
 */
const handleLoad = () => {
  if (commentStore.disabledCommentLoad) return
  commentStore.onLoadCommentId = props.detail.id
  emits('load', props.detail.id)
}

// 显示查看对话按钮
const showLoad = computed(
  () => !commentStore.loadedCommentIds.includes(props.detail.id)
)
// 查看对话加载状态
const onLoading = computed(
  () => commentStore.onLoadCommentId === props.detail.id
)

// 显示回复框
const showEditor = computed(() => commentStore.isCurrentReply(props.detail.id))

// 显示回复框后自动聚焦
const editorRef = useTemplateRef('editorRef')
watch(
  () => editorRef.value,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      nextTick(() => {
        // 延迟0.1s优化视觉体验
        setTimeout(() => {
          editorRef.value.focus()
        }, 100)
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
      <header class="header">
        <address class="username">{{ detail.username }}</address>
        <!-- 子评论 -->
        <template v-if="detail.fatherId !== -1">
          <span class="reply">回复</span>
          <span class="username">{{ detail.fatherUserName }}</span>
        </template>
      </header>
      <h1 class="content">{{ detail.content }}</h1>
      <div class="btn-group">
        <div
          class="btn reply"
          v-need-login="handleReply"
          :class="{ active: showEditor }"
        >
          <span class="iconfont icon-comment"></span>
          <span style="margin-left: 2px">评论</span>
        </div>
        <div class="btn more" v-if="showLoad" @click="handleLoad">
          <dot-loading v-if="onLoading">加载中</dot-loading>
          <template v-else>查看对话</template>
        </div>
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

    .header {
      display: flex;
      align-items: center;
      gap: 10px;

      .username {
        color: #515767;
      }
    }

    .btn-group {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 5px 0;

      .btn {
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
}
</style>
