import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods'
import Star from '@/components/star'
import Seller from '@/components/seller'
Vue.use(Router)
/**
 * 页面加载重定向goods，实现默认首页加载
 */
export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    }, {
      path: '/goods',
      // name: 'Goods',
      component: Goods
    }, {
      path: '/star',
      // name: 'Star',
      component: Star
    }, {
      path: '/seller',
      // name: 'Seller',
      component: Seller
    }
  ]
})
