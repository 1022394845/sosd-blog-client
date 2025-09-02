<script setup>
import CategoryNavigator from './components/CategoryNavigator.vue'
import HotList from './components/HotList.vue'
import ArticleList from '@/components/ArticleList.vue'
import { useRoute } from 'vue-router'
import { computed, watch, useTemplateRef, nextTick } from 'vue'
import { useArticleStore } from '@/stores/article'

const { categoryList } = useArticleStore()

const articleListRef = useTemplateRef('articleListRef')

// 筛选分类
const route = useRoute()
const categoryId = computed(
  () => categoryList.find((item) => item.label === route.params.category).id
)
watch(categoryId, () => {
  nextTick(() => {
    articleListRef.value.reload()
  })
})
</script>

<template>
  <div class="page-container">
    <header class="top-nav">
      <category-navigator mode="horizontal"></category-navigator>
    </header>

    <div class="wrapper">
      <aside class="aside-nav">
        <category-navigator></category-navigator>
      </aside>
      <main class="article-section">
        <article-list
          ref="articleListRef"
          :type="0"
          :category-id="categoryId"
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
      width: 180px;
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
