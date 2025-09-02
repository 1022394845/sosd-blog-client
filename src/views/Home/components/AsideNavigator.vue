<script setup>
// 文章分类导航
import { useArticleStore } from '@/stores/article'
import { useRoute, useRouter } from 'vue-router'

const { categoryList } = useArticleStore()

defineProps({
  mode: {
    // 导航方向 垂直-vertical 水平-horizontal 默认垂直
    type: String,
    default: 'vertical'
  }
})

const route = useRoute()
const router = useRouter()
const defaultActive = route.params.category || 'recommended'

const handelChangeCategory = (index) => {
  router.replace(`/home/${index}`)
}
</script>

<template>
  <el-scrollbar
    max-height="calc(100vh - 100px)"
    :wrap-style="{ width: '100%' }"
  >
    <el-menu
      class="category-nav"
      :default-active="defaultActive"
      :mode="mode"
      text-color="#515767"
      @select="(index) => handelChangeCategory(index)"
    >
      <el-menu-item
        v-for="item in categoryList"
        :key="item.id"
        :index="item.label"
      >
        <span class="iconfont" :class="`icon-${item.label}`"></span>
        <span style="margin-left: 12px">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.category-nav {
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  border-right: none;

  .el-menu-item {
    height: 45px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;

    &.is-active {
      background-color: rgba($sosd-main-color-1, 0.2);
    }
  }
}
</style>
