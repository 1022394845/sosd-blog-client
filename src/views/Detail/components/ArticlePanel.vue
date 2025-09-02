<script setup>
// 文章详情数据操作板
import CommonAvatar from '@/components/CommonAvatar.vue'
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import { inject } from 'vue'

const articleStore = useArticleStore()
const userStore = useUserStore()

const props = defineProps({
  direction: {
    // 按钮平铺方向 垂直column 水平row 默认column
    type: String,
    default: 'column'
  }
})
const articleId = inject('articleId')
const emits = defineEmits(['comment'])

// 前往评论
const goComment = () => {
  emits('comment')
}

// 切换点赞状态
const toggleLike = () => {
  articleStore.toggleLikeStatus(userStore.getCurrentUserId(), articleId)
}

// 切换收藏状态
const toggleStar = () => {
  articleStore.toggleStarStatus(userStore.getCurrentUserId(), articleId)
}
</script>

<template>
  <div class="article-panel">
    <div class="panel-item avatar">
      <common-avatar
        :src="articleStore.currentArticleData.image"
        size="50px"
      ></common-avatar>
    </div>
    <el-badge
      class="panel-item like"
      :class="{ active: articleStore.currentArticleData.isLike }"
      :value="articleStore.currentArticleData.likeNumber"
      :max="999"
      type="info"
      v-need-login="toggleLike"
    >
      <div class="iconfont icon-like_fill"></div>
    </el-badge>
    <el-badge
      class="panel-item comment"
      :value="articleStore.currentArticleData.commentNumber"
      :max="999"
      type="info"
      @click="goComment"
    >
      <div class="iconfont icon-comment_fill"></div>
    </el-badge>
    <el-badge
      class="panel-item star"
      :class="{ active: articleStore.currentArticleData.isFavorite }"
      :value="articleStore.currentArticleData.favoriteNumber"
      :max="999"
      type="info"
      v-need-login="toggleStar"
    >
      <div class="iconfont icon-star_fill"></div>
    </el-badge>
  </div>
</template>

<style lang="scss" scoped>
.article-panel {
  display: flex;
  flex-direction: v-bind('props.direction');
  gap: 30px;
  width: fit-content;
  height: fit-content;

  .panel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    cursor: pointer;
    color: #8a919f;
    font-size: 22px;
    transition: all 0.2s;

    &:hover {
      color: #515767;
    }

    &.active {
      color: $sosd-main-color-1;
    }
  }

  // 徽章样式
  :deep(.el-badge__content) {
    top: 15%;
    right: calc(var(--el-badge-size) / 2 + 5px);
    background-color: #c2c8d1;
    font-size: 11px;
  }
}
</style>
