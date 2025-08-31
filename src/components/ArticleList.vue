<script setup>
// 文章列表 下拉加载
import ScrollPaging from './ScrollPaging.vue'
import ArticleCard from './ArticleCard.vue'
import RowSkeleton from './RowSkeleton.vue'
import { useTemplateRef, ref } from 'vue'

const mock = {
  id: 1,
  title: 'Python编程入门指南',
  content: 'Python是一种高级编程语言...',
  preview: 'Python是一种高级编程语言...',
  isTop: false,
  isRecommend: true,
  category: '技术',
  tags: [
    {
      id: 1,
      name: 'Java',
      status: 1
    },
    {
      id: 2,
      name: 'C++',
      status: 1
    }
  ],
  author: 'Lynn',
  publishTime: '2025-07-26 13:33:17',
  createTime: '2025-01-01 08:00:00',
  updateTime: '2025-01-02 10:00:00',
  image: 'https://picsum.photos/108/72?random=1',
  status: 2,
  likeNumber: 2,
  viewNumber: 12,
  commentNumber: 5,
  favoriteNumber: 3,
  isLike: false
}

const pagingRef = useTemplateRef('pagingRef')

const initLoading = ref(true)
const articleList = ref([])
const loadArticle = async (page, pageSize) => {
  console.log('request', page, pageSize)
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        pagingRef.value.completeByTotal(Array(pageSize).fill(mock), 30)
        initLoading.value = false
        resolve()
      }, 2000)
    })
  } catch {
    pagingRef.value.completeByTotal(false)
  }
}
</script>

<template>
  <scroll-paging
    v-model="articleList"
    ref="pagingRef"
    @on-load="(page, pageSize) => loadArticle(page, pageSize)"
  >
    <div class="article-list">
      <row-skeleton
        :row="4"
        v-if="initLoading"
        style="padding: 20px"
      ></row-skeleton>

      <article-card
        v-for="(item, index) in articleList"
        :key="index"
        :detail="item"
      ></article-card>
    </div>
  </scroll-paging>
</template>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  background-color: #ffffff;
}
</style>
