<script setup>
// 文章列表 下拉加载
import ScrollPaging from './ScrollPaging.vue'
import ArticleCard from './ArticleCard.vue'
import RowSkeleton from './RowSkeleton.vue'
import { useTemplateRef, ref } from 'vue'
import { getHomeArticleListAPI, getSearchListAPI } from '@/apis/article'
import {
  getHistoryListAPI,
  getStarListAPI,
  getUserArticleListAPI
} from '@/apis/user'

const props = defineProps({
  type: {
    // 类别 0-首页列表 1-搜索列表 2-文章管理 3-我的收藏 4-历史足迹
    type: Number,
    required: true
  },
  categoryId: Number, // 筛选分类id
  title: String, // 搜索标题
  tag: String, // 搜索标签
  highlight: String, // 高亮关键词
  userId: Number // 用户id
})

// 根据props.type选择对应的API
const apiMap = {
  0: getHomeArticleListAPI,
  1: getSearchListAPI,
  2: getUserArticleListAPI,
  3: getStarListAPI,
  4: getHistoryListAPI
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

/**
 * 分组展示
 * @param {Number} index 当前项数组索引
 */
const showGroup = (index) => {
  if (index === 0) return true // 数组第一项

  const current = new Date(articleList.value[index].createTime)
  const last = new Date(articleList.value[index - 1].createTime)

  return (
    current.getDate() !== last.getDate() ||
    current.getMonth() !== last.getMonth() ||
    current.getFullYear() !== last.getFullYear()
  )
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

      <div
        class="article-list-item"
        v-for="(item, index) in articleList"
        :key="index"
      >
        <time
          class="group-divider"
          v-if="[2, 3, 4].includes(type) && showGroup(index)"
          >{{ (item.publishTime || item.createTime)?.substring(0, 10) }}</time
        >
        <router-link :to="`/detail?id=${item.id}`" target="_blank">
          <article-card
            :detail="item"
            :highlight="highlight"
            :manage="[2].includes(type)"
          ></article-card>
        </router-link>
      </div>
    </div>
  </scroll-paging>
</template>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  background-color: #ffffff;

  .group-divider {
    display: block;
    padding: 10px 0;
    background-color: #f7f8fa;
    border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  }
}
</style>
