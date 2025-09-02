<script setup>
// 路由导航
import { useRoute } from 'vue-router'
import { computed } from 'vue'

defineProps({
  mode: {
    // 导航方向 垂直-vertical 水平-horizontal 默认垂直
    type: String,
    default: 'vertical'
  }
})

const routerList = [
  { label: 'profile', name: '个人信息' },
  { label: 'article', name: '文章管理' },
  { label: 'star', name: '我的收藏' },
  { label: 'history', name: '历史足迹' }
]

const route = useRoute()
const activeMenu = computed(() => `/user/${route.name}`)
</script>

<template>
  <el-scrollbar max-height="calc(100vh - 180px)">
    <el-menu
      class="router-nav"
      :default-active="activeMenu"
      :mode="mode"
      text-color="#515767"
      router
    >
      <el-button
        type="primary"
        class="publish-btn"
        @click="$router.push('/user/publish')"
      >
        写文章
      </el-button>
      <el-menu-item
        v-for="item in routerList"
        :key="item.label"
        :index="`/user/${item.label}`"
      >
        <span
          class="iconfont"
          v-if="mode === 'vertical'"
          :class="`icon-${item.label}`"
        ></span>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.router-nav {
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  border-right: none;

  .publish-btn {
    width: 184px;
    height: 45px;
    margin-bottom: 10px;
    margin-right: auto;
    line-height: 40px;
    font-size: 16px;
  }

  .el-menu-item {
    height: 45px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;

    &.is-active {
      background-color: rgba($sosd-main-color-1, 0.2);
    }

    .iconfont {
      margin-right: 24px;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
