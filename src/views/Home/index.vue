<script setup>
import AsideNavigator from './components/AsideNavigator.vue'
import HotList from './components/HotList.vue'
import ArticleList from '@/components/ArticleList.vue'
import { useRoute } from 'vue-router'
import { ref, watch, useTemplateRef } from 'vue'

const articleListRef = useTemplateRef('articleListRef')

// 筛选分类
const route = useRoute()
const category = ref(route.params.category || undefined)
watch(
  () => route.params.category,
  (newValue) => {
    category.value = newValue
    articleListRef.value.reload()
  }
)
</script>

<template>
  <div class="page-container">
    <header class="top-nav">
      <aside-navigator mode="horizontal"></aside-navigator>
    </header>

    <div class="wrapper">
      <aside class="aside-nav">
        <aside-navigator></aside-navigator>
      </aside>
      <main class="article-section">
        <article-list
          ref="articleListRef"
          :type="0"
          :category="category"
        ></article-list>
      </main>
      <aside class="aside-section">
        <hot-list></hot-list>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: 100%;

  .top-nav {
    position: sticky;
    top: 60px;
    z-index: 9999;
    width: min(100%, 95vw);
    overflow: hidden;
    margin-bottom: 10px;
    @include hide-above(1220px);
  }

  .wrapper {
    display: flex;
    justify-content: space-between;

    .aside-nav {
      position: sticky;
      top: 80px;
      height: fit-content;
      margin-right: 20px;
      @include hide-below(1220px);
    }

    .article-section {
      flex-shrink: 0;
      width: min(720px, 95vw);
    }

    .aside-section {
      position: sticky;
      top: 80px;
      height: fit-content;
      margin-left: 20px;
      @media (max-width: 1220px) {
        top: 130px;
      }
      @include hide-below(1053px);
    }
  }
}
</style>
