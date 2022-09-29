<template>
  <div class="filter-container" @click="visible = true">
    <span class="filter-title">篩選</span>
    <div class="filter-str">{{ filterStr }}</div>
     
    <div class="filter-search">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
    </div>
  </div>

  <el-dialog v-model="visible" title="篩選條件">
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="info" @click="reback">返回</el-button>
        <el-button type="warning" @click="clear">清空篩選</el-button>
        <el-button type="primary" @click="submit">確認</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" >
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    filterStr: {
      type: String,
      default: ''
    }
  },
  emits: ['clear', 'submit'],
  setup (props, { emit }) {
    let visible = ref(false)

    const reback = (): void => {
      visible.value = false
    }
    const clear = (): void => {
      emit('clear')
    }
    const submit = ():void => {
      visible.value = false
      emit('submit')
    }

    return {
      visible,
      reback,
      clear,
      submit
    }
  }
})

</script>

<style lang="scss" scoped>
.filter {
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 6px;
    background-color: $blue;
    transition-duration: 0.3s;

    &:hover {
      background-color: darken($blue, 10);
    }
  }

  &-title,
  &-search {
    font-size: 1.2em;
    color: $white;
  }

  &-str {
    color: $white;
    flex: 1;
    padding: 0 16px;
  }
}


</style>