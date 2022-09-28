<template>
  <div class="home-wrapper common-layout">
    <el-container>
      <el-aside class="home-side">
        <SideNav v-model:isOpen="isOpen"/>
      </el-aside>

      <el-container>
        <el-header class="home-header">
          <HeaderVue v-model:isOpen="isOpen"/>
        </el-header>

        <el-main class="home-main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import SideNav from '@/components/layout/SideNav.vue';
import HeaderVue from '@/components/layout/Header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    SideNav,
    HeaderVue
  },
  setup () {
    let isOpen = ref(true)

    return {
      isOpen
    }
  }
});
</script>

<style lang="scss" scoped>
.home {
  &-wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    &::v-deep .el-container {
      height: 100%;
    }
  }

  &-side {
    width: fit-content;
    transition: width 0.3s;
  }

  &-header {
    height: fit-content;

    &::v-deep.el-header {
      padding: 0;
    }
  }
  &-main {
    height: 100%;
    background-color: #ededed;
    overflow: auto;

    &::v-deep .el-main {
      padding: 0;
    }
  }
}
</style>
