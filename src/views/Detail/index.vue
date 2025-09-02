<script setup>
import { ref, provide, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetail from './components/ArticleDetail.vue'
import ArticleComment from './components/ArticleComment.vue'
import ArticlePanel from './components/ArticlePanel.vue'

const route = useRoute()
const articleId = Number(route.query.id) || null
provide('articleId', articleId)

const allowLoad = ref(false)

// 跳转至评论区
const commentRef = useTemplateRef('commentRef')
const goComment = () => {
  if (commentRef.value) commentRef.value.goComment()
}
</script>

<template>
  <div class="page-container">
    <article-detail @success="allowLoad = true"></article-detail>
    <div class="panel-column" v-if="allowLoad">
      <article-panel @comment="goComment"></article-panel>
    </div>
    <div class="panel-row" v-if="allowLoad">
      <article-panel direction="row" @comment="goComment"></article-panel>
    </div>
    <article-comment v-if="allowLoad" ref="commentRef"></article-comment>
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
    width: fit-content;
    margin: 20px auto;
    @include hide-above(1050px);
  }
}
</style>
