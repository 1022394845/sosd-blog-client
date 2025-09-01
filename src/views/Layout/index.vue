<script setup>
import { ref } from 'vue'
import {
  Search,
  User,
  Document,
  Star,
  Clock,
  SwitchButton
} from '@element-plus/icons-vue'
import { openLogin } from '@/directives/login'
import { useUserStore } from '@/stores/user'
import { showConfirm, showMsg } from '@/utils/common'
import { useRouter } from 'vue-router'
import CommonAvatar from '@/components/CommonAvatar.vue'

const userStore = useUserStore()

const router = useRouter()

// 头部导航
const headerNavList = [
  { label: '首页', index: '/home', disabled: false },
  { label: '热点', index: '/', disabled: true },
  { label: '直播', index: '/', disabled: true },
  { label: '课程', index: '/', disabled: true },
  { label: '活动', index: '/', disabled: true }
]

// 头部搜索
let allowSearch = true
const searchValue = ref('')
const onSearch = () => {
  if (!allowSearch || !searchValue.value) return // 当输入内容未发生改变或未输入内容时
  allowSearch = false
  router.replace(`/search?title=${searchValue.value}`)
}

// 头部下拉菜单
const headerDropdownList = {
  login: [
    { label: '基本信息', command: 'profile', icon: User },
    { label: '我的文章', command: 'article', icon: Document },
    { label: '我的收藏', command: 'star', icon: Star },
    { label: '历史足迹', command: 'history', icon: Clock },
    { label: '退出登录', command: 'logout', icon: SwitchButton }
  ],
  logout: [{ label: '登录账号', command: 'login', icon: User }]
}
const handleCommand = async (command) => {
  if (command === 'login') openLogin()
  else if (command === 'logout') {
    const cancel = await showConfirm('确定退出当前账号吗？')
    if (cancel) return
    userStore.logout()
    showMsg('登出成功', 'success')
  }
}
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="header-container">
          <!-- logo -->
          <h1 class="header-logo logo">SOSD</h1>
          <!-- 导航 -->
          <el-menu
            class="header-nav"
            default-active="/home"
            router
            mode="horizontal"
          >
            <el-menu-item
              v-for="nav in headerNavList"
              :index="nav.index"
              :key="nav.label"
              :disabled="nav.disabled"
            >
              {{ nav.label }}
            </el-menu-item>
          </el-menu>
          <!-- 搜索 -->
          <el-input
            v-model.trim="searchValue"
            class="header-search"
            placeholder="探索SOSD"
            :max="32"
            @change="allowSearch = true"
            @keyup.enter="onSearch"
          >
            <template #append>
              <el-button :icon="Search" size="small" @click="onSearch" />
            </template>
          </el-input>
          <!-- 创作者中心 -->
          <el-button type="primary" class="header-user-center" v-need-login>
            创作者中心
          </el-button>
          <!-- 头像&下拉菜单 -->
          <el-dropdown
            @command="(command) => handleCommand(command)"
            placement="bottom-end"
            class="header-dropdown"
          >
            <template #default>
              <common-avatar :stc="userStore.userInfo.image"></common-avatar>
            </template>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in userStore.token
                    ? headerDropdownList.login
                    : headerDropdownList.logout"
                  :key="item.command"
                  :command="item.command"
                  :icon="item.icon"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <p>版权所有 © 2025 酒笙清梅</p>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  position: sticky;
  top: 0;
  z-index: 99;
  height: 60px;
  background-color: #ffffff;

  .header-container {
    display: flex;
    gap: 16px;
    align-items: center;
    max-width: 1440px;
    height: 100%;
    margin: auto;

    .header-logo {
      flex-shrink: 0;
      font-size: 32px;
    }

    .header-nav {
      flex: 1;
      min-width: 136px;
      width: 0;
      border-bottom: none;
      @include hide-below(450px);
    }

    .header-search {
      min-width: 130px;
      max-width: 300px;
      @include hide-below(310px);
    }

    .header-user-center {
      @include hide-below(635px);
    }

    .header-dropdown {
      margin-left: auto;
    }
  }
}

.el-main {
  min-height: calc(100vh - 60px - 60px);
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 0;
  padding-right: 0;
  overflow: visible;
}

.el-footer {
  height: 60px;
  line-height: 60px;
  background-color: #111827;
  text-align: center;
  color: #9ca3af;
}
</style>
