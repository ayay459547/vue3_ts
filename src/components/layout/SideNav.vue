<template>
  <div class="side-container" :class="[
    {'open': tempIsOpen},
    {'close': !tempIsOpen},
  ]">
    <div class="side-logo">
      <img class="logo-img" alt="Vue logo" src="../../assets/logo.png" />
      <a class="logo-title" :class="{'open': tempIsOpen}" href="/home" @click.prevent="changeRouter('/home')">
        LOGO
      </a>
    </div>

    <div class="side-list">
      <a v-for="item in routerList" :key="item.name" class="side-item" :href="item.path"
        @click.prevent="changeRouter(item.path)">
        <font-awesome-icon :icon="item.meta.icon" class="nav-icon" />
        <p class="nav-title">{{ item.meta.title }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { MetaInterface } from '@/types/routes'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['update:isOpen'])

const tempIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value)
})

const router = useRouter()
const routerList = router.getRoutes()
  .filter(v => (v.meta as unknown as MetaInterface).isShow)
  .sort((a, b) => {
    return (a.meta as unknown as MetaInterface).index - (b.meta as unknown as MetaInterface).index
  })

const changeRouter = (path: string): void => {
  router.push(path)
}

</script>

<style lang="scss" scoped>
$side-width: 200px;

.side {
  &-container {
    height: 100%;
    transition: width 0.3s;
    background-color: #2a598a;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &.open {
      width: $side-width;

      @media screen and (max-width: $large) {
        width: 80px;

        &:hover {
          width: $side-width;
        }
      }
    }

    &.close {
      width: 0px;
    }
  }

  &-logo {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;

    .logo {
      &-img {
        width: 50px;
        height: 50px;
      }

      &-title {
        color: #ffffff;
        font-size: 1.5em;
        text-decoration: none;
      }
    }
  }

  &-list {
    flex: 1;
    width: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  &-item {
    color: #ffffff;
    text-decoration: none;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    transition-duration: 0.2s;
    
    .nav {
      &-icon {
        width: 80px;
        font-size: 1.3em;
      }
      &-title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;

        font-weight: 600;
        text-align: left;
        font-size: 1.2em;
        
        transition-duration: 0.2s;
        padding-left: 0px;
      }
    }

    &:hover {
      background-color: #3375b9;
      
      .nav-title {
        padding-left: 4px;
      }
    }

    
  }
}
</style>