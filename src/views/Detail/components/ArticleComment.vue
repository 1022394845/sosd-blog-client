<script setup>
import CommonAvatar from '@/components/CommonAvatar.vue'
import CommentEditor from '@/components/CommentEditor.vue'
import { useUserStore } from '@/stores/user'
import { useTemplateRef } from 'vue'
import { publishCommentAPI } from '@/apis/article'
import { showMsg } from '@/utils/common'
import CommentList from '@/components/CommentList/CommentList.vue'

const userStore = useUserStore()

const props = defineProps({
  id: {
    // 文章id
    type: Number,
    required: true
  }
})

const publishRef = useTemplateRef('publishRef')
const handelPublish = async (value) => {
  try {
    await publishCommentAPI(props.id, userStore.userInfo.id, value)
    showMsg('发表成功', 'success')
    publishRef.value.reset()
  } catch {
    publishRef.value.reset(false)
  }
}
</script>

<template>
  <div class="comment-container">
    <header class="header">评论</header>
    <div class="publish-comment">
      <div class="avatar">
        <common-avatar :src="userStore.userInfo.image"></common-avatar>
      </div>
      <div class="editor">
        <comment-editor
          ref="publishRef"
          @submit="(value) => handelPublish(value)"
        ></comment-editor>
      </div>
    </div>
    <section class="comment-list">
      <comment-list :id="id"></comment-list>
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
}
</style>
