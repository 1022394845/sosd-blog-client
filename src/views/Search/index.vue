<script setup>
import ArticleList from '@/components/ArticleList.vue'
import { computed, watch, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.query.title)
const tag = computed(() => route.query.tag)

const articleListRef = useTemplateRef('articleListRef')

watch(
  () => route.params,
  () => {
    articleListRef.value.reload()
  }
)
</script>

<template>
  <div class="page-container">
    <header class="title">{{ title || tag }}</header>
    <main class="article-section">
      <article-list
        ref="articleListRef"
        :type="1"
        :title="title"
        :tag="tag"
      ></article-list>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: 700;
  color: #666666;
  text-align: center;
}

.article-section {
  width: min(720px, 95vw);
}
</style>
