<template>
  <div class="header-container card-shadow">
    <Hamburger v-model:isOpen="tempIsOpen" class="header-hamburger" />

    <div class="header-list">
      <div class="header-item">
        <Bell/>
      </div>
      <div class="header-item">
        <UserInfo/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import Hamburger from './Hamburger.vue';
import Bell from './headerComponents/Bell.vue'
import UserInfo from './headerComponents/UserInfo.vue';

// hamburger
const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['update:isOpen'])

let tempIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value)
})

</script>

<style lang="scss" scoped>
.header {
  &-container {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
  }

  &-list {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &-item {
    cursor: pointer;
  }
}
</style>