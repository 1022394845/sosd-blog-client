<script setup>
// 评论列表-root根评论
defineProps({
  detail: {
    // 评论详情
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="root-comment">
    <h1>{{ detail.content }}</h1>
  </article>
</template>

<style lang="scss" scoped></style>
