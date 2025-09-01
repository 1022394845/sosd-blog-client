<script setup>
import { UserFilled } from '@element-plus/icons-vue'

defineProps({
  src: String // 头像图片url地址
})
</script>

<template>
  <el-avatar class="avatar" fit="fill">
    <el-image v-if="src" :src="src" fit="fill">
      <template #error>
        <el-icon><UserFilled /></el-icon>
      </template>
    </el-image>
    <el-icon v-else><UserFilled /></el-icon>
  </el-avatar>
</template>

<style lang="scss" scoped>
.avatar {
  width: 35px;
  height: 35px;
  margin-left: auto;
  font-size: 18px;
  cursor: pointer;
}
</style>
