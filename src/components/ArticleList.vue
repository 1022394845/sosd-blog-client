<script setup>
// 文章列表 下拉加载
import { useObserver } from '@/utils/observer'
import ArticleCard from './ArticleCard.vue'
import DotLoading from './DotLoading.vue'
import { useTemplateRef, ref } from 'vue'

const articleList = ref(0)
const loadArticle = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      articleList.value += 10
      resolve()
    }, 2000)
  })
}

const loadingRef = useTemplateRef('loadingRef')
const observer = useObserver(loadingRef, loadArticle)
</script>

<template>
  <div class="article-list">
    <article-card v-for="item in articleList" :key="item"></article-card>

    <!-- 状态 -->
    <div class="status loading" ref="loadingRef" v-if="true">
      <dot-loading>加载中</dot-loading>
    </div>
    <div class="status no-more" v-else>暂无更多</div>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  min-height: calc(100vh - 60px - 60px);
  background-color: #ffffff;

  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    color: #666666;
    user-select: none;
  }
}
</style>
