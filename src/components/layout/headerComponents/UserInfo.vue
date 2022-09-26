<template>
  <div v-popover="popoverRef" class="user-container" v-click-outside="onClickOutside">
    <img src="~@/assets/user.jpg" alt="user" class="user-img" />
  </div>

  <el-popover ref="popoverRef" trigger="click" virtual-triggering persistent>
    <div class="popover-name">{{ userName }}</div>
    <el-button class="popover-logout" type="primary" plain @click="logout">登出</el-button>
  </el-popover>
</template>
<script setup lang="ts">
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { ClickOutside as vClickOutside } from 'element-plus'

const userName = 'ZhenZhan'
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const router = useRouter()
const logout = (): void => {
  router.push('/login')
}
</script>
<style lang="scss" scoped>
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user {
  &-container {
    width: 57px;
    height: 57px;
    padding: 1px;
    
    @extend %center;
    margin-left: 16px;
    border-radius: 6px;
    
    border: 2px solid #c9e3ff00;
    transition-duration: 0.3s;
    &:hover {
      border: 2px solid #a4d0ff;
      background-color: #c9e3ff;
    }
  }
  &-img {
    width: 50px;
    height: 50px;
    border-radius: 6px;
  }
}

.popover {
  &-name {
    width: 100%;
    padding-bottom: 4px;
    font-weight: 600;
    border-bottom: 1px solid #2c3e50;
  }

  &-logout {
    margin-top: 8px;
    width: 100%;
  }
}
</style>