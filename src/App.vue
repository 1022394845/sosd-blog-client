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
  background-image: linear-gradient(
    to right,
    #1e80ff,
    #6c7dfd,
    #967af9,
    #b776f2,
    #d372e9
  );
}

.gradient-2 {
  background-image: linear-gradient(
    to right,
    #d372e9,
    #e26fdc,
    #ef6ed0,
    #f86ec3,
    #ff70b7
  );
}

.gradient-3 {
  background-image: linear-gradient(
    to right,
    #ff70b7,
    #ff76a6,
    #ff7e97,
    #ff888b,
    #ff9382
  );
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
  font-size: 16px;
  font-size: inherit;
}
</style>
