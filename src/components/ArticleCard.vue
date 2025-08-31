<script setup>
// 文章卡片
import { highlightText } from '@/utils/highlight'
import { Picture } from '@element-plus/icons-vue'

const props = defineProps({
  detail: {
    // 文章信息
    // {
    //   id: 1,
    //   title: 'Python编程入门指南',
    //   preview: 'Python是一种高级编程语言...',
    //   tags: [
    //     {
    //       id: 1,
    //       name: 'Java',
    //       status: 1
    //     },
    //     {
    //       id: 2,
    //       name: 'C++',
    //       status: 1
    //     }
    //   ],
    //   author: 'Lynn',
    //   image: 'python.jpg',
    //   likeNumber: 2,
    //   viewNumber: 12,
    //   isLike: false
    // }
    type: Object,
    required: true
  },
  highlight: String
})

const highlightMatch = (text) => highlightText(text, props.highlight)
</script>

<template>
  <article class="article-card">
    <div class="info">
      <h1
        class="title ellipsis"
        v-dompurify-html="highlightMatch(detail.title)"
      ></h1>
      <p
        class="preview ellipsis"
        v-dompurify-html="highlightMatch(detail.preview)"
      ></p>
      <div class="base">
        <address class="author ellipsis color-hover">
          {{ detail.author }}
        </address>
        <el-divider direction="vertical" class="divider" />
        <div class="data view">
          <span class="data-icon iconfont icon-view"></span>
          <span class="data-number">{{ detail.viewNumber }}</span>
        </div>
        <div class="data like color-hover" style="margin-left: 20px">
          <span class="data-icon iconfont icon-like"></span>
          <span class="data-number">{{ detail.likeNumber }}</span>
        </div>
        <div class="tag-list">
          <div
            class="tag color-hover ellipsis"
            v-for="item in detail.tags"
            :key="item.id"
            @click.stop.prevent="$router.replace(`/search?tag=${item.name}`)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="cover" v-if="detail.image">
      <el-image :src="detail.image" fit="fill" lazy>
        <template #error>
          <el-icon><Picture /></el-icon>
        </template>
      </el-image>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  cursor: pointer;
  transition: all 0.3s;
  color: #8a919f;

  &:hover {
    background-color: #f7f8fa;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 0;
    height: 100%;

    .color-hover:hover {
      color: $sosd-main-color-1;
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #252933;
    }

    .preview {
      font-size: 13px;
    }

    .base {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;

      .author {
        flex-shrink: 0;
        max-width: 100px;
      }

      .author,
      .divider {
        @include hide-below(430px);
      }

      .data {
        flex-shrink: 0;
        &-number {
          margin-left: 5px;
        }
      }

      .tag-list {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-left: auto;
        overflow: hidden;
        @include hide-below(530px);

        .tag {
          padding: 0 6px;
          max-width: 65px;
          background-color: #f2f3f5;
          border-radius: 2px;
        }
      }
    }
  }

  .cover {
    flex-shrink: 0;
    width: 108px;
    height: 72px;
    font-size: 28px;
    @include hide-below(300px);
  }
}
</style>
