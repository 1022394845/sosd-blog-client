<script setup>
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetail from './components/ArticleDetail.vue'
import ArticleComment from './components/ArticleComment.vue'
import ArticlePanel from './components/ArticlePanel.vue'

const route = useRoute()
const articleId = Number(route.query.id) || null
provide('articleId', articleId)

const loadComment = ref(false)
</script>

<template>
  <div class="page-container">
    <div class="panel">
      <article-panel></article-panel>
    </div>
    <article-detail @success="loadComment = true"></article-detail>
    <article-comment v-if="loadComment"></article-comment>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: min(820px, 95vw);

  .panel {
    position: fixed;
    margin-left: -10%;
    top: 150px;
    @include hide-below(1050px);
  }
}
</style>
