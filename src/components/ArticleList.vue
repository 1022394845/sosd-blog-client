<script setup>
// 文章列表 下拉加载
import ScrollPaging from './ScrollPaging.vue'
import ArticleCard from './ArticleCard.vue'
import RowSkeleton from './RowSkeleton.vue'
import { useTemplateRef, ref } from 'vue'
import { getHomeArticleListAPI, getSearchListAPI } from '@/apis/article'

const props = defineProps({
  type: {
    // 类别 0-首页列表 1-搜索列表
    type: Number,
    required: true
  },
  categoryId: Number, // 筛选分类id
  title: String, // 搜索标题
  tag: String, // 搜索标签
  highlight: String // 高亮关键词
})

// 根据props.type选择对应的API
const apiMap = {
  0: getHomeArticleListAPI,
  1: getSearchListAPI
}

const pagingRef = useTemplateRef('pagingRef')

const initLoading = ref(true)
const articleList = ref([])
const loadArticle = async (page, pageSize) => {
  try {
    const { type, highlight: _, ...config } = props

    const { records, total } = await apiMap[type](page, pageSize, config)
    pagingRef.value.completeByTotal(records, total)
    initLoading.value = false
  } catch {
    pagingRef.value.completeByTotal(false)
  }
}

/**
 * 重载数据
 */
const reload = () => {
  pagingRef.value.reload()
  initLoading.value = true
}

defineExpose({ reload })
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

      <router-link
        v-for="(item, index) in articleList"
        :key="index"
        :to="`/detail?id=${item.id}`"
        target="_blank"
      >
        <article-card :detail="item" :highlight="highlight"></article-card>
      </router-link>
    </div>
  </scroll-paging>
</template>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  background-color: #ffffff;
}
</style>
