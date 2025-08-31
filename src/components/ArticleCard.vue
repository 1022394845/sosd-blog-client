<script setup>
// 文章卡片
</script>

<template>
  <article class="article-card"></article>
</template>

<style lang="scss" scoped>
.article-card {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 100px;
  color: #8a919f;
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f7f8fa;
  }
}
</style>
