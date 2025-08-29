<script setup>
import { ref } from 'vue'
import {
  Search,
  UserFilled,
  User,
  Document,
  Star,
  Clock,
  SwitchButton
} from '@element-plus/icons-vue'
import { openLogin } from '@/directives/login'

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
  console.log('search:', searchValue.value)
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
const handleCommand = (command) => {
  console.log(command)
  if (command === 'login') openLogin()
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
            placeholder="探索平台"
            :max="32"
            @change="allowSearch = true"
            @keyup.enter="onSearch"
          >
            <template #append>
              <el-button :icon="Search" size="small" @click="onSearch" />
            </template>
          </el-input>
          <!-- 创作者中心 -->
          <el-button type="primary" class="header-user-center">
            创作者中心
          </el-button>
          <!-- 头像&下拉菜单 -->
          <el-dropdown
            @command="(command) => handleCommand(command)"
            placement="bottom-end"
          >
            <template #default>
              <el-avatar class="header-avatar" fit="fill">
                <img v-if="false" src="" alt="" />
                <el-icon v-else><UserFilled /></el-icon>
              </el-avatar>
            </template>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in false
                    ? headerDropdownList.login
                    : headerDropdownList.logout"
                  :key="item.command"
                  :command="item.command"
                  :icon="item.icon"
                  >{{ item.label }}</el-dropdown-item
                >
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
    margin: auto;

    .header-logo {
      flex-shrink: 0;
      margin-left: 24px;
      font-size: 32px;
    }

    .header-nav {
      flex: 1;
      min-width: 136px;
      width: 0;
      border-bottom: none;
    }

    .header-search {
      min-width: 120px;
      max-width: 300px;
    }

    .header-user-center {
      @include hide-below(635px);
    }

    .header-avatar {
      width: 35px;
      height: 35px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}

.el-main {
  min-height: calc(100vh - 60px - 60px);
}

.el-footer {
  height: 60px;
  line-height: 60px;
  background-color: #111827;
  text-align: center;
  color: #9ca3af;
}
</style>
