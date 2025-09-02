<script setup>
import CommonAvatar from '@/components/CommonAvatar.vue'
import CommentEditor from '@/components/CommentEditor.vue'
import { useUserStore } from '@/stores/user'
import { useTemplateRef, inject } from 'vue'
import { publishCommentAPI } from '@/apis/article'
import { showMsg } from '@/utils/common'
import CommentList from '@/components/CommentList/CommentList.vue'
import { useArticleStore } from '@/stores/article'

const userStore = useUserStore()
const articleStore = useArticleStore()

const articleId = inject('articleId')

const publishRef = useTemplateRef('publishRef')
const commentListRef = useTemplateRef('commentListRef')
const handelPublish = async (value) => {
  try {
    await publishCommentAPI(articleId, userStore.getCurrentUserId(), value)
    showMsg('发表成功', 'success')
    articleStore.updateCommentNumber(true) // 更新评论数
    commentListRef.value.reloadRoot() // 重载根评论
    publishRef.value.reset()
  } catch {
    publishRef.value.reset(false)
  }
}

/**
 * 跳转至评论区
 */
const commentAreaRef = useTemplateRef('commentAreaRef')
const goComment = () => {
  if (commentAreaRef.value) commentAreaRef.value.scrollIntoView()
  // 聚焦编辑器
  setTimeout(() => {
    if (publishRef.value) publishRef.value.focus()
  }, 500)
}

defineExpose({ goComment })
</script>

<template>
  <div class="comment-container" ref="commentAreaRef">
    <header class="header">评论</header>
    <div class="publish-comment">
      <div class="avatar">
        <common-avatar
          :src="userStore.getCurrentUserAvatar()"
          size="40px"
        ></common-avatar>
      </div>
      <div class="editor">
        <comment-editor
          ref="publishRef"
          @submit="(value) => handelPublish(value)"
        ></comment-editor>
      </div>
    </div>
    <section class="comment-list">
      <comment-list :id="articleId" ref="commentListRef"></comment-list>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.comment-container {
  margin-top: 20px;
  padding: 30px;
  background-color: #ffffff;

  .header {
    font-size: 20px;
    font-weight: 700;
  }

  .publish-comment {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .editor {
      flex: 1;
    }
  }

  .comment-list {
    margin-top: 40px;
  }
}
</style>
