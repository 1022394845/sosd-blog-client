<script setup>
import DotLoading from '@/components/DotLoading.vue'
import RichText from '@/components/RichText.vue'
import { getArticleDetailAPI } from '@/apis/article'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.query.id || null

const detail = ref({}) // 文章详情
const detailLoading = ref(true)
const abstract = ref('') // AI总结
const abstractLoading = ref(true)
const getDetail = async () => {
  if (articleId === null) return
  detailLoading.value = true
  const data = await getArticleDetailAPI(articleId)
  detail.value = data
  detailLoading.value = false
}
onMounted(() => {
  getDetail()
})
</script>

<template>
  <div class="page-container" v-loading="detailLoading">
    <div class="article">
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
        </header>
        <el-divider></el-divider>
        <main class="main">
          <!-- AI总结 -->
          <section class="abstract">
            <p class="ellipsis-3">
              <img src="@/static/ai_abstract_logo.png" alt="" />
              <span v-if="abstractLoading" style="display: inline-block">
                <dot-loading>加载中</dot-loading>
              </span>
              <template v-else>{{ abstract }}</template>
            </p>
          </section>
          <!-- 文章内容 -->
          <div class="content">
            <rich-text :text="detail.content"></rich-text>
          </div>
        </main>
      </template>
    </div>
    <div class="comment" v-if="detail.id">评论</div>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: min(820px, 95vw);

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
    }

    .main {
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

  .comment {
    margin-top: 20px;
    padding: 30px;
    background-color: #ffffff;
  }
}
</style>
