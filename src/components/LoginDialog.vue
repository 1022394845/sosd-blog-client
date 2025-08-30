<script setup>
// 登录弹窗
import { ref, onMounted, useTemplateRef } from 'vue'
import { registerLoginDialog } from '@/directives/login'
import { Close } from '@element-plus/icons-vue'
import { showMsg } from '@/utils/common'
import { useCountdown } from '@/utils/countdown'

onMounted(() => {
  // 注册指令
  registerLoginDialog({ open })
})

defineExpose({ open, close })

const dialogVisible = ref(false)
function open() {
  dialogVisible.value = true
}
function close() {
  dialogVisible.value = false
}

// 表单
const formRef = useTemplateRef('formRef')
const formOption = ref(0) // 0-登录 1-注册 2-重置
const formOptionList = [
  { index: 0, label: '登录', class: 'login' },
  { index: 1, label: '注册', class: 'register' },
  { index: 2, label: '重置', class: 'reset' }
]
const defaultForm = {
  account: '',
  password: '',
  email: '',
  code: '',
  repeat: ''
}
const formData = ref({ ...defaultForm })
const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱号', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确的邮箱号',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  repeat: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('请确认两次密码是否一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 改变表单选项
const handelChangeOption = (index) => {
  formOption.value = index
  formData.value = { ...defaultForm }
  if (formRef.value) formRef.value.resetFields()
}

// 获取验证码
const codeCountdown = useCountdown(10)
const getCode = async () => {
  if (codeCountdown.disabled.value) return

  // 校验邮箱
  try {
    const result = await formRef.value.validateField('email')
    if (!result) throw new Error()
  } catch {
    return showMsg('邮箱输入不正确', 'error')
  }

  codeCountdown.start()
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="max(35%, 350px)"
    :show-close="false"
  >
    <!-- 标题 -->
    <template #header>
      <div class="header">
        <div class="title">登录 <span class="logo">SOSD</span> 博客平台</div>
        <el-icon class="close" @click="close"><Close /></el-icon>
      </div>
    </template>

    <template #default>
      <div class="form-container">
        <div class="option">
          <div
            class="option-item"
            v-for="item in formOptionList"
            :key="item.index"
            :class="{ [item.class]: true, active: item.index === formOption }"
            @click="handelChangeOption(item.index)"
          >
            {{ item.label }}
          </div>
        </div>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :label-width="formOption === 0 ? '40px' : '70px'"
          hide-required-asterisk
        >
          <el-form-item
            label="账号"
            prop="account"
            v-if="[0, 1].includes(formOption)"
          >
            <el-input
              v-model="formData.account"
              placeholder="请输入账号"
              :maxlength="32"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            v-if="[1, 2].includes(formOption)"
          >
            <el-input
              v-model="formData.email"
              placeholder="请输入邮箱"
              :maxlength="32"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="code"
            v-if="[1, 2].includes(formOption)"
            style="position: relative"
          >
            <el-input
              v-model="formData.code"
              placeholder="请输入验证码"
              :maxlength="6"
            ></el-input>
            <el-button
              size="small"
              class="inline-btn"
              :disabled="codeCountdown.disabled.value"
              @click="getCode"
            >
              {{
                codeCountdown.disabled.value
                  ? `剩余${codeCountdown.remain.value}秒重新获取`
                  : '获取验证码'
              }}
            </el-button>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="position: relative">
            <el-input
              v-model="formData.password"
              type="password"
              show-password
              placeholder="请输入密码"
              :maxlength="32"
            ></el-input>
            <el-button
              size="small"
              class="inline-btn"
              v-if="[0].includes(formOption)"
              @click="formOption = 2"
            >
              忘记密码
            </el-button>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="repeat"
            v-if="[1, 2].includes(formOption)"
          >
            <el-input
              v-model="formData.repeat"
              type="password"
              show-password
              placeholder="请再次确认密码"
              :maxlength="32"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="submit-btn"
          size="large"
          :class="`gradient-${formOption + 1}`"
        >
          {{ formOptionList[formOption].label }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 28px;
  }

  .close {
    font-size: 22px;
    color: #666666;
    cursor: pointer;
  }
}

.form-container {
  padding: 20px;
  padding-top: 0;

  .option {
    display: flex;
    justify-content: center;
    gap: 40px;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
    color: #666666;
    user-select: none;

    &-item {
      cursor: pointer;

      &.active {
        &.login {
          color: $sosd-main-color-1;
        }
        &.register {
          color: $sosd-main-color-2;
        }
        &.reset {
          color: $sosd-main-color-3;
        }
      }
    }
  }

  // 标签两端对齐
  :deep(.el-form-item__label) {
    display: inline;
    text-align-last: justify;
  }

  // 行内按钮
  .inline-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
  }

  .submit-btn {
    width: 100%;
    font-size: 18px;
    color: #ffffff;
  }
}
</style>
