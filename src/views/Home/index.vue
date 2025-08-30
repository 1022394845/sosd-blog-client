<script setup>
import AsideNavigator from './components/AsideNavigator.vue'
import HotList from './components/HotList.vue'
</script>

<template>
  <div class="page-container">
    <aside class="aside-nav">
      <aside-navigator></aside-navigator>
    </aside>
    <div class="article-list"></div>
    <aside class="aside-section">
      <hot-list></hot-list>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .aside-nav {
    position: sticky;
    top: 80px;
    height: fit-content;
    margin-right: 20px;
    @include hide-below(1220px);
  }

  .article-list {
    flex-shrink: 0;
    width: min(720px, 95vw);
    height: 2000px;
    background-color: pink;
  }

  .aside-section {
    position: sticky;
    top: 80px;
    height: fit-content;
    margin-left: 20px;
    @include hide-below(1000px);
  }
}
</style>
