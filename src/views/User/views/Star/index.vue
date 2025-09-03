<script setup>
import ArticleList from '@/components/ArticleList.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="page-container">
    <article-list
      ref="articleListRef"
      :type="3"
      :user-id="userStore.getCurrentUserId()"
    ></article-list>
  </div>
</template>

<style lang="scss" scoped></style>
