<script setup>
// 文章卡片
import { Picture } from '@element-plus/icons-vue'

const props = defineProps({
  detail: {
    // 文章信息
    // {
    //   id: 1,
    //   title: 'Python编程入门指南',
    //   content: 'Python是一种高级编程语言...',
    //   preview: 'Python是一种高级编程语言...',
    //   isTop: false,
    //   isRecommend: true,
    //   category: '技术',
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
    //   publishTime: '2025-07-26 13:33:17',
    //   createTime: '2025-01-01 08:00:00',
    //   updateTime: '2025-01-02 10:00:00',
    //   image: 'python.jpg',
    //   status: 2,
    //   likeNumber: 2,
    //   viewNumber: 12,
    //   commentNumber: 5,
    //   favoriteNumber: 3,
    //   isLike: false
    // }
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="article-card">
    <div class="info">
      <h1 class="title ellipsis">{{ detail.title }}</h1>
      <p class="preview ellipsis">{{ detail.preview }}</p>
      <div class="base">
        <address class="author ellipsis color-hover">
          {{ detail.author }}
        </address>
        <el-divider direction="vertical" />
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
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="cover" v-if="detail.image">
      <el-image :src="detail.image" fit="fill" loading="lazy">
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
        max-width: 40px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 72px;
    background-color: #f5f7fa;
    font-size: 28px;
  }
}
</style>
