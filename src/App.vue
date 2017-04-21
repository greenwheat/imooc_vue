<template>
  <div>
    <v-header :seller="seller"></v-header>
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
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from '@/components/header/header.vue'
const ERR_OK = 0
export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': header
  },
  created() {
    this.$http.get('/api/seller').then((resoponse) => {
      resoponse = resoponse.body
      console.log(resoponse)
      if (resoponse.errno === ERR_OK) {
        this.seller = resoponse.data
        console.log(resoponse.data)
      }
    })
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
