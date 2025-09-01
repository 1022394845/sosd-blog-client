<script setup>
import CommonAvatar from '@/components/CommonAvatar.vue'

defineProps({
  detail: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="comment-card">
    <div class="user-avatar">
      <common-avatar :src="detail.image" size="40px"></common-avatar>
    </div>

    <div class="detail">
      <address class="username">{{ detail.username }}</address>
      <h1 class="content">{{ detail.content }}</h1>
      <div class="comment-btn" v-need-login>
        <span class="iconfont icon-comment"></span>
        <span style="margin-left: 2px">评论</span>
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
      .active {
        color: $sosd-main-color-1;
      }
    }
  }
}
</style>
