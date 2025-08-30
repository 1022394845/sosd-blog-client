<script setup>
// 文章分类导航
import { useArticleStore } from '@/stores/article'
import { useRouter } from 'vue-router'

const { categoryList } = useArticleStore()

const router = useRouter()

const handelChangeCategory = (index) => {
  router.replace(`/home/${index}`)
}
</script>

<template>
  <el-scrollbar max-height="calc(100vh - 100px)">
    <el-menu
      class="category-nav"
      default-active="recommended"
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
  width: 180px;
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
