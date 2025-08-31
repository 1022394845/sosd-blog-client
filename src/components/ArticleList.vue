<script setup>
// 文章列表 下拉加载
import ScrollPaging from './ScrollPaging.vue'
import ArticleCard from './ArticleCard.vue'
import RowSkeleton from './RowSkeleton.vue'
import { useTemplateRef, ref, computed } from 'vue'
import { getHomeArticleListAPI } from '@/apis/article'

const props = defineProps({
  category: String // 筛选分类
})

const config = computed(() => ({
  category: props.category
}))

const pagingRef = useTemplateRef('pagingRef')

const initLoading = ref(true)
const articleList = ref([])
const loadArticle = async (page, pageSize) => {
  console.log('request', page, pageSize, config.value)
  try {
    const { records, total } = await getHomeArticleListAPI(
      page,
      pageSize,
      config.value
    )
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

      <a
        v-for="(item, index) in articleList"
        :key="index"
        :href="`/detail/id=${item.id}`"
      >
        <article-card :detail="item"></article-card>
      </a>
    </div>
  </scroll-paging>
</template>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  background-color: #ffffff;
}
</style>
