<script setup>
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetail from './components/ArticleDetail.vue'
import ArticleComment from './components/ArticleComment.vue'

const route = useRoute()
const articleId = Number(route.query.id) || null
provide('articleId', articleId)

const loadComment = ref(false)
</script>

<template>
  <div class="page-container">
    <article-detail @success="loadComment = true"></article-detail>
    <article-comment v-if="loadComment"></article-comment>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: min(820px, 95vw);
}
</style>
