<template>
  <div class="login-wrapper">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="login-container"
    >
      <h3>LOGIN</h3>
      <el-form-item :label="accountText" prop="account">
        <el-input v-model="ruleForm.account" :placeholder="tip(accountText)" clearable />
      </el-form-item>

      <el-form-item :label="passwordText" prop="password">
        <el-input v-model="ruleForm.password" :placeholder="tip(passwordText)" type="password" clearable />
      </el-form-item>

      <el-form-item label="">
        <el-button 
          class="login-btn" 
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          登入
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

import { FormInterface, InitData, TipType } from '@/types/login'
import { getLoginData } from '@/api/api_login'
import { fakeData, FakeDataType } from '@/fakeData/fakeData_login'

const accountText = '帳號'
const passwordText = '密碼'
const tip: TipType = (text) => {
  return `請輸入${text}`
}

const ruleFormRef = ref<FormInstance>()
const ruleForm: FormInterface = reactive(new InitData())
const rules = reactive<FormRules>({
  account: [
    {
      required: true,
      message: tip(accountText),
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: tip(passwordText),
      trigger: 'change',
    },
  ]
})

const router = useRouter()
const submit = () => {
  getLoginData<FakeDataType>({
    url: '/posts',
    method: 'get',
    data: ruleForm
  }, fakeData, false).then(({ data }) => {
    localStorage.setItem('token', data.token)

    router.push({ name: 'Home' })
  })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      submit()
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="scss" scoped>
%center {
  display: flex;
  justify-content: center;
  align-items: center;
};

@mixin size ($width, $height) {
  width: $width;
  height: $height;
}

.login {
  &-wrapper {
    width: 100vw;
    height: 100vh;

    background-image: url('~@/assets/login-bg.jpg');
    position: relative;
    @extend %center;
  }

  &-container {
    position: absolute;
    @include size(450px, 300px);
    z-index: 10;

    &::before {
      display: block;
      content: '';
      z-index: -1;

      position: absolute;
      @include size(500px, 300px);
      transform: translateX(calc(-50px / 2)) translateY(calc(-50px / 2));

      filter: blur(10px);
      border-radius: 6px;
      background-color: #ffffffbb;
    }
  }

  &-btn {
    width: 100px;
    margin: 0 auto;
  }
}
</style>