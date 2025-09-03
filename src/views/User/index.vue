<script setup>
import { useRoute } from 'vue-router'
import RouterNavigator from './components/RouterNavigator.vue'

const route = useRoute()
</script>

<template>
  <div class="user-layout">
    <el-container>
      <el-header class="top-nav">
        <router-navigator mode="horizontal"></router-navigator>
      </el-header>
      <el-container>
        <el-aside class="aside-nav">
          <router-navigator></router-navigator>
        </el-aside>
        <el-main>
          <header class="title">{{ route.meta.title }}</header>
          <el-divider></el-divider>
          <main>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.user-layout {
  width: 100%;
}

.top-nav {
  position: sticky;
  top: 60px;
  z-index: 999;
  width: min(100%, 95vw);
  padding-left: 0;
  padding-right: 0;
  margin: 0 auto 10px;
  overflow: hidden;
  @include hide-above(1210px);
}

.el-aside {
  position: sticky;
  top: 80px;
  width: 200px;
  height: fit-content;
  margin-right: 20px;
  @include hide-below(1210px);
}

.el-main {
  width: min(980px, 95vw);
  min-height: calc(100vh - 60px - 60px - 40px);
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-x: hidden;

  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .el-divider {
    margin: 16px 0;
  }
}

// 路由切换过渡
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-5%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(5%);
}
</style>
