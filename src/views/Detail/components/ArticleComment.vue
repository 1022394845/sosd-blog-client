<script setup>
const props = defineProps({
  id: {
    // 文章id
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="comment-container">评论</div>
</template>

<style lang="scss" scoped>
.comment-container {
  margin-top: 20px;
  padding: 30px;
  background-color: #ffffff;
}
</style>
