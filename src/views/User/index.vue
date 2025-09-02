<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const defaultActive = route.name || 'profile'

const routerList = [
  { label: 'profile', name: '个人信息' },
  { label: 'article', name: '文章管理' },
  { label: 'star', name: '我的收藏' },
  { label: 'history', name: '历史足迹' }
]

const handelChangeRouter = (index) => {
  router.replace(`/user/${index}`)
}
</script>

<template>
  <div class="user-layout">
    <el-container>
      <el-aside>
        <el-scrollbar max-height="calc(100vh - 180px)">
          <el-menu
            class="router-nav"
            :default-active="defaultActive"
            text-color="#515767"
            @select="(index) => handelChangeRouter(index)"
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
              :index="item.label"
            >
              <span class="iconfont" :class="`icon-${item.label}`"></span>
              <span style="margin-left: 24px">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.user-layout {
  width: 100%;
}

.el-aside {
  position: sticky;
  top: 80px;
  width: 200px;
  height: fit-content;
  margin-right: 20px;
  @include hide-below(1210px);

  .router-nav {
    width: 100%;
    border-radius: 4px;
    padding: 8px;
    border-right: none;

    .publish-btn {
      margin-bottom: 10px;
      width: 100%;
      height: 40px;
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
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}

.el-main {
  width: min(980px, 95vw);
  min-height: calc(100vh - 60px - 60px - 40px);
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-x: hidden;
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
