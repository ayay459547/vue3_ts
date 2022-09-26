<template>
  <el-badge :value="200" :max="99">
    <font-awesome-icon icon="fa-solid fa-bell" class="alert-bell" />
  </el-badge>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.alert-bell {
  width: 30px;
  height: 30px;
  padding: 14px;
  border-radius: 6px;
  background-color: #c9e3ff;
  transition-duration: 0.3s;

  &:hover {
    background-color: #a4d0ff;
  }
}
</style>