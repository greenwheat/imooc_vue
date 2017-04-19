<template>
  <div>
    <v-header></v-header>
    <div class="tab border-1px border-bottom">
      <div class="tab-item">
        <router-link to="/goods">goods</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/star">star</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">seller</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import header from '@/components/header/header.vue'
export default {
  name: 'app',
  components: {
    'v-header': header
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
