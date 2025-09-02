<script setup>
import { UserFilled } from '@element-plus/icons-vue'

const props = defineProps({
  src: String, // 头像图片url地址
  size: {
    // 头像大小 默认35px
    type: String,
    default: '35px'
  }
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
  width: v-bind('props.size');
  height: v-bind('props.size');
  margin-left: auto;
  font-size: calc(v-bind('props.size') * 18 / 35); // 以35px~18px为基准
  cursor: pointer;
}
</style>
