<script setup>
import CommonAvatar from '@/components/CommonAvatar.vue'
import CommentEditor from '@/components/CommentEditor.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const props = defineProps({
  id: {
    // 文章id
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="comment-container">
    <header class="header">评论</header>
    <div class="publish-comment">
      <div class="avatar">
        <common-avatar :src="userStore.userInfo.image"></common-avatar>
      </div>
      <div class="editor">
        <comment-editor></comment-editor>
      </div>
    </div>
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
