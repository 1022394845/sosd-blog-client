<script setup>
// 文章内容部分
import DotLoading from '@/components/DotLoading.vue'
import RichText from '@/components/RichText.vue'
import { getArticleAbstractAPI, getArticleDetailAPI } from '@/apis/article'
import { ref, onMounted, inject } from 'vue'

const articleId = inject('articleId') // 文章id
// 通知父组件内容加载完毕，可以开始加载评论
const emits = defineEmits(['success'])

const detail = ref({}) // 文章详情
const detailLoading = ref(true)
const getDetail = async () => {
  if (articleId === null) return
  detailLoading.value = true
  const data = await getArticleDetailAPI(articleId)
  detail.value = data
  detailLoading.value = false
}

const abstract = ref('') // AI总结
const abstractLoading = ref(true)
const getAbstract = async () => {
  if (articleId === null) return
  try {
    abstractLoading.value = true
    const data = await getArticleAbstractAPI(articleId)
    abstract.value = data
  } catch {
    abstract.value = '加载失败'
  } finally {
    abstractLoading.value = false
  }
}

onMounted(async () => {
  await getDetail()
  getAbstract()
  emits('success')
})
</script>

<template>
  <article class="article" v-loading="detailLoading">
    <template v-if="detail.id">
      <header class="header">
        <h1 class="title">{{ detail.title }}</h1>
        <div class="base">
          <address class="author">{{ detail.author }}</address>
          <time>{{ detail.publishTime }}</time>
          <div class="data view">
            <span class="data-icon iconfont icon-view"></span>
            <span class="data-number">{{ detail.viewNumber }}</span>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- AI总结 -->
        <section class="abstract">
          <p class="ellipsis-3">
            <img src="@/static/ai_abstract_logo.png" alt="" />
            <span v-if="abstractLoading" style="display: inline-block">
              <dot-loading>加载中</dot-loading>
            </span>
            <span v-else v-typewrite="{ speed: 50 }">{{ abstract }}</span>
          </p>
        </section>
      </header>

      <!-- 文章内容 -->
      <div class="content">
        <rich-text :text="detail.content"></rich-text>
      </div>
    </template>
  </article>
</template>

<style lang="scss" scoped>
.article {
  min-height: 300px;
  padding: 30px;
  background-color: #ffffff;

  .header {
    .title {
      font-size: 32px;
      font-weight: bold;
      color: #252933;
    }

    .base {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px 30px;
      margin-top: 20px;
      color: #8a919f;

      .author {
        color: #515767;
      }

      .data {
        &-number {
          margin-left: 5px;
        }
      }
    }

    .abstract {
      margin-bottom: 20px;
      padding: 8px 16px;
      background: url('@/static/ai_abstract_bg.png') no-repeat center/cover;
      border-radius: 8px;
      color: #222226;
      font-size: 16px;
      line-height: 2;

      img {
        margin-right: 8px;
        height: 25px;
        vertical-align: text-bottom;
      }
    }
  }
}
</style>
