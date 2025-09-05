<script setup>
// 路由导航
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { User, Document, Star, Clock } from '@element-plus/icons-vue'

const props = defineProps({
  mode: {
    // 导航方向 垂直-vertical 水平-horizontal 默认垂直
    type: String,
    default: 'vertical'
  }
})
const publishBtnWidth = computed(() =>
  props.mode === 'vertical' ? '184px' : 'fit-content'
)
const publishBtnMarginRight = computed(() =>
  props.mode === 'vertical' ? '0' : '20px'
)

const routerList = [
  { label: 'profile', name: '个人信息', icon: User },
  { label: 'article', name: '文章管理', icon: Document },
  { label: 'star', name: '我的收藏', icon: Star },
  { label: 'history', name: '历史足迹', icon: Clock }
]

const route = useRoute()
const activeMenu = computed(() => `/user/${route.name}`)
</script>

<template>
  <el-scrollbar max-height="calc(100vh - 120px)">
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
        <el-icon class="icon" v-if="mode === 'vertical'">
          <component :is="item.icon"></component>
        </el-icon>

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
    width: v-bind(publishBtnWidth);
    height: 45px;
    margin-bottom: 10px;
    margin-right: v-bind(publishBtnMarginRight);
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

    .icon {
      margin-right: 24px;
    }
  }
}
</style>
