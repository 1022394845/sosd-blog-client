<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import LoginDialog from '@/components/LoginDialog.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
    <login-dialog></login-dialog>
  </el-config-provider>
</template>

<style lang="scss">
.gradient-1 {
  background-image: linear-gradient(to right, $gradient-1...);

  &.submit-btn {
    @include glow-btn($gradient-1);
  }
}

.gradient-2 {
  background-image: linear-gradient(to right, $gradient-2...);

  &.submit-btn {
    @include glow-btn($gradient-2);
  }
}

.gradient-3 {
  background-image: linear-gradient(to right, $gradient-3...);

  &.submit-btn {
    @include glow-btn($gradient-3);
  }
}

.logo {
  @extend .gradient-1;
  background-clip: text;
  line-height: inherit;
  font-size: inherit;
  font-weight: bold;
  color: transparent;
}

.el-image {
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  background-color: inherit;
  font-size: 16px;
  font-size: inherit;
}
</style>
