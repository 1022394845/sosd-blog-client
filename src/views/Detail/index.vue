<script setup>
import { ref, provide, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetail from './components/ArticleDetail.vue'
import ArticleComment from './components/ArticleComment.vue'
import ArticlePanel from './components/ArticlePanel.vue'

const route = useRoute()
const articleId = Number(route.query.id) || null
provide('articleId', articleId)

const loadComment = ref(false)

// 跳转至评论区
const commentRef = useTemplateRef('commentRef')
const goComment = () => {
  if (commentRef.value) commentRef.value.goComment()
}
</script>

<template>
  <div class="page-container">
    <article-detail @success="loadComment = true"></article-detail>
    <div class="panel-column">
      <article-panel @comment="goComment"></article-panel>
    </div>
    <div class="panel-row">
      <article-panel direction="row" @comment="goComment"></article-panel>
    </div>
    <article-comment v-if="loadComment" ref="commentRef"></article-comment>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: min(820px, 95vw);

  .panel-column {
    position: fixed;
    margin-left: -10%;
    top: 150px;
    @include hide-below(1050px);
  }

  .panel-row {
    display: none;
    width: fit-content;
    margin: 20px auto;
    @include show-below(1050px);
  }
}
</style>
